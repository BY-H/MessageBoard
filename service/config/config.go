package config

import "os"

type Config struct {
	AppPort         string
	JwtSecret       string
	DB_DSN          string
	AdminInviteCode string `env:"ADMIN_INVITE_CODE"`
}

func LoadConfig() *Config {
	return &Config{
		AppPort:         getEnv("APP_PORT", "8080"),
		JwtSecret:       getEnv("JWT_SECRET", "secret123"),
		DB_DSN:          getEnv("DB_DSN", "root:429520hby@tcp(undefiner.cn:3306)/message_db?charset=utf8mb4&parseTime=True&loc=Local"),
		AdminInviteCode: getEnv("ADMIN_INVITE_CODE", "my_super_code_123"),
	}
}

func getEnv(key, fallback string) string {
	if v := os.Getenv(key); v != "" {
		return v
	}
	return fallback
}
