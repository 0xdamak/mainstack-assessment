import { Listbox, Transition } from "@headlessui/react";
import ChevronDown from "@/public/svgs/chevron-down.svg?svgr";
import CheckMark from "@/public/svgs/check-mark.svg?svgr";
import clsx from "clsx";

interface Props<S> {
  options: readonly S[];
  value: S[];
  noSelectionsMessage?: string;
  formik: any;
  name: string;
}

export default function MultiSelect({
  options,
  value,
  noSelectionsMessage,
  formik,
  name,
}: Props<string>): JSX.Element {
  function handleSelect(value: string[]): void {
    formik.setValues({ ...formik.values, [name]: value });
  }

  return (
    <Listbox value={value} onChange={handleSelect} multiple>
      <Listbox.Button className="flex h-12 w-full items-center overflow-y-auto rounded-xl bg-gray-50 px-4 py-3 text-left text-sm font-medium capitalize">
        <span>
          {value.length === 0
            ? noSelectionsMessage ?? "Select"
            : value.map((type) => type.replace(/_/g, " ")).join(", ")}
        </span>
        <ChevronDown className="ml-auto shrink-0" />
      </Listbox.Button>
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
        className="relative z-10"
      >
        <Listbox.Options className="absolute mt-1 w-full bg-white p-2 shadow-quick-action">
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className="flex items-center gap-3 rounded-lg p-3 text-base font-semibold capitalize duration-300 hover:bg-gray-50"
            >
              <div
                className={clsx(
                  "flex h-4 w-4 cursor-pointer items-center justify-center rounded-sm border border-gray-400",
                  {
                    "border-black-300 bg-black-300": value.includes(option),
                  },
                )}
              >
                {value.includes(option) && (
                  <CheckMark className="stroke-white" />
                )}
              </div>
              <span>{option.replace(/_/g, " ")}</span>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
