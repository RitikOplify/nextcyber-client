import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_WEB_SOCKET_API_URL;

export const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  withCredentials: true,
  autoConnect: false,
});

socket.onAny((event, ...args) => {
  console.log(`Socket Event: ${event}`, args);
});

let onlineUsersCache = [];
const onlineUsersListeners = new Set();

socket.on("online_users_init", (userIds) => {
  onlineUsersCache = userIds || [];

  onlineUsersListeners.forEach((listener) => listener(userIds || []));
});

export const subscribeToOnlineUsers = (callback) => {
  onlineUsersListeners.add(callback);

  if (onlineUsersCache.length > 0) {
    callback(onlineUsersCache);
  }

  return () => onlineUsersListeners.delete(callback);
};

export const getOnlineUsersCache = () => onlineUsersCache;
