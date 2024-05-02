import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductTemplate = () => {
  return (
    <div className="bg-white">
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

      <main className="pt-10 sm:pt-16">
        <nav aria-label="Breadcrumb">
          <ol
            
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            <li>
              <div className="flex items-center">
                <Link href="#" className="mr-2 text-sm font-medium text-gray-900">
                  Men
                </Link>
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
                <Link href="#" className="mr-2 text-sm font-medium text-gray-900">
                  Clothing
                </Link>
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
              <Link
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                Basic Tee 6-Pack
              </Link>
            </li>
          </ol>
        </nav>

        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg"
              alt="Two each of gray, white, and black shirts laying flat."
              className="h-full w-full object-cover object-center"
              height={400}
              width={400}
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <Image
                src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg"
                alt="Model wearing plain black basic tee."
                className="h-full w-full object-cover object-center"
                height={200}
                width={200}
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <Image
                src="https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg"
                alt="Model wearing plain gray basic tee."
                className="h-full w-full object-cover object-center"
                height={200}
                width={200}
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <Image
              src="https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg"
              alt="Model wearing plain white basic tee."
              className="h-full w-full object-cover object-center"
              height={400}
              width={400}
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
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-900"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <svg
                    className="h-5 w-5 flex-shrink-0 text-gray-200"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <p className="sr-only">4 out of 5 stars</p>
                <Link
                  href="#"
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  117 reviews
                </Link>
              </div>
            </div>

            <form className="mt-10">
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset className="mt-4">
                  <legend className="sr-only">Choose Link color</legend>
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
                  <Link
                    href="#"
                    className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Size guide
                  </Link>
                </div>

                <fieldset className="mt-4">
                  <legend className="sr-only">Choose Link size</legend>
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
                            vectorEffect="non-scaling-stroke"
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
                  Put on Link heather gray tee. Want to be Link trendsetter? Try our
                  exclusive colorway: &quot;Black&quot;. Need to add an extra
                  pop of color to your outfit? Our white tee has you covered.
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

              <div className="mt-4">
                <ul  className="list-disc space-y-2 pl-4 text-sm">
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
                        I&apos;ve searched my entire life for Link t-shirt that
                        reflects every color in the visible spectrum. Scientists
                        said it couldn&apos;t be done, but when I look at this
                        shirt, I see white light bouncing right back into my
                        eyes. Incredible!
                      </p>
                    </div>
                  </div>

                  <div className="order-1 flex items-center sm:flex-col sm:items-start">
                    <Image
                      src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixqx=oilqXxSqey&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Mark Edwards."
                      className="h-12 w-12 rounded-full"
                      height={48}
                      width={48}
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
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
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
                    <Image
                      src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80"
                      alt="Blake Reid."
                      className="h-12 w-12 rounded-full"
                      height={48}
                      width={48}
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
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-200"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
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
                    <Image
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Ben Russel."
                      className="h-12 w-12 rounded-full"
                      height={48}
                      width={48}
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
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <svg
                          className="h-5 w-5 flex-shrink-0 text-gray-900"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                            clipRule="evenodd"
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
                  <Image
                    src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg"
                    alt="Front of men&#039;s Basic Tee in black."
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    height={400}
                    width={400}
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <Link href="#">
                        Basic Tee
                      </Link>
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
    </div>
  );
};

export default ProductTemplate;
