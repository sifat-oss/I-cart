import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedWrapper from '../components/AnimatedWrapper';
import ProductCard from '../components/ProductCard';
import { FiShoppingBag, FiTruck, FiShield, FiHeadphones, FiChevronLeft, FiChevronRight, FiAward, FiZap, FiTrendingUp, FiStar } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../animations/pageTransition';

const Home = () => {
  console.log('Home component rendering');
  const [currentSlide, setCurrentSlide] = useState(0);

  const banners = [
    {
      title: 'Premium Collection 2025',
      subtitle: 'Up to 50% OFF on Premium Electronics',
      image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&h=500&fit=crop',
      cta: 'Shop Now',
      link: '/shop',
      gradient: 'from-emerald-600 to-teal-600',
    },
    {
      title: 'New Luxury Arrivals',
      subtitle: 'Discover Latest Premium Trends',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=500&fit=crop',
      cta: 'Explore Collection',
      link: '/shop',
      gradient: 'from-blue-600 to-indigo-600',
    },
    {
      title: 'Free Express Shipping',
      subtitle: 'On Orders Over ৳1000',
      image: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1200&h=500&fit=crop',
      cta: 'Learn More',
      link: '/shop',
      gradient: 'from-purple-600 to-pink-600',
    },
  ];

  const featuredProducts = [
    {
      _id: '1',
      name: 'Wireless Headphones',
      description: 'High-quality wireless headphones with noise cancellation',
      price: 2999,
      originalPrice: 3999,
      image: 'https://via.placeholder.com/300x300?text=Headphones',
      category: 'electronics',
      stock: 15,
    },
    {
      _id: '2',
      name: 'Smart Watch',
      description: 'Feature-rich smartwatch with fitness tracking',
      price: 4999,
      originalPrice: 6999,
      image: 'https://via.placeholder.com/300x300?text=Watch',
      category: 'electronics',
      stock: 8,
    },
    {
      _id: '3',
      name: 'Cotton T-Shirt',
      description: 'Comfortable cotton t-shirt in multiple colors',
      price: 499,
      originalPrice: 799,
      image: 'https://via.placeholder.com/300x300?text=T-Shirt',
      category: 'clothing',
      stock: 25,
    },
    {
      _id: '4',
      name: 'Programming Book',
      description: 'Complete guide to modern web development',
      price: 899,
      image: 'https://via.placeholder.com/300x300?text=Book',
      category: 'books',
      stock: 12,
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const features = [
    {
      icon: <FiAward size={48} />,
      title: 'Premium Quality',
      description: 'Curated selection of top-tier products',
      gradient: 'from-yellow-400 to-amber-600',
    },
    {
      icon: <FiTruck size={48} />,
      title: 'Express Delivery',
      description: 'Lightning-fast shipping worldwide',
      gradient: 'from-emerald-500 to-teal-600',
    },
    {
      icon: <FiShield size={48} />,
      title: 'Secure Checkout',
      description: 'Bank-grade encryption & protection',
      gradient: 'from-blue-500 to-indigo-600',
    },
    {
      icon: <FiHeadphones size={48} />,
      title: 'VIP Support',
      description: 'Dedicated 24/7 premium assistance',
      gradient: 'from-purple-500 to-pink-600',
    },
  ];

  return (
    <AnimatedWrapper>
      {/* Premium Hero Banner Slider */}
      <div className="relative h-[600px] overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7 }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${banners[currentSlide].image})`,
              }}
            >
              <div className={`absolute inset-0 bg-gradient-to-r ${banners[currentSlide].gradient} opacity-80`}></div>
            </div>
            <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="text-white max-w-2xl">
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-6"
                >
                  <FiZap className="text-yellow-300" />
                  <span className="text-sm font-semibold">Limited Time Offer</span>
                </motion.div>
                <motion.h1
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl md:text-5xl font-black mb-4 leading-tight"
                >
                  {banners[currentSlide].title}
                </motion.h1>
                <motion.p
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-lg md:text-xl mb-6 font-light"
                >
                  {banners[currentSlide].subtitle}
                </motion.p>
                <motion.div
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="flex space-x-4"
                >
                  <Link to={banners[currentSlide].link}>
                    <button className="bg-white text-gray-900 font-bold py-3 px-8 rounded-full text-sm shadow-2xl hover:shadow-glow transition-all hover:scale-105 flex items-center space-x-2">
                      <span>{banners[currentSlide].cta}</span>
                      <FiChevronRight />
                    </button>
                  </Link>
                  <Link to="/categories">
                    <button className="border-2 border-white text-white font-bold py-3 px-8 rounded-full text-sm backdrop-blur-md hover:bg-white/20 transition-all hover:scale-105">
                      Browse Categories
                    </button>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Premium Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 glass p-4 rounded-full transition-all hover:scale-110 group"
        >
          <FiChevronLeft size={28} className="text-white group-hover:text-emerald-400 transition-colors" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 glass p-4 rounded-full transition-all hover:scale-110 group"
        >
          <FiChevronRight size={28} className="text-white group-hover:text-emerald-400 transition-colors" />
        </button>

        {/* Premium Slider Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all ${
                index === currentSlide 
                  ? 'bg-white w-12' 
                  : 'bg-white/40 w-8 hover:bg-white/60'
              }`}
            />
          ))}
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 glass-dark">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-gold mb-1">50K+</div>
                <div className="text-white/80 text-xs">Happy Customers</div>
              </div>
              <div className="text-center border-x border-white/20">
                <div className="text-2xl font-bold gradient-text-gold mb-1">10K+</div>
                <div className="text-white/80 text-xs">Premium Products</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold gradient-text-gold mb-1">24/7</div>
                <div className="text-white/80 text-xs">Customer Support</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Features Section */}
      <div className="relative -mt-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                whileHover={{ y: -10, scale: 1.02 }}
                className="glass p-8 text-center rounded-3xl hover:shadow-premium transition-all duration-300 group"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2 text-gray-800 group-hover:text-emerald-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Premium Featured Products */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-2 rounded-full mb-4">
            <FiStar className="text-emerald-600" />
            <span className="text-sm font-semibold text-emerald-600">Premium Selection</span>
          </div>
          <h2 className="text-3xl font-black mb-3">
            <span className="gradient-text">Featured Products</span>
          </h2>
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Handpicked premium items just for you
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {featuredProducts.map((product) => (
            <motion.div key={product._id} variants={staggerItem}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link to="/shop">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-secondary px-8 py-3 text-sm"
            >
              View All Products
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Premium CTA Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-animated"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass-dark p-12 rounded-3xl max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full mb-6">
              <FiTrendingUp className="text-yellow-300" />
              <span className="text-sm font-semibold text-white">Join the Premium Club</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4 text-white">
              Start Your Premium<br />Shopping Experience Today!
            </h2>
            <p className="text-base text-white/90 mb-8 leading-relaxed">
              Join over 50,000 satisfied customers and enjoy exclusive benefits
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-gray-900 font-bold py-3 px-10 rounded-full text-sm shadow-2xl hover:shadow-glow transition-all"
                >
                  Create Free Account
                </motion.button>
              </Link>
              <Link to="/shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white text-white font-bold py-3 px-10 rounded-full text-sm hover:bg-white/20 transition-all"
                >
                  Browse Collections
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default Home;
