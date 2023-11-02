import { status } from "../helpers/transactionStatuses";
import { types } from "../helpers/transactionTypes";
import { BaseButton } from "./UI/Buttons";
import Modal from "./UI/Modal";
import MultiSelect from "./UI/MultiSelect";
import dayjs from "dayjs";

interface Props {
  formik: any;
  display: boolean;
  close: () => void;
  reset: () => void;
}

export default function FilterControls({
  display,
  close,
  formik,
  reset,
}: Props): JSX.Element {
  const presets = [
    { label: "Today", dateFunction: setToday },
    { label: "Last 7 days", dateFunction: setLast7Days },
    { label: "This month", dateFunction: setThisMonth },
    { label: "Last 3 months", dateFunction: setLast3Months },
  ] as const;

  function setToday(): void {
    formik.setValues({
      ...formik.values,
      startDate: dayjs().format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    });
  }
  function setLast7Days(): void {
    formik.setValues({
      ...formik.values,
      startDate: dayjs().subtract(7, "day").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    });
  }
  function setThisMonth(): void {
    formik.setValues({
      ...formik.values,
      startDate: dayjs().startOf("month").format("YYYY-MM-DD"),
      endDate: dayjs().endOf("month").format("YYYY-MM-DD"),
    });
  }
  function setLast3Months(): void {
    formik.setValues({
      ...formik.values,
      startDate: dayjs().subtract(3, "month").format("YYYY-MM-DD"),
      endDate: dayjs().format("YYYY-MM-DD"),
    });
  }

  return (
    <Modal title="Filter" display={display} close={close}>
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
        className="mt-6 flex h-[85%] flex-col space-y-6 sm:h-[90%]"
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
            {formik.touched.endDate !== undefined &&
              formik.errors.endDate !== undefined && (
                <p className="absolute left-0 top-12 my-1 text-xs text-red-500">
                  {formik.errors.endDate}
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
