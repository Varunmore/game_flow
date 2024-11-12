import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Stream.css';
import { io } from 'socket.io-client';

const games = [
  {
    id: 1,
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
];

const Stream = () => {
  const { gameId } = useParams();
  const game = games.find((g) => g.id === parseInt(gameId));
  const videoRef = useRef(null);
  const containerRef = useRef(null); // Reference to the container for fullscreen

  useEffect(() => {
    if (game) {
      const socket = io("ws://52.66.212.222:8000/ws/stream"); // Adjust WebSocket server URL

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        socket.emit("join", { gameId });
      });

      socket.on("offer", async (offer) => {
        const peerConnection = new RTCPeerConnection();
        peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        peerConnection.ontrack = (event) => {
          if (videoRef.current) {
            videoRef.current.srcObject = event.streams[0];
          }
        };

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", answer);
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [game, gameId]);

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        containerRef.current.requestFullscreen();
      }
    }
  };

  if (!game) {
    return (
      <div className="stream-container">
        <h2>Game Not Found</h2>
        <p>The game you're looking for does not exist.</p>
      </div>
    );
  }

  return (
    <div className="stream-container" ref={containerRef}>
      <h2>{game.name}</h2>
      <p>{game.description}</p>
      <div className="game-player">
        <video ref={videoRef} width="100%" height="auto" autoPlay playsInline controls />
        <button onClick={handleFullscreen} className="fullscreen-button">
          Toggle Fullscreen
        </button>
      </div>
    </div>
  );
};

export default Stream;
