import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedWrapper from '../components/AnimatedWrapper';
import ProductCard from '../components/ProductCard';
import Loader from '../components/Loader';
import { FiSearch } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../animations/pageTransition';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [maxPrice, setMaxPrice] = useState(10000);

  const categories = ['all', 'electronics', 'clothing', 'books', 'home', 'sports'];

  // Dummy products (replace with API call)
  useEffect(() => {
    const dummyProducts = [
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
      {
        _id: '5',
        name: 'Table Lamp',
        description: 'Modern LED table lamp with adjustable brightness',
        price: 1299,
        image: 'https://via.placeholder.com/300x300?text=Lamp',
        category: 'home',
        stock: 3,
      },
      {
        _id: '6',
        name: 'Yoga Mat',
        description: 'Non-slip yoga mat for exercise and meditation',
        price: 799,
        image: 'https://via.placeholder.com/300x300?text=Yoga+Mat',
        category: 'sports',
        stock: 0,
      },
    ];

    setTimeout(() => {
      setProducts(dummyProducts);
      setFilteredProducts(dummyProducts);
      const max = Math.max(...dummyProducts.map(p => p.price));
      setMaxPrice(max);
      setPriceRange([0, max]);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchTerm, priceRange, products]);

  if (loading) {
    return (
      <AnimatedWrapper>
        <Loader />
      </AnimatedWrapper>
    );
  }

  return (
    <AnimatedWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Shop</h1>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-primary-green-500"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold capitalize transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Price Range Filter */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold text-gray-700 mb-3">Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}</h3>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[0]}
                onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                className="flex-1"
              />
              <input
                type="range"
                min="0"
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>৳0</span>
              <span>৳{maxPrice}</span>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-4">
          <p className="text-gray-600">
            Showing <span className="font-semibold">{filteredProducts.length}</span> products
          </p>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product) => (
              <motion.div key={product._id} variants={staggerItem}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </AnimatedWrapper>
  );
};

export default Shop;
