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

var NewUser models.User

func GetAllUser(w http.ResponseWriter, r *http.Request) {
	// calling db function from model
	newUsers := models.GetAllUsers()

	// jsonify the response from db
	res, _ := json.Marshal(newUsers)

	// sending response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetUserById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	userId := vars["userId"]

	// calling db function from model
	userDetails, _ := models.GetUserById(userId)

	// jsonify the response from the db
	res, _ := json.Marshal(userDetails)

	// sending response
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func CreateUser(w http.ResponseWriter, r *http.Request) {
	// getting reference of struct from model
	newUser := &models.User{}

	// parsing the obj in req.body
	utils.ParseBody(r, newUser)

	// creating new object with help of model schema
	b := newUser.CreateUser()

	// jsonifying the response
	res, _ := json.Marshal(b)

	// sending the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	// getting ID from params
	vars := mux.Vars(r)
	userId := vars["userId"]

	// calling delete function from model
	_ = models.DeleteUser(userId)

	// sending response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, " Successfully deleted %s", userId)
}

func UpdateUser(w http.ResponseWriter, r *http.Request) {
	// Set Headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var newInfo = &models.User{}
	utils.ParseBody(r, newInfo)

	vars := mux.Vars(r)
	userId := vars["userId"]

	oldInfo, db := models.GetUserById(userId)

	if newInfo.User_ID != uuid.Nil {
		oldInfo.User_ID = newInfo.User_ID
	}
	if newInfo.Name != "" {
		oldInfo.Name = newInfo.Name
	}
	if newInfo.Balance != 0 {
		oldInfo.Balance = newInfo.Balance
	}

	db.Save(&oldInfo)
	res, _ := json.Marshal(oldInfo)

	// send response
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
