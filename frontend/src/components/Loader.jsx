import { motion } from 'framer-motion';

const Loader = ({ size = 'medium' }) => {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-16 h-16',
    large: 'w-24 h-24',
  };

  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <motion.div
        className={`${sizes[size]} border-4 border-gray-200 border-t-primary-green-600 rounded-full`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  );
};

export default Loader;
