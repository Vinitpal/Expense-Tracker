package routes

import (
	"github.com/gorilla/mux"
	"github.com/vinit/kharche/pkg/controllers"
)

var UserRoute = func(router *mux.Router) {
	// CREATE CONTROLLERS
	router.HandleFunc("/user", controllers.CreateUser).Methods("POST")
	router.HandleFunc("/user", controllers.GetAllUser).Methods("GET")
	router.HandleFunc("/user/{userId}", controllers.GetUserById).Methods("GET")
	router.HandleFunc("/user/{userId}", controllers.UpdateUser).Methods("PUT")
	router.HandleFunc("/user/{userId}", controllers.DeleteUser).Methods("DELETE")

}
