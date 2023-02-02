package routes

import (
	"github.com/gorilla/mux"
	"github.com/vinit/kharche/pkg/controllers"
)

var ExpenseRoute = func(router *mux.Router) {
	// CREATE CONTROLLERS
	router.HandleFunc("/expense", controllers.CreateExpense).Methods("POST")
	router.HandleFunc("/expense", controllers.GetAllExpense).Methods("GET")
	router.HandleFunc("/expense/{expenseId}", controllers.GetExpenseById).Methods("GET")
	router.HandleFunc("/expense/{expenseId}", controllers.UpdateExpense).Methods("PUT")
	router.HandleFunc("/expense/{expenseId}", controllers.DeleteExpense).Methods("DELETE")

}
