import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiChevronLeft, FiChevronRight } = FiIcons;

const questions = [
  {
    id: 'q1',
    question: "You're handed the keys to the ship. What's your first move?",
    type: 'multiple',
    options: [
      { value: 'party', label: 'Throw a deck party', emoji: '🎉' },
      { value: 'yell', label: 'Yell at everyone', emoji: '📢' },
      { value: 'chart', label: 'Chart a course quietly', emoji: '🗺️' },
      { value: 'stars', label: 'Ask the stars', emoji: '⭐' },
      { value: 'fix', label: 'Fix the broken mast', emoji: '🔧' }
    ]
  },
  {
    id: 'q2',
    question: "What's your drink of choice at sea?",
    type: 'image',
    options: [
      { value: 'rum', label: 'Spiced Rum', emoji: '🥃' },
      { value: 'tequila', label: 'Tequila', emoji: '🍺' },
      { value: 'coffee', label: 'Dark Coffee', emoji: '☕' },
      { value: 'herbal', label: 'Herbal Brew', emoji: '🍵' },
      { value: 'beer', label: 'Cold Beer', emoji: '🍻' }
    ]
  },
  {
    id: 'q3',
    question: "Your crew is in a brawl. What's your role?",
    type: 'multiple',
    options: [
      { value: 'charge', label: 'Shout and charge', emoji: '⚔️' },
      { value: 'whisper', label: 'Whisper strategic moves', emoji: '🤫' },
      { value: 'sing', label: 'Sing and confuse everyone', emoji: '🎵' },
      { value: 'meditate', label: 'Meditate until needed', emoji: '🧘' },
      { value: 'smash', label: 'Smash and patch up later', emoji: '💥' }
    ]
  },
  {
    id: 'q4',
    question: "What's your biggest strength?",
    type: 'select',
    options: [
      { value: 'charisma', label: 'Charisma', emoji: '✨' },
      { value: 'energy', label: 'Raw Energy', emoji: '⚡' },
      { value: 'logic', label: 'Cold Logic', emoji: '🧠' },
      { value: 'intuition', label: 'Sharp Intuition', emoji: '🔮' },
      { value: 'improvisation', label: 'Pure Improvisation', emoji: '🎭' }
    ]
  },
  {
    id: 'q5',
    question: "Your ideal pirate hideout is...",
    type: 'image',
    options: [
      { value: 'bonfire', label: 'Beach Bonfire Party', emoji: '🔥' },
      { value: 'bar', label: 'Busted Tavern Bar', emoji: '🍻' },
      { value: 'fortress', label: 'Stone Fortress Lair', emoji: '🏰' },
      { value: 'cave', label: 'Smoky Mystical Cave', emoji: '🕳️' },
      { value: 'shack', label: 'Floating Repair Shack', emoji: '🏚️' }
    ]
  }
];

const QuizScreen = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState('');

  const handleAnswer = (value) => {
    setSelectedOption(value);
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption('');
      } else {
        onComplete(newAnswers);
      }
    }, 500);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[questions[currentQuestion - 1].id] || '');
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="min-h-screen flex flex-col p-6"
    >
      {/* Header with progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goBack}
            disabled={currentQuestion === 0}
            className={`p-2 rounded-full ${currentQuestion === 0 ? 'opacity-30' : 'hover:bg-orange-800'} transition-colors`}
          >
            <SafeIcon icon={FiChevronLeft} className="text-2xl text-orange-300" />
          </button>
          
          <span className="text-orange-300 font-bold">
            {currentQuestion + 1} / {questions.length}
          </span>
        </div>
        
        <div className="w-full bg-orange-900 rounded-full h-3">
          <motion.div
            className="bg-gradient-to-r from-orange-400 to-red-500 h-3 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="flex-1 flex flex-col justify-center"
        >
          <h2 className="text-2xl md:text-3xl font-rum text-orange-200 mb-8 text-center leading-relaxed">
            {questions[currentQuestion].question}
          </h2>

          <div className="space-y-4 max-w-md mx-auto w-full">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={option.value}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleAnswer(option.value)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-200 ${
                  selectedOption === option.value
                    ? 'bg-orange-600 border-orange-400 text-white'
                    : 'bg-slate-800 border-slate-600 text-orange-200 hover:border-orange-500 hover:bg-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{option.emoji}</span>
                  <span className="font-medium">{option.label}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizScreen;