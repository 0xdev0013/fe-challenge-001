import { API_URL } from "@/utils/constants";
import axios from "axios";

export const fetchMempool = async () => {
  const response = await axios.get(`${API_URL}/mempool`);
  return response.data;
};
