package itemHandlers

import (
	"log"
	"math/rand"
	"net/http"
	"strconv"

	"github.com/bxcodec/faker/v3"
	database "github.com/damarowen/faker-api/configs"
	"github.com/damarowen/faker-api/helpers"
	"github.com/damarowen/faker-api/models"
	"github.com/gofiber/fiber/v2"
)

func SeedData(c *fiber.Ctx) error {

	// Read the param noteId
	id := c.Query("seed")

	// string to int
	ids, _ := strconv.Atoi(id)

	for i := 0; i < ids; i++ {
		database.DB.Create(&models.Item{
			Name:        faker.Word(),
			Description: faker.Paragraph(),
			Price:       rand.Intn(140) + 10,
		})
	}

	return helpers.DefaultApiResponse(c, http.StatusOK, "success", nil, nil)

}

func FetchAll(c *fiber.Ctx) error {

	var items []models.Item
	database.DB.Find(&items)
	return helpers.DefaultApiResponse(c, http.StatusOK, "success", items, nil)
}

func CreateItem(c *fiber.Ctx) error {

	payload := new(models.Item)

	err := c.BodyParser(payload)

	if err != nil {
		return helpers.DefaultApiResponse(c, http.StatusInternalServerError, "Review your input", nil, err.Error())
	}

	errors := helpers.ValidateStruct(*payload)
	log.Println(errors)

	if errors != nil {
		return helpers.DefaultApiResponse(c, http.StatusInternalServerError, "Could not create item", nil, errors)
	}

	//* convert payload password from byte to string
	err = database.DB.Create(&payload).Error
	if err != nil {
		return helpers.DefaultApiResponse(c, http.StatusInternalServerError, "Could not create item", &payload, err.Error())

	}

	return helpers.DefaultApiResponse(c, http.StatusOK, "success", &payload, nil)

}

func GetItem(c *fiber.Ctx) error {
	var item models.Item

	// Read the param noteId
	id := c.Params("itemId")

	// string to int
	ids, _ := strconv.Atoi(id)

	// Find the note with the given Id
	database.DB.First(&item, "id = ?", ids)

	//* if not found
	if item.Id == 0 {
		return helpers.DefaultApiResponse(c, http.StatusNotFound, "not found", nil, nil)
	}

	// Else return notes
	return helpers.DefaultApiResponse(c, http.StatusOK, "success", &item, nil)
}

func EditItem(c *fiber.Ctx) error {

	type updateItem struct {
		Name        string `json:"name" validate:"required"`
		Description string `json:"description" validate:"required"`
		Price       int    `json:"price" validate:"required"`
	}

	var item models.Item

	// Read the param noteId
	id := c.Params("itemId")

	// string to int
	ids, _ := strconv.Atoi(id)

	// Find the note with the given Id
	database.DB.Find(&item, "id = ?", ids)

	//* if not found
	if item.Id == 0 {
		return helpers.DefaultApiResponse(c, http.StatusNotFound, "not found", nil, nil)
	}

	payloadUpdate := new(updateItem)
	err := c.BodyParser(payloadUpdate)

	if err != nil {
		return helpers.DefaultApiResponse(c, http.StatusInternalServerError, "Review your input", nil, err.Error())
	}

	errors := helpers.ValidateStruct(payloadUpdate)

	if errors != nil {
		return helpers.DefaultApiResponse(c, http.StatusInternalServerError, "Could not create item", nil, errors)
	}

	item.Name = payloadUpdate.Name
	item.Price = payloadUpdate.Price
	item.Description = payloadUpdate.Description

	database.DB.Save(&item)

	// Else return notes
	return helpers.DefaultApiResponse(c, http.StatusOK, "success", &item, nil)
}

func DeleteItem(c *fiber.Ctx) error {

	var item models.Item

	// Read the param noteId
	id := c.Params("itemId")

	// string to int
	ids, _ := strconv.Atoi(id)

	// Find the note with the given Id
	database.DB.Find(&item, "id = ?", ids)

	//* if not found
	if item.Id == 0 {
		return helpers.DefaultApiResponse(c, http.StatusNotFound, "not found", nil, nil)
	}

	err := database.DB.Delete(&item).Error

	if err != nil {
		return helpers.DefaultApiResponse(c, http.StatusOK, "Failed to delete note", &item, err)
	}

	return helpers.DefaultApiResponse(c, http.StatusOK, "success", &item, nil)
}
