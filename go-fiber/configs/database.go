package database

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

// Declare the variable for the database

// ConnectDB connect to db
func ConnectDB() (DB *gorm.DB , err error) {

    // Connection URL to connect to Postgres Database
    dsn := "root:@/faker_api"

    // Connect to the DB and initialize the DB variable
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})

	if err != nil {
			panic("Could not connect to database")
		}

	//db.AutoMigrate(&Item{})


    fmt.Println("Connection Opened to Database")

	return DB , err
}