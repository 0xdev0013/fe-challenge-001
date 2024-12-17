import { MempoolTransaction, TokenData } from "@/types/types";
import { API_URL } from "@/utils/constants";
import { io, Socket } from "socket.io-client";

let socket: Socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(API_URL);
  }
  return socket;
};

const createService = <T>(services: T): T => ({
  ...services,
});

export const services = createService({
  subscribeToTokenUpdate: (callback: (token: TokenData) => void) => {
    const socket = initSocket();

    socket.on("tokenUpdate", callback);
  },
  subscribetoTransactions: (
    callback: (transaction: MempoolTransaction) => void,
  ) => {
    const socket = initSocket();
    socket.on("newTransaction", callback);
  },
});
