package models

import (
	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

type Label struct {
	Label_ID uuid.UUID `gorm:"type:char(36); primary_key"`
	Name     string    `json:"name" gorm:"type:text;not null;uniqueIndex"`
	Color    string    `json:"color" gorm:"type:text;not null;"`
	User_ID  uuid.UUID `gorm:"column:User_ID"`
}

// This functions are called before creating any Label
func (label *Label) BeforeCreate(scope *gorm.Scope) error {
	return scope.SetColumn("Label_ID", uuid.NewV4())
}

func (e *Label) CreateLabel() *Label {
	db.NewRecord(e)
	db.Create(&e)
	return e
}

func (e *Label) UpdateLabelDetails() *Label {
	db.Save(&e)
	return e
}

func GetAllLabels() []Label {
	var Labels []Label

	db.Find(&Labels)
	return Labels
}

func GetLabelById(Id string) (*Label, *gorm.DB) {
	var getLabel Label
	db := db.Where("Label_ID=?", Id).Preload("Expenses").Find(&getLabel)
	return &getLabel, db
}

func DeleteLabel(Id string) Label {
	var label Label
	db.Where("Label_ID=?", Id).Delete(label)
	return label
}
