package routes

import (
	itemHandlers "github.com/damarowen/faker-api/api/v1/handlers/item"
	"github.com/gofiber/fiber/v2"
)

func SetupItemRoutes(router fiber.Router) {
	item := router.Group("/item")
	item.Post("/seed", itemHandlers.SeedData)
	item.Get("/all", itemHandlers.FetchAll)
	item.Post("/create", itemHandlers.CreateItem)
	item.Get("/:itemId", itemHandlers.GetItem)
	item.Put("/:itemId", itemHandlers.EditItem)
	item.Delete("/:itemId", itemHandlers.DeleteItem)

}
func Setup(app *fiber.App) {

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	v1 := app.Group("api/v1")

	SetupItemRoutes(v1)
}
