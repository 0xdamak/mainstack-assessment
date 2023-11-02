import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type IWallet } from "../models/wallet";
import { getWallet } from "../services/walletService";

export function useGetWalletQuery(): UseQueryResult<IWallet, Error> {
  return useQuery({
    queryKey: [`/wallet`],
    queryFn: async () => await getWallet(),
    refetchOnWindowFocus: false,
  });
}
