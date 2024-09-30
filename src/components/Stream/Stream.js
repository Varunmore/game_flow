import React from 'react';
import { useParams } from 'react-router-dom';
import './Stream.css';

// Sample game data (can be fetched from an API)
const games = [
  {
    id: 1,
    name: 'Counter Strike',
    poster: '/images/CS.jpg',
    description: 'A tactical first-person shooter.',
  },
  {
    id: 2,
    name: 'Far Cry 6',
    poster: '/images/farcry.jpg',
    description: 'An open-world action-adventure game.',
  },
  {
    id: 3,
    name: 'Need For Speed Payback',
    poster: '/images/nfspayback.jpg',
    description: 'A high-octane racing game.',
  },
  // Add more games as needed
];

const Stream = () => {
  const { gameId } = useParams();
  const game = games.find((g) => g.id === parseInt(gameId));

  if (!game) {
    return (
      <div className="stream-container">
        <h2>Game Not Found</h2>
        <p>The game you're looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="stream-container">
      <h2>{game.name}</h2>
      <img src={game.poster} alt={game.name} className="stream-poster" />
      <p>{game.description}</p>
      {/* Embed your game streaming player here */}
      <div className="game-player">
        <iframe
          src="https://example.com/stream" // Replace with actual streaming URL
          title="Game Stream"
          width="800"
          height="450"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};

export default Stream;
