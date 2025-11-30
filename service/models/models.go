package models

import (
	"time"

	"gorm.io/gorm"
)

type UserRole string

const (
	RoleNormal   UserRole = "normal"
	RoleReviewer UserRole = "reviewer"
	RoleAdmin    UserRole = "admin"
)

type User struct {
	ID        uint64   `gorm:"primaryKey;autoIncrement"`
	Username  string   `gorm:"size:100;uniqueIndex;not null"`
	Password  string   `gorm:"size:255;not null"`
	Nickname  string   `gorm:"size:50;not null"`
	Role      UserRole `gorm:"type:enum('normal','reviewer','admin');default:'normal'"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}

type MessageStatus string

const (
	StatusPending  MessageStatus = "pending"
	StatusApproved MessageStatus = "approved"
	StatusRejected MessageStatus = "rejected"
)

type Message struct {
	ID        uint64        `gorm:"primaryKey;autoIncrement"`
	UserID    uint64        `gorm:"index;not null"`
	User      User          `gorm:"foreignKey:UserID"`
	Content   string        `gorm:"type:text;not null"`
	Status    MessageStatus `gorm:"type:enum('pending','approved','rejected');default:'pending'"`
	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt gorm.DeletedAt `gorm:"index"`
}
