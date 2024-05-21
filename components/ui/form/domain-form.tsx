import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import Search from "@/components/ui/search";
export default function DomainForm() {
  return (
    <>
      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Current Domain
        </h2>
        <div className="flex items-center justify-between  pt-6 sm:flex">
          <div className=" inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500  sm:flex-none">
            <Link
              href="/settings"
              className="group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
            >
              floristpot.webeasy.ai
              <FaExternalLinkAlt
                className="-ml-0.5 mr-1.5 h-4 w-4 text-indigo-600"
                aria-hidden="true"
              />
            </Link>
          </div>
          <button
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Update
          </button>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Custom Domain
        </h2>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search for a domain name..." />
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Existing Domain
        </h2>

        <div className="flex items-center justify-between  pt-6 sm:flex">
          <div className=" inline-flex items-center font-medium   sm:flex-none">
            Link your existing domain name with Entri. It’s fast and secure.
            <Link
              href="/settings"
              className="group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Learn more
            </Link>
          </div>
          <button
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Link domain
          </button>
        </div>
      </div>
    </>
  );
}
