import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { FiHeart, FiShoppingCart, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

const Wishlist = () => {
  const dispatch = useDispatch();
  const [wishlistItems, setWishlistItems] = useState([
    {
      _id: '1',
      name: 'Wireless Headphones',
      price: 2999,
      originalPrice: 3999,
      image: 'https://via.placeholder.com/200x200?text=Headphones',
      stock: 15,
      category: 'electronics',
    },
    {
      _id: '2',
      name: 'Smart Watch',
      price: 4999,
      originalPrice: 6999,
      image: 'https://via.placeholder.com/200x200?text=Watch',
      stock: 8,
      category: 'electronics',
    },
    {
      _id: '3',
      name: 'Cotton T-Shirt',
      price: 499,
      originalPrice: 799,
      image: 'https://via.placeholder.com/200x200?text=T-Shirt',
      stock: 0,
      category: 'clothing',
    },
  ]);

  const handleRemove = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item._id !== id));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (item) => {
    if (item.stock === 0) {
      toast.error('Product out of stock');
      return;
    }
    dispatch(addToCart(item));
    handleRemove(item._id);
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your wishlist?')) {
      setWishlistItems([]);
      toast.success('Wishlist cleared');
    }
  };

  if (wishlistItems.length === 0) {
    return (
      <AnimatedWrapper>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <FiHeart className="mx-auto text-gray-300 mb-6" size={120} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
            <p className="text-gray-600 mb-8">
              Start adding products you love to your wishlist!
            </p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Continue Shopping
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </AnimatedWrapper>
    );
  }

  return (
    <AnimatedWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">My Wishlist</h1>
            <p className="text-gray-600">{wishlistItems.length} items saved</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleClearAll}
            className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-2"
          >
            <FiTrash2 />
            Clear All
          </motion.button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="card overflow-hidden relative group"
            >
              {/* Remove Button */}
              <button
                onClick={() => handleRemove(item._id)}
                className="absolute top-4 right-4 z-10 bg-white p-2 rounded-full shadow-lg hover:bg-red-50 hover:text-red-600 transition-colors"
              >
                <FiX size={20} />
              </button>

              {/* Out of Stock Badge */}
              {item.stock === 0 && (
                <div className="absolute top-4 left-4 z-10 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Out of Stock
                </div>
              )}

              <Link to={`/product/${item._id}`}>
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </Link>

              <div className="p-6">
                <Link to={`/product/${item._id}`}>
                  <h3 className="text-lg font-bold text-gray-800 mb-2 hover:text-primary-green-600 transition-colors">
                    {item.name}
                  </h3>
                </Link>

                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary-green-600">
                    ৳{item.price}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-gray-400 line-through">
                      ৳{item.originalPrice}
                    </span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAddToCart(item)}
                  disabled={item.stock === 0}
                  className={`w-full ${
                    item.stock === 0
                      ? 'bg-gray-300 cursor-not-allowed'
                      : 'bg-primary-green-600 hover:bg-primary-green-700'
                  } text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors`}
                >
                  <FiShoppingCart />
                  <span>{item.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-primary-blue-50 rounded-2xl p-8 text-center"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Looking for More Products?
          </h2>
          <p className="text-gray-600 mb-6">
            Explore our full collection and discover amazing deals
          </p>
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary"
            >
              Browse Products
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </AnimatedWrapper>
  );
};

export default Wishlist;
