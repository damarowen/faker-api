package configs

import (
	"fmt"
	"log"

	"github.com/damarowen/faker-api/models"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

// Declare the variable for the database
var DB *gorm.DB


// ConnectDB connect to db
func ConnectDB(){
    // Connection URL to connect to MYSQL Database
	env := Config("ENV")
	dsn := fmt.Sprintf("%s:@/%s", Config("DB_USER"), Config("DB_NAME"))
	if env == "DEV" {
		dsn = fmt.Sprintf("%s:@tcp(%s:3306)/%s", Config("DB_USER"), Config("DB_CONTAINER"), Config("DB_NAME"))
	}
	

    // Connect to the DB and initialize the DB variable
	conn, err := gorm.Open(mysql.Open(dsn), &gorm.Config{ Logger: logger.Default.LogMode(logger.Info)})

	if err != nil {
			panic("Could not connect to database")
		}

	//db.AutoMigrate(&Item{})

	DB = conn

    log.Println("Connection Opened to Database")

	conn.AutoMigrate(&models.Item{})
}