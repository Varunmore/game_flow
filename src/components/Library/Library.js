import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Library.css';

// Sample game categories
const categories = [
  { id: 1, name: 'All' },
  { id: 2, name: 'Action' },
  { id: 3, name: 'Adventure' },
  { id: 4, name: 'Racing' },
  { id: 5, name: 'Role-Playing' },
  { id: 6, name: 'Casual' },
];

// Sample game data
const games = [
  { id: 1, name: 'Counter Strike', poster: '/images/CS.jpg', category: 'Action' },
  { id: 2, name: 'Far Cry 6', poster: '/images/farcry.jpg', category: 'Action' },
  { id: 3, name: 'Need For Speed Payback', poster: '/images/nfspayback.jpg', category: 'Racing' },
  { id: 4, name: 'God Of War', poster: '/images/godofwar.jpeg', category: 'Adventure' },
  { id: 5, name: 'Assassin Creed Valhalla', poster: '/images/assain.jpg', category: 'Adventure' },
  { id: 6, name: 'Max Payne 3', poster: '/images/maxpayne.jpg', category: 'Action' },
  { id: 7, name: 'Call Of Duty: Black Ops 2', poster: '/images/codblack2.jpg', category: 'Action' },
  { id: 8, name: 'Froza Horizan 4', poster: '/images/froza.jpg', category: 'Racing' },
  { id: 9, name: 'BattleField 2024', poster: '/images/battlefield.jpg', category: 'Action' },
  { id: 10, name: 'Ben 10: Power Trip', poster: '/images/ben10.jpeg', category: 'Adventure' },
  { id: 11, name: 'F1 23', poster: '/images/f1.jpg', category: 'Racing' },
  { id: 12, name: 'Way Out', poster: '/images/wayout.jpeg', category: 'Adventure' },
  { id: 13, name: 'Cities Skyline 2', poster: '/images/cities.jpg', category: 'Casual' },
  { id: 14, name: 'DIRT 5', poster: '/images/dirt5.jpeg', category: 'Racing' },
  { id: 15, name: 'SpongeBob SquarePants', poster: '/images/bob.jpg', category: 'Casual' },
  { id: 16, name: 'Sea Of Thieves', poster: '/images/sea.jpg', category: 'Adventure' }
];

const Library = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filter games based on the selected category
  const filteredGames = selectedCategory === 'All'
    ? games
    : games.filter(game => game.category === selectedCategory);

  return (
    <section className="library-section">
      <p>Explore Our Extensive Collection Of Games Available For Streaming.</p>

      {/* Category Filters */}
      <div className="category-filters">
        {categories.map(category => (
          <button 
            key={category.id} 
            onClick={() => setSelectedCategory(category.name)} 
            className={`filter-button ${selectedCategory === category.name ? 'active' : ''}`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Game List */}
      <div className="game-list">
        {filteredGames.map(game => (
          <div key={game.id} className="game-item">
            <Link to={`/game/${game.id}`}>
              <img src={game.poster} alt={game.name} className="game-poster" />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Library;
