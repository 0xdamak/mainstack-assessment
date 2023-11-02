import axios from "axios";
import { type IWallet } from "../models/wallet";

export async function getWallet(): Promise<IWallet> {
  const { data } = await axios.get<IWallet>("/wallet");
  return data;
}
