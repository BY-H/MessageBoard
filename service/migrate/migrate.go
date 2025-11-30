package migrate

import (
	"log"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"

	"message_board/models"
)

func Migrate(db *gorm.DB) error {
	// AutoMigrate tables
	if err := db.AutoMigrate(&models.User{}, &models.Message{}); err != nil {
		return err
	}
	return nil
}

// CreateDefaultAccounts: create a reviewer account if not exists (password: reviewer123 — 请运行后改密码)
func CreateDefaultAccounts(db *gorm.DB) error {
	var count int64
	db.Model(&models.User{}).Where("role = ?", models.RoleReviewer).Count(&count)
	if count == 0 {
		pass, _ := bcrypt.GenerateFromPassword([]byte("reviewer123"), bcrypt.DefaultCost)
		u := models.User{
			Username: "reviewer",
			Password: string(pass),
			Nickname: "审核员",
			Role:     models.RoleReviewer,
		}
		if err := db.Create(&u).Error; err != nil {
			return err
		}
		log.Println("created default reviewer account: username=reviewer password=reviewer123 (please change it!)")
	}
	return nil
}
