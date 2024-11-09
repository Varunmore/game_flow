import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './components/Home/Home';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Library from './components/Library/Library';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Stream from './components/Stream/Stream';
import Subscription from './components/Subscripation/Subscription'; // Assume you have a Stream component

const App = () => {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/library" element={<Library />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/stream/:gameId" element={<Stream />} />
          <Route path='/subscription' element={<Subscription />} />
          {/* Add more routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
