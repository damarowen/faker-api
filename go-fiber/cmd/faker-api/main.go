package main

import (
	"github.com/damarowen/faker-api/configs"
	"github.com/damarowen/faker-api/api/v1/routes"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/recover"
)


func main() {

	configs.ConnectDB()
	
	app := fiber.New()
	app.Use(recover.New())
	app.Use(cors.New())
	routes.Setup(app)

	app.Listen(":8000")
}