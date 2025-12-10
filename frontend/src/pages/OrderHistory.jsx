import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { FiPackage, FiTruck, FiCheckCircle, FiClock, FiEye } from 'react-icons/fi';

const OrderHistory = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 7998,
      items: [
        {
          name: 'Wireless Headphones',
          price: 2999,
          quantity: 2,
          image: 'https://via.placeholder.com/80x80?text=Headphones',
        },
        {
          name: 'Smart Watch',
          price: 2000,
          quantity: 1,
          image: 'https://via.placeholder.com/80x80?text=Watch',
        },
      ],
      shipping: {
        name: 'John Doe',
        address: '123 Main Street, Dhaka',
        phone: '+880 1234-567890',
      },
      tracking: 'TRK123456789',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-01-18',
      status: 'shipped',
      total: 4999,
      items: [
        {
          name: 'Cotton T-Shirt',
          price: 499,
          quantity: 3,
          image: 'https://via.placeholder.com/80x80?text=T-Shirt',
        },
        {
          name: 'Programming Book',
          price: 899,
          quantity: 4,
          image: 'https://via.placeholder.com/80x80?text=Book',
        },
      ],
      shipping: {
        name: 'John Doe',
        address: '123 Main Street, Dhaka',
        phone: '+880 1234-567890',
      },
      tracking: 'TRK987654321',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-01-20',
      status: 'processing',
      total: 2999,
      items: [
        {
          name: 'Wireless Mouse',
          price: 999,
          quantity: 1,
          image: 'https://via.placeholder.com/80x80?text=Mouse',
        },
        {
          name: 'USB Cable',
          price: 199,
          quantity: 10,
          image: 'https://via.placeholder.com/80x80?text=Cable',
        },
      ],
      shipping: {
        name: 'John Doe',
        address: '123 Main Street, Dhaka',
        phone: '+880 1234-567890',
      },
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'shipped':
        return 'bg-blue-100 text-blue-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FiCheckCircle size={20} />;
      case 'shipped':
        return <FiTruck size={20} />;
      case 'processing':
        return <FiClock size={20} />;
      default:
        return <FiPackage size={20} />;
    }
  };

  return (
    <AnimatedWrapper>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Order History</h1>
          <p className="text-gray-600">Track and manage your orders</p>
        </motion.div>

        <div className="space-y-6">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 p-6 border-b border-gray-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-6">
                    <div>
                      <p className="text-sm text-gray-600">Order ID</p>
                      <p className="font-bold text-gray-800">{order.id}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold text-gray-800">{order.date}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total</p>
                      <p className="font-bold text-primary-green-600">৳{order.total}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`${getStatusColor(
                        order.status
                      )} px-4 py-2 rounded-full font-semibold flex items-center gap-2 capitalize`}
                    >
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setSelectedOrder(selectedOrder === order.id ? null : order.id)
                      }
                      className="text-primary-blue-600 hover:text-primary-blue-700 font-semibold flex items-center gap-2"
                    >
                      <FiEye />
                      {selectedOrder === order.id ? 'Hide' : 'View'} Details
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Order Items Preview */}
              <div className="p-6">
                <div className="flex flex-wrap gap-4">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{item.name}</p>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ৳{item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Expanded Details */}
              {selectedOrder === order.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="border-t border-gray-200"
                >
                  <div className="p-6 bg-gray-50 grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-bold text-gray-800 mb-3">Shipping Address</h3>
                      <p className="text-gray-600">{order.shipping.name}</p>
                      <p className="text-gray-600">{order.shipping.address}</p>
                      <p className="text-gray-600">{order.shipping.phone}</p>
                    </div>
                    {order.tracking && (
                      <div>
                        <h3 className="font-bold text-gray-800 mb-3">Tracking Information</h3>
                        <p className="text-gray-600 mb-2">Tracking #: {order.tracking}</p>
                        <Link to={`/track/${order.tracking}`}>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-outline"
                          >
                            Track Shipment
                          </motion.button>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {orders.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <FiPackage className="mx-auto text-gray-300 mb-6" size={120} />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">No Orders Yet</h2>
            <p className="text-gray-600 mb-8">Start shopping to see your order history</p>
            <Link to="/shop">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
              >
                Start Shopping
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </AnimatedWrapper>
  );
};

export default OrderHistory;
