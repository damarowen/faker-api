package models

type Item struct {
	Id           uint   `json:"id" gorm:"primaryKey"`
	Name        string  `json:"name" gorm:"not null" validate:"required"`
	Description string  `json:"description" gorm:"not null" validate:"required"`
	Price       int   `json:"price" gorm:"not null" validate:"required"`
}

