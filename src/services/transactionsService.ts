import { type ITransaction } from "../models/transaction";
import { sortByDate } from "../helpers/sortByyDate";
import axios from "axios";

export async function getTransactions(): Promise<ITransaction[]> {
  const { data } = await axios.get<ITransaction[]>("/transactions");
  return sortByDate(data, "date") as ITransaction[];
}
