import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Stream.css';

const Stream = () => {
  const { gameId } = useParams();
  const [isStreaming, setIsStreaming] = useState(false);

  const startGameStreaming = useCallback(async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/stream/start`, { gameId });
      if (!response.data.success) {
        console.error('Failed to start the game stream');
      }
    } catch (error) {
      console.error('Error starting game stream:', error);
    }
  }, [gameId]);

  useEffect(() => {
    if (isStreaming) {
      startGameStreaming();
    }
  }, [isStreaming, startGameStreaming]);

  return (
    <div className="stream-container">
      <h2>Streaming Game</h2>
      {!isStreaming ? (
        <button onClick={() => setIsStreaming(true)}>Start Streaming</button>
      ) : (
        <iframe
          src="https://example.com/stream"
          title="Game Stream"
          width="800"
          height="450"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      )}
    </div>
  );
};

export default Stream;
