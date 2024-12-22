import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaDice, FaChess, FaPuzzlePiece, FaRegLightbulb } from 'react-icons/fa';
import '../../styles/TeamGames.css';
import WordChain from '../games/WordChain';
import TeamTrivia from '../games/TeamTrivia';
import Chess from '../games/Chess';
import TeamPuzzle from '../games/TeamPuzzle';

const games = [
  {
    id: 1,
    title: "Word Chain",
    icon: <FaRegLightbulb />,
    description: "Players take turns writing words that begin with the last letter of the previous word",
    color: "#805AD5"
  },
  {
    id: 2,
    title: "Team Trivia",
    icon: <FaDice />,
    description: "Test your team's knowledge with categories like tech, movies, and general knowledge",
    color: "#4299E1"
  },
  {
    id: 3,
    title: "Chess",
    icon: <FaChess />,
    description: "Challenge your teammates to a strategic game of chess",
    color: "#48BB78"
  },
  {
    id: 4,
    title: "Team Puzzle",
    icon: <FaPuzzlePiece />,
    description: "Collaborate to solve visual puzzles and riddles together",
    color: "#ED8936"
  }
];

const TeamGames = () => {
  const [selectedGame, setSelectedGame] = useState(null);

  const handleGameSelect = (game) => {
    setSelectedGame(game);
  };

  return (
    <div className="team-games-container">
      <div className="games-header">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="games-title"
        >
          Team Games
        </motion.h1>
        <p className="games-subtitle">
          Take a break and have fun with your team!
        </p>
      </div>

      {!selectedGame ? (
        <div className="games-grid">
          {games.map((game) => (
            <motion.div
              key={game.id}
              className="game-card"
              style={{ 
                '--game-color': game.color,
                background: `linear-gradient(135deg, ${game.color}15, ${game.color}30)`
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => handleGameSelect(game)}
            >
              <div className="game-icon" style={{ color: game.color }}>
                {game.icon}
              </div>
              <h3 className="game-title">{game.title}</h3>
              <p className="game-description">{game.description}</p>
              <button 
                className="play-button"
                style={{ backgroundColor: game.color }}
              >
                Play Now
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="game-interface">
          <div className="game-header">
            <button 
              className="back-button"
              onClick={() => setSelectedGame(null)}
            >
              ← Back to Games
            </button>
            <h2>{selectedGame.title}</h2>
          </div>
          <div className="game-content">
            {selectedGame.title === "Word Chain" && <WordChain />}
            {selectedGame.title === "Team Trivia" && <TeamTrivia />}
            {selectedGame.title === "Chess" && <Chess />}
            {selectedGame.title === "Team Puzzle" && <TeamPuzzle />}
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamGames; 