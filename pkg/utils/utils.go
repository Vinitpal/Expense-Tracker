package utils

import (
	"encoding/json"
	"io"
	"math/rand"
	"net/http"
	"time"
)

func ParseBody(r *http.Request, x interface{}) {
	if body, err := io.ReadAll(r.Body); err == nil {
		if err := json.Unmarshal([]byte(body), x); err != nil {
			return
		}
	}
}

func GenerateColor() string {
	var colorSet = make(map[string]bool)

	rand.Seed(time.Now().UnixNano())
	letters := []rune("0123456789ABCDEF")
	color := "#"

	for i := 0; i < 6; i++ {
		color += string(letters[rand.Intn(len(letters))])
	}

	if _, ok := colorSet[color]; ok {
		return GenerateColor()
	}
	colorSet[color] = true
	return color
}
