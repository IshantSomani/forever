# Forever - E-Commerce Platform

## Introduction
**Forever** is a full-stack e-commerce platform that provides a seamless online shopping experience. It includes a user-friendly client application for customers, an admin panel for managing products and orders, and a robust backend to handle authentication, payments, and order processing.

## Features
- **User Authentication**: Secure login and registration.
- **Product Management**: Browse, search, and filter products.
- **Cart & Order Management**: Add products to the cart, place orders, and track order status.
- **Admin Panel**: Manage products, view and process orders.
- **Payment Integration**: Secure payments via Stripe.
- **Responsive UI**: Fully responsive design for optimal user experience.

---

## Tech Stack
### Frontend (Client Application)
- **React.js**: UI development.
- **TailwindCSS**: Styling.
- **React Router**: Navigation.
- **Axios**: API communication.
- **React Toastify**: Notifications.

### Backend
- **Node.js** & **Express.js**: Server-side framework.
- **MongoDB**: Database.
- **Mongoose**: ODM for MongoDB.
- **JWT**: Authentication.
- **Cloudinary**: Image storage.
- **Stripe**: Payment processing.

### Admin Panel
- **React.js**: UI.
- **Axios**: API calls.
- **React Toastify**: Notifications.

---

## Installation & Setup

### 1. Clone the Repository
```sh
git clone https://github.com/IshantSomani/forever.git
cd forever
```

### 2. Install Dependencies
```sh
cd ../forever-client && npm install
cd ../forever-admin && npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in both `admin/` and `client/` directories with the following:
#### Client:
```sh
VITE_BACKEND_URI=http://localhost:5000/api
```
#### Admin Panel:
```sh
VITE_BACKEND_URI=http://localhost:5000/api
```

### 4. Start the Applications
#### Client:
```sh
cd forever-client
npm run dev
```
#### Admin Panel:
```sh
cd forever-admin
npm run dev
```

---

## API Endpoints Overview

### Authentication
- **`POST /users/register`** - Register a new user.
- **`POST /users/login`** - Login a user.

### Products
- **`GET /products/allProduct`** - Get all products.
- **`GET /products/single/:id`** - Get a single product by ID.

### Cart
- **`POST /cart/addItem`** - Add an item to the cart.
- **`DELETE /cart/removeItem`** - Remove an item from the cart.
- **`GET /cart/getCart`** - Retrieve the user's cart.

### Orders
- **`POST /order/place`** - Place an order.
- **`GET /order/userOrders`** - Retrieve user orders.
- **`PUT /order/status`** - Update order status (Admin).

---

## Deployment

### 1. Build the Projects
```sh
cd forever-client && npm run build
cd ../forever-admin && npm run build
```

### 2. Deploy Backend
Upload the backend code to a Node.js server or deploy using services like **Heroku, AWS, or DigitalOcean**.

### 3. Deploy Client & Admin Panel
Upload the `dist/` folder from the **client** and **admin** directories to hosting services like **Vercel, Netlify, or Firebase Hosting**.

---

## Conclusion
Forever is a powerful and scalable e-commerce platform designed for a smooth online shopping experience. With robust authentication, seamless order management, and a modern UI, it provides everything needed for an efficient e-commerce business.

---

## License
This project is licensed under the **MIT License**.