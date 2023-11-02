import { Fragment, useState } from "react";
import { usePathname } from "next/navigation";
import { useGetUserQuery } from "@/src/hooks/useGetUserQuery";
import { useWindowDimension } from "@/src/hooks/useWindowDimension";
import { Menu, Transition, Popover } from "@headlessui/react";
import { getInitials } from "@/src/helpers/getInitials";
import { clsx } from "clsx";
import Link from "next/link";
import Logo from "./Logo";
import NavHome from "@/public/svgs/nav-home.svg?svgr";
import NavAnalytics from "@/public/svgs/nav-analytics.svg?svgr";
import NavRevenue from "@/public/svgs/nav-revenue.svg?svgr";
import NavCRM from "@/public/svgs/nav-crm.svg?svgr";
import NavApps from "@/public/svgs/nav-apps.svg?svgr";
import NavNotification from "@/public/svgs/nav-notification.svg?svgr";
import NavChat from "@/public/svgs/nav-chat.svg?svgr";
import NavHamburger from "@/public/svgs/nav-hamburger.svg?svgr";
import ChevronDown from "@/public/svgs/chevron-down.svg?svgr";
import ChevronRight from "@/public/svgs/chevron-right.svg?svgr";
import QuickActionLink from "@/public/svgs/quick-action-link.svg?svgr";
import QuickActionStore from "@/public/svgs/quick-action-store.svg?svgr";
import QuickActionMediaKit from "@/public/svgs/quick-action-media-kit.svg?svgr";
import QuickActionInvoicing from "@/public/svgs/quick-action-invoicing.svg?svgr";

export default function TopNav(): JSX.Element {
  const [hoveredAction, setHoveredAction] =
    useState<(typeof actions)[number]["title"]>("Link in Bio");
  const { data: user } = useGetUserQuery();
  const { width } = useWindowDimension();
  const pathname = usePathname();
  const navLinks = [
    { title: "Home", href: "/", icon: <NavHome /> },
    { title: "Analytics", href: "/#", icon: <NavAnalytics /> },
    { title: "Revenue", href: "/#", icon: <NavRevenue /> },
    { title: "CRM", href: "/#", icon: <NavCRM /> },
    { title: "Apps", href: "/#", icon: <NavApps /> },
  ] as const;
  const subMenu = [
    { title: "Settings", href: "/#", icon: <NavHome /> },
    { title: "Purchase History", href: "/#", icon: <NavAnalytics /> },
    { title: "Refer and Earn", href: "/#", icon: <NavRevenue /> },
    { title: "Integrations", href: "/#", icon: <NavCRM /> },
    { title: "Report Bug", href: "/#", icon: <NavApps /> },
    { title: "Switch Account", href: "/#", icon: <NavApps /> },
  ] as const;
  const actions = [
    {
      title: "Link in Bio",
      description: "Manage your link in bio",
      icon: <QuickActionLink />,
      callback: () => {},
    },
    {
      title: "Store",
      description: "Manage your store activities",
      icon: <QuickActionStore />,
      callback: () => {},
    },
    {
      title: "Media Kit",
      description: "Manage your Media Kits",
      icon: <QuickActionMediaKit />,
      callback: () => {},
    },
    {
      title: "Invoicing",
      description: "Manage your invoices",
      icon: <QuickActionInvoicing />,
      callback: () => {},
    },
    {
      title: "Bookings",
      description: "Manage your Bookings",
      icon: <QuickActionLink />,
      callback: () => {},
    },
  ] as const;

  return (
    <nav className="sticky top-0 mx-4 my-4 h-16 max-w-7xl rounded-7xl shadow-nav xl:mx-auto">
      <ul className="flex h-full w-full items-center justify-between px-3 lg:justify-normal">
        <li className="w-auto lg:w-1/6">
          <Logo />
        </li>
        {width !== undefined && width > 1023 && (
          <li className="w-4/6">
            <ul className="flex items-center justify-center gap-3 xl:gap-5">
              {navLinks.map((link) => (
                <li key={link.title}>
                  {link.title !== "Apps" && (
                    <Link
                      href={link.href}
                      className={clsx(
                        "flex items-center gap-1 rounded-7xl px-4 py-2 duration-300 hover:bg-gray-50",
                        {
                          "bg-black-300 [&>span]:text-white [&>span]:hover:text-gray-400 [&>svg]:stroke-white [&>svg]:hover:stroke-gray-400":
                            pathname === link.href,
                        },
                      )}
                    >
                      {link.icon}
                      <span className="text-base font-semibold text-gray-400">
                        {link.title}
                      </span>
                    </Link>
                  )}
                  {link.title === "Apps" && (
                    <Popover className="relative focus-visible:!border-black-300">
                      {({ open }) => (
                        <>
                          <Popover.Button
                            className={clsx(
                              "flex items-center gap-1 rounded-7xl px-4 py-2 duration-300 hover:bg-gray-50",
                              {
                                "bg-black-300 [&>span]:text-white [&>span]:hover:text-gray-400 [&>svg]:stroke-white [&>svg]:hover:stroke-gray-400":
                                  open,
                              },
                            )}
                          >
                            {link.icon}
                            <span className="flex items-center pr-2 text-base font-semibold text-gray-400">
                              {link.title}
                            </span>
                            {open && (
                              <>
                                <span className="relative w-20 pl-2 text-left text-sm before:absolute before:-left-[2px] before:top-0 before:h-full before:w-[1px] before:bg-gray-50">
                                  {hoveredAction}
                                </span>
                                <ChevronDown className=" shrink-0 stroke-gray-400" />
                              </>
                            )}
                          </Popover.Button>
                          <Transition
                            enter="transition duration-100 ease-out"
                            enterFrom="transform scale-95 opacity-0"
                            enterTo="transform scale-100 opacity-100"
                            leave="transition duration-75 ease-out"
                            leaveFrom="transform scale-100 opacity-100"
                            leaveTo="transform scale-95 opacity-0"
                          >
                            <Popover.Panel className="absolute top-7 z-10 w-96 rounded-xl bg-white shadow-lg">
                              <ul className="p-3">
                                {actions.map((action) => (
                                  <li
                                    key={encodeURI(action.title)}
                                    onMouseEnter={() => {
                                      setHoveredAction(action.title);
                                    }}
                                    className="flex cursor-pointer items-center gap-2 rounded-xl border border-transparent p-4 duration-300 hover:border hover:border-gray-50 hover:shadow-sm [&>svg]:hover:opacity-100"
                                  >
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-50">
                                      {action.icon}
                                    </div>
                                    <div>
                                      <h3 className="font-semibold">
                                        {action.title}
                                      </h3>
                                      <p className="text-sm text-gray-400">
                                        {action.description}
                                      </p>
                                    </div>
                                    <ChevronRight className="ml-auto h-3 w-3 stroke-gray-400 opacity-0 duration-300" />
                                  </li>
                                ))}
                              </ul>
                            </Popover.Panel>
                          </Transition>
                        </>
                      )}
                    </Popover>
                  )}
                </li>
              ))}
            </ul>
          </li>
        )}
        <li className="w-auto lg:w-1/6">
          <ul className="flex items-center justify-end gap-2">
            <li>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-gray-100">
                <NavNotification />
              </div>
            </li>
            <li>
              <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full duration-300 hover:bg-gray-100">
                <NavChat />
              </div>
            </li>
            <li>
              <div className="flex shrink-0 items-center gap-2 rounded-7xl bg-gray-50 p-2">
                <span className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-[url('/svgs/nav-user-background.svg')] bg-cover bg-center text-sm font-semibold text-white duration-300">
                  {getInitials(user?.first_name ?? "", user?.last_name ?? "")}
                </span>

                <Menu as="div" className="relative flex">
                  <Menu.Button>
                    <NavHamburger className="cursor-pointer" />
                  </Menu.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 top-10 flex w-72 flex-col space-y-4 rounded-xl bg-white p-4 shadow-lg">
                      <Menu.Item>
                        <div className="mb-4 flex gap-2">
                          <div className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-[url('/svgs/nav-user-background.svg')] bg-cover bg-center text-sm font-semibold text-white duration-300">
                            <span>
                              {getInitials(
                                user?.first_name ?? "",
                                user?.last_name ?? "",
                              )}
                            </span>
                          </div>
                          <div>
                            <h1 className="font-semibold">
                              {`${user?.first_name} ${user?.last_name}`}
                            </h1>
                            <p className="text-sm text-gray-400">
                              {user?.email}
                            </p>
                          </div>
                        </div>
                      </Menu.Item>
                      {width !== undefined &&
                        width < 1023 &&
                        navLinks.map((link) => (
                          <Menu.Item key={link.title}>
                            <Link
                              href={link.href}
                              className={clsx(
                                "flex items-center gap-3 rounded-7xl px-4 py-2 duration-300 hover:bg-gray-50",
                                {
                                  "bg-black-300 [&>span]:text-white [&>span]:hover:text-gray-400 [&>svg]:stroke-white [&>svg]:hover:stroke-gray-400":
                                    pathname === link.href,
                                },
                              )}
                            >
                              {link.icon}
                              <span className="text-sm font-semibold text-gray-400">
                                {link.title}
                              </span>
                            </Link>
                          </Menu.Item>
                        ))}
                      {subMenu.map((link) => (
                        <Menu.Item key={link.title}>
                          <Link
                            href={link.href}
                            className={clsx(
                              "flex items-center gap-3 rounded-7xl px-4 py-2 duration-300 hover:bg-gray-50",
                              {
                                "bg-black-300 [&>span]:text-white [&>span]:hover:text-gray-400 [&>svg]:stroke-white [&>svg]:hover:stroke-gray-400":
                                  pathname === link.href,
                              },
                            )}
                          >
                            {link.icon}
                            <span className="text-sm font-semibold text-gray-400">
                              {link.title}
                            </span>
                          </Link>
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
