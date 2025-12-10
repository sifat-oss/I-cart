import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { FiShoppingBag, FiSmartphone, FiHome, FiBook, FiWatch, FiHeadphones } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../animations/pageTransition';

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: <FiSmartphone size={48} />,
      description: 'Latest gadgets and tech',
      itemCount: 156,
      image: 'https://via.placeholder.com/400x300/3b82f6/ffffff?text=Electronics',
      color: 'bg-blue-500',
      products: [
        { name: 'Smartphones', count: 45 },
        { name: 'Laptops', count: 32 },
        { name: 'Tablets', count: 28 },
        { name: 'Cameras', count: 21 },
        { name: 'Accessories', count: 30 },
      ],
    },
    {
      id: 'fashion',
      name: 'Fashion & Clothing',
      icon: <FiShoppingBag size={48} />,
      description: 'Trendy wear for everyone',
      itemCount: 324,
      image: 'https://via.placeholder.com/400x300/ec4899/ffffff?text=Fashion',
      color: 'bg-pink-500',
      products: [
        { name: "Men's Clothing", count: 89 },
        { name: "Women's Clothing", count: 112 },
        { name: 'Shoes', count: 67 },
        { name: 'Accessories', count: 56 },
      ],
    },
    {
      id: 'home',
      name: 'Home & Living',
      icon: <FiHome size={48} />,
      description: 'Everything for your home',
      itemCount: 198,
      image: 'https://via.placeholder.com/400x300/22c55e/ffffff?text=Home+Living',
      color: 'bg-green-500',
      products: [
        { name: 'Furniture', count: 54 },
        { name: 'Kitchen', count: 43 },
        { name: 'Decor', count: 38 },
        { name: 'Bedding', count: 32 },
        { name: 'Storage', count: 31 },
      ],
    },
    {
      id: 'books',
      name: 'Books & Media',
      icon: <FiBook size={48} />,
      description: 'Read, learn, and explore',
      itemCount: 267,
      image: 'https://via.placeholder.com/400x300/f59e0b/ffffff?text=Books',
      color: 'bg-amber-500',
      products: [
        { name: 'Fiction', count: 87 },
        { name: 'Non-Fiction', count: 76 },
        { name: 'Educational', count: 54 },
        { name: 'Comics', count: 50 },
      ],
    },
    {
      id: 'sports',
      name: 'Sports & Fitness',
      icon: <FiWatch size={48} />,
      description: 'Stay fit and active',
      itemCount: 142,
      image: 'https://via.placeholder.com/400x300/14b8a6/ffffff?text=Sports',
      color: 'bg-teal-500',
      products: [
        { name: 'Exercise Equipment', count: 45 },
        { name: 'Sports Gear', count: 38 },
        { name: 'Fitness Trackers', count: 29 },
        { name: 'Sportswear', count: 30 },
      ],
    },
    {
      id: 'audio',
      name: 'Audio & Music',
      icon: <FiHeadphones size={48} />,
      description: 'Premium sound experience',
      itemCount: 89,
      image: 'https://via.placeholder.com/400x300/8b5cf6/ffffff?text=Audio',
      color: 'bg-purple-500',
      products: [
        { name: 'Headphones', count: 32 },
        { name: 'Speakers', count: 25 },
        { name: 'Earbuds', count: 21 },
        { name: 'Accessories', count: 11 },
      ],
    },
  ];

  return (
    <AnimatedWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Browse Categories</h1>
          <p className="text-xl text-gray-600">
            Discover products across all categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={staggerItem}
              whileHover={{ y: -10 }}
              className="card overflow-hidden cursor-pointer"
              onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
            >
              {/* Category Image */}
              <div
                className="h-48 relative overflow-hidden"
                style={{
                  backgroundImage: `url(${category.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-white">{category.icon}</div>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold text-gray-800">{category.name}</h3>
                  <span className={`${category.color} text-white px-3 py-1 rounded-full text-sm font-semibold`}>
                    {category.itemCount}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>

                {/* Subcategories - Expandable */}
                <motion.div
                  initial={false}
                  animate={{
                    height: selectedCategory === category.id ? 'auto' : 0,
                    opacity: selectedCategory === category.id ? 1 : 0,
                  }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-gray-200 pt-4 mt-4">
                    <h4 className="font-semibold text-gray-700 mb-3">Subcategories:</h4>
                    <ul className="space-y-2">
                      {category.products.map((product, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between text-sm text-gray-600 hover:text-primary-green-600 transition-colors"
                        >
                          <span>• {product.name}</span>
                          <span className="text-gray-400">({product.count})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>

                {/* Shop Button */}
                <Link to={`/shop?category=${category.id}`}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-4 btn-primary"
                  >
                    Shop {category.name}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Popular Categories Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 bg-gradient-to-r from-primary-green-500 to-primary-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-lg mb-6">
            Explore our entire collection or use the search feature
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary-green-600 font-bold py-3 px-8 rounded-lg"
              >
                Browse All Products
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatedWrapper>
  );
};

export default Categories;
