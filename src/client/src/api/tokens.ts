import { API_URL } from "@/utils/constants";
import axios from "axios";

export const fetchTokens = async () => {
  const response = await axios.get(`${API_URL}/tokens`);
  return response.data;
};

export const fetchTokenBySymbol = async (symbol: string) => {
  const response = await axios.get(`${API_URL}/token/${symbol}`);
  return response.data;
};
