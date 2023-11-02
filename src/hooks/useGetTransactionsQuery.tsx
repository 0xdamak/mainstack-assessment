import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type ITransaction } from "../models/transaction";
import { getTransactions } from "../services/transactionsService";

export function useGetTransactionsQuery(): UseQueryResult<
  ITransaction[],
  Error
> {
  return useQuery({
    queryKey: [`/transactions`],
    queryFn: async () => await getTransactions(),
    refetchOnWindowFocus: false,
  });
}
