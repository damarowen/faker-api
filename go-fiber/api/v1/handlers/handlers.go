package handlers

import (
	"math/rand"

	"github.com/bxcodec/faker/v3"
	"github.com/damarowen/faker-api/configs"
	"github.com/damarowen/faker-api/models"
	"github.com/gofiber/fiber/v2"
)


//TODO SEEED BY QUERY PARAM ?SEED=
func SeedData(c *fiber.Ctx) error {
	for i := 0; i < 10; i++ {
		database.DB.Create(&models.Item{
			Name:        faker.Word(),
			Description: faker.Paragraph(),
			Price:       rand.Intn(140) + 10,
		})
	}


	return c.Status(200).JSON(fiber.Map{
		"message": "Success",
	})
}


func FetchAll(c *fiber.Ctx) error {

		var items []models.Item
		database.DB.Find(&items)
		return c.Status(200).JSON(items)
}
