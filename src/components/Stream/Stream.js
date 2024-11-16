import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import './Stream.css';

const Stream = ({ userSubscription }) => {
  const { gameId } = useParams();
  const [showAd, setShowAd] = useState(userSubscription === 'free');
  const videoRef = useRef(null);
  const adVideoRef = useRef(null);

  const startGameSession = () => setShowAd(false);

  useEffect(() => {
    if (!showAd) {
      const socket = io("ws://your-backend-url:8765"); // Replace with actual URL
      const peerConnection = new RTCPeerConnection();

      peerConnection.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      socket.on("offer", async (offer) => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socket.emit("answer", { sdp: answer.sdp, type: answer.type });
      });

      return () => {
        socket.disconnect();
        peerConnection.close();
      };
    }
  }, [showAd, gameId]);

  return (
    <div className="stream-container">
      {showAd ? (
        <div className="ad-container">
          <video
            ref={adVideoRef}
            src="/video/hero-video.mp4"
            width="100%"
            height="auto"
            autoPlay
            muted
            playsInline
            onEnded={startGameSession}
          />
        </div>
      ) : (
        <div className="game-player">
          <video ref={videoRef} width="100%" height="auto" autoPlay playsInline controls />
        </div>
      )}
    </div>
  );
};

export default Stream;
