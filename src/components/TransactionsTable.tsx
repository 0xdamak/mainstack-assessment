import * as Yup from "yup";
import { useFormik } from "formik";
import { type IFilterOptions } from "../models/filterOptions";
import { type ITransaction } from "../models/transaction";
import FilterControls from "./FilterControls";
import { BaseButton } from "./UI/Buttons";
import { formatToUSD } from "../helpers/formatToUSD";
import { formatDate } from "../helpers/formatDate";
import { clsx } from "clsx";
import { status } from "../helpers/transactionStatuses";
import { types } from "../helpers/transactionTypes";
import { countActiveFilters } from "../helpers/countActiveFilters";
import ActivityIndicator from "./UI/ActivityIndicator";
import ErrorMessage from "./UI/ErrorMessage";
import ChevronDown from "@/public/svgs/chevron-down.svg?svgr";
import Receipt from "@/public/svgs/receipt.svg?svgr";
import ArrowInward from "@/public/svgs/arrow-inward.svg?svgr";
import ArrowOutward from "@/public/svgs/arrow-outward.svg?svgr";
import Export from "@/public/svgs/export.svg?svgr";

interface Props {
  transactions: ITransaction[] | null;
  allTransactions: ITransaction[] | undefined;
  loading: boolean;
  error: boolean;
  openFiltersDialog: () => void;

  display: boolean;
  closeFilterDialog: () => void;
  applyFilters: (options: IFilterOptions) => void;
  resetFilters: () => void;
}

export default function TransactionsTable({
  transactions,
  allTransactions,
  loading,
  error,
  openFiltersDialog,
  display,
  closeFilterDialog,
  applyFilters,
  resetFilters,
}: Props): JSX.Element {
  const initialValues = {
    startDate: "",
    endDate: "",
    transactionTypes: [],
    transactionStatuses: [],
  };
  const validationSchema = Yup.object().shape({
    startDate: Yup.string().required("Select start date"),
    endDate: Yup.string().required("Select end date"),
    transactionTypes: Yup.array()
      .of(Yup.string().oneOf(types))
      .min(1, "Select at least one type"),
    transactionStatuses: Yup.array()
      .of(Yup.string().oneOf(status))
      .min(1, "Select at least one status"),
  });
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      applyFilters(values);
      closeFilterDialog();
    },
  });

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
              Your transactions for All Time
            </p>
          </div>
          <div className="flex items-center gap-3">
            <BaseButton
              text="Filter"
              badgeNumber={
                countActiveFilters(formik.values) > 0
                  ? countActiveFilters(formik.values)
                  : undefined
              }
              icon={<ChevronDown />}
              onClick={openFiltersDialog}
            />
            <BaseButton text="Export List" icon={<Export />} />
          </div>
        </header>
        {transactions !== null && transactions?.length > 0 && (
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
                  <h2 className="text-sm font-medium xs:text-base">
                    {transaction.metadata?.product_name ?? "Cash withdrawal"}
                  </h2>
                  <p
                    className={clsx(
                      "text-sm font-normal capitalize text-gray-400 xs:font-medium",
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
                  <h2 className="text-sm font-bold xs:text-base">
                    {formatToUSD(transaction.amount)}
                  </h2>
                  <p className="text-sm font-normal text-gray-400 xs:font-medium">
                    {formatDate(transaction.date)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
        {transactions?.length === 0 && (
          <div className="mx-auto max-w-sm py-24">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
              <Receipt />
            </div>
            <h1 className="mb-2 text-2.5xl font-bold">
              No matching transaction found for the selected filter
            </h1>
            <p className="mb-8 text-base font-medium">
              Change your filters to see more results, or add a new product.
            </p>
            <BaseButton
              text="Clear Filter"
              onClick={() => {
                formik.resetForm();
                resetFilters();
              }}
            />
          </div>
        )}
        {allTransactions?.length === 0 && (
          <div className="mx-auto max-w-sm py-24">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-50">
              <Receipt />
            </div>
            <h1 className="mb-2 text-2.5xl font-bold">No transactions here</h1>
            <p className="mb-8 text-base font-medium">
              Create a new transaction
            </p>
          </div>
        )}
      </section>
      <FilterControls
        formik={formik}
        display={display}
        close={closeFilterDialog}
        reset={resetFilters}
      />
    </>
  );
}
