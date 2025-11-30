package controllers

import (
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"message_board/models"
)

type MessageController struct {
	DB *gorm.DB
}

// POST /messages - create message (require auth)
type createMsgReq struct {
	Content string `json:"content" binding:"required"`
}

func (m *MessageController) CreateMessage(c *gin.Context) {
	uidVal, _ := c.Get("uid")
	uid := uidVal.(uint64)

	var req createMsgReq
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "content required"})
		return
	}

	msg := models.Message{
		UserID:  uid,
		Content: req.Content,
		Status:  models.StatusPending,
	}
	if err := m.DB.Create(&msg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "create failed"})
		return
	}

	// return the message (author can see it)
	m.DB.Preload("User").First(&msg, msg.ID)
	c.JSON(http.StatusOK, gin.H{"message": msg})
}

// GET /messages - public listing with logic:
// - if not logged in: only approved
// - if logged in: approved + own pending/rejected
func (m *MessageController) ListMessages(c *gin.Context) {
	uidVal, loggedIn := c.Get("uid")
	var messages []models.Message

	if !loggedIn {
		if err := m.DB.Preload("User").Where("status = ?", models.StatusApproved).Order("created_at desc").Find(&messages).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "query failed"})
			return
		}
	} else {
		uid := uidVal.(uint64)
		// approved OR own messages
		if err := m.DB.Preload("User").
			Where("status = ? OR user_id = ?", models.StatusApproved, uid).
			Order("created_at desc").
			Find(&messages).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "query failed"})
			return
		}
	}

	// format response: show nickname instead of user object to front-end convenience
	out := make([]gin.H, 0, len(messages))
	for _, mm := range messages {
		out = append(out, gin.H{
			"id":         mm.ID,
			"user_id":    mm.UserID,
			"nickname":   mm.User.Nickname,
			"content":    mm.Content,
			"status":     mm.Status,
			"created_at": mm.CreatedAt,
			"updated_at": mm.UpdatedAt,
		})
	}
	c.JSON(http.StatusOK, gin.H{"messages": out})
}

// DELETE /messages/:id - allow owner to delete their message
func (m *MessageController) DeleteMessage(c *gin.Context) {
	uidVal, ok := c.Get("uid")
	if !ok {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login required"})
		return
	}
	uid := uidVal.(uint64)

	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}

	var msg models.Message
	if err := m.DB.First(&msg, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "query failed"})
		return
	}

	if msg.UserID != uid {
		c.JSON(http.StatusForbidden, gin.H{"error": "not your message"})
		return
	}

	if err := m.DB.Delete(&msg).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "delete failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

// ========= Reviewer endpoints ===========

// GET /messages/all - reviewer can see all messages
func (m *MessageController) ListAll(c *gin.Context) {
	var messages []models.Message
	if err := m.DB.Preload("User").Order("created_at desc").Find(&messages).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "query failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"messages": messages})
}

// PATCH /messages/:id/approve
func (m *MessageController) Approve(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	if err := m.DB.Model(&models.Message{}).Where("id = ?", id).Update("status", models.StatusApproved).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "update failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}

// PATCH /messages/:id/reject
func (m *MessageController) Reject(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.ParseUint(idStr, 10, 64)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
		return
	}
	if err := m.DB.Model(&models.Message{}).Where("id = ?", id).Update("status", models.StatusRejected).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "update failed"})
		return
	}
	c.JSON(http.StatusOK, gin.H{"ok": true})
}
