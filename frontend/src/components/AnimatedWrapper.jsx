import { motion } from 'framer-motion';
import { pageTransition } from '../animations/pageTransition';

const AnimatedWrapper = ({ children }) => {
  return (
    <motion.div
      initial={pageTransition.initial}
      animate={pageTransition.animate}
      exit={pageTransition.exit}
      transition={pageTransition.transition}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedWrapper;
