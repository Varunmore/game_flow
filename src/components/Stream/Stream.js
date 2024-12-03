import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import "./Stream.css";

const Stream = () => {
  const { gameId } = useParams();
  const videoRef = useRef(null);
  const socketRef = useRef(null);
  const peerConnectionRef = useRef(null);

  useEffect(() => {
    const setupWebRTC = async () => {
      socketRef.current = io("ws://13.232.167.207:5000"); // Adjust backend URL if needed

      const peerConnection = new RTCPeerConnection();

      peerConnectionRef.current = peerConnection;

      peerConnection.ontrack = (event) => {
        if (videoRef.current) {
          videoRef.current.srcObject = event.streams[0];
        }
      };

      socketRef.current.on("offer", async (offer) => {
        await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        socketRef.current.emit("answer", peerConnection.localDescription);
      });

      socketRef.current.on("iceCandidate", async (candidate) => {
        if (candidate) {
          try {
            await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
          } catch (error) {
            console.error("Failed to add ICE candidate:", error);
          }
        }
      });

      socketRef.current.emit("startGame", { gameId });
    };

    setupWebRTC();

    return () => {
      if (socketRef.current) socketRef.current.disconnect();
      if (peerConnectionRef.current) peerConnectionRef.current.close();
    };
  }, [gameId]);

  return (
    <div className="stream-container">
      <video ref={videoRef} className="game-video" autoPlay playsInline controls />
    </div>
  );
};

export default Stream;
