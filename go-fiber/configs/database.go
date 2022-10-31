package database

import (
	"log"

	"github.com/damarowen/faker-api/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Declare the variable for the database
var DB *gorm.DB


// ConnectDB connect to db
func ConnectDB(){


    // Connection URL to connect to Postgres Database
    dsn := "root:@/faker_api"

    // Connect to the DB and initialize the DB variable
	conn, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
			panic("Could not connect to database")
		}

	//db.AutoMigrate(&Item{})

	DB = conn

    log.Println("Connection Opened to Database")

	conn.AutoMigrate(&models.Item{})
}