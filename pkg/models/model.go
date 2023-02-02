package models

import (
	"github.com/jinzhu/gorm"
	"github.com/vinit/kharche/pkg/config"
)

var db *gorm.DB

func init() {
	// create config
	config.Connect()
	db = config.GetDB()
	db.Set("gorm:auto_preload", true)
	db.AutoMigrate(&User{}, &Expense{}, &Label{})
}
