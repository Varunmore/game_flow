import React, { useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import './Stream.css';
import { io } from 'socket.io-client';

const games = [
  { id: 1, name: 'Counter Strike', poster: '/images/CS.jpg', description: 'A tactical first-person shooter.' },
  { id: 2, name: 'Far Cry 6', poster: '/images/farcry.jpg', description: 'An open-world action-adventure game.' },
  { id: 3, name: 'Need For Speed Payback', poster: '/images/nfspayback.jpg', description: 'A high-octane racing game.' },
];

const Stream = () => {
  const { gameId } = useParams();
  const game = games.find((g) => g.id === parseInt(gameId));
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const peerConnectionRef = useRef(null); // Ref for managing the peer connection

  useEffect(() => {
    if (game) {
      const socket = io("ws://localhost:8765/ws/game/1"); // Adjust WebSocket server URL

      // Initialize PeerConnection
      peerConnectionRef.current = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }]
      });

      const peerConnection = peerConnectionRef.current;

      // Set up WebSocket communication
      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        socket.emit("join", { gameId });
      });

      // Listen for ICE candidates from the WebSocket server
      socket.on("iceCandidate", (candidate) => {
        if (candidate) {
          peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });

      // Listen for the offer from the server
      socket.on("offer", async (offer) => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));

        // Create answer and send it to the server
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", { sdp: answer.sdp, type: answer.type });
      });

      // Handle incoming media stream
      peerConnection.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      // Send ICE candidates to the server
      peerConnection.onicecandidate = (event) => {
        if (event.candidate) {
          socket.emit("iceCandidate", event.candidate);
        }
      };

      // Cleanup on component unmount
      return () => {
        socket.disconnect();
        if (peerConnection) {
          peerConnection.close();
        }
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
