import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCarOn } from 'react-icons/fa';

const StartPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-blue-500 text-white">
      <motion.div 
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          className="text-6xl mb-4"
        >
          <FaCarOn />
        </motion.div>
        <h1 className="text-5xl font-bold mb-4">Welcome to Poster Assistant</h1>
        <p className="text-lg mb-6">Your journey starts here. Let's create something amazing together.</p>
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-white text-purple-600 px-6 py-3 rounded-2xl shadow-lg font-semibold"
          onClick={() => navigate('/input')}
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
};

export default StartPage;
