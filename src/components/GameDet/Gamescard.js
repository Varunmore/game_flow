import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './GamePage.css';
import gamesData from './GameData.json'; // Import local JSON file
import {Link} from 'react-router-dom'

const GameDetails = () => {
  const { gameId } = useParams(); // Get game ID from URL
  const [game, setGame] = useState(null);

  useEffect(() => {
    // Find the game details from the local JSON file
    const selectedGame = gamesData.find((g) => g.id === parseInt(gameId));
    setGame(selectedGame);
  }, [gameId]);

  if (!game) {
    return (
      <div className="game-details-container">
        <h2>Game Not Found</h2>
        <p>The game you're looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="game-details-container">
      <div className="game-header">
        <img src={game.coverImage} alt={game.title} className="game-cover" />
        <div className="game-info">
          <h1>{game.title}</h1>
          <p className="game-description">{game.description}</p>
          <Link to={`/stream/${game.id}`} className="btn btn-stream">Play Now</Link>
        </div>
      </div>
      <div className="game-meta">
        <h3>Details</h3>
        <p><strong>Genre:</strong> {game.genre}</p>
        <p><strong>Release Date:</strong> {game.releaseDate}</p>
        <p><strong>Rating:</strong> {game.rating}</p>
        <p><strong>Developer:</strong> {game.developer}</p>
        <p><strong>Publisher:</strong> {game.publisher}</p>
      </div>
      <div className="game-screenshots">
        <h3>Screenshots</h3>
        <div className="screenshots">
          {game.screenshots.map((screenshot, index) => (
            <img key={index} src={screenshot} alt={`Screenshot ${index + 1}`} className="screenshot-image" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameDetails;
