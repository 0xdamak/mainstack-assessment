import { type ITransaction } from "../models/transaction";
import FilterControls, { type FilterOptions } from "./FilterControls";
import { BaseButton } from "./UI/Buttons";
import { formatToUSD } from "../helpers/formatToUSD";
import { formatDate } from "../helpers/formatDate";
import { clsx } from "clsx";
import ChevronDown from "@/public/svgs/chevron-down.svg?svgr";
import ArrowInward from "@/public/svgs/arrow-inward.svg?svgr";
import ArrowOutward from "@/public/svgs/arrow-outward.svg?svgr";
import Export from "@/public/svgs/export.svg?svgr";
import ActivityIndicator from "./UI/ActivityIndicator";
import ErrorMessage from "./UI/ErrorMessage";

interface Props {
  transactions: ITransaction[] | null;
  loading: boolean;
  error: boolean;
  openFiltersDialog: () => void;

  display: boolean;
  closeFilterDialog: () => void;
  applyFilters: (options: FilterOptions) => void;
  resetFilters: () => void;
}

export default function TransactionsTable({
  transactions,
  loading,
  error,
  openFiltersDialog,
  display,
  closeFilterDialog,
  applyFilters,
  resetFilters,
}: Props): JSX.Element {
  if (transactions === null && loading) {
    return <ActivityIndicator text="Loading transactions" />;
  }
  if (transactions === null && error) {
    return <ErrorMessage />;
  }

  return (
    <>
      <section className="">
        <header className="flex flex-col gap-3 border-b border-gray-50 pb-6 sm:flex-row sm:items-center">
          <div className="mr-auto">
            <h1 className="text-2xl  font-bold">
              {transactions?.length} Transactions
            </h1>
            <p className="font-medium text-gray-400">
              Your transactions for the last 7 days
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BaseButton
              text="Filter"
              icon={<ChevronDown />}
              onClick={openFiltersDialog}
            />
            <BaseButton text="Export List" icon={<Export />} />
          </div>
        </header>
        <ul className="my-8 space-y-6">
          {transactions?.map((transaction, index) => (
            <li key={index} className="flex items-center gap-4">
              <div
                className={clsx(
                  " flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                  {
                    "bg-jade-100": transaction.type === "deposit",
                    "bg-red-100": transaction.type === "withdrawal",
                  },
                )}
              >
                {transaction.type === "deposit" && <ArrowInward />}
                {transaction.type === "withdrawal" && <ArrowOutward />}
              </div>
              <div>
                <h2 className="text-base font-medium">
                  {transaction.metadata?.product_name ?? "Cash withdrawal"}
                </h2>
                <p
                  className={clsx(
                    "text-sm font-medium capitalize text-gray-400",
                    {
                      "text-jade-400":
                        transaction.metadata === undefined &&
                        transaction.status === "successful",
                      "text-yellow-400":
                        transaction.metadata === undefined &&
                        transaction.status === "pending",
                    },
                  )}
                >
                  {transaction.metadata?.name ?? transaction.status}
                </p>
              </div>
              <div className="ml-auto text-right">
                <h2 className="text-base font-bold">
                  {formatToUSD(transaction.amount)}
                </h2>
                <p className="text-sm font-medium text-gray-400">
                  {formatDate(transaction.date)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </section>
      <FilterControls
        display={display}
        close={closeFilterDialog}
        handleSubmit={(options) => {
          applyFilters(options);
        }}
        reset={resetFilters}
      />
    </>
  );
}
