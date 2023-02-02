package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/vinit/kharche/pkg/routes"
)

func main() {
	// first setup routes
	r := mux.NewRouter()

	// Handle API routes
	api := r.PathPrefix("/api").Subrouter()
	routes.ExpenseRoute(api)
	routes.UserRoute(api)
	routes.LabelRoute(api)

	// Serve static files
	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("./build/static/"))))

	// Serve index page on all unhandled routes
	r.PathPrefix("/").HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, "./build/index.html")
	})

	fmt.Printf("Started server at port 8080\n")
	log.Fatal(http.ListenAndServe("localhost:8080", &CORSRouterDecorator{r}))
}

// CORSRouterDecorator applies CORS headers to a mux.Router
type CORSRouterDecorator struct {
	R *mux.Router
}

func (c *CORSRouterDecorator) ServeHTTP(rw http.ResponseWriter,
	req *http.Request) {
	if origin := req.Header.Get("Origin"); origin != "" {
		rw.Header().Set("Access-Control-Allow-Origin", "*")
		rw.Header().Set("Access-Control-Allow-Methods",
			"POST, GET, OPTIONS, PUT, DELETE")
		rw.Header().Set("Access-Control-Allow-Headers",
			"Accept, Accept-Language, Content-Type")
	}
	// Stop here if its Preflighted OPTIONS request
	if req.Method == "OPTIONS" {
		return
	}

	c.R.ServeHTTP(rw, req)
}
