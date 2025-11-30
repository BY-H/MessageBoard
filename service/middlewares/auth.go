package middlewares

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"message_board/config"
	"message_board/utils"
)

// Auth middleware: parses JWT and sets user info into context keys "uid" and "role".
// If token missing or invalid, just continue without user (so public endpoints can check).
func OptionalAuth(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth == "" {
			c.Next()
			return
		}
		parts := strings.Fields(auth)
		if len(parts) == 2 && strings.ToLower(parts[0]) == "bearer" {
			token := parts[1]
			claims, err := utils.ParseToken(cfg, token)
			if err == nil {
				c.Set("uid", claims.UID)
				c.Set("role", claims.Role)
			}
		}
		c.Next()
	}
}

// Require authentication: if not authenticated -> 401
func RequireAuth(cfg *config.Config) gin.HandlerFunc {
	return func(c *gin.Context) {
		auth := c.GetHeader("Authorization")
		if auth == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "authorization required"})
			return
		}
		parts := strings.Fields(auth)
		if len(parts) != 2 || strings.ToLower(parts[0]) != "bearer" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid authorization header"})
			return
		}
		token := parts[1]
		claims, err := utils.ParseToken(cfg, token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}
		c.Set("uid", claims.UID)
		c.Set("role", claims.Role)
		c.Next()
	}
}
