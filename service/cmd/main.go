package main

import (
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"message_board/config"
	"message_board/migrate"
	"message_board/repository"
	"message_board/routes"
)

func main() {
	// load env
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, relying on environment variables")
	}

	cfg := config.LoadConfig()

	// init DB
	db, err := repository.NewDB(cfg.DB_DSN)
	if err != nil {
		log.Fatalf("failed to connect db: %v", err)
	}

	// run migrations (creates tables)
	if err := migrate.Migrate(db); err != nil {
		log.Fatalf("migrate failed: %v", err)
	}

	// create default reviewer account if not exists
	if err := migrate.CreateDefaultAccounts(db); err != nil {
		log.Fatalf("create default accounts failed: %v", err)
	}

	r := gin.Default()
	routes.RegisterRoutes(r, db, cfg)

	addr := fmt.Sprintf(":%s", cfg.AppPort)
	log.Printf("listening on %s", addr)
	if err := r.Run(addr); err != nil {
		log.Fatalf("server run failed: %v", err)
	}
}
