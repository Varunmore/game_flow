import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const games = [
  {
    id: 1,
    name: 'Counter Strike',
    poster: '/images/CS.jpg',
  },
  {
    id: 2,
    name: 'Far Cry 6',
    poster: '/images/farcry.jpg',
  },
  {
    id: 3,
    name: 'Need For Speed Payback',
    poster: '/images/nfspayback.jpg',
  },
  // Add more games as needed
  {
    id: 4,
    name: 'God Of War',
    poster: '/images/godofwar.jpeg',
  },
  {
    id: 5,
    name: 'Assassin Creed Valhalla',
    poster: '/images/assain.jpg',
  },
  {
    id: 6,
    name: 'Max Payne 3',
    poster: '/images/maxpayne.jpg',
  },
  {
    id: 7,
    name: 'Call Of Duty: Black Ops 2',
    poster: '/images/codblack2.jpg',
  },
  {
    id: 8,
    name: 'Froza Horizan 4',
    poster: '/images/froza.jpg',
  },
  {
    id: 9,
    name: 'BattelField 2024',
    poster: '/images/battlefield.jpg',
  },
  {
    id: 10,
    name: 'Ben 10: Power Trip',
    poster: '/images/ben10.jpeg',
  },
  {
    id: 11,
    name: 'F1 23',
    poster: '/images/f1.jpg',
  },
];

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <motion.header
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <h1>Welcome to GameShow</h1>
          <p>Your ultimate destination for cloud gaming.</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/library" className="btn btn-secondary">Browse Games</Link>
          </div>
        </div>
      </motion.header>

      {/* Featured Games Section */}
      <motion.div
        className="game-library"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <h2 className="section-title">Featured Games</h2>
        <div className="game-list">
          {games.map((game) => (
            <div key={game.id} className="game-item">
              <img src={game.poster} alt={game.name} className="game-poster" />
              <h3 className="game-name">{game.name}</h3>
              <Link to={`/stream/${game.id}`} className="btn btn-stream">Play Now</Link>
            </div>
          ))}
        </div>
      </motion.div>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>
          GameShow is revolutionizing the cloud gaming experience by providing seamless access to a vast library of games. Our platform is designed to offer high-quality gaming without the need for expensive hardware.
        </p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>
          Have questions or need support? Reach out to us at{' '}
          <a href="mailto:contact@gameshow.com">contact@gameshow.com</a>.
        </p>
      </section>
    </div>
  );
};

export default Home;
