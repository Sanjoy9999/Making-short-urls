# 🚀 Short URL

A simple and modern URL shortener built with Node.js, Express, MongoDB, and EJS. 🔗✨

## ✨ Features
- 🔒 User authentication (signup, login, logout)
- 🛡️ Role-based access (Admin & Normal users)
- ✂️ Shorten long URLs to unique short links
- 📊 Track number of clicks for each short URL
- 🧑‍💼 Admin dashboard to view all users and their URLs
- 💻 Responsive and modern UI with EJS templates

## 🛠️ Tech Stack
- Node.js
- Express.js
- MongoDB (Mongoose)
- EJS (Embedded JavaScript templates)
- JWT for authentication
- Cookie-based sessions

## 🚦 Getting Started

### 📋 Prerequisites
- Node.js (v16+ recommended)
- MongoDB instance (local or cloud)

### ⚡ Installation
1. 🌀 Clone the repository:
   ```
   git clone <repo-url>
   cd short-url
   ```
2. 📦 Install dependencies:
   ```
   npm install
   ```
3. 📝 Create a `.env` file in the root directory and add:
   ```
   MONGODB_URL=<your-mongodb-connection-string>
   PORT=8001
   ```
4. ▶️ Start the server:
   ```
   npm start
   ```
5. 🌐 Visit [http://localhost:8001](http://localhost:8001) in your browser.

## 🎉 Usage
- 📝 **Sign Up:** Create a new account.
- 🔑 **Login:** Access your dashboard to shorten URLs.
- ✂️ **Shorten URL:** Enter a long URL to generate a short link.
- 📈 **Analytics:** View click statistics for your URLs.
- 🧑‍💼 **Admin:** Log in as an admin to view all users and their URLs.

## 📁 Folder Structure
- `controllers/` - Route handlers for user and URL logic
- `db/` - Database connection logic
- `middlewares/` - Authentication and authorization middleware
- `models/` - Mongoose models for User and URL
- `routes/` - Express route definitions
- `service/` - JWT authentication service
- `views/` - EJS templates for UI

## 📄 License
This project is licensed under the ISC License.

---

👨‍💻 Made with ❤️ by Sanjoy Kumar Maity




