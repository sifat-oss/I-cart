import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import AnimatedWrapper from '../components/AnimatedWrapper';
import Loader from '../components/Loader';
import { FiShoppingCart, FiMinus, FiPlus } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Mock images for gallery
  const productImages = [
    'https://via.placeholder.com/600x600?text=Headphones+View+1',
    'https://via.placeholder.com/600x600?text=Headphones+View+2',
    'https://via.placeholder.com/600x600?text=Headphones+View+3',
  ];

  // Mock reviews
  const reviews = [
    {
      id: 1,
      userName: 'John Doe',
      rating: 5,
      date: '2024-01-15',
      comment: 'Excellent product! Highly recommended. The quality exceeded my expectations and the sound is crystal clear.',
    },
    {
      id: 2,
      userName: 'Jane Smith',
      rating: 4,
      date: '2024-01-10',
      comment: 'Good value for money. Fast delivery and great customer service. Only minor issue is the charging cable could be longer.',
    },
    {
      id: 3,
      userName: 'Mike Johnson',
      rating: 5,
      date: '2024-01-05',
      comment: 'Amazing quality and perfect fit. Will definitely buy again! The noise cancellation works perfectly.',
    },
    {
      id: 4,
      userName: 'Sarah Williams',
      rating: 4,
      date: '2024-01-01',
      comment: 'Very comfortable for long listening sessions. Battery life is impressive as advertised.',
    },
  ];

  useEffect(() => {
    // Fetch product details (replace with API call)
    const dummyProduct = {
      _id: id,
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with active noise cancellation. Features include 30-hour battery life, comfortable ear cushions, and crystal-clear sound quality. Perfect for music lovers and professionals alike.',
      price: 2999,
      originalPrice: 3999,
      image: 'https://via.placeholder.com/600x600?text=Headphones',
      category: 'electronics',
      stock: 15,
      features: [
        'Active Noise Cancellation',
        '30-hour Battery Life',
        'Bluetooth 5.0',
        'Premium Sound Quality',
        'Comfortable Design',
      ],
    };

    setTimeout(() => {
      setProduct(dummyProduct);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCart(product));
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleMouseMove = (e) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  const calculateAverageRating = () => {
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <AnimatedWrapper>
        <Loader />
      </AnimatedWrapper>
    );
  }

  if (!product) {
    return (
      <AnimatedWrapper>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Product not found</h2>
        </div>
      </AnimatedWrapper>
    );
  }

  return (
    <AnimatedWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image with Zoom and Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Main Image with Zoom */}
            <div
              className="relative overflow-hidden rounded-lg bg-gray-100 aspect-square cursor-zoom-in"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <motion.img
                src={productImages[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
                style={{
                  transform: isZoomed ? 'scale(2)' : 'scale(1)',
                  transformOrigin: `${mousePosition.x}% ${mousePosition.y}%`,
                }}
                transition={{ duration: 0.1 }}
              />
              {isZoomed && (
                <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded text-sm">
                  Zoomed In
                </div>
              )}
            </div>

            {/* Image Thumbnails */}
            <div className="flex gap-2">
              {productImages.map((img, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? 'border-primary-green-600 shadow-lg'
                      : 'border-gray-300'
                  }`}
                >
                  <img
                    src={img}
                    alt={`View ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                {product.name}
              </h1>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded capitalize">
                {product.category}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-primary-green-600">
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Features */}
            {product.features && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <span className="text-primary-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Stock Status */}
            <div>
              {product.stock > 0 ? (
                <p className="text-primary-green-600 font-semibold">
                  In Stock ({product.stock} available)
                </p>
              ) : (
                <p className="text-red-600 font-semibold">Out of Stock</p>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700 font-semibold">Quantity:</span>
                <div className="flex items-center border-2 border-gray-300 rounded-lg">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <FiMinus />
                  </button>
                  <span className="px-6 font-semibold">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 hover:bg-gray-100 transition-colors"
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`w-full ${
                product.stock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-primary-green-600 hover:bg-primary-green-700'
              } text-white font-bold py-4 rounded-lg flex items-center justify-center space-x-2 transition-colors`}
            >
              <FiShoppingCart size={20} />
              <span>Add to Cart</span>
            </motion.button>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <div className="border-t border-gray-200 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-800">Customer Reviews</h2>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(5)}</div>
                  <span className="text-2xl font-bold text-gray-800">{calculateAverageRating()}</span>
                </div>
                <span className="text-gray-600">({reviews.length} reviews)</span>
              </div>
            </div>

            <div className="space-y-6">
              {reviews.map((review) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-lg">{review.userName}</h4>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <div className="flex">{renderStars(review.rating)}</div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                </motion.div>
              ))}
            </div>

            {/* Add Review Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 btn-outline w-full md:w-auto"
            >
              Write a Review
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatedWrapper>
  );
};

export default ProductDetails;
