import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold text-primary-green-500 mb-4">I-Cart</h3>
            <p className="text-gray-400">
              Your trusted e-commerce platform for quality products at the best prices.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-primary-green-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-green-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-primary-green-500 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-primary-green-500 transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-green-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2 text-gray-400">
                <FiMapPin />
                <span>Dhaka, Bangladesh</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FiPhone />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <FiMail />
                <span>support@icart.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-primary-green-600 transition-colors"
              >
                <FiFacebook size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-primary-blue-600 transition-colors"
              >
                <FiTwitter size={20} />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-3 rounded-full hover:bg-pink-600 transition-colors"
              >
                <FiInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} I-Cart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
