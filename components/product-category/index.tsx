import Link from "next/link";
import React from "react";

const ProductCategory = () => {
  return (
    <dialog className="relative z-40 lg:hidden" aria-modal="true">
      <div className="fixed inset-0 bg-black bg-opacity-25"></div>

      <div className="fixed inset-0 z-40 flex">
        <div className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
          <div className="flex px-4 pb-2 pt-5">
            <button
              type="button"
              className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mt-2">
            <div className="border-b border-gray-200">
              <div
                className="-mb-px flex space-x-8 px-4"
                aria-orientation="horizontal"
                role="tablist"
              >
                <button
                  id="tabs-1-tab-1"
                  className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900"
                  aria-controls="tabs-1-panel-1"
                  role="tab"
                  type="button"
                >
                  Women
                </button>

                <button
                  id="tabs-1-tab-2"
                  className="flex-1 whitespace-nowrap border-b-2 border-transparent px-1 py-4 text-base font-medium text-gray-900"
                  aria-controls="tabs-1-panel-2"
                  role="tab"
                  type="button"
                >
                  Men
                </button>
              </div>
            </div>

            <div
              id="tabs-1-panel-1"
              className="space-y-12 px-4 pb-6 pt-10"
              aria-labelledby="tabs-1-tab-1"
              role="tabpanel"
              // tabindex="0"
            >
              <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                  <div>
                    <p
                      id="mobile-featured-heading-0"
                      className="font-medium text-gray-900"
                    >
                      Featured
                    </p>
                    <ul
                      aria-labelledby="mobile-featured-heading-0"
                      className="mt-6 space-y-6"
                    >
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Sleep
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Swimwear
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Underwear
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p
                      id="mobile-categories-heading"
                      className="font-medium text-gray-900"
                    >
                      Categories
                    </p>
                    <ul
                      aria-labelledby="mobile-categories-heading"
                      className="mt-6 space-y-6"
                    >
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Basic Tees
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Artwork Tees
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Bottoms
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Underwear
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Accessories
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                  <div>
                    <p
                      id="mobile-collection-heading"
                      className="font-medium text-gray-900"
                    >
                      Collection
                    </p>
                    <ul
                      aria-labelledby="mobile-collection-heading"
                      className="mt-6 space-y-6"
                    >
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Everything
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Core
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          New Arrivals
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Sale
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p
                      id="mobile-brand-heading"
                      className="font-medium text-gray-900"
                    >
                      Brands
                    </p>
                    <ul
                      aria-labelledby="mobile-brand-heading"
                      className="mt-6 space-y-6"
                    >
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Full Nelson
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          My Way
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Re-Arranged
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Counterfeit
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Significant Other
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div
              id="tabs-1-panel-2"
              className="space-y-12 px-4 pb-6 pt-10"
              aria-labelledby="tabs-1-tab-2"
              role="tabpanel"
              // tabindex="0"
            >
              <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10">
                <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                  <div>
                    <p
                      id="mobile-featured-heading-1"
                      className="font-medium text-gray-900"
                    >
                      Featured
                    </p>
                    <ul
                      aria-labelledby="mobile-featured-heading-1"
                      className="mt-6 space-y-6"
                    >
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Casual
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Boxers
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Outdoor
                        </Link>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <p
                      id="mobile-categories-heading"
                      className="font-medium text-gray-900"
                    >
                      Categories
                    </p>
                    <ul
                      aria-labelledby="mobile-categories-heading"
                      className="mt-6 space-y-6"
                    >
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Artwork Tees
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Pants
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Accessories
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Boxers
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Basic Tees
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10">
                  <div>
                    <p
                      id="mobile-collection-heading"
                      className="font-medium text-gray-900"
                    >
                      Collection
                    </p>
                    <ul
                      aria-labelledby="mobile-collection-heading"
                      className="mt-6 space-y-6"
                    >
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Everything
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Core
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          New Arrivals
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Sale
                        </Link>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <p
                      id="mobile-brand-heading"
                      className="font-medium text-gray-900"
                    >
                      Brands
                    </p>
                    <ul
                      aria-labelledby="mobile-brand-heading"
                      className="mt-6 space-y-6"
                    >
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Significant Other
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          My Way
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Counterfeit
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Re-Arranged
                        </Link>
                      </li>
                      <li className="flex">
                        <Link href="#" className="text-gray-500">
                          Full Nelson
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <Link
                href="#"
                className="-m-2 block p-2 font-medium text-gray-900"
              >
                Company
              </Link>
            </div>
            <div className="flow-root">
              <Link
                href="#"
                className="-m-2 block p-2 font-medium text-gray-900"
              >
                Stores
              </Link>
            </div>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <div className="flow-root">
              <Link
                href="#"
                className="-m-2 block p-2 font-medium text-gray-900"
              >
                Create an account
              </Link>
            </div>
            <div className="flow-root">
              <Link
                href="#"
                className="-m-2 block p-2 font-medium text-gray-900"
              >
                Sign in
              </Link>
            </div>
          </div>

          <div className="space-y-6 border-t border-gray-200 px-4 py-6">
            <form>
              <div className="inline-block">
                <label htmlFor="mobile-currency" className="sr-only">
                  Currency
                </label>
                <div className="group relative -ml-2 rounded-md border-transparent focus-within:ring-2 focus-within:ring-white">
                  <select
                    id="mobile-currency"
                    name="currency"
                    className="flex items-center rounded-md border-transparent bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-gray-700 focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-800"
                  >
                    <option>CAD</option>
                    <option>USD</option>
                    <option>AUD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                    <svg
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default ProductCategory;
