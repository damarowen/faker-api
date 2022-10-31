package routes

import (
	"github.com/damarowen/faker-api/api/v1/handlers"
	"github.com/gofiber/fiber/v2"
)

func Setup(app *fiber.App) {

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Post("/api/v1/item/create", handlers.SeedData)
	app.Get("/api/v1/item/all", handlers.FetchAll)

}