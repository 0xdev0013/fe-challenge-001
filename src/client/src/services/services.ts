import { DataAction, MempoolTransaction, TokenData } from "@/types/types";
import { API_URL } from "@/utils/constants";
import axios from "axios";
import { io, Socket } from "socket.io-client";

const server = startServer(3000);

let socket: Socket;

export const initSocket = () => {
  if (!socket) {
    socket = io(API_URL);
  }
  return socket;
};

// @notice: generic types for this factory method let us to add more methods to the service
// without changing the service interface
// e.g: subscribeToTokenUpdate and subscribetoTransactions

const createService = <T extends DataAction>(services: T): T => ({
  ...services,
});

export const services = createService({
  fetchTokenBySymbol: async (symbol: string) => {
    try {
      const res = await axios.get(API_URL + `/token/${symbol}`);
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  },
  fetchTokens: async () => {
    try {
      const res = await axios.get(API_URL + "/tokens");
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  },
  fetchTransactions: async () => {
    try {
      const res = await axios.get(API_URL + "/mempool");
      return res.data;
    } catch (error) {
      console.log(error);
      throw new Error();
    }
  },
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
