import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Home.css';

const games = [
  { id: 1, name: 'Counter Strike', poster: '/images/CS.jpg' },
  { id: 2, name: 'Far Cry 6', poster: '/images/farcry.jpg' },
  { id: 3, name: 'Need For Speed Payback', poster: '/images/nfspayback.jpg' },
  { id: 4, name: 'God Of War', poster: '/images/godofwar.jpeg' },
  { id: 5, name: 'Assassin Creed Valhalla', poster: '/images/assain.jpg' },
  { id: 6, name: 'Max Payne 3', poster: '/images/maxpayne.jpg' },
  { id: 7, name: 'Call Of Duty: Black Ops 2', poster: '/images/codblack2.jpg' },
  { id: 8, name: 'Forza Horizon 4', poster: '/images/froza.jpg' },
];

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <motion.header
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <h1>Welcome to GameFlow</h1>
          <p>Your Ultimate Destination for Cloud Gaming</p>
          <div className="hero-buttons">
            <Link to="/signup" className="btn btn-primary">Get Started</Link>
            <Link to="/library" className="btn btn-secondary">Browse Games</Link>
          </div>
        </div>
      </motion.header>

      {/* Featured Games Carousel */}
      <div className="carousel">
        <h2 className="section-title">Featured Games</h2>
        <div className="carousel-track">
          {games.map((game) => (
            <div key={game.id} className="carousel-item">
              <img src={game.poster} alt={game.name} className="game-poster" />
              <h3 className="game-name">{game.name}</h3>
              <Link to={`/stream/${game.id}`} className="btn btn-stream">Play Now</Link>
            </div>
          ))}
        </div>
      </div>

      {/* About Section */}
      <section className="about-section">
        <h2>About Us</h2>
        <p>GameShow is transforming the gaming experience by delivering high-quality cloud gaming without expensive hardware.Play free as much as you like until you need to upgrade.</p>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2>Contact Us</h2>
        <p>Have questions? Reach out to us at <a href="mailto:contact@gameshow.com">contact@gameflow.com</a>.</p>
      </section>
    </div>
  );
};

export default Home;
