import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiEye, FiHeart, FiStar } from 'react-icons/fi';
import { cardHover } from '../animations/pageTransition';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      variants={cardHover}
      initial="rest"
      whileHover="hover"
      className="card overflow-hidden group relative hover-lift"
    >
      {/* Product Image */}
      <div className="relative h-72 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-2xl">
        <img
          src={product.image || 'https://via.placeholder.com/300x300?text=Product'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Overlay Buttons */}
        <div className="absolute inset-0 flex items-center justify-center space-x-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Link to={`/product/${product._id}`}>
            <motion.button
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              className="w-14 h-14 bg-white text-emerald-600 rounded-full shadow-2xl flex items-center justify-center hover:shadow-glow"
            >
              <FiEye size={22} />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.15, rotate: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`w-14 h-14 ${
              product.stock === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-gradient-to-br from-emerald-500 to-teal-600 hover:shadow-glow'
            } text-white rounded-full shadow-2xl flex items-center justify-center`}
          >
            <FiShoppingCart size={22} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.15, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="w-14 h-14 bg-gradient-to-br from-pink-500 to-rose-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:shadow-glow"
          >
            <FiHeart size={22} />
          </motion.button>
        </div>

        {/* Premium Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {discount > 0 && (
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              className="badge-premium bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-lg"
            >
              -{discount}%
            </motion.div>
          )}
          {product.stock <= 5 && product.stock > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="badge-premium bg-gradient-to-r from-yellow-400 to-amber-500 text-white shadow-lg"
            >
              Low Stock
            </motion.div>
          )}
          {product.stock === 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="badge-premium bg-gradient-to-r from-gray-600 to-gray-800 text-white shadow-lg"
            >
              Out of Stock
            </motion.div>
          )}
        </div>

        {/* Premium Star Rating */}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center space-x-1 shadow-lg">
          <FiStar className="text-yellow-500 fill-yellow-500" size={14} />
          <span className="text-sm font-bold text-gray-800">4.5</span>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 border border-emerald-200">
            {product.category}
          </span>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 truncate group-hover:text-emerald-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between mb-3">
          <div className="flex flex-col">
            <span className="text-xl font-bold gradient-text">
              ৳{product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  Save ৳{(product.originalPrice - product.price).toLocaleString()}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Stock Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-gray-600 font-medium">Availability</span>
            <span className={`font-bold ${product.stock > 5 ? 'text-emerald-600' : 'text-yellow-600'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className={`h-full rounded-full ${
                product.stock > 10 
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600' 
                  : product.stock > 0 
                  ? 'bg-gradient-to-r from-yellow-500 to-amber-600'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500'
              }`}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`w-full ${
            product.stock === 0
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'btn-primary'
          } py-2.5 rounded-xl text-xs font-bold shadow-lg flex items-center justify-center space-x-2`}
        >
          <FiShoppingCart size={16} />
          <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
        </motion.button>
      </div>

      {/* Premium Shine Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
    </motion.div>
  );
};

export default ProductCard;
