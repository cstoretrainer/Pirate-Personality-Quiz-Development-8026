import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HashRouter as Router, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultScreen from './components/ResultScreen';
import './App.css';

const characters = {
  'johnny-mecuerdo': {
    name: "Johnny Mecuerdo",
    title: "The Charismatic Captain",
    bio: "You're the life of the party and the soul of chaos. Natural born leader with a taste for adventure and a magnetic personality that draws people in.",
    merch: "Captain's Rum Flask",
    color: "from-orange-600 to-red-700",
    emoji: "🏴‍☠️"
  },
  'el-pinche-guey': {
    name: "El Pinche Güey",
    title: "The Fiery First Mate",
    bio: "Pure energy and attitude. You charge first, ask questions later, and bring the heat to every situation with unstoppable passion.",
    merch: "Güey's Shot Glass Set",
    color: "from-red-600 to-orange-700",
    emoji: "🔥"
  },
  'el-capo': {
    name: "El Capo",
    title: "The Strategic Mastermind",
    bio: "Cool, calculated, and always three steps ahead. You're the brains behind every successful heist and the voice of reason in chaos.",
    merch: "Capo's Strategy Compass",
    color: "from-slate-700 to-gray-800",
    emoji: "🧭"
  },
  'felip-mota': {
    name: "Felip Mota",
    title: "The Mystical Navigator",
    bio: "Guided by intuition and the stars. You see what others miss and trust the universe's plan to lead you to hidden treasures.",
    merch: "Mota's Mystical Map",
    color: "from-purple-600 to-indigo-700",
    emoji: "⭐"
  },
  'scrotum-jizum': {
    name: "Scrotum Jizum",
    title: "The Resourceful Repair Master",
    bio: "Master of making things work with duct tape and determination. Chaos is just another puzzle to solve with creative ingenuity.",
    merch: "Jizum's Repair Kit",
    color: "from-amber-600 to-yellow-700",
    emoji: "🔧"
  }
};

function DirectResultScreen() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const result = characters[slug];

  useEffect(() => {
    if (result) {
      // Update meta tags for social sharing
      updateShareMetaTags(result);
    } else {
      // Update meta tags for fallback
      updateFallbackMetaTags();
    }
  }, [result, slug]);

  const updateShareMetaTags = (character) => {
    const shareUrl = `${window.location.origin}${window.location.pathname}#/result/${slug}`;
    
    // Update or create meta tags
    updateMetaTag('og:title', `I'm ${character.name} in the Johnny Mecuerdo Crew!`);
    updateMetaTag('og:description', 'Find out who *you* are in the world of rum, riddles, and riot. Take the quiz to discover your pirate alter ego!');
    updateMetaTag('og:url', shareUrl);
    updateMetaTag('og:image', `${window.location.origin}/crew-cards/${slug}.png`);
    updateMetaTag('og:type', 'website');
    
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', `I'm ${character.name} in the Johnny Mecuerdo Crew!`);
    updateMetaTag('twitter:description', 'Find out who *you* are in the world of rum, riddles, and riot.');
    updateMetaTag('twitter:image', `${window.location.origin}/crew-cards/${slug}.png`);

    // Update page title
    document.title = `I'm ${character.name}! - Johnny Mecuerdo Crew Quiz`;
  };

  const updateFallbackMetaTags = () => {
    updateMetaTag('og:title', 'Crew Member Not Found - Johnny Mecuerdo Quiz');
    updateMetaTag('og:description', 'This pirate seems to have walked the plank! Take the quiz to find your own crew member.');
    updateMetaTag('og:url', `${window.location.origin}${window.location.pathname}`);
    updateMetaTag('og:image', `${window.location.origin}/og-image.png`);
    updateMetaTag('og:type', 'website');
    
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', 'Crew Member Not Found - Johnny Mecuerdo Quiz');
    updateMetaTag('twitter:description', 'This pirate seems to have walked the plank! Take the quiz to find your own crew member.');
    updateMetaTag('twitter:image', `${window.location.origin}/og-image.png`);

    document.title = 'Crew Member Not Found - Johnny Mecuerdo Quiz';
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

  const handleTakeQuiz = () => {
    navigate('/', { replace: true });
  };

  // If character exists, show the result
  if (result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900">
        <ResultScreen 
          result={result} 
          onRetake={handleTakeQuiz}
          fromDirectLink={true} 
        />
      </div>
    );
  }

  // Fallback for invalid character slug
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900 flex items-center justify-center p-4 sm:p-6">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="max-w-lg w-full"
      >
        {/* Fallback Result Card */}
        <motion.div
          initial={{ rotateY: 90 }}
          animate={{ rotateY: 0 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 100 }}
          className="bg-gradient-to-br from-red-900 to-slate-900 p-8 sm:p-10 rounded-3xl shadow-2xl border-4 border-red-600 mb-8 relative overflow-hidden"
        >
          {/* Card background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-6 right-6 text-6xl sm:text-8xl">💀</div>
            <div className="absolute bottom-6 left-6 text-4xl sm:text-5xl rotate-12">⚓</div>
          </div>

          <div className="relative z-10 text-center text-white">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              className="text-6xl sm:text-7xl mb-6"
            >
              🏴‍☠️
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-2xl sm:text-3xl font-creepster mb-3 tracking-wide text-red-300"
            >
              Crew Member Not Found!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-lg sm:text-xl font-rum mb-6 opacity-90 text-red-200"
            >
              This scallywag seems to have walked the plank...
            </motion.p>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-sm sm:text-base leading-relaxed mb-8 opacity-80 px-2"
            >
              The crew member you're looking for doesn't exist in our records. Perhaps they were lost at sea, or maybe this link got corrupted by sea salt!
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.4 }}
              className="bg-black bg-opacity-30 rounded-xl p-4 border-2 border-red-400"
            >
              <p className="text-xs text-red-300 mb-2">SUGGESTED ACTION</p>
              <p className="font-bold text-red-200 text-base">Take the Quiz to Find Your Crew</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Take Quiz Button */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="w-full"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleTakeQuiz}
            className="relative w-full bg-gradient-to-r from-orange-600 to-red-700 hover:from-orange-700 hover:to-red-800 active:from-orange-800 active:to-red-900 text-white font-bold py-6 px-8 rounded-2xl transition-all duration-200 border-4 border-orange-400 shadow-2xl overflow-hidden parchment-texture"
          >
            {/* Rope border effect */}
            <div className="absolute inset-0 rounded-2xl rope-border opacity-20"></div>
            
            {/* Button content */}
            <div className="relative z-10 flex items-center justify-center space-x-4">
              <span className="text-2xl">🧭</span>
              <div className="text-center">
                <div className="font-creepster text-xl sm:text-2xl text-orange-200">
                  Find Your Crew
                </div>
                <div className="font-rum text-sm text-orange-300 opacity-90">
                  Take the quiz to discover your pirate alter ego
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
          transition={{ delay: 1.8 }}
          className="mt-8 text-center text-orange-300 font-rum"
        >
          <p className="text-sm opacity-75">Johnny Mecuerdo Crew Quiz</p>
          <p className="text-xs opacity-50 mt-2">Invalid crew member: "{slug}"</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

function MainApp() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    setCurrentScreen('quiz');
    setQuizAnswers({});
  };

  const handleQuizComplete = (answers) => {
    setQuizAnswers(answers);
    const calculatedResult = calculateResult(answers);
    setResult(calculatedResult);
    setCurrentScreen('result');
    
    // Update URL to result page
    const resultSlug = calculatedResult.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    navigate(`/result/${resultSlug}`, { replace: true });
  };

  const handleRetakeQuiz = () => {
    setCurrentScreen('welcome');
    setQuizAnswers({});
    setResult(null);
    navigate('/', { replace: true });
  };

  const calculateResult = (answers) => {
    const scores = {
      johnny: 0,
      elguey: 0,
      elcapo: 0,
      felip: 0,
      jizum: 0
    };

    // Question 1: Ship leadership
    switch(answers.q1) {
      case 'party': scores.johnny += 2; break;
      case 'yell': scores.elguey += 2; break;
      case 'chart': scores.elcapo += 2; break;
      case 'stars': scores.felip += 2; break;
      case 'fix': scores.jizum += 2; break;
    }

    // Question 2: Drink choice
    switch(answers.q2) {
      case 'rum': scores.johnny += 2; break;
      case 'tequila': scores.elguey += 2; break;
      case 'coffee': scores.elcapo += 2; break;
      case 'herbal': scores.felip += 2; break;
      case 'beer': scores.jizum += 2; break;
    }

    // Question 3: Brawl role
    switch(answers.q3) {
      case 'charge': scores.elguey += 2; break;
      case 'whisper': scores.elcapo += 2; break;
      case 'sing': scores.johnny += 2; break;
      case 'meditate': scores.felip += 2; break;
      case 'smash': scores.jizum += 2; break;
    }

    // Question 4: Strength
    switch(answers.q4) {
      case 'charisma': scores.johnny += 2; break;
      case 'energy': scores.elguey += 2; break;
      case 'logic': scores.elcapo += 2; break;
      case 'intuition': scores.felip += 2; break;
      case 'improvisation': scores.jizum += 2; break;
    }

    // Question 5: Hideout
    switch(answers.q5) {
      case 'bonfire': scores.johnny += 2; break;
      case 'bar': scores.elguey += 2; break;
      case 'fortress': scores.elcapo += 2; break;
      case 'cave': scores.felip += 2; break;
      case 'shack': scores.jizum += 2; break;
    }

    // Find highest score
    const maxScore = Math.max(...Object.values(scores));
    const winner = Object.keys(scores).find(key => scores[key] === maxScore);

    const characterMap = {
      johnny: characters['johnny-mecuerdo'],
      elguey: characters['el-pinche-guey'],
      elcapo: characters['el-capo'],
      felip: characters['felip-mota'],
      jizum: characters['scrotum-jizum']
    };

    return characterMap[winner];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-red-900">
      <AnimatePresence mode="wait">
        {currentScreen === 'welcome' && (
          <WelcomeScreen key="welcome" onStartQuiz={handleStartQuiz} />
        )}
        {currentScreen === 'quiz' && (
          <QuizScreen key="quiz" onComplete={handleQuizComplete} />
        )}
        {currentScreen === 'result' && result && (
          <ResultScreen 
            key="result" 
            result={result} 
            onRetake={handleRetakeQuiz}
            fromDirectLink={false}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/result/:slug" element={<DirectResultScreen />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;