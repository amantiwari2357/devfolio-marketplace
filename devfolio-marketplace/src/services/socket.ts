import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = () => {
  if (!socket) {
    socket = io(import.meta.env.VITE_API_URL || "http://localhost:5000", {
      withCredentials: true,
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error("Socket not connected. Call connectSocket first.");
  }
  return socket;
};
