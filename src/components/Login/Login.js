import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Implement your login logic here (e.g., API call)
    if (username === 'admin' && password === 'password') {
      navigate('/library'); // Redirect to Library on successful login
    } else {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h1>Login</h1>
        {error && <p className="error-message">{error}</p>}
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="Enter your username"
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </label>
        </div>
        <button type="submit" className="btn btn-login-submit">Login</button>
        <p>
          Don't have an account? <Link to="/signup">Signup here</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
