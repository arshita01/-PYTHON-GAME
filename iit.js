import React, { useState, useEffect } from 'react';
import './App.css';

const BOARD_SIZE = 3;

const initialTiles = Array.from({ length: BOARD_SIZE * BOARD_SIZE }, (_, i) => i);

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const isSolvable = (tiles) => {
  // Check if the number of inversions is even
  let inversions = 0;
  for (let i = 0; i < tiles.length; i++) {
    for (let j = i + 1; j < tiles.length; j++) {
      if (tiles[i] && tiles[j] && tiles[i] > tiles[j]) {
        inversions++;
      }
    }
  }
  return inversions % 2 === 0;
};

const App = () => {
  const [tiles, setTiles] = useState([]);
  const [solved, setSolved] = useState(false);

  useEffect(() => {
    const shuffledTiles = shuffleArray(initialTiles);
    if (!isSolvable(shuffledTiles)) {
      // If the puzzle is not solvable, swap two tiles
      [shuffledTiles[0], shuffledTiles[1]] = [shuffledTiles[1], shuffledTiles[0]];
    }
    setTiles(shuffledTiles);
    setSolved(false);
  }, []);

  const handleTileClick = (index) => {
    if (solved) return;

    // Implement tile movement logic here
  };

  return (
    <div className="App">
      <div className="board">
        {tiles.map((tile, index) => (
          <div key={index} className={`tile ${tile === 0 ? 'empty' : ''}`} onClick={() => handleTileClick(index)}>
            {tile !== 0 && tile}
          </div>
        ))}
      </div>
      {solved && <div className="message">Congratulations! Puzzle Solved!</div>}
    </div>
  );
};

export default App;
