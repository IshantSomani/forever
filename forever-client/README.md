# Forever E-Commerce - Client Application

## Introduction
Welcome to **Forever**, a modern e-commerce web application that provides users with a seamless shopping experience. This documentation covers the setup, features, and API endpoints for the client-side of the Forever e-commerce platform.

## Features
- **User Authentication**: Secure login and registration.
- **Product Browsing**: Browse and search products across multiple categories.
- **Cart Management**: Add, remove, and update products in the shopping cart.
- **Order Processing**: Place orders and track their status.
- **Secure Payments**: Integrated payment gateways.

---

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/IshantSomani/forever-client.git
cd forever-client
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
The client application will be available at `http://localhost:5173`.

---

## Folder Structure
```
forever-client/
│── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Main pages (Home, Product, Cart, Orders)
│   ├── context/       # Global state management (ShopContext)
│   ├── assets/        # Images and icons
│   ├── App.jsx        # Main application file
│── public/            # Static assets
│── package.json       # Project dependencies
│── .env               # Environment configuration
│── vite.config.js     # Vite configuration
```

---

## Authentication & User Management

### 1. User Login
**Endpoint:** `POST /users/login`

**Description:** Logs in an existing user.

**Request Example:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response Example:**
```json
{
  "message": "Login successful!",
  "token": "your_jwt_token"
}
```

---

## Product Management

### 2. Get All Products
**Endpoint:** `GET /products/allProduct`

**Description:** Retrieves all available products.

### 3. Get Single Product
**Endpoint:** `GET /products/single/:id`

**Description:** Retrieves a single product by ID.

---

## Cart Management

### 4. Add Item to Cart
**Endpoint:** `POST /cart/addItem`

**Description:** Adds an item to the user's cart.

**Request Example:**
```json
{
  "productId": "1",
  "size": "M"
}
```

### 5. Remove Item from Cart
**Endpoint:** `DELETE /cart/removeItem`

**Description:** Removes an item from the user's cart.

---

## Order Management

### 6. Place an Order
**Endpoint:** `POST /order/place`

**Description:** Places an order using the current cart.

### 7. View User Orders
**Endpoint:** `GET /order/userOrders`

**Description:** Retrieves the authenticated user's orders.

---

## Conclusion
The Forever client application provides a fast and user-friendly e-commerce experience. Ensure that proper security measures are implemented when handling user data and transactions.

