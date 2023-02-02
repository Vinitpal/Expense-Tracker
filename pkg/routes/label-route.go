package routes

import (
	"github.com/gorilla/mux"
	"github.com/vinit/kharche/pkg/controllers"
)

var LabelRoute = func(router *mux.Router) {
	// CREATE CONTROLLERS
	router.HandleFunc("/label", controllers.CreateLabel).Methods("POST")
	router.HandleFunc("/label", controllers.GetAllLabel).Methods("GET")
	router.HandleFunc("/label/{labelId}", controllers.GetLabelById).Methods("GET")
	router.HandleFunc("/label/{labelId}", controllers.UpdateLabel).Methods("PUT")
	router.HandleFunc("/label/{labelId}", controllers.DeleteLabel).Methods("DELETE")

}
