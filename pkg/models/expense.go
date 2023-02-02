package models

import (
	"time"

	"github.com/jinzhu/gorm"
	uuid "github.com/satori/go.uuid"
)

type Expense struct {
	Expense_ID    uuid.UUID `gorm:"type:char(36);primary_key"`
	Title         string    `json:"title" validate:"required"`
	Label         string    `json:"label"  validate:"required"`
	Expend_Amount int       `json:"expend_amount"  validate:"required"`
	CreatedAt     time.Time `gorm:"autoCreateTime:true"`
	UpdatedAt     time.Time `gorm:"autoUpdateTime:true"`
	User_ID       uuid.UUID `gorm:"column:User_ID"`
}

// This functions are called before creating any Expense
func (expense *Expense) BeforeCreate(scope *gorm.Scope) error {
	return scope.SetColumn("Expense_ID", uuid.NewV4())
}

func (e *Expense) CreateExpense() *Expense {
	db.NewRecord(e)
	db.Create(&e)
	return e
}

func (e *Expense) UpdateExpenseDetails() *Expense {
	db.Save(&e)
	return e
}

func GetAllExpenses() []Expense {
	var Expenses []Expense
	db.Find(&Expenses)
	return Expenses
}

func GetExpenseById(Id string) (*Expense, *gorm.DB) {
	var getExpense Expense
	db := db.Where("Expense_ID=?", Id).Find(&getExpense)
	return &getExpense, db
}

func DeleteExpense(Id string) Expense {
	var expense Expense
	db.Where("Expense_ID=?", Id).Delete(expense)
	return expense
}
