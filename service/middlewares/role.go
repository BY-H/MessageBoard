package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// RequireReviewer ensures role is reviewer or admin
func RequireReviewer() gin.HandlerFunc {
	return func(c *gin.Context) {
		r, ok := c.Get("role")
		if !ok {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "forbidden"})
			return
		}
		roleStr, _ := r.(string)
		if roleStr != "reviewer" && roleStr != "admin" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{"error": "insufficient permissions"})
			return
		}
		c.Next()
	}
}
