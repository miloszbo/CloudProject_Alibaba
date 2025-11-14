package server

import (
	"net/http"
	"smart-expense-planner-backend/internal/handlers"
	"smart-expense-planner-backend/internal/middlewares"
	"smart-expense-planner-backend/internal/services"
)

func SetupRoutes() http.Handler {
	mux := http.NewServeMux()

	conn := NewConnection()

	userService := services.NewBaseUserService(conn)
	userHandler := handlers.UserHandler{
		UserService: &userService,
	}

	mux.HandleFunc("POST /user/login", userHandler.LoginUser)
	mux.HandleFunc("POST /user/register", userHandler.CreateUser)
	mux.HandleFunc("GET /logout", userHandler.Logout)
	mux.HandleFunc("GET /tags", finderHandler.GetTags)
	mux.HandleFunc("POST /recipe", finderHandler.CreateRecipe)
	mux.HandleFunc("POST /analytics/events", analyticsHandler.ReceiveEvent)

	stack := middlewares.CreateStack(
		middlewares.Logging,
		middlewares.CorsMiddleware,
	)

	authMux := http.NewServeMux()
	authMux.HandleFunc("GET /profile", userHandler.GetProfile)
	authMux.HandleFunc("GET /verify", userHandler.IsLogged)
	authMux.HandleFunc("GET /browser", finderHandler.FindRecipes)
	authMux.HandleFunc("GET /re/{id}", finderHandler.GetRecipe)
	authMux.HandleFunc("POST /re", finderHandler.AddReview)
	authMux.HandleFunc("GET /ret/{id}", finderHandler.GetRatings)
	authMux.HandleFunc("GET /rev/{id}", finderHandler.GetReview)
	authMux.HandleFunc("PATCH /user/settings", userHandler.UpdateUserSettings)
	authMux.HandleFunc("POST /user/tags", userHandler.AddUserTag)
	authMux.HandleFunc("DELETE /user/tags/{tagName}", userHandler.DeleteUserTag)
	authMux.HandleFunc("GET /user/tags", userHandler.DisplayUserTags)
	authMux.HandleFunc("POST /analytics/send", analyticsHandler.SendToBigQuery)

	mux.Handle("/", middlewares.Authentication(authMux))

	return stack(mux)
}
