import axios from "axios";
import { type IUser } from "../models/user";

export async function getUser(): Promise<IUser> {
  const { data } = await axios.get<IUser>("/user");
  return data;
}
