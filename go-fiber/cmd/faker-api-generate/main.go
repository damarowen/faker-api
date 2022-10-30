package main

import (
	"math/rand"

	"github.com/bxcodec/faker/v3"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

type Item struct {
	Id          uint
	Name        string
	Description string
	Price       int
}


func main() {

	db, err := gorm.Open(mysql.Open("root:@/faker_api"), &gorm.Config{})

	if err != nil {
		panic("Could not connect to database")
	}

	app := fiber.New()
	app.Use(cors.New())
	db.AutoMigrate(&Item{})

	app.Get("/", func (c *fiber.Ctx) error {
        return c.SendString("Hello, World!")
    })

	app.Post("/api/v1/item/create", func(c *fiber.Ctx) error {
		for i := 0; i < 10; i++ {
			db.Create(&Item{
				Name:        faker.Word(),
				Description: faker.Paragraph(),
				Price:       rand.Intn(140) + 10,
			})
		}
	
		return c.Status(200).JSON(fiber.Map{
			"message": "Success",
		})
	})

	
	app.Get("/api/v1/item/all", func(c *fiber.Ctx) error {

		var items []Item
		db.Find(&items)
		return c.Status(200).JSON(items)
	})
	app.Listen(":8000")
}