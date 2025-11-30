package routes

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"

	"message_board/config"
	"message_board/controllers"
	"message_board/middlewares"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB, cfg *config.Config) {
	// global optional auth (parses token if present)
	r.Use(middlewares.OptionalAuth(cfg))

	authC := &controllers.AuthController{DB: db, CFG: cfg}
	msgC := &controllers.MessageController{DB: db}

	api := r.Group("/api")
	{
		api.POST("/auth/login", authC.Login)
		api.POST("/auth/register", authC.Register)

		// profile
		api.GET("/auth/me", middlewares.RequireAuth(cfg), authC.Me)

		// messages
		api.GET("/messages", msgC.ListMessages)
		api.POST("/messages", middlewares.RequireAuth(cfg), msgC.CreateMessage)
		api.DELETE("/messages/:id", middlewares.RequireAuth(cfg), msgC.DeleteMessage)

		// reviewer routes
		rev := api.Group("/messages")
		rev.Use(middlewares.RequireAuth(cfg), middlewares.RequireReviewer())
		{
			rev.GET("/all", msgC.ListAll)
			rev.PATCH("/:id/approve", msgC.Approve)
			rev.PATCH("/:id/reject", msgC.Reject)
		}
	}
}
