package controllers

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	uuid "github.com/satori/go.uuid"
	"github.com/vinit/kharche/pkg/models"
	"github.com/vinit/kharche/pkg/utils"
)

var NewExpense models.Expense

func GetAllExpense(w http.ResponseWriter, r *http.Request) {
	// calling db function from model
	newExpenses := models.GetAllExpenses()

	// jsonify the response from db
	res, _ := json.Marshal(newExpenses)

	// sending response
	w.Header().Set("Access-Control-Allow-Origin", "*") // allow cors
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetExpenseById(w http.ResponseWriter, r *http.Request) {
	// Getting Id from the params
	vars := mux.Vars(r)
	expenseId := vars["expenseId"]

	// calling db function from model
	expenseDetails, _ := models.GetExpenseById(expenseId)

	// jsonify the response from the db
	res, _ := json.Marshal(expenseDetails)

	// sending response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func CreateExpense(w http.ResponseWriter, r *http.Request) {
	// getting reference of struct from model
	newExpense := &models.Expense{}

	// parsing the obj in req.body
	utils.ParseBody(r, newExpense)

	// creating new object with help of model schema
	b := newExpense.CreateExpense()

	// updating userInfo current balance based on new expenses added
	userInfo, db := models.GetUserById(b.User_ID.String())
	userInfo.Balance = userInfo.Balance - b.Expend_Amount
	db.Save(&userInfo)

	// jsonifying the response
	res, _ := json.Marshal(b)

	// sending the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteExpense(w http.ResponseWriter, r *http.Request) {
	// getting ID from params
	vars := mux.Vars(r)
	expenseId := vars["expenseId"]

	// adding the amount expended back to balance as the entry was deleted
	b, _ := models.GetExpenseById(expenseId)
	userInfo, db := models.GetUserById(b.User_ID.String())
	userInfo.Balance = userInfo.Balance + b.Expend_Amount
	db.Save(&userInfo)

	// calling delete function from model
	_ = models.DeleteExpense(expenseId)

	// sending response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, " Successfully deleted book with id %s", expenseId)
}

func UpdateExpense(w http.ResponseWriter, r *http.Request) {
	var newInfo = &models.Expense{}
	utils.ParseBody(r, newInfo)

	vars := mux.Vars(r)
	expenseId := vars["expenseId"]

	oldInfo, db := models.GetExpenseById(expenseId)

	// update User balance based on edited entry of expense
	userInfo, userDB := models.GetUserById(oldInfo.User_ID.String())
	userInfo.Balance = userInfo.Balance - (newInfo.Expend_Amount - oldInfo.Expend_Amount)
	userDB.Save(&userInfo)

	if newInfo.Expense_ID != uuid.Nil {
		oldInfo.Expense_ID = newInfo.Expense_ID
	}
	if newInfo.Title != "" {
		oldInfo.Title = newInfo.Title
	}
	if newInfo.Label != "" {
		oldInfo.Label = newInfo.Label
	}
	if newInfo.Expend_Amount != 0 {
		oldInfo.Expend_Amount = newInfo.Expend_Amount
	}
	if newInfo.User_ID != uuid.Nil {
		oldInfo.User_ID = newInfo.User_ID
	}

	db.Save(&oldInfo)
	res, _ := json.Marshal(oldInfo)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)

}
