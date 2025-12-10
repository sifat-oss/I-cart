import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { FiUser, FiMail, FiPhone, FiPackage } from 'react-icons/fi';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  // Dummy orders data
  const orders = [
    {
      id: '1',
      date: '2024-12-01',
      total: 3099,
      status: 'Delivered',
      items: 3,
    },
    {
      id: '2',
      date: '2024-12-03',
      total: 5499,
      status: 'Processing',
      items: 2,
    },
  ];

  return (
    <AnimatedWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">My Profile</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="card p-6">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-primary-green-100 rounded-full flex items-center justify-center">
                  <FiUser size={48} className="text-primary-green-600" />
                </div>
              </div>

              <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
                {user?.name || 'Guest User'}
              </h2>

              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600">
                  <FiMail className="text-primary-green-600" />
                  <span>{user?.email || 'guest@example.com'}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <FiPhone className="text-primary-green-600" />
                  <span>{user?.phone || '+880 1234-567890'}</span>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-primary mt-6"
              >
                Edit Profile
              </motion.button>
            </div>
          </motion.div>

          {/* Order History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="card p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Order History</h2>

              {orders.length > 0 ? (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <motion.div
                      key={order.id}
                      whileHover={{ scale: 1.01 }}
                      className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary-green-500 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold text-gray-800">
                            Order #{order.id}
                          </p>
                          <p className="text-sm text-gray-600">{order.date}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-2 text-gray-600">
                          <FiPackage />
                          <span>{order.items} items</span>
                        </div>
                        <p className="text-xl font-bold text-primary-green-600">
                          ৳{order.total}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiPackage size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-600">No orders yet</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatedWrapper>
  );
};

export default Profile;
