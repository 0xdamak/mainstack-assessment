import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type IUser } from "../models/user";
import { getUser } from "../services/userService";

export function useGetUserQuery(): UseQueryResult<IUser, Error> {
  return useQuery({
    queryKey: [`/user`],
    queryFn: async () => await getUser(),
    refetchOnWindowFocus: false,
  });
}
