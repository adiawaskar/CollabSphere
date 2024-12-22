import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrophy } from 'react-icons/fa';

const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Hyper Transfer Markup Language",
      "Home Tool Markup Language"
    ],
    correct: 0
  },
  {
    question: "Which programming language is known as the 'language of the web'?",
    options: ["Python", "Java", "JavaScript", "PHP"],
    correct: 2
  },
  {
    question: "What does CSS stand for?",
    options: [
      "Computer Style Sheets",
      "Creative Style System",
      "Cascading Style Sheets",
      "Colorful Style Sheets"
    ],
    correct: 2
  },
  {
    question: "Which of these is not a JavaScript framework?",
    options: ["React", "Angular", "Django", "Vue"],
    correct: 2
  },
  {
    question: "What is the purpose of Git?",
    options: [
      "Database Management",
      "Version Control",
      "Web Hosting",
      "Code Compilation"
    ],
    correct: 1
  }
];

const TeamTrivia = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(20);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore && selectedAnswer === null) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && !showScore) {
      handleNextQuestion();
    }
    return () => clearInterval(interval);
  }, [timer, showScore, selectedAnswer]);

  const handleAnswerClick = (optionIndex) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(optionIndex);
    if (optionIndex === questions[currentQuestion].correct) {
      setScore(score + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 1500);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    const nextQuestion = currentQuestion + 1;
    
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setTimer(20);
    } else {
      setShowScore(true);
    }
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(20);
    setSelectedAnswer(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      {showScore ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl"
        >
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <FaTrophy className="text-yellow-400 text-6xl mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            <div className="text-5xl font-bold text-purple-600 mb-6">
              {score} / {questions.length}
            </div>
            <p className="text-xl text-gray-600 mb-8">
              {score === questions.length 
                ? "Perfect Score! 🎉" 
                : score >= questions.length / 2 
                  ? "Well Done! 👏" 
                  : "Keep Practicing! 💪"}
            </p>
            <button 
              onClick={resetGame} 
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
            >
              Play Again
            </button>
          </div>
        </motion.div>
      ) : (
        <>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-xl mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="text-xl font-semibold">
                Question {currentQuestion + 1}/{questions.length}
              </div>
              <div className="bg-white/20 px-4 py-2 rounded-lg text-xl">
                {timer}s
              </div>
            </div>
            <motion.div 
              className="text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {questions[currentQuestion].question}
            </motion.div>
          </div>

          <div className="grid grid-cols-1 gap-4 max-w-3xl mx-auto">
            {questions[currentQuestion].options.map((option, index) => (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  p-4 text-lg font-medium rounded-xl shadow-md 
                  ${selectedAnswer === null 
                    ? 'bg-white hover:bg-purple-50 text-gray-700 border-2 border-purple-100' 
                    : selectedAnswer === index
                      ? index === questions[currentQuestion].correct
                        ? 'bg-green-500 text-white'
                        : 'bg-red-500 text-white'
                      : index === questions[currentQuestion].correct
                        ? 'bg-green-500 text-white'
                        : 'bg-white text-gray-700'
                  }
                  transform transition-all duration-200
                  ${selectedAnswer === null ? 'hover:scale-102' : ''}
                `}
                onClick={() => handleAnswerClick(index)}
                disabled={selectedAnswer !== null}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full mr-4">
                    {String.fromCharCode(65 + index)}
                  </span>
                  {option}
                </div>
              </motion.button>
            ))}
          </div>

          <div className="mt-8 flex justify-between items-center text-gray-500">
            <div>Time remaining: {timer}s</div>
            <div>Score: {score}/{currentQuestion}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeamTrivia; 