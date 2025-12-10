# I-Cart Backend API

E-commerce backend API built with Node.js, Express, and MongoDB.

## Features

- **Authentication & Authorization** - JWT-based authentication with role-based access control
- **User Management** - User registration, login, profile management
- **Product Management** - CRUD operations for products with search, filter, and pagination
- **Category Management** - Organize products into categories
- **Shopping Cart** - Add/remove items, update quantities
- **Wishlist** - Save favorite products
- **Order Management** - Create orders, track status, order history
- **Reviews & Ratings** - Product reviews with verified purchase badges
- **File Upload** - Image upload functionality
- **Security** - Helmet, rate limiting, CORS protection
- **Performance** - Compression, optimized database queries

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Multer** - File uploads
- **Express Validator** - Input validation

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/icart
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:3000
   ```

4. **Start MongoDB**
   ```bash
   # If using local MongoDB
   mongod
   ```

5. **Seed Database (Optional)**
   ```bash
   npm run seed
   ```
   
   To destroy data:
   ```bash
   npm run seed -- -d
   ```

6. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

The server will start on `http://localhost:5000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `POST /api/auth/logout` - Logout user

### Users
- `GET /api/users` - Get all users (Admin)
- `GET /api/users/:id` - Get user by ID (Admin)
- `PUT /api/users/profile` - Update user profile
- `DELETE /api/users/:id` - Delete user (Admin)

### Products
- `GET /api/products` - Get all products (with filters)
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `POST /api/categories` - Create category (Admin)
- `PUT /api/categories/:id` - Update category (Admin)
- `DELETE /api/categories/:id` - Delete category (Admin)

### Cart
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update cart item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear cart

### Wishlist
- `GET /api/wishlist` - Get user wishlist
- `POST /api/wishlist/:productId` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/myorders` - Get user orders
- `GET /api/orders/:id` - Get order by ID
- `GET /api/orders` - Get all orders (Admin)
- `PUT /api/orders/:id/status` - Update order status (Admin)

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Upload
- `POST /api/upload` - Upload single image
- `POST /api/upload/multiple` - Upload multiple images

## Query Parameters

### Products
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `category` - Filter by category ID
- `search` - Search in name, description, tags
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `sort` - Sort by: price-asc, price-desc, newest, rating

Example: `/api/products?page=1&limit=12&category=123&minPrice=500&maxPrice=5000&sort=price-asc`

## Authentication

Protected routes require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Or in cookies:
```
Cookie: token=<token>
```

## Error Handling

The API uses consistent error response format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": [] // Optional validation errors
}
```

## Success Response Format

```json
{
  "success": true,
  "message": "Success message",
  "data": {} // Response data
}
```

## Default Users (After Seeding)

**Admin:**
- Email: admin@icart.com
- Password: admin123

**User:**
- Email: john@example.com
- Password: 123456

## Project Structure

```
backend/
├── config/
│   └── db.js              # Database connection
├── controllers/           # Request handlers
│   ├── authController.js
│   ├── productController.js
│   ├── orderController.js
│   └── ...
├── middleware/           # Custom middleware
│   ├── auth.js
│   ├── errorHandler.js
│   └── validation.js
├── models/              # Mongoose models
│   ├── User.js
│   ├── Product.js
│   ├── Order.js
│   └── ...
├── routes/             # API routes
│   ├── authRoutes.js
│   ├── productRoutes.js
│   └── ...
├── scripts/           # Utility scripts
│   └── seedData.js
├── uploads/          # Uploaded files
├── .env             # Environment variables
├── .env.example     # Environment template
├── .gitignore
├── package.json
├── README.md
└── server.js       # Entry point
```

## Security Features

- Password hashing with bcrypt
- JWT authentication
- HTTP headers security (Helmet)
- Rate limiting
- CORS protection
- Input validation
- SQL injection prevention (NoSQL)

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

ISC
