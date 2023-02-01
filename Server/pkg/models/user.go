package models

import (
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

type User struct {
	User_ID  uuid.UUID `gorm:"type:char(36); primary_key"`
	Name     string    `json:"name" gorm:"type:text;not null;uniqueIndex"`
	Balance  int       `json:"balance"`
	Expenses []Expense `gorm:"ForeignKey:User_ID"`
	Labels   []Label   `gorm:"ForeignKey:User_ID"`
}

// This functions are called before creating any User
func (user *User) BeforeCreate(scope *gorm.Scope) error {
	return scope.SetColumn("User_ID", uuid.NewV4())
}

func (e *User) CreateUser() *User {
	db.NewRecord(e)
	db.Create(&e)
	return e
}

func (e *User) UpdateUserDetails() *User {
	db.Save(&e)
	return e
}

func GetAllUsers() []User {
	var Users []User

	db.Preload("Expenses").Preload("Labels").Find(&Users)
	return Users
}

func GetUserById(Id string) (*User, *gorm.DB) {
	var getUser User
	db := db.Where("User_ID=?", Id).Preload("Expenses").Preload("Labels").Find(&getUser)
	return &getUser, db
}

func DeleteUser(Id string) User {
	var user User
	db.Where("User_ID=?", Id).Delete(user)
	return user
}
