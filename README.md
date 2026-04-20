This project provides a robust backend and frontend structure to manage charitable donations. Users can browse various prize packages, purchase tickets, and participate in "Chinese Auctions" where each ticket serves as an entry into a prize drawing.

## ✨ Key Features
* **Prize Management:** Dynamic display of auction items and prize packages.
* **Donation Flow:** Secure handling of ticket purchases and user contributions.
* **Layered Architecture:** * **DAL (Data Access Layer):** Direct interaction with the database.
    * **BL (Business Logic):** Core auction logic, ticket calculations, and drawing rules.
    * **Routing:** Clean RESTful API endpoints for the frontend.
* **Middleware:** Integrated security, validation, and logging.

## 🛠 Tech Stack
* **Runtime:** Node.js
* **Web Framework:** Express.js
* **Frontend:** HTML, CSS, and JavaScript (served via the `public` folder)
* **Logic:** Asynchronous programming and modular architecture.

## 📂 Project Structure
* `BL/` - Business logic and services.
* `DAL/` - Database schemas and access methods.
* `routing/` - API route definitions.
* `middleware/` - Custom request handlers (Authentication, Error handling).
* `public/` - Static frontend assets.
* `server.js` - Main entry point of the application.

## 🚀 Getting Started

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/Brachi2162/Donation-Campaign-Node.git](https://github.com/Brachi2162/Donation-Campaign-Node.git)
