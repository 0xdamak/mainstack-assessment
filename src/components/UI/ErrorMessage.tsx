import { clsx } from "clsx";

interface Props {
  text?: string;
  className?: string;
}

export default function ErrorMessage({ text, className }: Props): JSX.Element {
  return (
    <div
      role="status"
      className={clsx(
        "flex h-full w-full flex-col items-center justify-center gap-4 p-10",
        className,
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
        />
      </svg>
      <h3 className="font-medium text-gray-400">
        {text ?? "An error occurred"}
      </h3>
    </div>
  );
}
