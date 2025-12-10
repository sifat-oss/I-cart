# I-cart E-commerce Application

A premium full-stack e-commerce application with modern UI and complete backend functionality.

## 🚀 Features

- Premium glass-morphism UI design
- User authentication (JWT)
- Product management
- Shopping cart & wishlist
- Order management
- Admin dashboard
- Responsive design

## 🛠️ Tech Stack

**Frontend:**
- React 18
- Vite
- Tailwind CSS
- Redux Toolkit
- Framer Motion

**Backend:**
- Node.js
- Express
- MongoDB
- JWT Authentication
- Bcrypt

## 📦 Installation

### Backend
```bash
cd backend
npm install
```

Create `.env` file:
```env
PORT=5001
NODE_ENV=production
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
FRONTEND_URL=your_frontend_url
```

Start backend:
```bash
npm start
# or for development
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 🌐 Deployment

- Backend: Deployed on Render
- Frontend: Deployed on Vercel
- Database: MongoDB Atlas

## 📝 License

MIT
