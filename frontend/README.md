# I-Cart E-Commerce Frontend

A modern, full-featured e-commerce web application built with React, Redux Toolkit, Tailwind CSS, and Framer Motion.

## 🎨 Design Theme

- **Primary Color**: White
- **Secondary Color**: Green (#22c55e)
- **Accent Color**: Blue (#3b82f6)
- **Animations**: Smooth page transitions, hover effects, and interactive elements

## ✨ Features

- 🛍️ **Product Browsing**: Browse products with category filters and search
- 🛒 **Shopping Cart**: Add, remove, and manage cart items with real-time updates
- 👤 **User Authentication**: Login and registration system
- 💳 **Checkout Process**: Complete checkout with shipping and payment options
- 📱 **Responsive Design**: Mobile-first design that works on all devices
- 🎭 **Smooth Animations**: Framer Motion animations throughout the app
- 🎨 **Modern UI**: Clean, intuitive interface with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - API calls
- **React Icons** - Icon library
- **React Hot Toast** - Notifications

### Development
- **Vite** - Build tool and dev server
- **ESLint** - Code linting

## 📁 Project Structure

```
frontend/
├── src/
│   ├── animations/
│   │   └── pageTransition.js      # Animation configurations
│   ├── components/
│   │   ├── AnimatedWrapper.jsx    # Page animation wrapper
│   │   ├── Footer.jsx             # Footer component
│   │   ├── Loader.jsx             # Loading spinner
│   │   ├── Navbar.jsx             # Navigation bar
│   │   ├── ProductCard.jsx        # Product display card
│   │   └── ProtectedRoute.jsx     # Route protection
│   ├── pages/
│   │   ├── AdminDashboard.jsx     # Admin panel (placeholder)
│   │   ├── Cart.jsx               # Shopping cart page
│   │   ├── Checkout.jsx           # Checkout page
│   │   ├── Home.jsx               # Homepage
│   │   ├── Login.jsx              # Login page
│   │   ├── ProductDetails.jsx     # Product details page
│   │   ├── Profile.jsx            # User profile page
│   │   ├── Register.jsx           # Registration page
│   │   └── Shop.jsx               # Shop/Products page
│   ├── redux/
│   │   ├── authSlice.js           # Authentication state
│   │   ├── cartSlice.js           # Cart state management
│   │   ├── productSlice.js        # Product state
│   │   └── store.js               # Redux store configuration
│   ├── services/
│   │   ├── api.js                 # Axios instance and interceptors
│   │   └── authService.js         # Authentication API calls
│   ├── App.jsx                    # Main app component
│   ├── main.jsx                   # App entry point
│   └── index.css                  # Global styles
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Install dependencies:**

```powershell
npm install
```

2. **Create environment file (optional):**

```powershell
Copy-Item .env.example .env
```

Edit `.env` and add your backend API URL:
```
VITE_API_URL=http://localhost:5000/api
```

### Running the Application

1. **Start development server:**

```powershell
npm run dev
```

The app will open automatically at `http://localhost:3000`

2. **Build for production:**

```powershell
npm run build
```

3. **Preview production build:**

```powershell
npm run preview
```

## 🎯 Available Routes

- `/` - Homepage
- `/shop` - Browse all products
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/login` - User login
- `/register` - User registration
- `/profile` - User profile (protected)
- `/admin` - Admin dashboard (protected)

## 🎨 Key Features Explained

### State Management (Redux Toolkit)

The app uses Redux Toolkit for state management with three main slices:

- **authSlice**: Manages user authentication state
- **cartSlice**: Handles shopping cart operations
- **productSlice**: Manages product data and filters

### Animations (Framer Motion)

All pages and components feature smooth animations:

- Page transitions
- Product card hover effects
- Cart slide-in animations
- Button interactions
- Staggered list animations

### Responsive Design

Mobile-first design with Tailwind CSS breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔌 Backend Integration

The frontend is ready to connect to a backend API. Update the `VITE_API_URL` in your `.env` file.

### Expected API Endpoints:

```
POST   /api/auth/register      - User registration
POST   /api/auth/login         - User login
GET    /api/auth/me            - Get current user
PUT    /api/auth/profile       - Update user profile
GET    /api/products           - Get all products
GET    /api/products/:id       - Get product details
POST   /api/orders             - Create order
GET    /api/orders             - Get user orders
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js` to customize the color scheme:

```javascript
colors: {
  primary: {
    green: { ... },
    blue: { ... }
  }
}
```

### Animations

Modify animation settings in `src/animations/pageTransition.js`

## 📝 Demo Mode

The app currently works in demo mode with:
- Dummy product data
- Mock authentication (any credentials work)
- Local state management

Connect to a real backend to enable full functionality.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- React Team
- Redux Toolkit Team
- Tailwind CSS Team
- Framer Motion Team
- All open source contributors

---

**Built with ❤️ by the I-Cart Team**
