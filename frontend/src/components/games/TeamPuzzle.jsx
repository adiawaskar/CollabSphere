import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaRedo, FaTrophy } from 'react-icons/fa';

const generatePuzzle = () => {
  const numbers = Array.from({ length: 15 }, (_, i) => i + 1);
  numbers.push('');
  
  // Shuffle array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  
  return numbers;
};

const TeamPuzzle = () => {
  const [puzzle, setPuzzle] = useState(generatePuzzle());
  const [moves, setMoves] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [bestScore, setBestScore] = useState(localStorage.getItem('puzzleBestScore') || Infinity);

  const checkCompletion = (newPuzzle) => {
    return newPuzzle.every((num, index) => 
      (index === 15 && num === '') || (num === index + 1)
    );
  };

  const handleMove = (index) => {
    if (isComplete) return;

    const emptyIndex = puzzle.indexOf('');
    const row = Math.floor(index / 4);
    const emptyRow = Math.floor(emptyIndex / 4);
    const col = index % 4;
    const emptyCol = emptyIndex % 4;

    if (
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow)
    ) {
      const newPuzzle = [...puzzle];
      [newPuzzle[index], newPuzzle[emptyIndex]] = [newPuzzle[emptyIndex], newPuzzle[index]];
      setPuzzle(newPuzzle);
      setMoves(moves + 1);

      if (checkCompletion(newPuzzle)) {
        setIsComplete(true);
        if (moves + 1 < bestScore) {
          setBestScore(moves + 1);
          localStorage.setItem('puzzleBestScore', moves + 1);
        }
      }
    }
  };

  const resetPuzzle = () => {
    setPuzzle(generatePuzzle());
    setMoves(0);
    setIsComplete(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex gap-6">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg">
            Moves: {moves}
          </div>
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg">
            Best: {bestScore === 'Infinity' ? '-' : bestScore}
          </div>
        </div>
        <button 
          onClick={resetPuzzle}
          className="flex items-center gap-2 px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg transition-all"
        >
          <FaRedo /> Reset
        </button>
      </div>

      <motion.div 
        className="grid grid-cols-4 gap-4 max-w-2xl mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 p-6 rounded-xl"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {puzzle.map((number, index) => (
          <motion.div
            key={index}
            className={`
              aspect-square flex items-center justify-center text-2xl font-bold rounded-lg cursor-pointer
              ${number ? 'bg-gradient-to-br from-purple-600 to-indigo-600 text-white' : 'bg-transparent'}
              hover:scale-105 transition-all
            `}
            onClick={() => handleMove(index)}
            whileHover={{ scale: number ? 1.05 : 1 }}
            whileTap={{ scale: number ? 0.95 : 1 }}
          >
            {number}
          </motion.div>
        ))}
      </motion.div>

      {isComplete && (
        <motion.div 
          className="mt-8 text-center bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <FaTrophy className="text-yellow-400 text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Puzzle Complete!</h2>
          <p className="text-gray-600">You solved it in {moves} moves</p>
          {moves === bestScore && (
            <p className="text-green-500 font-bold mt-2">New Record!</p>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default TeamPuzzle; 