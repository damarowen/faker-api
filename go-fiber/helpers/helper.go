package helpers

import (
	"fmt"

	"github.com/go-playground/validator/v10"
	"github.com/gofiber/fiber/v2"
)

type ErrorResponse struct {
	FailedField string
	Tag         string
	Value       string
	Message     string
}

type ApiResponseMeta struct {
	Code int    `json:"code" `
	Msg  string `json:"msg"`
}

type ApiResponse struct {
	Meta ApiResponseMeta
	Data interface{}
	Errors  interface{} 
}

// EmptyObj object is used when data doesnt want to be null on json
type EmptyObj struct{}

func ValidateStruct(models interface{}) []*ErrorResponse {
	var errors []*ErrorResponse
	validate := validator.New()
	err := validate.Struct(models)
	if err != nil {
		for _, err := range err.(validator.ValidationErrors) {
			var element ErrorResponse
			element.FailedField = err.StructNamespace()
			element.Tag = err.Tag()
			element.Value = err.Param()
			element.Message = fmt.Sprintf("%s %s", err.StructNamespace(), err.Tag())

			errors = append(errors, &element)
		}
	}
	return errors
}

func DefaultApiResponse(c *fiber.Ctx, codes int, msgs string, data interface{}, dataErr  interface{}) error {
	// var dataErr interface{}
	// //logic error = " jika tidak ada error
	// if len(err.(string)) > 0 {
	// 	dataErr = strings.Split(err.(string), "\n")
	// } else {
	// 	dataErr = ""
	// }

	if data == nil {
		data = EmptyObj{}
	}

	if dataErr == nil {
		dataErr = EmptyObj{}
	}

	metas := &ApiResponseMeta{
		Code: codes,
		Msg:  msgs,
	}

	return c.Status(codes).JSON(&ApiResponse{
		Meta: *metas,
		Data: data,
		Errors: dataErr})
}
