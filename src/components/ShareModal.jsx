import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCopy, FiLink, FiX, FiCompass, FiAnchor } = FiIcons;

const ShareModal = ({ isOpen, onClose, result }) => {
  const resultSlug = result.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const shareUrl = `${window.location.origin}${window.location.pathname}#/result/${resultSlug}`;
  const shareMessage = `I just got matched to ${result.name} in the Johnny Mecuerdo Crew Quiz! Who's in your crew? ⚓️🍻 ${shareUrl}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(shareMessage);
      showSuccessFeedback('copy-message-btn', '⚓ Copied Message!');
    } catch (err) {
      console.error('Failed to copy message:', err);
      fallbackCopy(shareMessage);
    }
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showSuccessFeedback('copy-link-btn', '🏴‍☠️ Link Copied!');
    } catch (err) {
      console.error('Failed to copy link:', err);
      fallbackCopy(shareUrl);
    }
  };

  const showSuccessFeedback = (buttonId, message) => {
    const button = document.getElementById(buttonId);
    const originalText = button.innerHTML;
    button.innerHTML = `<span class="flex items-center justify-center space-x-2"><span>${message}</span></span>`;
    button.classList.add('bg-green-600', 'border-green-400');
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('bg-green-600', 'border-green-400');
    }, 2500);
  };

  const fallbackCopy = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand('copy');
      alert('Copied to clipboard!');
    } catch (err) {
      alert('Please manually copy the text');
    }
    document.body.removeChild(textArea);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotateY: -15 }}
        animate={{ scale: 1, opacity: 1, rotateY: 0 }}
        exit={{ scale: 0.8, opacity: 0, rotateY: 15 }}
        className="bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 p-6 rounded-2xl border-4 border-amber-800 max-w-sm w-full mx-4 relative shadow-2xl"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23d97706' fill-opacity='0.05' fill-rule='evenodd'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative rope border effect */}
        <div 
          className="absolute inset-0 rounded-2xl border-2 border-amber-600 opacity-30" 
          style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(217, 119, 6, 0.1) 2px, rgba(217, 119, 6, 0.1) 4px)`
          }}
        ></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-red-600 hover:bg-red-700 text-white border-2 border-red-800 transition-colors shadow-lg z-10"
        >
          <SafeIcon icon={FiX} className="text-lg" />
        </button>

        {/* Decorative compass */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-4 left-4 opacity-20"
        >
          <SafeIcon icon={FiCompass} className="text-3xl text-amber-800" />
        </motion.div>

        {/* Header */}
        <div className="text-center mb-6 relative z-10">
          <motion.h3 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl font-creepster text-amber-900 mb-2 drop-shadow-sm"
          >
            🏴‍☠️ Share Yer Crew Result!
          </motion.h3>
          <p className="text-amber-800 font-rum text-sm font-medium">
            Let yer mates know which scallywag ye be!
          </p>
        </div>

        {/* Result preview card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`bg-gradient-to-br ${result.color} p-4 rounded-xl border-3 border-amber-700 mb-6 text-white relative overflow-hidden shadow-lg`}
        >
          <div className="absolute top-2 right-2 text-3xl opacity-30">{result.emoji}</div>
          <div className="relative z-10">
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-3xl">{result.emoji}</span>
              <div>
                <p className="font-creepster text-lg text-yellow-300">{result.name}</p>
                <p className="font-rum text-xs opacity-90">{result.title}</p>
              </div>
            </div>
            <p className="font-rum text-sm opacity-80 line-clamp-2">{result.bio}</p>
          </div>
        </motion.div>

        {/* Share message preview */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-amber-50 border-2 border-amber-600 p-4 rounded-xl mb-6 relative"
        >
          <SafeIcon icon={FiAnchor} className="absolute top-2 right-2 text-amber-600 opacity-30" />
          <p className="text-amber-900 text-sm leading-relaxed font-rum pr-8">
            "{shareMessage.replace(shareUrl, '').trim()}"
          </p>
          <div className="mt-2 p-2 bg-amber-200 rounded border border-amber-500">
            <p className="text-xs text-amber-800 font-mono break-all">{shareUrl}</p>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="space-y-3 relative z-10"
        >
          <button
            id="copy-message-btn"
            onClick={handleCopyMessage}
            className="w-full flex items-center justify-center space-x-3 bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 border-3 border-orange-800 shadow-lg touch-manipulation min-h-[60px] transform hover:scale-105 active:scale-95"
          >
            <SafeIcon icon={FiCopy} className="text-xl" />
            <span className="font-rum">Copy Result to Clipboard</span>
          </button>

          <button
            id="copy-link-btn"
            onClick={handleCopyLink}
            className="w-full flex items-center justify-center space-x-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all duration-200 border-3 border-blue-800 shadow-lg touch-manipulation min-h-[60px] transform hover:scale-105 active:scale-95"
          >
            <SafeIcon icon={FiLink} className="text-xl" />
            <span className="font-rum">Copy Share Link</span>
          </button>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-6 relative z-10"
        >
          <p className="text-amber-700 text-xs font-rum opacity-70">
            Spread the word across the seven seas! 🌊⚓
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ShareModal;