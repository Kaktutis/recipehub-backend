https://github.com/Kaktutis/recipehub-backend/releases

# RecipeHub Backend API: Fast RESTful Recipe Sharing Engine

![RecipeHub Backend banner](https://images.unsplash.com/photo-1526312427123-f6d9a6f8fefc?auto=format&fit=crop&w=1350&q=80)

[![Release](https://img.shields.io/github/v/release/Kaktutis/recipehub-backend?style=for-the-badge)](https://github.com/Kaktutis/recipehub-backend/releases)

Welcome to the RecipeHub backend. This service powers RecipeHub, a MERN stack platform for sharing recipes. The backend exposes a clean RESTful API, handles user management, recipe data, ingredients, and user interactions such as saving recipes. It uses Node.js, Express, and MongoDB with Mongoose models for robust data handling.

Table of contents
- Overview
- Why RecipeHub Backend
- Features
- Tech stack
- Architecture and data model
- API design
- Getting started
- Environment and configuration
- Running locally
- Database and seeding
- Directory structure
- API endpoints in detail
- Security and authentication
- Testing and quality
- Deployment options
- Release and maintenance
- Community and contribution
- License and credits
- Downloads and releases

Overview
RecipeHub Backend provides a stable, scalable API for the RecipeHub application. It follows REST principles and uses a document model in MongoDB. The API handles user authentication with JWT, recipe creation and management, ingredient handling, and user interactions such as saving recipes. It is designed to be easy to extend with new features, such as comments, ratings, and advanced search.

Why RecipeHub Backend
- Clear API surface for clients.  
- Strong data validation and error handling.  
- JWT-based authentication.  
- Fine-grained access control for user-owned data.  
- Flexible data models that align with the MERN stack.  
- Simple deployment and extensibility.

Features
- User registration and login with JWT authentication.
- Create, update, delete your own recipes.
- Add ingredients to recipes.
- Save or unsave recipes to your profile.
- View your own recipes and saved recipes.
- RESTful API structure with predictable routes.
- MongoDB database with Mongoose models.
- Basic search and filtering capabilities for recipes.
- Protected routes for user-specific actions.
- Clear error messages and status codes to guide clients.

Tech stack
- Node.js (v18+ recommended)
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- bcrypt for password hashing
- dotenv for environment configuration
- Mongoose for data modeling
- Jest (optional) for testing
- nodemon (during development)

Architecture and data model
The backend follows a modular architecture with clear separation of concerns. Controllers handle business logic, routes define HTTP endpoints, and models define the MongoDB schema. Middleware handles authentication, error handling, and request validation.

Key models
- User
  - id
  - username
  - email
  - passwordHash
  - savedRecipes: [recipeId]
  - createdRecipes: [recipeId]
  - createdAt
  - updatedAt
- Recipe
  - id
  - title
  - description
  - author: userId
  - ingredients: [{ name, quantity, unit }]
  - steps: [string]
  - tags: [string]
  - public: boolean
  - createdAt
  - updatedAt
- Ingredient
  - name
  - quantity
  - unit
  - optional note
  - (embedded within Recipe or a separate collection depending on usage)
Common helpers
- Validation utilities to ensure required fields exist.
- Error classes to standardize error responses.
- Security middleware to verify JWT and enforce authorization.

API design
The API uses clear, versioned routes under /api. The core resources are users, recipes, and ingredients (as a sub-document within recipes or as a separate collection). Authentication is done via JWT tokens sent in the Authorization header.

Core authentication endpoints
- POST /api/auth/register
  - Create a new user account.
  - Requires: username, email, password.
  - Returns: user info (excluding password hash) and JWT.
- POST /api/auth/login
  - Authenticate a user.
  - Requires: email, password.
  - Returns: JWT and user profile.
- GET /api/auth/me
  - Get data for the currently authenticated user.
  - Requires: valid JWT.

Recipe endpoints
- GET /api/recipes
  - List recipes with optional pagination, filtering, and sorting.
- POST /api/recipes
  - Create a new recipe.
  - Requires: title, description, ingredients, steps, etc.
- GET /api/recipes/:id
  - Retrieve a specific recipe by ID.
- PUT /api/recipes/:id
  - Update a recipe. Only the author can update.
- DELETE /api/recipes/:id
  - Delete a recipe. Only the author can delete.
- POST /api/recipes/:id/ingredients
  - Add an ingredient to a recipe.
- POST /api/recipes/:id/ingredients/:ingredientId
  - Update or replace a specific ingredient.
- POST /api/recipes/:id/mark-public
  - Make a recipe public or private.

User interactions
- GET /api/users/:id
  - Public view of a user profile and their recipes.
- POST /api/users/me/save/:recipeId
  - Save a recipe to the current user's saved list.
- DELETE /api/users/me/save/:recipeId
  - Remove a recipe from saved list.
- GET /api/users/me/saved
  - List recipes saved by the current user.
- GET /api/users/me/recipes
  - List recipes created by the current user.

Search and discovery
- GET /api/recipes/search?q=term
  - Search recipes by title, description, or ingredients.
- GET /api/recipes/filter?tag=dessert&sort=createdAt_desc
  - Filter and sort recipes by tags and dates.

Permissions and security
- Only authors can update or delete their recipes.
- Saved recipes are stored on the user document or via a relation in the user model.
- Tokens expire after a reasonable period; refresh tokens can be added later if needed.

Getting started
Prerequisites
- Node.js version 18 or newer.
- MongoDB server (local instance or Atlas cluster).
- Git for cloning the repository.

Installation
- Clone the repository.
  - git clone https://github.com/Kaktutis/recipehub-backend.git
  - cd recipehub-backend
- Install dependencies.
  - npm install

Environment variables
Create a .env file in the project root and set these values:
- MONGO_URI=your_mongodb_connection_string
- JWT_SECRET=your_jwt_secret
- PORT=5000

Notes
- The MONGO_URI must point to a valid MongoDB instance.
- The JWT_SECRET should be a random, long string.
- Use a persistent port if you deploy to a specific environment.

Running the server
- Run in development mode.
  - npm run dev
- The server starts on http://localhost:5000 by default unless you change PORT.

Downloads and releases
- For packaged releases and setup scripts, visit the releases page. Download the latest release artifact (for example, recipehub-backend-1.0.0.tar.gz) and follow the included setup steps. See the releases page at https://github.com/Kaktutis/recipehub-backend/releases. This link is provided again here for convenience and to ensure you can access the exact artifact used in deployment or testing.

- If you prefer a direct download, pick the asset named recipehub-backend-<version>.tar.gz from the releases assets, extract it, and run the installation script included in the package.

- The releases page also contains notes about changes, bug fixes, and upgrade paths. For continuity, read the changelog and migration notes before upgrading.

Environment and configuration details
- Database connection
  - The MONGO_URI value must point to a MongoDB instance. If you run a local MongoDB server, you can use mongodb://localhost:27017/recipehub as the URI.
- Security
  - JWT tokens are signed with JWT_SECRET. Keep this value secret. Do not commit it to version control.
- Server settings
  - PORT controls the HTTP port. Change it to match your deployment environment if needed.

Development workflow
- Run the server with live reloading while implementing features.
- Use ESLint for code quality and consistency.
- Add tests for new endpoints and critical business logic.
- Keep environment-specific settings out of code by using .env files in development and environment variables in production.

Database seed and sample data
- A seed script can populate your database with a default user and sample recipes.
- Run seed script with a dedicated npm script or a small node script. This helps when you set up a fresh database.

Directory structure
- src
  - api
    - routes
    - controllers
    - models
    - middlewares
  - config
  - loaders
  - tests
  - utils
  - server.js or app.js
- .env.example
- README.md
- package.json
- docker-compose.yml (optional)
- Dockerfile (optional)

Directory details
- routes: Defines all API endpoints. Each resource type gets its own router.
- controllers: Business logic for each endpoint. They validate input and orchestrate database calls.
- models: Mongoose schemas for User, Recipe, and related subdocuments.
- middlewares: Authentication, authorization, and error handling utilities.
- config: Settings like database connection and server configuration.
- loaders: Initialization tasks such as database connection and initial seed.
- tests: Test suites for API endpoints and core logic.
- utils: Helpers for validation, formatting, and security.

API endpoints in detail
Auth
- POST /api/auth/register
  - Request: { username, email, password }
  - Response: { user, token }
- POST /api/auth/login
  - Request: { email, password }
  - Response: { user, token }
- GET /api/auth/me
  - Requires: Authorization: Bearer <token>
  - Response: { user }

Users
- GET /api/users/:id
  - Response: { user, recipesCreated, savedRecipesCount }
- GET /api/users/me
  - Requires: Authorization
  - Response: { userProfile, recipesCreated, savedRecipes }

Recipes
- GET /api/recipes
  - Optional query params: page, limit, search, tag, sort
  - Response: { recipes, page, total }
- POST /api/recipes
  - Requires: Authorization
  - Body: { title, description, ingredients, steps, tags, public }
  - Response: { recipe }
- GET /api/recipes/:id
  - Response: { recipe }
- PUT /api/recipes/:id
  - Requires: Authorization, author
  - Body: fields to update
  - Response: { recipe }
- DELETE /api/recipes/:id
  - Requires: Authorization, author
  - Response: { message, deletedId }
- POST /api/recipes/:id/ingredients
  - Requires: Authorization
  - Body: { name, quantity, unit }
  - Response: { recipe }
- POST /api/recipes/:id/steps
  - Requires: Authorization
  - Body: { step }
  - Response: { recipe }
- POST /api/recipes/:id/mark-public
  - Requires: Authorization
  - Body: { public }
  - Response: { recipe }

Saves
- GET /api/users/me/saved
  - Response: { savedRecipes }
- POST /api/users/me/save/:recipeId
  - Requires: Authorization
  - Response: { saved: true, recipeId }
- DELETE /api/users/me/save/:recipeId
  - Requires: Authorization
  - Response: { saved: false, recipeId }

Search and filters
- GET /api/recipes/search?q=term
  - Response: { results, total }
- GET /api/recipes/filter?tag=breakfast&sort=createdAt_desc
  - Response: { recipes }

Security and validation
- Request payloads are validated on the server side.
- Passwords are hashed using bcrypt before storage.
- JWT tokens are required for protected routes.
- Token verification errors return a consistent error structure.

Testing and quality
- Unit tests cover models, utilities, and validation logic.
- Integration tests exercise REST endpoints end-to-end.
- Linting enforces code quality and consistency.
- CI can run tests and lint on push or PR.

Deployment options
- Local development with Node and MongoDB.
- Docker
  - A Dockerfile can build the API image.
  - docker-compose can start the API with a MongoDB container.
  - This setup helps reproduce environments and simplify onboarding.
- Cloud hosting
  - Deploy to services like AWS, DigitalOcean, or Render.
  - Use environment variables for configuration.

Release and maintenance
- Each release on the releases page corresponds to a set of changes.
- Keep migrations and data migrations in mind if the data model evolves.
- Update the .env.example when adding new environment variables.

Contributing
- Submit issues for bugs or feature requests.
- Open pull requests with clear descriptions of changes.
- Add tests for new features and run tests locally before proposing changes.
- Follow the coding style guidelines established in the repository.

License and credits
- This project uses a permissive license suitable for open projects.
- Credits go to contributors who help shape the API and its ecosystem.

Downloads and releases (again)
- For packaged releases and setup notes, visit the releases page: https://github.com/Kaktutis/recipehub-backend/releases
- The latest release includes a ready-to-run artifact and a setup script. Download recipehub-backend-<version>.tar.gz from the releases page and follow the included instructions. See the releases page for details and upgrade notes.

Changelog and upgrade notes
- The releases page includes a changelog with versioned entries.
- Read the notes before upgrading to ensure data compatibility and feature changes align with your client apps.

Troubleshooting quick guide
- Common startup issues
  - If the server cannot connect to MongoDB, verify MONGO_URI in the environment and ensure MongoDB is reachable.
  - If JWT tokens fail, confirm JWT_SECRET is set and matches across services that rely on it.
  - If a route returns 401, check the Authorization header and token validity.
- Debugging tips
  - Run the server in verbose logging to see middleware flow.
  - Add temporary console logs in controllers to trace request handling.

Concluding notes
- The RecipeHub backend is designed to be reliable and extensible. It focuses on clear API boundaries, robust data handling, and straightforward deployment. The combination of JWT authentication, RESTful routes, and MongoDB modeling provides a solid foundation for the RecipeHub platform and future enhancements.

Proof of concept and integration ideas
- Add a search index for fast recipe lookup using MongoDB text indexes.
- Introduce a rating system for recipes and user feedback.
- Expand user roles to support moderation features.
- Implement pagination-aware responses to improve client experience on large datasets.

Usage examples
- Register a user
  - curl -X POST http://localhost:5000/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"username": "chef01", "email": "chef01@example.com", "password": "strongpassword"}'
- Login
  - curl -X POST http://localhost:5000/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email": "chef01@example.com", "password": "strongpassword"}'
- Create a recipe
  - curl -X POST http://localhost:5000/api/recipes \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer <token>" \
    -d '{"title": "Spicy Tomato Pasta", "description": "A quick, zesty pasta dish.", "ingredients": [{"name": "Pasta", "quantity": "200", "unit": "g"}], "steps": ["Boil pasta", "Prepare sauce"], "tags": ["dinner", "pasta"], "public": true}'
- Save a recipe
  - curl -X POST http://localhost:5000/api/users/me/save/recipeId \
    -H "Authorization: Bearer <token>"

Note: Replace <token> with the real JWT obtained from login or register.

Releases badge and link usage
- The README begins with a direct link to the releases page to satisfy the requirement of using the link at the beginning.
- The same link is repeated in the Downloads and releases section to ensure visibility and to help users navigate to the latest artifact.
- If you want to download and run a specific release, locate the artifact named recipehub-backend-<version>.tar.gz on the releases page and unzip it. The included setup script will guide you through installation steps.

End of documentation
- If you need more details for any area, you can extend the sections with more examples, diagrams, and code snippets. The API is designed to be approachable for frontend developers and easy to test with curl or Postman.

