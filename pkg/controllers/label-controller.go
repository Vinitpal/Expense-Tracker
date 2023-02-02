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

var NewLabel models.Label

func GetAllLabel(w http.ResponseWriter, r *http.Request) {
	// calling db function from model
	newLabels := models.GetAllLabels()

	// jsonify the response from db
	res, _ := json.Marshal(newLabels)

	// sending response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func GetLabelById(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	labelId := vars["labelId"]

	// calling db function from model
	labelDetails, _ := models.GetUserById(labelId)

	// jsonify the response from the db
	res, _ := json.Marshal(labelDetails)

	// sending response
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func CreateLabel(w http.ResponseWriter, r *http.Request) {
	// getting reference of struct from model
	newLabel := &models.Label{}

	// parsing the obj in req.body
	utils.ParseBody(r, newLabel)
	color := utils.GenerateColor()

	newLabel.Color = color

	// creating new object with help of model schema
	b := newLabel.CreateLabel()

	// jsonifying the response
	res, _ := json.Marshal(b)

	// sending the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}

func DeleteLabel(w http.ResponseWriter, r *http.Request) {
	// getting ID from params
	vars := mux.Vars(r)
	labelId := vars["labelId"]

	// calling delete function from model
	_ = models.DeleteLabel(labelId)

	// sending response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	fmt.Fprintf(w, " Successfully deleted %s", labelId)
}

func UpdateLabel(w http.ResponseWriter, r *http.Request) {
	// Set Headers
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")

	var newInfo = &models.Label{}
	utils.ParseBody(r, newInfo)

	vars := mux.Vars(r)
	labelID := vars["labelId"]

	oldInfo, db := models.GetLabelById(labelID)

	if newInfo.Label_ID != uuid.Nil {
		oldInfo.Label_ID = newInfo.Label_ID
	}
	if newInfo.Name != "" {
		oldInfo.Name = newInfo.Name
	}

	db.Save(&oldInfo)
	res, _ := json.Marshal(oldInfo)

	// send response
	w.WriteHeader(http.StatusOK)
	w.Write(res)
}
