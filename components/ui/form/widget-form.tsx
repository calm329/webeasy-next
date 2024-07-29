import React from "react";
import { useMediaQuery } from "usehooks-ts";
import { FaFacebookMessenger, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { MdCookie } from "react-icons/md";

const widgets = [
  {
    name: "Cookie Notice",
    href: "#",
    role: "Inform users that your site uses cookies",
    icon: MdCookie,
  },
  {
    name: "Messenger Chat",
    href: "#",
    role: "Allow users to start a chat using Messenger",
    icon: FaFacebookMessenger,
  },
  {
    name: "Telegram Button",
    href: "#",
    role: "Allow users to start a chat using Telegram",
    icon: FaTelegram,
  },
  {
    name: "WhatsApp Button",
    href: "#",
    role: "Allow users to start a chat using WhatsApp",
    icon: FaWhatsapp,
  },
  // More widgets...
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}
const WidgetForm = () => {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  return (
    <div>
      {!isMobile && (
        <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Widgets
        </h2>
      )}
      <div className="mt-5 grid grid-cols-2 divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-gray-200 shadow max-sm:grid-cols-1 sm:gap-px sm:divide-y-0">
        {widgets.map((widget, widgetIdx) => (
          <div
            key={widget.name}
            className={classNames(
              widgetIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              widgetIdx === 1 ? "sm:rounded-tr-lg" : "",
              widgetIdx === widgets.length - 2 ? "sm:rounded-bl-lg" : "",
              widgetIdx === widgets.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 max-sm:px-5 max-sm:py-2",
            )}
          >
            <div>
              <span
                className={classNames(
                  "inline-flex rounded-lg p-3 ring-4 ring-white",
                )}
              >
                <widget.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8 max-sm:mt-2">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <a href={widget.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {widget.name}
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{widget.role}</p>
            </div>
            <span
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WidgetForm;
