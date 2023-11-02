"use client";

import { useEffect, useState } from "react";
import { useGetUserQuery } from "../hooks/useGetUserQuery";
import { useGetTransactionsQuery } from "../hooks/useGetTransactionsQuery";
import { useGetWalletQuery } from "../hooks/useGetWalletQuery";
import { type ITransaction } from "../models/transaction";
import FilterControls, {
  type FilterOptions,
} from "../components/FilterControls";
import TopNav from "@/src/components/UI/TopNav";
import QuickActions from "../components/UI/QuickActions";
import WalletInfo from "../components/WalletInfo";
import TransactionsChart from "../components/TransactionsChart";
import TransactionsTable from "../components/TransactionsTable";
import PageLoader from "../components/UI/PageLoader";

export default function Home(): JSX.Element {
  const [filtersDialog, setFiltersDialog] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);
  const { data: user, isLoading: loadingUser } = useGetUserQuery();
  const {
    data: allTransactions,
    isLoading: loadingTransactions,
    isError: transactionsError,
  } = useGetTransactionsQuery();
  const {
    data: wallet,
    isLoading: loadingWallet,
    isError: walletError,
  } = useGetWalletQuery();

  function filterTransactions(filterOptions: FilterOptions): void {
    if (allTransactions === undefined) return;
    const { startDate, endDate, transactionTypes, transactionStatuses } =
      filterOptions;
    const filteredTransactions = allTransactions.filter((transaction) => {
      const isWithinDateRange =
        transaction.date >= startDate && transaction.date <= endDate;
      const isMatchingType = transactionTypes.includes(transaction.type);
      const isMatchingStatus = transactionStatuses.includes(transaction.status);
      return isWithinDateRange && isMatchingStatus && isMatchingType;
    });
    setTransactions(filteredTransactions);
  }

  useEffect(() => {
    if (allTransactions !== undefined) setTransactions(allTransactions);
  }, [allTransactions]);

  if (user === undefined && loadingUser) return <PageLoader />;

  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-6xl p-4 xs:p-8">
        <QuickActions />
        <div className="mb-20 flex flex-col items-center justify-between gap-4 md:flex-row">
          <TransactionsChart transactions={transactions} />
          <WalletInfo
            wallet={wallet}
            loading={loadingWallet}
            error={walletError}
          />
        </div>
        <TransactionsTable
          transactions={transactions}
          loading={loadingTransactions}
          error={transactionsError}
          openFiltersDialog={() => {
            setFiltersDialog(true);
          }}
        />
      </main>
      <FilterControls
        display={filtersDialog}
        close={() => {
          setFiltersDialog(false);
        }}
        handleSubmit={(options) => {
          filterTransactions(options);
        }}
        reset={() => {
          allTransactions !== undefined && setTransactions(allTransactions);
        }}
      />
    </>
  );
}
