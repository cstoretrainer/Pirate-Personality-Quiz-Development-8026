import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCompass, FiAnchor, FiMap } = FiIcons;

const WelcomeScreen = ({ onStartQuiz }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col justify-center items-center p-6 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-20 left-10 opacity-20"
      >
        <SafeIcon icon={FiCompass} className="text-6xl text-orange-400" />
      </motion.div>
      
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-32 right-8 opacity-20"
      >
        <SafeIcon icon={FiAnchor} className="text-5xl text-red-400" />
      </motion.div>

      <motion.div
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 right-12 opacity-20"
      >
        <SafeIcon icon={FiMap} className="text-4xl text-yellow-400" />
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ scale: 0.8, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
        className="text-center z-10"
      >
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-5xl md:text-6xl font-creepster text-orange-300 mb-4 tracking-wider drop-shadow-lg"
        >
          Who's In Your
        </motion.h1>
        
        <motion.h2
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-6xl md:text-7xl font-creepster text-red-400 mb-8 tracking-wider drop-shadow-lg"
        >
          CREW?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xl md:text-2xl font-rum text-orange-200 mb-12 max-w-md mx-auto leading-relaxed"
        >
          Join the crew. Discover your alter ego.
        </motion.p>

        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.1, type: "spring", stiffness: 200 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStartQuiz}
          className="bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 text-white font-bold text-xl px-12 py-4 rounded-full shadow-2xl border-2 border-orange-400 transform transition-all duration-200"
        >
          🏴‍☠️ Start Quiz
        </motion.button>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.3 }}
        className="absolute bottom-8 text-center text-orange-300 font-rum"
      >
        <p className="text-sm">A Johnny Mecuerdo Experience</p>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeScreen;