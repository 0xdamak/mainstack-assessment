import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import CloseIcon from "@/public/svgs/close.svg?svgr";

interface Props {
  children: ReactNode;
  title: string;
  display: boolean;
  close: () => void;
}

export default function Modal({
  title,
  children,
  display,
  close,
}: Props): JSX.Element {
  useEffect(() => {
    const html = document.querySelector("html");
    if (display && html !== null) {
      html.style.overflow = "hidden";
    }
    if (!display && html !== null) {
      html.style.removeProperty("overflow");
    }
  }, [display]);

  return (
    <AnimatePresence>
      {display && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.6 } }}
            transition={{ type: "tween", duration: 0.6 }}
            onClick={close}
            className="fixed left-0 top-0 z-30 h-screen w-screen bg-black-300/25"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%", transition: { duration: 0.6 } }}
            transition={{ type: "tween", duration: 0.6 }}
            onClick={close}
            className="fixed right-0 top-0 z-30 flex h-full w-full max-w-md justify-end p-4"
          >
            <div
              className="flex h-full w-full shrink-0 flex-col rounded-2.5xl bg-white"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <div className="flex items-center justify-between gap-4 px-6 py-5">
                <h1 className="text-2xl font-bold">{title}</h1>
                <div
                  className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-gray-100"
                  onClick={close}
                >
                  <CloseIcon />
                </div>
              </div>
              <div className="h-full px-4">{children}</div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
