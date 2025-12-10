import { motion } from 'framer-motion';
import AnimatedWrapper from '../components/AnimatedWrapper';
import { FiAward, FiUsers, FiTruck, FiHeart } from 'react-icons/fi';
import { staggerContainer, staggerItem } from '../animations/pageTransition';

const About = () => {
  const stats = [
    { label: 'Happy Customers', value: '50K+', icon: <FiUsers size={32} /> },
    { label: 'Products Available', value: '10K+', icon: <FiAward size={32} /> },
    { label: 'Daily Orders', value: '500+', icon: <FiTruck size={32} /> },
    { label: 'Years Experience', value: '5+', icon: <FiHeart size={32} /> },
  ];

  const team = [
    {
      name: 'John Smith',
      role: 'CEO & Founder',
      image: 'https://via.placeholder.com/200x200?text=John',
      bio: 'Visionary leader with 10+ years in e-commerce',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://via.placeholder.com/200x200?text=Sarah',
      bio: 'Expert in supply chain and logistics',
    },
    {
      name: 'Mike Chen',
      role: 'Tech Lead',
      image: 'https://via.placeholder.com/200x200?text=Mike',
      bio: 'Building scalable platforms for growth',
    },
    {
      name: 'Emily Davis',
      role: 'Customer Success',
      image: 'https://via.placeholder.com/200x200?text=Emily',
      bio: 'Dedicated to exceptional customer experience',
    },
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We source only the best products from trusted suppliers worldwide.',
      icon: '🏆',
    },
    {
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We listen and improve constantly.',
      icon: '❤️',
    },
    {
      title: 'Fast Delivery',
      description: 'Get your orders delivered quickly with our efficient logistics network.',
      icon: '🚀',
    },
    {
      title: 'Secure Shopping',
      description: 'Shop with confidence knowing your data is protected with us.',
      icon: '🔒',
    },
  ];

  return (
    <AnimatedWrapper>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-green-500 to-primary-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            About I-Cart
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto"
          >
            Your trusted online shopping destination for quality products at great prices
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Our Story */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">Our Story</h2>
              <p className="text-gray-600 text-lg mb-4">
                Founded in 2020, I-Cart started with a simple mission: to make online shopping
                accessible, affordable, and enjoyable for everyone.
              </p>
              <p className="text-gray-600 text-lg mb-4">
                What began as a small startup has grown into a thriving marketplace with thousands
                of products and millions of satisfied customers worldwide.
              </p>
              <p className="text-gray-600 text-lg">
                Today, we continue to innovate and improve, always keeping our customers at the
                heart of everything we do.
              </p>
            </div>
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://via.placeholder.com/600x400/22c55e/ffffff?text=Our+Story"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </motion.section>

        {/* Stats */}
        <motion.section
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="py-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-green-100 text-primary-green-600 rounded-full mb-4">
                  {stat.icon}
                </div>
                <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Our Values */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="text-5xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Team */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-16"
        >
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="card overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                  <p className="text-primary-green-600 font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </AnimatedWrapper>
  );
};

export default About;
