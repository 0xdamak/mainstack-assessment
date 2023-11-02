"use client";

import { type ITransaction } from "../models/transaction";
import { type IFilterOptions } from "../models/filterOptions";
import { useEffect, useState } from "react";
import { useGetUserQuery } from "../hooks/useGetUserQuery";
import { useGetTransactionsQuery } from "../hooks/useGetTransactionsQuery";
import { useGetWalletQuery } from "../hooks/useGetWalletQuery";
import TopNav from "@/src/components/UI/TopNav";
import QuickActions from "../components/UI/QuickActions";
import WalletInfo from "../components/WalletInfo";
import TransactionsChart from "../components/TransactionsChart";
import TransactionsTable from "../components/TransactionsTable";
import PageLoader from "../components/UI/PageLoader";
import ErrorMessage from "../components/UI/ErrorMessage";

export default function Home(): JSX.Element {
  const [filtersDialog, setFiltersDialog] = useState(false);
  const [transactions, setTransactions] = useState<ITransaction[] | null>(null);
  const {
    data: user,
    isLoading: loadingUser,
    isError: userError,
  } = useGetUserQuery();
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

  function filterTransactions(filterOptions: IFilterOptions): void {
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
    if (allTransactions !== undefined && allTransactions.length > 0)
      setTransactions(allTransactions);
  }, [allTransactions]);

  if (user === undefined && loadingUser) return <PageLoader />;
  if (user === undefined && userError) return <ErrorMessage />;

  return (
    <>
      <TopNav />
      <main className="mx-auto max-w-6xl p-4 xs:p-8">
        <QuickActions />
        <div className="mb-20 flex flex-col items-center justify-between gap-12 md:flex-row md:gap-4">
          <TransactionsChart transactions={transactions} />
          <WalletInfo
            wallet={wallet}
            loading={loadingWallet}
            error={walletError}
          />
        </div>
        <TransactionsTable
          transactions={transactions}
          allTransactions={allTransactions}
          loading={loadingTransactions}
          error={transactionsError}
          openFiltersDialog={() => {
            setFiltersDialog(true);
          }}
          display={filtersDialog}
          closeFilterDialog={() => {
            setFiltersDialog(false);
          }}
          applyFilters={(options) => {
            filterTransactions(options);
          }}
          resetFilters={() => {
            allTransactions !== undefined && setTransactions(allTransactions);
          }}
        />
      </main>
    </>
  );
}
