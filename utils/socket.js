// utils/socket.js
import { io } from "socket.io-client";

let socket = null;
const listeners = new Set();

export const createSocket = () => {
  if (socket) return socket;

  socket = io("http://localhost:8500", {
    transports: ["websocket"],
    withCredentials: true,
  });

  socket.on("disconnect", () => {
    console.log("❌ Socket disconnected");
  });

  // 🔥 notify subscribers
  listeners.forEach((cb) => cb(socket));

  return socket;
};

export const onSocketReady = (cb) => {
  listeners.add(cb);
  if (socket) cb(socket); // immediate if already created
};

export const offSocketReady = (cb) => {
  listeners.delete(cb);
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};

export const getSocket = () => socket;
