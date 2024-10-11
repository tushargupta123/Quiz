# Online Quiz Application

This project is a RESTful API built with Node.js and Express.js to support an online quiz application. It includes user authentication, quiz management, and submission functionality for multiple-choice quizzes.

## Project Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/online-quiz-app.git
   cd online-quiz-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file and add the following environment variables:
   ```plaintext
   PORT=3000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. Start the server:
   ```bash
   npm start
   ```

The server will run on `http://localhost:3000`.

## API Endpoints

### 1. **User Authentication**
#### Register a new user
- **Endpoint**: `POST /auth/signup`
- **Description**: Registers a new user.
- **Request Body**:
  ```json
  {
    "username": "exampleUser",
    "password": "examplePass"
  }
  ```
- **Response**:
  - **201 Created**: `{ "token": "<jwt_token>" }`
  - **403 Conflict**: `{ "message": "Username already exists" }`

#### Login
- **Endpoint**: `POST /auth/login`
- **Description**: Logs in an existing user.
- **Request Body**:
  ```json
  {
    "username": "exampleUser",
    "password": "examplePass"
  }
  ```
- **Response**:
  - **200 OK**: `{ "token": "<jwt_token>" }`
  - **400 Bad Request**: `{ "message": "Invalid credentials" }`

### 2. **Quiz Management**
#### Create a Quiz
- **Endpoint**: `POST /quiz/create`
- **Description**: Creates a new quiz. Requires authentication.
- **Headers**:
  - `Authorization: <your_token>`
- **Request Body**:
  ```json
  {
    "title": "General Knowledge Quiz",
    "questions": [
      {
        "questionText": "What is the capital of France?",
        "options": ["Berlin", "Madrid", "Paris", "Rome"],
        "correctAnswer": 2
      },
      {
        "questionText": "Which planet is known as the Red Planet?",
        "options": ["Earth", "Mars", "Jupiter", "Saturn"],
        "correctAnswer": 1
      }
    ]
  }
  ```
- **Response**:
  - **201 Created**: Returns the created quiz object.
  - **401 Unauthorized**: `{ "message": "Access denied" }`

#### Get All Quizzes
- **Endpoint**: `GET /quiz`
- **Description**: Retrieves all quizzes. Requires authentication.
- **Headers**:
  - `Authorization: <your_token>`
- **Response**:
  - **200 OK**: Returns an array of quizzes.
  - **401 Unauthorized**: `{ "message": "Access denied" }`

#### Get Quiz by ID
- **Endpoint**: `GET /quiz/:id`
- **Description**: Retrieves a specific quiz by its ID. Requires authentication.
- **Headers**:
  - `Authorization: <your_token>`
- **Response**:
  - **200 OK**: Returns the quiz object with all questions.
  - **404 Not Found**: `{ "message": "Quiz not found" }`
  - **401 Unauthorized**: `{ "message": "Access denied" }`

#### Submit Quiz
- **Endpoint**: `POST /quiz/:id/submit`
- **Description**: Submits answers to a quiz and returns the score. Requires authentication.
- **Headers**:
  - `Authorization: <your_token>`
- **Request Body**:
  ```json
  {
    "answers": [2, 1] // Array of selected answer indices for each question
  }
  ```
- **Response**:
  - **200 OK**: `{ "score": 2, "total": 2 }`
  - **404 Not Found**: `{ "message": "Quiz not found" }`
  - **401 Unauthorized**: `{ "message": "Access denied" }`

## Example Workflow

1. **Register a User**: Send a `POST` request to `/auth/signup` to create a new user.
2. **Login**: Send a `POST` request to `/auth/login` to obtain a JWT token.
3. **Create a Quiz**: Use the token in the `Authorization` header for a `POST` request to `/quiz/create` to add a quiz.
4. **Get All Quizzes**: Send a `GET` request to `/quiz` to retrieve all available quizzes.
5. **Get Quiz by ID**: Use `GET /quiz/:id` to view a specific quiz and its questions.
6. **Submit Quiz**: Send a `POST` request to `/quiz/:id/submit` with your answers to receive a score.

## Project Flow

1. **User Authentication**: Register and log in to receive a JWT token, which secures each request.
2. **Quiz Creation**: Authenticated users can create quizzes with multiple-choice questions.
3. **Quiz Retrieval**: Users can view a list of available quizzes or fetch details of a specific quiz by ID.
4. **Quiz Submission**: Users submit their answers for grading, receiving a score based on correct answers.

## Error Handling

- **401 Unauthorized**: Returned when the JWT token is missing or invalid.
- **404 Not Found**: Returned when a resource (e.g., quiz) is not found.
- **403 Conflict**: Returned during registration if the username already exists.
  
## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for managing API routes.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Tokens for secure user authentication.
- **bcrypt.js**: Library for password hashing.