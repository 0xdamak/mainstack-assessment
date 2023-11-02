"use client";

import QuickActionLink from "@/public/svgs/quick-action-link.svg?svgr";
import QuickActionStore from "@/public/svgs/quick-action-store.svg?svgr";
import QuickActionMediaKit from "@/public/svgs/quick-action-media-kit.svg?svgr";
import QuickActionInvoicing from "@/public/svgs/quick-action-invoicing.svg?svgr";

export default function QuickActions(): JSX.Element {
  const actions = [
    {
      icon: <QuickActionLink />,
      onClick: () => {},
    },
    { icon: <QuickActionStore />, onClick: () => {} },
    { icon: <QuickActionMediaKit />, onClick: () => {} },
    { icon: <QuickActionInvoicing />, onClick: () => {} },
  ];

  return (
    <ul className="fixed left-0 top-1/2 mx-4 flex h-48 w-12 -translate-y-1/2 flex-col items-center justify-evenly rounded-7xl bg-white shadow-quick-action duration-300">
      {actions.map((action, index) => (
        <li
          key={index}
          onClick={action.onClick}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full mix-blend-luminosity duration-300 hover:bg-gray-50 hover:mix-blend-normal"
        >
          {action.icon}
        </li>
      ))}
    </ul>
  );
}
