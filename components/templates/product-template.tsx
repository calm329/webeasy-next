import React from "react";

const productTemplate = () => {
  return (
    <div className="bg-white">
      <div className="relative z-40 lg:hidden" role="dialog" aria-modal="true">
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
                        role="list"
                        aria-labelledby="mobile-featured-heading-0"
                        className="mt-6 space-y-6"
                      >
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Sleep
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Swimwear
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Underwear
                          </a>
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
                        role="list"
                        aria-labelledby="mobile-categories-heading"
                        className="mt-6 space-y-6"
                      >
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Basic Tees
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Artwork Tees
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Bottoms
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Underwear
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Accessories
                          </a>
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
                        role="list"
                        aria-labelledby="mobile-collection-heading"
                        className="mt-6 space-y-6"
                      >
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Everything
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Core
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            New Arrivals
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Sale
                          </a>
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
                        role="list"
                        aria-labelledby="mobile-brand-heading"
                        className="mt-6 space-y-6"
                      >
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Full Nelson
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            My Way
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Re-Arranged
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Counterfeit
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Significant Other
                          </a>
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
                        role="list"
                        aria-labelledby="mobile-featured-heading-1"
                        className="mt-6 space-y-6"
                      >
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Casual
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Boxers
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Outdoor
                          </a>
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
                        role="list"
                        aria-labelledby="mobile-categories-heading"
                        className="mt-6 space-y-6"
                      >
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Artwork Tees
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Pants
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Accessories
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Boxers
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Basic Tees
                          </a>
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
                        role="list"
                        aria-labelledby="mobile-collection-heading"
                        className="mt-6 space-y-6"
                      >
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Everything
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Core
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            New Arrivals
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Sale
                          </a>
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
                        role="list"
                        aria-labelledby="mobile-brand-heading"
                        className="mt-6 space-y-6"
                      >
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Significant Other
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            My Way
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Counterfeit
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Re-Arranged
                          </a>
                        </li>
                        <li className="flex">
                          <a href="#" className="text-gray-500">
                            Full Nelson
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Company
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Stores
                </a>
              </div>
            </div>

            <div className="space-y-6 border-t border-gray-200 px-4 py-6">
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Create an account
                </a>
              </div>
              <div className="flow-root">
                <a
                  href="#"
                  className="-m-2 block p-2 font-medium text-gray-900"
                >
                  Sign in
                </a>
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
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <header className="relative">
        <nav aria-label="Top">
          <div className="bg-gray-900">
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <form className="hidden lg:block lg:flex-1">
                <div className="flex">
                  <label htmlFor="desktop-currency" className="sr-only">
                    Currency
                  </label>
                  <div className="group relative -ml-2 rounded-md border-transparent bg-gray-900 focus-within:ring-2 focus-within:ring-white">
                    <select
                      id="desktop-currency"
                      name="currency"
                      className="flex items-center rounded-md border-transparent bg-gray-900 bg-none py-0.5 pl-2 pr-5 text-sm font-medium text-white focus:border-transparent focus:outline-none focus:ring-0 group-hover:text-gray-100"
                    >
                      <option>CAD</option>
                      <option>USD</option>
                      <option>AUD</option>
                      <option>EUR</option>
                      <option>GBP</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center">
                      <svg
                        className="h-5 w-5 text-gray-300"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </form>

              <p className="flex-1 text-center text-sm font-medium text-white lg:flex-none">
                Get free delivery on orders over $100
              </p>

              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Create an account
                </a>
                <span
                  className="h-6 w-px bg-gray-600"
                  aria-hidden="true"
                ></span>
                <a
                  href="#"
                  className="text-sm font-medium text-white hover:text-gray-100"
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>

          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  <div className="hidden lg:flex lg:items-center">
                    <a href="#">
                      <span className="sr-only">Your Company</span>
                      <img
                        className="h-8 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt=""
                      />
                    </a>
                  </div>

                  <div className="hidden h-full lg:flex">
                    <div className="ml-8">
                      <div className="flex h-full justify-center space-x-8">
                        <div className="flex">
                          <div className="relative flex">
                            <button
                              type="button"
                              className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800"
                              aria-expanded="false"
                            >
                              Women
                            </button>
                          </div>

                          <div className="absolute inset-x-0 top-full z-10 text-gray-500 sm:text-sm">
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            ></div>

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                    <div>
                                      <p
                                        id="desktop-featured-heading-0"
                                        className="font-medium text-gray-900"
                                      >
                                        Featured
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby="desktop-featured-heading-0"
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Sleep
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Swimwear
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Underwear
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div>
                                      <p
                                        id="desktop-categories-heading"
                                        className="font-medium text-gray-900"
                                      >
                                        Categories
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby="desktop-categories-heading"
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Basic Tees
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Artwork Tees
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Bottoms
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Underwear
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Accessories
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                    <div>
                                      <p
                                        id="desktop-collection-heading"
                                        className="font-medium text-gray-900"
                                      >
                                        Collection
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby="desktop-collection-heading"
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Everything
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Core
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            New Arrivals
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Sale
                                          </a>
                                        </li>
                                      </ul>
                                    </div>

                                    <div>
                                      <p
                                        id="desktop-brand-heading"
                                        className="font-medium text-gray-900"
                                      >
                                        Brands
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby="desktop-brand-heading"
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Full Nelson
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            My Way
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Re-Arranged
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Counterfeit
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Significant Other
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex">
                          <div className="relative flex">
                            <button
                              type="button"
                              className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800"
                              aria-expanded="false"
                            >
                              Men
                            </button>
                          </div>

                          <div className="absolute inset-x-0 top-full z-10 text-gray-500 sm:text-sm">
                            <div
                              className="absolute inset-0 top-1/2 bg-white shadow"
                              aria-hidden="true"
                            ></div>

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-2 items-start gap-x-8 gap-y-10 pb-12 pt-10">
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                    <div>
                                      <p
                                        id="desktop-featured-heading-1"
                                        className="font-medium text-gray-900"
                                      >
                                        Featured
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby="desktop-featured-heading-1"
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Casual
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Boxers
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Outdoor
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                    <div>
                                      <p
                                        id="desktop-categories-heading"
                                        className="font-medium text-gray-900"
                                      >
                                        Categories
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby="desktop-categories-heading"
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Artwork Tees
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Pants
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Accessories
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Boxers
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Basic Tees
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                    <div>
                                      <p
                                        id="desktop-collection-heading"
                                        className="font-medium text-gray-900"
                                      >
                                        Collection
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby="desktop-collection-heading"
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Everything
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Core
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            New Arrivals
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Sale
                                          </a>
                                        </li>
                                      </ul>
                                    </div>

                                    <div>
                                      <p
                                        id="desktop-brand-heading"
                                        className="font-medium text-gray-900"
                                      >
                                        Brands
                                      </p>
                                      <ul
                                        role="list"
                                        aria-labelledby="desktop-brand-heading"
                                        className="mt-6 space-y-6 sm:mt-4 sm:space-y-4"
                                      >
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Significant Other
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            My Way
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Counterfeit
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Re-Arranged
                                          </a>
                                        </li>
                                        <li className="flex">
                                          <a
                                            href="#"
                                            className="hover:text-gray-800"
                                          >
                                            Full Nelson
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <a
                          href="#"
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Company
                        </a>
                        <a
                          href="#"
                          className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                        >
                          Stores
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-1 items-center lg:hidden">
                    <button
                      type="button"
                      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                    >
                      <span className="sr-only">Open menu</span>
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
                          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                      </svg>
                    </button>

                    <a
                      href="#"
                      className="ml-2 p-2 text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">Search</span>
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
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>
                    </a>
                  </div>

                  <a href="#" className="lg:hidden">
                    <span className="sr-only">Your Company</span>
                    <img
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                      alt=""
                      className="h-8 w-auto"
                    />
                  </a>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <div className="flex space-x-8">
                        <div className="hidden lg:flex">
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Search</span>
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
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                              />
                            </svg>
                          </a>
                        </div>

                        <div className="flex">
                          <a
                            href="#"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Account</span>
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
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                              />
                            </svg>
                          </a>
                        </div>
                      </div>

                      <span
                        className="mx-4 h-6 w-px bg-gray-200 lg:mx-6"
                        aria-hidden="true"
                      ></span>

                      <div className="flow-root">
                        <a
                          href="#"
                          className="group -m-2 flex items-center p-2"
                        >
                          <svg
                            className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                            />
                          </svg>
                          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                            0
                          </span>
                          <span className="sr-only">
                            items in cart, view bag
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <main className="pt-10 sm:pt-16">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                  Men
                </a>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <a href="#" className="mr-2 text-sm font-medium text-gray-900">
                  Clothing
                </a>
                <svg
                  width="16"
                  height="20"
                  viewBox="0 0 16 20"
                  fill="currentColor"
                  aria-hidden="true"
                  className="h-5 w-4 text-gray-300"
                >
                  <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                </svg>
              </div>
            </li>

            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                Basic Tee 6-Pack
              </a>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
              alt="Two each of gray, white, and black shirts laying flat."
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                alt="Model wearing plain black basic tee."
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                alt="Model wearing plain gray basic tee."
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
              alt="Model wearing plain white basic tee."
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        <div className="mx-auto max-w-2xl px-4 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              Basic Tee 6-Pack
            </h1>
          </div>

          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">$192</p>

            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </div>
                <p className="sr-only">4 out of 5 stars</p>
                <a
                  href="#"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  117 reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset className="mt-4">
                  <legend className="sr-only">Choose a color</legend>
                  <div className="flex items-center space-x-3">
                    <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                      <input
                        type="radio"
                        name="color-choice"
                        value="White"
                        className="sr-only"
                        aria-labelledby="color-choice-0-label"
                      />
                      <span id="color-choice-0-label" className="sr-only">
                        White
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-white"
                      ></span>
                    </label>

                    <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-400 focus:outline-none">
                      <input
                        type="radio"
                        name="color-choice"
                        value="Gray"
                        className="sr-only"
                        aria-labelledby="color-choice-1-label"
                      />
                      <span id="color-choice-1-label" className="sr-only">
                        Gray
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-200"
                      ></span>
                    </label>

                    <label className="relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 ring-gray-900 focus:outline-none">
                      <input
                        type="radio"
                        name="color-choice"
                        value="Black"
                        className="sr-only"
                        aria-labelledby="color-choice-2-label"
                      />
                      <span id="color-choice-2-label" className="sr-only">
                        Black
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-gray-900"
                      ></span>
                    </label>
                  </div>
                </fieldset>
              </div>

              <div className="mt-10">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <a
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </a>
                </div>

                <fieldset className="mt-4">
                  <legend className="sr-only">Choose a size</legend>
                  <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                    <label className="group relative flex cursor-not-allowed items-center justify-center rounded-md border bg-gray-50 px-4 py-3 text-sm font-medium uppercase text-gray-200 hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                      <input
                        type="radio"
                        name="size-choice"
                        value="XXS"
                        disabled
                        className="sr-only"
                        aria-labelledby="size-choice-0-label"
                      />
                      <span id="size-choice-0-label">XXS</span>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                      >
                        <svg
                          className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="none"
                          stroke="currentColor"
                        >
                          <line
                            x1="0"
                            y1="100"
                            x2="100"
                            y2="0"
                            vector-effect="non-scaling-stroke"
                          />
                        </svg>
                      </span>
                    </label>

                    <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                      <input
                        type="radio"
                        name="size-choice"
                        value="XS"
                        className="sr-only"
                        aria-labelledby="size-choice-1-label"
                      />
                      <span id="size-choice-1-label">XS</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>

                    <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                      <input
                        type="radio"
                        name="size-choice"
                        value="S"
                        className="sr-only"
                        aria-labelledby="size-choice-2-label"
                      />
                      <span id="size-choice-2-label">S</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>

                    <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                      <input
                        type="radio"
                        name="size-choice"
                        value="M"
                        className="sr-only"
                        aria-labelledby="size-choice-3-label"
                      />
                      <span id="size-choice-3-label">M</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>

                    <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                      <input
                        type="radio"
                        name="size-choice"
                        value="L"
                        className="sr-only"
                        aria-labelledby="size-choice-4-label"
                      />
                      <span id="size-choice-4-label">L</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>

                    <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                      <input
                        type="radio"
                        name="size-choice"
                        value="XL"
                        className="sr-only"
                        aria-labelledby="size-choice-5-label"
                      />
                      <span id="size-choice-5-label">XL</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>

                    <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                      <input
                        type="radio"
                        name="size-choice"
                        value="2XL"
                        className="sr-only"
                        aria-labelledby="size-choice-6-label"
                      />
                      <span id="size-choice-6-label">2XL</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>

                    <label className="group relative flex cursor-pointer items-center justify-center rounded-md border bg-white px-4 py-3 text-sm font-medium uppercase text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6">
                      <input
                        type="radio"
                        name="size-choice"
                        value="3XL"
                        className="sr-only"
                        aria-labelledby="size-choice-7-label"
                      />
                      <span id="size-choice-7-label">3XL</span>

                      <span
                        className="pointer-events-none absolute -inset-px rounded-md"
                        aria-hidden="true"
                      ></span>
                    </label>
                  </div>
                </fieldset>
              </div>

              <button
                type="submit"
                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Add to bag
              </button>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">
                  The Basic Tee 6-Pack allows you to fully express your vibrant
                  personality with three grayscale options. Feeling adventurous?
                  Put on a heather gray tee. Want to be a trendsetter? Try our
                  exclusive colorway: &quot;Black&quot;. Need to add an extra
                  pop of color to your outfit? Our white tee has you covered.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Hand cut and sewn locally
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Dyed with our proprietary colors
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Pre-washed &amp; pre-shrunk
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Ultra-soft 100% cotton
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <section aria-labelledby="shipping-heading" className="mt-10">
              <h2
                id="shipping-heading"
                className="text-sm font-medium text-gray-900"
              >
                Details
              </h2>

              <div className="mt-4 space-y-6">
                <p className="text-sm text-gray-600">
                  The 6-Pack includes two black, two white, and two heather gray
                  Basic Tees. Sign up for our subscription service and be the
                  first to get new, exciting colors, like our upcoming
                  &quot;Charcoal Gray&quot; limited release.
                </p>
              </div>
            </section>
          </div>

          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <section
              aria-labelledby="reviews-heading"
              className="border-t border-gray-200 pt-10 lg:pt-16"
            >
              <h2 id="reviews-heading" className="sr-only">
                Reviews
              </h2>

              <div className="space-y-10">
                <div className="flex flex-col sm:flex-row">
                  <div className="order-2 mt-6 sm:ml-16 sm:mt-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      This is the best white t-shirt out there
                    </h3>
                    <p className="sr-only">5 out of 5 stars</p>

                    <div className="mt-3 space-y-6 text-sm text-gray-600">
                      <p>
                        I've searched my entire life for a t-shirt that reflects
                        every color in the visible spectrum. Scientists said it
                        couldn't be done, but when I look at this shirt, I see
                        white light bouncing right back into my eyes.
                        Incredible!
                      </p>
                    </div>
                  </div>

                  <div className="order-1 flex items-center sm:flex-col sm:items-start">
                    <img
                      src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Mark Edwards."
                      className="h-12 w-12 rounded-full"
                    />

                    <div className="ml-4 sm:ml-0 sm:mt-4">
                      <p className="text-sm font-medium text-gray-900">
                        Mark Edwards
                      </p>
                      <div className="mt-2 flex items-center">
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="order-2 mt-6 sm:ml-16 sm:mt-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      Adds the perfect variety to my wardrobe
                    </h3>
                    <p className="sr-only">4 out of 5 stars</p>

                    <div className="mt-3 space-y-6 text-sm text-gray-600">
                      <p>
                        I used to be one of those unbearable minimalists who
                        only wore the same black v-necks every day. Now, I have
                        expanded my wardrobe with three new crewneck options!
                        Leaving off one star only because I wish the heather
                        gray was more gray.
                      </p>
                    </div>
                  </div>

                  <div className="order-1 flex items-center sm:flex-col sm:items-start">
                    <img
                      src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                      alt="Blake Reid."
                      className="h-12 w-12 rounded-full"
                    />

                    <div className="ml-4 sm:ml-0 sm:mt-4">
                      <p className="text-sm font-medium text-gray-900">
                        Blake Reid
                      </p>
                      <div className="mt-2 flex items-center">
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-200"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row">
                  <div className="order-2 mt-6 sm:ml-16 sm:mt-0">
                    <h3 className="text-sm font-medium text-gray-900">
                      All good things come in 6-Packs
                    </h3>
                    <p className="sr-only">5 out of 5 stars</p>

                    <div className="mt-3 space-y-6 text-sm text-gray-600">
                      <p>
                        Tasty beverages, strong abs that will never be seen due
                        to aforementioned tasty beverages, and these Basic Tees!
                      </p>
                    </div>
                  </div>

                  <div className="order-1 flex items-center sm:flex-col sm:items-start">
                    <img
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Ben Russel."
                      className="h-12 w-12 rounded-full"
                    />

                    <div className="ml-4 sm:ml-0 sm:mt-4">
                      <p className="text-sm font-medium text-gray-900">
                        Ben Russel
                      </p>
                      <div className="mt-2 flex items-center">
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <section
          aria-labelledby="related-products-heading"
          className="bg-white"
        >
          <div className="mx-auto max-w-2xl px-4 py-24 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2
              id="related-products-heading"
              className="text-xl font-bold tracking-tight text-gray-900"
            >
              Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
              <div className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                    alt="Front of men&#039;s Basic Tee in black."
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span
                          aria-hidden="true"
                          className="absolute inset-0"
                        ></span>
                        Basic Tee
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Black</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">$35</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        aria-labelledby="footer-heading"
        className="border-t border-gray-200 bg-white"
      >
        <h2 id="footer-heading" className="sr-only">
          Footer
        </h2>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 py-20 sm:grid-cols-2 sm:gap-y-0 lg:grid-cols-4">
            <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Account</h3>
                <ul role="list" className="mt-6 space-y-6">
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Manage Account
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Saved Items
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Orders
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Redeem Gift card
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Service</h3>
                <ul role="list" className="mt-6 space-y-6">
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Shipping &amp; Returns
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Warranty
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      FAQ
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Find a store
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Get in touch
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-y-10 lg:col-span-2 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-0">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Company</h3>
                <ul role="list" className="mt-6 space-y-6">
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Who we are
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Press
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Careers
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Privacy
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900">Connect</h3>
                <ul role="list" className="mt-6 space-y-6">
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Facebook
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Instagram
                    </a>
                  </li>
                  <li className="text-sm">
                    <a href="#" className="text-gray-500 hover:text-gray-600">
                      Pinterest
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 py-10 sm:flex sm:items-center sm:justify-between">
            <div className="flex items-center justify-center text-sm text-gray-500">
              <p>Shipping to Canada ($CAD)</p>
              <p className="ml-3 border-l border-gray-200 pl-3">English</p>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500 sm:mt-0">
              &copy; 2021 Your Company, Inc.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default productTemplate;
