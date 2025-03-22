# Forever Admin Panel - E-Commerce Management

## Introduction
Welcome to the **Forever Admin Panel**, the centralized management system for the Forever e-commerce platform. This admin panel enables authorized users to manage products, orders, and user authentication efficiently.

## Features
- **Authentication**: Secure login system for admins.
- **Product Management**: Add, update, and remove products.
- **Order Management**: View and manage customer orders.
- **User Management**: Manage admin accounts and authentication.
- **Notifications**: Receive real-time updates on system actions.

---

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/IshantSomani/forever-admin.git
cd forever-admin
```

### 2. Install Dependencies
```sh
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root directory and configure the following:
```sh
VITE_BACKEND_URI=http://localhost:5000/api
```

### 4. Start the Development Server
```sh
npm run dev
```
The admin panel will be available at `http://localhost:5173`.

---

## Folder Structure
```
forever-admin/
│── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Page components (Login, Products, Orders)
│   ├── context/       # Authentication and global state
│   ├── assets/        # Images and icons
│   ├── App.jsx        # Main application file
│── public/            # Static assets
│── package.json       # Project dependencies
│── .env               # Environment configuration
│── vite.config.js     # Vite configuration
```

---

## Authentication & User Management

### 1. Admin Login
**Endpoint:** `POST /users/login`

**Description:** Logs in an admin user.

**Request Example:**
```json
{
  "email": "admin@gmail.com",
  "password": "admin"
}
```

**Response Example:**
```json
{
  "message": "Login successful!",
  "token": "your_admin_token"
}
```

---

## Product Management

### 2. Add a Product
**Endpoint:** `POST /products/add`

**Description:** Adds a new product.

**Request Example:**
```json
{
  "name": "T-Shirt",
  "description": "Cotton T-Shirt",
  "price": 499,
  "category": "mens",
  "subCategory": "topwear",
  "sizes": ["S", "M", "L"],
  "images": ["image1.jpg", "image2.jpg"]
}
```

### 3. Get All Products
**Endpoint:** `GET /products/allProduct`

**Description:** Retrieves all products.

### 4. Remove a Product
**Endpoint:** `DELETE /products/remove/:id`

**Description:** Removes a product by ID.

---

## Order Management

### 5. View All Orders
**Endpoint:** `GET /order/list`

**Description:** Retrieves all customer orders.

### 6. Update Order Status
**Endpoint:** `PUT /order/status`

**Request Example:**
```json
{
  "orderId": "12345",
  "status": "shipped"
}
```

---

## Conclusion
The Forever Admin Panel provides a seamless interface for managing the Forever e-commerce platform. Ensure that only authorized personnel have access to maintain security.

