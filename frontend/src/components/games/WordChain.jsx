import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const WordChain = () => {
  const [words, setWords] = useState([]);
  const [currentWord, setCurrentWord] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    let interval;
    if (timer > 0 && !gameOver) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setGameOver(true);
    }
    return () => clearInterval(interval);
  }, [timer, gameOver]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const word = currentWord.toLowerCase().trim();

    if (word.length < 2) {
      setError('Word must be at least 2 letters long');
      return;
    }

    if (words.length > 0) {
      const lastWord = words[words.length - 1];
      if (word[0] !== lastWord[lastWord.length - 1]) {
        setError(`Word must start with the letter "${lastWord[lastWord.length - 1]}"`);
        return;
      }
    }

    if (words.includes(word)) {
      setError('Word has already been used');
      return;
    }

    setWords([...words, word]);
    setCurrentWord('');
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setError('');
    setTimer(30); // Reset timer
  };

  const resetGame = () => {
    setWords([]);
    setCurrentWord('');
    setCurrentPlayer(1);
    setError('');
    setTimer(30);
    setGameOver(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 rounded-lg">
        <div className="text-xl font-bold">Player {currentPlayer}'s Turn</div>
        <div className="flex gap-4">
          <div className="bg-white/20 px-4 py-2 rounded-lg">Time: {timer}s</div>
          <div className="bg-white/20 px-4 py-2 rounded-lg">Words: {words.length}</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={currentWord}
          onChange={(e) => setCurrentWord(e.target.value)}
          placeholder={words.length === 0 ? "Enter any word" : `Enter a word starting with "${words[words.length - 1]?.slice(-1)}"`}
          className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all"
          autoFocus
        />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all">
          Submit Word
        </button>
      </form>

      <div className="mt-8">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Word Chain:</h3>
        <div className="flex flex-wrap gap-2">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-lg text-purple-700"
            >
              {word}
              {index < words.length - 1 && <span className="mx-2 text-purple-400">→</span>}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordChain; 