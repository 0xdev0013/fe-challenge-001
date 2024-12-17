import { io, Socket } from "socket.io-client";

const SOCKET_URL = "http://localhost:3000";

let socket: Socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(SOCKET_URL);
  }
  return socket;
};

export const subscribeToTokenUpdates = (callback: (token: any) => void) => {
  const socket = initSocket();
  socket.on("tokenUpdate", callback);
};

export const subscribeToTransactions = (
  callback: (transaction: any) => void,
) => {
  const socket = initSocket();
  socket.on("newTransaction", callback);
};
