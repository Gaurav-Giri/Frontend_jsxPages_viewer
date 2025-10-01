

import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useAuth } from './AuthContext';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [connectionStatus, setConnectionStatus] = useState('disconnected');
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      console.log('🔌 Socket connecting using relative path...');
      
      // Use relative path - Vite proxy will handle the WebSocket connection
      const newSocket = io({
        path: '/socket.io', // Important: specify the path
        transports: ["websocket", "polling"],
        auth: {
          token: localStorage.getItem('token')
        },
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000
      });

      // Connection event handlers
      newSocket.on('connect', () => {
        console.log('✅ Socket.io connected successfully');
        setConnectionStatus('connected');
        
        newSocket.emit('join-admin-room', {
          name: user.name,
          email: user.email
        });
      });

      newSocket.on('connect_error', (error) => {
        console.error('❌ Socket.io connection failed:', error);
        setConnectionStatus('error');
      });

      newSocket.on('disconnect', (reason) => {
        console.log('🔌 Socket.io disconnected:', reason);
        setConnectionStatus('disconnected');
      });

      newSocket.on('reconnect', (attemptNumber) => {
        console.log('🔄 Socket.io reconnected after', attemptNumber, 'attempts');
        setConnectionStatus('connected');
      });

      setSocket(newSocket);

      return () => {
        console.log('🧹 Cleaning up Socket.io connection');
        newSocket.close();
      };
    } else {
      // Clean up socket if user logs out
      if (socket) {
        socket.close();
        setSocket(null);
        setConnectionStatus('disconnected');
      }
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

