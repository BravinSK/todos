# 📝 Todos Application

A modern, full-stack todo list application built with React and Spring Boot, featuring user authentication and real-time task management.

## ✨ Features

- 🔐 **User Authentication** - Secure sign-up and sign-in functionality
- ✅ **Task Management** - Create, read, update, and delete todos
- 💾 **Persistent Storage** - MongoDB database integration
- 🎨 **Modern UI** - Responsive design with Tailwind CSS
- 🔒 **Session Management** - Secure session-based authentication
- 🚀 **RESTful API** - Clean and well-structured backend API

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - UI library
- **React Router 6** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Beautiful hand-crafted SVG icons

### Backend
- **Spring Boot 3.2.1** - Java framework
- **Spring Security** - Authentication and authorization
- **Spring Data MongoDB** - Database integration
- **MongoDB** - NoSQL database
- **Lombok** - Reduce boilerplate code
- **Maven** - Dependency management

## 📋 Prerequisites

Before running this application, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **Java JDK** (v17 or higher)
- **MongoDB** (v4.4 or higher)
- **Maven** (v3.6 or higher)

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/BravinSK/todos.git
cd todos
```

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Ensure MongoDB is running:**
   ```bash
   # Start MongoDB service
   mongod
   ```

3. **Configure application properties:**
   
   Update `src/main/resources/application.properties` if needed:
   ```properties
   spring.data.mongodb.host=localhost
   spring.data.mongodb.port=27017
   spring.data.mongodb.database=todosdb
   server.port=8081
   ```

4. **Build and run the backend:**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   The backend server will start on `http://localhost:8081`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

   The frontend application will open at `http://localhost:3000`

## 📁 Project Structure

```
todos/
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/todos/
│   │       │   ├── controller/      # REST controllers
│   │       │   ├── service/         # Business logic
│   │       │   ├── repository/      # Database access
│   │       │   ├── model/           # Entity classes
│   │       │   ├── dto/             # Data transfer objects
│   │       │   ├── security/        # Security configuration
│   │       │   └── config/          # Application configuration
│   │       └── resources/
│   │           └── application.properties
│   └── pom.xml
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Auth.js          # Authentication component
    │   │   ├── Landing.js       # Landing page
    │   │   └── TodoList.js      # Todo list component
    │   ├── services/
    │   │   └── api.js           # API service
    │   ├── App.js
    │   └── index.js
    └── package.json
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Todos
- `GET /api/todos` - Get all todos for authenticated user
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/{id}` - Update a todo
- `DELETE /api/todos/{id}` - Delete a todo

## 🎯 Usage

1. **Sign Up**: Create a new account with username and password
2. **Sign In**: Log in with your credentials
3. **Create Todos**: Add new tasks to your list
4. **Manage Tasks**: Mark tasks as complete or incomplete
5. **Delete Tasks**: Remove completed or unwanted tasks

## 🔧 Configuration

### Backend Port
Default: `8081`
Change in `application.properties`:
```properties
server.port=YOUR_PORT
```

### Frontend API URL
Update in `frontend/src/services/api.js`:
```javascript
const API_BASE_URL = 'http://localhost:8081/api';
```

### MongoDB Connection
Configure in `application.properties`:
```properties
spring.data.mongodb.host=YOUR_HOST
spring.data.mongodb.port=YOUR_PORT
spring.data.mongodb.database=YOUR_DATABASE
```

## 🏗️ Building for Production

### Backend
```bash
cd backend
mvn clean package
java -jar target/todos-backend-1.0.0.jar
```

### Frontend
```bash
cd frontend
npm run build
```

The optimized build will be in the `frontend/build` directory.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**BravinSK**
- GitHub: [@BravinSK](https://github.com/BravinSK)

## 🙏 Acknowledgments

- Spring Boot team for the excellent framework
- React team for the powerful UI library
- MongoDB for the flexible database solution
- Tailwind CSS for the utility-first styling approach

---

⭐ If you found this project helpful, please consider giving it a star!
