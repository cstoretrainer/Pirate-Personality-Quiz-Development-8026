import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCompass, FiLink, FiRotateCcw } = FiIcons;

const ResultScreen = ({ result, onRetake, fromDirectLink = false }) => {
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // Update meta tags for social sharing
    updateMetaTags();
  }, [result]);

  const updateMetaTags = () => {
    const resultSlug = result.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const shareUrl = `${window.location.origin}${window.location.pathname}#/result/${resultSlug}`;

    // Update or create meta tags
    updateMetaTag('og:title', `I'm ${result.name} in the Johnny Mecuerdo Crew`);
    updateMetaTag('og:description', 'Find out who *you* are in the world of rum, riddles, and riot. Take the quiz to discover your pirate alter ego!');
    updateMetaTag('og:url', shareUrl);
    updateMetaTag('og:image', `${window.location.origin}/crew-cards/${resultSlug}.png`);
    updateMetaTag('og:type', 'website');
    
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', `I'm ${result.name} in the Johnny Mecuerdo Crew`);
    updateMetaTag('twitter:description', 'Find out who *you* are in the world of rum, riddles, and riot.');
    updateMetaTag('twitter:image', `${window.location.origin}/crew-cards/${resultSlug}.png`);

    // Update page title
    document.title = `I'm ${result.name}! - Johnny Mecuerdo Crew Quiz`;
  };

  const updateMetaTag = (property, content) => {
    let element = document.querySelector(`meta[property="${property}"]`) || 
                 document.querySelector(`meta[name="${property}"]`);
    
    if (!element) {
      element = document.createElement('meta');
      if (property.startsWith('og:') || property.startsWith('twitter:')) {
        element.setAttribute('property', property);
      } else {
        element.setAttribute('name', property);
      }
      document.head.appendChild(element);
    }
    element.setAttribute('content', content);
  };

  const handleCopyShareLink = async () => {
    const resultSlug = result.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    const shareUrl = `${window.location.origin}${window.location.pathname}#/result/${resultSlug}`;
    
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      console.error('Failed to copy link:', err);
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand('copy');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (fallbackErr) {
        alert('Failed to copy link. Please copy manually: ' + shareUrl);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleTakeQuiz = () => {
    if (fromDirectLink) {
      window.location.hash = '/';
    } else {
      onRetake();
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        className="min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden"
      >
        {/* Animated background elements for direct links */}
        {fromDirectLink && (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-20 left-10 opacity-10"
            >
              <SafeIcon icon={FiCompass} className="text-8xl text-orange-400" />
            </motion.div>
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              className="absolute bottom-32 right-8 opacity-10"
            >
              <span className="text-7xl">⚓</span>
            </motion.div>
          </>
        )}

        {/* Direct link banner */}
        {fromDirectLink && (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="mb-8 bg-gradient-to-r from-amber-100 to-yellow-100 border-4 border-amber-600 rounded-2xl p-6 max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-yellow-50 opacity-50"></div>
            <div className="relative z-10">
              <div className="text-4xl mb-3">🏴‍☠️</div>
              <p className="text-amber-800 font-creepster text-lg mb-2">
                Ahoy, Matey!
              </p>
              <p className="text-amber-700 font-rum text-sm leading-relaxed">
                Someone shared their crew result with you! 
                <br />
                <strong>Find out who *you* are in the world of rum, riddles, and riot.</strong>
              </p>
            </div>
          </motion.div>
        )}

        {/* Crew Card */}
        <motion.div
          id="crew-card"
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className={`bg-gradient-to-br ${result.color} p-8 sm:p-10 rounded-3xl shadow-2xl border-4 border-orange-400 max-w-lg w-full mb-8 relative overflow-hidden`}
        >
          {/* Card background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-6 right-6 text-6xl sm:text-8xl">{result.emoji}</div>
            <div className="absolute bottom-6 left-6 text-4xl sm:text-5xl rotate-12">{result.emoji}</div>
          </div>

          <div className="relative z-10 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="text-6xl sm:text-7xl mb-6"
            >
              {result.emoji}
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-2xl sm:text-3xl font-creepster mb-3 tracking-wide"
            >
              {fromDirectLink ? "Meet..." : "You are..."}
            </motion.h1>

            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-4xl sm:text-5xl font-creepster mb-3 text-yellow-300 leading-tight"
            >
              {result.name}!
            </motion.h2>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-lg sm:text-xl font-rum mb-6 opacity-90"
            >
              {result.title}
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="text-sm sm:text-base leading-relaxed mb-8 opacity-80 px-2"
            >
              {result.bio}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.6 }}
              className="bg-black bg-opacity-30 rounded-xl p-4 border-2 border-yellow-400"
            >
              <p className="text-xs text-yellow-300 mb-2">GRAB YOUR</p>
              <p className="font-bold text-yellow-200 text-base">{result.merch}</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Two Main Action Buttons */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex flex-col space-y-4 w-full max-w-lg"
        >
          {/* Take Quiz Button - Primary Action */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTakeQuiz}
            className="relative w-full bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800 active:from-slate-900 active:to-black text-white font-bold py-6 px-8 rounded-2xl transition-all duration-200 border-4 border-amber-600 shadow-2xl overflow-hidden parchment-texture"
          >
            {/* Rope border effect */}
            <div className="absolute inset-0 rounded-2xl rope-border opacity-20"></div>
            
            {/* Button content */}
            <div className="relative z-10 flex items-center justify-center space-x-4">
              <SafeIcon icon={fromDirectLink ? FiCompass : FiRotateCcw} className="text-2xl text-amber-400 flex-shrink-0" />
              <div className="text-left">
                <div className="font-creepster text-xl sm:text-2xl text-amber-300">
                  {fromDirectLink ? "Find Your Crew" : "Take Quiz Again"}
                </div>
                <div className="font-rum text-sm text-amber-200 opacity-90">
                  {fromDirectLink ? "Discover your pirate alter ego" : "Try for a different result"}
                </div>
              </div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-all duration-1000 hover:left-full"></div>
          </motion.button>

          {/* Copy Shareable Link Button - Secondary Action */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCopyShareLink}
            className="relative w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 active:from-blue-700 active:to-blue-800 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-200 border-4 border-blue-400 shadow-2xl overflow-hidden parchment-texture"
          >
            {/* Rope border effect */}
            <div className="absolute inset-0 rounded-2xl rope-border opacity-20"></div>
            
            {/* Button content */}
            <div className="relative z-10 flex items-center justify-center space-x-4">
              <SafeIcon icon={FiLink} className="text-2xl text-blue-200 flex-shrink-0" />
              <div className="text-left">
                <div className="font-creepster text-xl sm:text-2xl text-blue-100">
                  Copy Shareable Link
                </div>
                <div className="font-rum text-sm text-blue-200 opacity-90">
                  Share your crew result with mates
                </div>
              </div>
            </div>

            {/* Shimmer effect */}
            <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 transition-all duration-1000 hover:left-full"></div>
          </motion.button>
        </motion.div>

        {/* Brand footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="mt-8 text-center text-orange-300 font-rum"
        >
          <p className="text-sm opacity-75">Johnny Mecuerdo Crew Quiz</p>
        </motion.div>
      </motion.div>

      {/* Pirate Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50"
          >
            <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-6 py-4 rounded-2xl shadow-2xl border-4 border-amber-400 max-w-sm mx-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">🏴‍☠️</span>
                <div>
                  <p className="font-creepster text-lg text-yellow-200">Arrr!</p>
                  <p className="font-rum text-sm">Link copied, ye scallywag!</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ResultScreen;