import { useFormik } from "formik";
import { BaseButton } from "./UI/Buttons";
import * as Yup from "yup";
import Modal from "./UI/Modal";
import MultiSelect from "./UI/MultiSelect";
import dayjs from "dayjs";

interface Props {
  display: boolean;
  close: () => void;
  handleSubmit: (options: FilterOptions) => void;
  reset: () => void;
}

export interface FilterOptions {
  startDate: string;
  endDate: string;
  transactionTypes: string[];
  transactionStatuses: string[];
}

export const initialValues = {
  startDate: "",
  endDate: "",
  transactionTypes: [],
  transactionStatuses: [],
};

export default function FilterControls({
  display,
  close,
  handleSubmit,
  reset,
}: Props): JSX.Element {
  const status = ["pending", "successful", "failed"] as const;
  const types = [
    "store_transactions",
    "get_tipped",
    "withdrawal",
    "deposit",
    "charge_backs",
    "cash_backs",
    "refer_&_earn",
  ] as const;
  const presets = [
    { label: "Today", dateFunction: setToday },
    { label: "Last 7 days", dateFunction: setLast7Days },
    { label: "This month", dateFunction: setThisMonth },
    { label: "Last 3 months", dateFunction: setLast3Months },
  ] as const;
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
      handleSubmit(values);
    },
  });

  function setToday(): void {
    formik
      .setValues({
        ...formik.values,
        startDate: dayjs().format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function setLast7Days(): void {
    formik
      .setValues({
        ...formik.values,
        startDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function setThisMonth(): void {
    formik
      .setValues({
        ...formik.values,
        startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
        endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
      })
      .catch((error) => {
        console.error(error);
      });
  }
  function setLast3Months(): void {
    formik
      .setValues({
        ...formik.values,
        startDate: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
        endDate: dayjs().format("YYYY-MM-DD"),
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <Modal
      title="Filter"
      display={display}
      close={() => {
        close();
      }}
    >
      <div className="grid grid-cols-2 justify-between gap-2 xs:flex xs:items-center">
        {presets.map((preset) => (
          <button
            key={encodeURI(preset.label)}
            onClick={preset.dateFunction}
            className="rounded-7xl border border-gray-50 px-3 py-2 text-xs font-semibold duration-300 hover:bg-gray-50"
          >
            {preset.label}
          </button>
        ))}
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="mt-6 flex h-[90%] flex-col space-y-6"
      >
        <fieldset className="grid grid-cols-2 gap-2">
          <h3 className="col-span-full mb-3 text-base font-semibold">
            Date Range
          </h3>
          <div className="relative">
            <input
              {...formik.getFieldProps("startDate")}
              type="date"
              className="w-full rounded-xl bg-gray-50 px-4 py-3"
            />
            {formik.touched.startDate !== undefined &&
              formik.errors.startDate !== undefined && (
                <p className="absolute left-0 top-12 my-1 text-xs text-red-500">
                  {formik.errors.startDate}
                </p>
              )}
          </div>
          <div className="relative">
            <input
              {...formik.getFieldProps("endDate")}
              type="date"
              className="w-full rounded-xl bg-gray-50 px-4 py-3"
            />
            {formik.touched.startDate !== undefined &&
              formik.errors.startDate !== undefined && (
                <p className="absolute left-0 top-12 my-1 text-xs text-red-500">
                  {formik.errors.startDate}
                </p>
              )}
          </div>
        </fieldset>
        <fieldset>
          <h3 className="mb-3 text-base font-semibold">Transaction Type</h3>
          <div className="relative">
            <MultiSelect
              {...formik.getFieldProps("transactionTypes")}
              formik={formik}
              options={types}
            />
            {formik.touched.transactionTypes !== undefined &&
              formik.errors.transactionTypes !== undefined && (
                <p className="absolute left-0 top-12 my-1 text-xs text-red-500">
                  {formik.errors.transactionTypes}
                </p>
              )}
          </div>
        </fieldset>
        <fieldset>
          <h3 className="mb-3 text-base font-semibold">Transaction Status</h3>
          <div className="relative">
            <MultiSelect
              {...formik.getFieldProps("transactionStatuses")}
              formik={formik}
              options={status}
            />
            {formik.touched.transactionStatuses !== undefined &&
              formik.errors.transactionStatuses !== undefined && (
                <p className="absolute left-0 top-12 my-1 text-xs text-red-500">
                  {formik.errors.transactionStatuses}
                </p>
              )}
          </div>
        </fieldset>
        <fieldset className="!mt-auto flex gap-3 px-6 py-5">
          <BaseButton
            text="Clear"
            color="white"
            className="w-full"
            type="button"
            onClick={() => {
              formik.resetForm();
              reset();
            }}
          />
          <BaseButton
            text="Apply"
            color="secondary"
            className="w-full"
            type="submit"
          />
        </fieldset>
      </form>
    </Modal>
  );
}
