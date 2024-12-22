import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaChess, FaUndo } from 'react-icons/fa';

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  Array(8).fill(''),
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

const Chess = () => {
  const [board, setBoard] = useState(initialBoard);
  const [selectedPiece, setSelectedPiece] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [moveHistory, setMoveHistory] = useState([]);

  const getPieceColor = (piece) => {
    if (!piece) return null;
    return piece.toUpperCase() === piece ? 'white' : 'black';
  };

  const getPieceSymbol = (piece) => {
    const symbols = {
      'k': '♔', 'q': '♕', 'r': '♖', 'b': '♗', 'n': '♘', 'p': '♙',
      'K': '♚', 'Q': '♛', 'R': '♜', 'B': '♝', 'N': '♞', 'P': '♟'
    };
    return symbols[piece] || '';
  };

  const handleSquareClick = (row, col) => {
    if (!selectedPiece) {
      const piece = board[row][col];
      if (piece && getPieceColor(piece) === currentPlayer) {
        setSelectedPiece({ row, col });
      }
    } else {
      // Move piece logic
      const newBoard = board.map(row => [...row]);
      const piece = newBoard[selectedPiece.row][selectedPiece.col];
      newBoard[selectedPiece.row][selectedPiece.col] = '';
      newBoard[row][col] = piece;
      
      setBoard(newBoard);
      setMoveHistory([...moveHistory, { from: selectedPiece, to: { row, col }, piece }]);
      setSelectedPiece(null);
      setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
    }
  };

  const undoMove = () => {
    if (moveHistory.length === 0) return;
    
    const lastMove = moveHistory[moveHistory.length - 1];
    const newBoard = board.map(row => [...row]);
    newBoard[lastMove.from.row][lastMove.from.col] = lastMove.piece;
    newBoard[lastMove.to.row][lastMove.to.col] = '';
    
    setBoard(newBoard);
    setMoveHistory(moveHistory.slice(0, -1));
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg">
          <FaChess className={`text-2xl ${currentPlayer === 'white' ? 'text-white' : 'text-gray-300'}`} />
          <span className="font-bold">{currentPlayer}'s turn</span>
        </div>
        <button 
          onClick={undoMove} 
          disabled={moveHistory.length === 0}
          className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 transition-all"
        >
          <FaUndo /> Undo Move
        </button>
      </div>

      <motion.div 
        className="aspect-square max-w-2xl mx-auto bg-gradient-to-br from-purple-100 to-indigo-100 p-4 rounded-xl shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="grid grid-rows-8 gap-1 h-full">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="grid grid-cols-8 gap-1">
              {row.map((piece, colIndex) => (
                <motion.div
                  key={colIndex}
                  className={`
                    aspect-square flex items-center justify-center text-4xl cursor-pointer
                    ${(rowIndex + colIndex) % 2 === 0 ? 'bg-[#f0d9b5]' : 'bg-[#b58863]'}
                    ${selectedPiece?.row === rowIndex && selectedPiece?.col === colIndex ? 'ring-4 ring-yellow-400' : ''}
                    hover:ring-2 hover:ring-yellow-300 transition-all
                  `}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {piece && (
                    <span className={`
                      select-none
                      ${getPieceColor(piece) === 'white' ? 'text-white' : 'text-black'}
                      drop-shadow-md
                    `}>
                      {getPieceSymbol(piece)}
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      <div className="mt-8 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
        <h3 className="text-xl font-bold text-gray-700 mb-4">Move History</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {moveHistory.map((move, index) => (
            <div key={index} className="bg-white px-4 py-2 rounded-lg shadow text-sm">
              {`${index + 1}. ${getPieceSymbol(move.piece)} ${String.fromCharCode(97 + move.from.col)}${8 - move.from.row} → ${String.fromCharCode(97 + move.to.col)}${8 - move.to.row}`}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chess; 