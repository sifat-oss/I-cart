import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';
import { FiShoppingCart, FiUser, FiMenu, FiX, FiLogOut, FiHome, FiShoppingBag, FiHeart, FiStar } from 'react-icons/fi';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalQuantity } = useSelector((state) => state.cart);
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  // Handle scroll effect
  useState(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
  };

  const menuVariants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 0, x: '100%' },
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'glass shadow-premium' : 'bg-white/95 backdrop-blur-md shadow-lg'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Premium Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <FiShoppingBag className="text-white" size={20} />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
            </motion.div>
            <div>
              <span className="text-xl font-bold gradient-text block">I-Cart</span>
              <span className="text-xs text-gray-500 font-medium">Premium Shopping</span>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-2 font-medium"
              >
                <FiHome size={16} />
                <span>Home</span>
              </motion.div>
            </Link>
            <Link to="/categories">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-2 font-medium"
              >
                <FiStar size={16} />
                <span>Categories</span>
              </motion.div>
            </Link>
            <Link to="/shop">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-full text-sm text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-2 font-medium"
              >
                <FiShoppingBag size={16} />
                <span>Shop</span>
              </motion.div>
            </Link>

            {/* Premium Cart Icon */}
            <Link to="/cart">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative ml-4 mr-2"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg hover:shadow-glow transition-all duration-300">
                  <FiShoppingCart size={20} />
                </div>
                {totalQuantity > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shadow-lg"
                  >
                    {totalQuantity}
                  </motion.span>
                )}
              </motion.div>
            </Link>

            {/* Wishlist Icon */}
            <Link to="/wishlist">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="relative"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center text-white shadow-lg hover:shadow-glow transition-all duration-300">
                  <FiHeart size={20} />
                </div>
              </motion.div>
            </Link>

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <Link to="/profile">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 font-medium hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center text-white">
                      <FiUser size={16} />
                    </div>
                    <span>{user?.name || 'Profile'}</span>
                  </motion.div>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogout}
                  className="p-2.5 rounded-full text-red-600 hover:bg-red-50 transition-all duration-300"
                >
                  <FiLogOut size={20} />
                </motion.button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 ml-4 pl-4 border-l border-gray-200">
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2.5 rounded-full font-semibold text-emerald-600 hover:bg-emerald-50 transition-all duration-300"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-primary"
                  >
                    Register
                  </motion.button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsOpen(!isOpen)}
              className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-lg"
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={menuVariants}
              className="md:hidden pb-6 pt-2"
            >
              <div className="flex flex-col space-y-2">
                <Link to="/" onClick={() => setIsOpen(false)}>
                  <div className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-3">
                    <FiHome size={20} />
                    <span className="font-medium">Home</span>
                  </div>
                </Link>
                <Link to="/categories" onClick={() => setIsOpen(false)}>
                  <div className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-3">
                    <FiStar size={20} />
                    <span className="font-medium">Categories</span>
                  </div>
                </Link>
                <Link to="/shop" onClick={() => setIsOpen(false)}>
                  <div className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-3">
                    <FiShoppingBag size={20} />
                    <span className="font-medium">Shop</span>
                  </div>
                </Link>
                <Link to="/cart" onClick={() => setIsOpen(false)}>
                  <div className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-3">
                    <FiShoppingCart size={20} />
                    <span className="font-medium">Cart ({totalQuantity})</span>
                  </div>
                </Link>
                <Link to="/wishlist" onClick={() => setIsOpen(false)}>
                  <div className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-3">
                    <FiHeart size={20} />
                    <span className="font-medium">Wishlist</span>
                  </div>
                </Link>
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" onClick={() => setIsOpen(false)}>
                      <div className="px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-emerald-50 hover:to-teal-50 hover:text-emerald-600 transition-all duration-300 flex items-center space-x-3">
                        <FiUser size={20} />
                        <span className="font-medium">Profile</span>
                      </div>
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-300 flex items-center space-x-3 text-left"
                    >
                      <FiLogOut size={20} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col space-y-2 pt-2">
                    <Link to="/login" onClick={() => setIsOpen(false)}>
                      <button className="w-full px-4 py-3 rounded-xl font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 transition-all duration-300">
                        Login
                      </button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)}>
                      <button className="w-full btn-primary">
                        Register
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
