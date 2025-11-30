package controllers

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"message_board/config"
	"message_board/models"
	"message_board/utils"
)

type AuthController struct {
	DB  *gorm.DB
	CFG *config.Config
}

type loginReq struct {
	Username string `json:"username" binding:"required"`
	Password string `json:"password" binding:"required"`
}

func (a *AuthController) Login(c *gin.Context) {
	var req loginReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid params"})
		return
	}
	var user models.User
	if err := a.DB.Where("username = ?", req.Username).First(&user).Error; err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "username or password incorrect"})
		return
	}
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)); err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "username or password incorrect"})
		return
	}

	// generate token
	token, err := utils.GenerateToken(a.CFG, user.ID, string(user.Role), 72)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "generate token failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"token": token,
		"user": gin.H{
			"id":       user.ID,
			"nickname": user.Nickname,
			"role":     user.Role,
			"username": user.Username,
		},
	})
}

func (a *AuthController) Me(c *gin.Context) {
	uidVal, ok := c.Get("uid")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "not logged in"})
		return
	}
	uid := uidVal.(uint64)
	var user models.User
	if err := a.DB.First(&user, uid).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"id":       user.ID,
		"nickname": user.Nickname,
		"username": user.Username,
		"role":     user.Role,
	})
}

type registerReq struct {
	Username   string `json:"username" binding:"required"`
	Password   string `json:"password" binding:"required"`
	Nickname   string `json:"nickname" binding:"required"`
	InviteCode string `json:"invite_code"` // 可选
}

func (a *AuthController) Register(c *gin.Context) {
	fmt.Println("DEBUG invite code from config:", a.CFG.AdminInviteCode)

	var req registerReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid params"})
		return
	}

	// 检查用户名是否已存在
	var exists models.User
	if err := a.DB.Where("username = ?", req.Username).First(&exists).Error; err == nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "username already exists"})
		return
	}

	// 判断角色（默认 normal）
	role := models.RoleNormal

	adminCode := a.CFG.AdminInviteCode // 从 config 读取，这个字段你需要确保存在
	if req.InviteCode != "" {
		// 输入了邀请码
		if req.InviteCode != adminCode {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid invite code"})
			return
		}
		role = models.RoleAdmin
	}

	// 加密密码
	hashed, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "hash password failed"})
		return
	}

	user := models.User{
		Username: req.Username,
		Password: string(hashed),
		Nickname: req.Nickname,
		Role:     role,
	}

	if err := a.DB.Create(&user).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "create user failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "register success",
		"user": gin.H{
			"id":       user.ID,
			"username": user.Username,
			"nickname": user.Nickname,
			"role":     user.Role,
		},
	})
}
