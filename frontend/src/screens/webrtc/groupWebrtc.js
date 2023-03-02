import React, { useState, useEffect } from 'react';
import socketIOClient from 'socket.io-client';

const useGroupWebRTC = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStreams, setRemoteStreams] = useState([]);
  const [socket, setSocket] = useState(null);
  const [peerConnections, setPeerConnections] = useState([]);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShareStream, setScreenShareStream] = useState(null);

  useEffect(() => {
    // Initialize socket.io connection
    const socket = socketIOClient('http://localhost:8000');

    // Get local media stream
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setLocalStream(stream);
        stream.getTracks().forEach((track) => {
          track.enabled = audioEnabled && videoEnabled;
        });
      });

    // Handle 'join' message
    socket.on('join', async (id) => {
      // Create RTCPeerConnection
      const peerConnection = new RTCPeerConnection();

      // Add local media stream to RTCPeerConnection
      peerConnection.addStream(localStream);

      // Handle incoming ICE candidates
      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('ice candidate', e.candidate, id);
        }
      };

      // Handle incoming remote media stream
      peerConnection.onaddstream = (e) => {
        setRemoteStreams((prevStreams) => [
          ...prevStreams,
          { id, stream: e.stream },
        ]);
      };

      // Create and send offer
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      socket.emit('offer', offer, id);

      setPeerConnections((prevConnections) => [
        ...prevConnections,
        { id, peerConnection },
      ]);
    });

    // Handle 'offer' message
    socket.on('offer', async (offer, id) => {
      // Create RTCPeerConnection
      const peerConnection = new RTCPeerConnection();

      // Add local media stream to RTCPeerConnection
      peerConnection.addStream(localStream);

      // Handle incoming ICE candidates
      peerConnection.onicecandidate = (e) => {
        if (e.candidate) {
          socket.emit('ice candidate', e.candidate, id);
        }
      };

      // Handle incoming remote media stream
      peerConnection.onaddstream = (e) => {
        setRemoteStreams((prevStreams) => [
          ...prevStreams,
          { id, stream: e.stream },
        ]);
      };

      // Set remote description and create and send answer
      await peerConnection.setRemoteDescription(offer);
      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);
      socket.emit('answer', answer, id);

      setPeerConnections((prevConnections) => [
        ...prevConnections,
        { id, peerConnection },
      ]);
    });

    // Handle 'answer' message
    socket.on('answer', async (answer, id) => {
      const targetConnection = peerConnections.find(
        (connection) => connection.id === id
      );
      await targetConnection.peerConnection.setRemoteDescription(answer);
    });

    // Handle 'ice candidate' message
    socket.on('ice candidate', async (candidate, id) => {
      const targetConnection = peerConnections.find(
        (connection) => connection.id === id
      );
      await targetConnection.peerConnection.addIceCandidate(candidate);
    });

    // Handle 'leave' message
    socket.on('leave', (id) => {
      setRemoteStreams((prevStreams) =>
        prevStreams.filter((stream) => stream.id !== id)
      );
      setPeerConnections((prevConnections) =>
        prevConnections.filter((connection) => connection.id !== id)
      );
    });

    // Cleanup
    return () => {
      socket.disconnect();
      peerConnections.forEach((connection) =>
        connection.peerConnection.close()
      );
    };
  }, []);

  // Function to toggle audio
  const toggleAudio = () => {
    setAudioEnabled((prevEnabled) => !prevEnabled);
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !audioEnabled;
    });
  };

  // Function to toggle video
  const toggleVideo = () => {
    setVideoEnabled((prevEnabled) => !prevEnabled);
    localStream.getVideoTracks().forEach((track) => {
      track.enabled = !videoEnabled;
    });
  };

  // Function to start screen sharing
  const startScreenShare = async () => {
    setScreenShareStream(await navigator.mediaDevices.getDisplayMedia());
    localStream.getTracks().forEach((track) => {
      track.enabled = false;
    });
    screenShareStream.getTracks().forEach((track) => {
      localStream.addTrack(track);
    });
  };

  // Function to stop screen sharing
  const stopScreenShare = () => {
    screenShareStream.getTracks().forEach((track) => {
      localStream.removeTrack(track);
    });
    setScreenShareStream(null);
    localStream.getTracks().forEach((track) => {
      track.enabled = true;
    });
  };

  return {
    localStream,
    remoteStreams,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    audioEnabled,
    videoEnabled,
    screenShareStream,
  };
};

function MyGroupComponent() {
  const {
    localStream,
    remoteStreams,
    toggleAudio,
    toggleVideo,
    startScreenShare,
    stopScreenShare,
    audioEnabled,
    videoEnabled,
    screenShareStream,
  } = useGroupWebRTC();

  return (
    <div>
      {' '}
      <button onClick={toggleAudio}>
        {audioEnabled ? 'Mute' : 'Unmute'} Audio
      </button>{' '}
      <button onClick={toggleVideo}>
        {videoEnabled ? 'Stop' : 'Start'} Video
      </button>{' '}
      <button onClick={startScreenShare}>Start Screen Share</button>{' '}
      <button onClick={stopScreenShare}>Stop Screen Share</button>{' '}
      {localStream && <video srcobject={localStream} autoPlay={true} />}{' '}
      {remoteStreams.map((stream, index) => (
        <video key={index} srcObject={stream[0].stream} autoPlay={true} />
      ))}{' '}
    </div>
  );
}

export default MyGroupComponent;
