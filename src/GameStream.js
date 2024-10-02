import React, { useEffect, useRef } from 'react';

const GameStream = ({ gameId }) => {
  const videoRef = useRef(null);
  const pcRef = useRef(null);
  const wsRef = useRef(null);

  useEffect(() => {
    // Initialize WebSocket connection
    wsRef.current = new WebSocket('ws://localhost:8000/api/ws/stream');

    wsRef.current.onopen = () => {
      console.log('WebSocket connected');

      // Create RTCPeerConnection
      pcRef.current = new RTCPeerConnection({
        iceServers: [
          { urls: 'stun:stun.l.google.com:19302' },
        ],
      });

      // Handle incoming ICE candidates
      pcRef.current.onicecandidate = (event) => {
        if (event.candidate) {
          // In a more complex setup, you'd send these to the remote peer
          console.log('New ICE candidate:', event.candidate);
        }
      };

      // Handle remote stream
      pcRef.current.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      // Fetch the game stream offer
      fetch(`http://localhost:8000/api/games`)
        .then((response) => response.json())
        .then((games) => {
          const game = games.find((g) => g.id === gameId);
          if (game) {
            // Send offer to the backend
            wsRef.current.send(
              JSON.stringify({
                action: 'offer',
                data: {
                  sdp: pcRef.current.localDescription?.sdp || '',
                  type: 'offer',
                },
              })
            );
          } else {
            console.error('Game not found');
          }
        });

      // Create offer
      pcRef.current.createOffer().then((offer) => {
        return pcRef.current.setLocalDescription(offer);
      }).then(() => {
        // After setting local description, the onicecandidate and ontrack will handle the rest
      }).catch((error) => {
        console.error('Error creating offer:', error);
      });
    };

    wsRef.current.onmessage = async (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'answer') {
        const desc = new RTCSessionDescription({
          type: data.type,
          sdp: data.sdp,
        });
        await pcRef.current.setRemoteDescription(desc);
      }
    };

    wsRef.current.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return () => {
      // Clean up
      if (pcRef.current) {
        pcRef.current.close();
      }
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [gameId]);

  return (
    <div>
      <h2>Streaming Game ID: {gameId}</h2>
      <video ref={videoRef} autoPlay playsInline controls style={{ width: '100%', maxWidth: '800px' }} />
    </div>
  );
};

export default GameStream;
