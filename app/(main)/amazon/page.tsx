import SiteHeader from "@/components/header";
import { GridBoxIcon } from "@/components/icons";
import Link from "next/link";

export default function Example() {
  return (
    <>
      <SiteHeader showNavigation={true} />
      <div className="relative isolate overflow-hidden bg-white">
        <GridBoxIcon className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]" />
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 ">
            {/* <Image src={tailwindIcon} alt="Your Company" className="h-11 ml-auto" /> */}
            <div className="">
              <Link href="#" className="inline-flex space-x-6">
                <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
                  WebEasy.AI
                </span>
                <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
                  <span>Coming Soon</span>
                </span>
              </Link>
            </div>
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              Instantly create your website from your Amazon Product
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Enter your amazon&apos;s product url below and we will create a
              website for you.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  className="border-1 rounded-md border-gray-300"
                  placeholder={"Product Url"}
                />
                <Link
                  href={`/amazon/producturl`}
                  className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create
                </Link>
              </div>

              <Link
                href="#"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
          <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
            <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
              <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                {/*<img
                src="https://tailwindui.com/img/component-images/project-app-screenshot.png"
                alt="App screenshot"
                width={2432}
                height={1442}
                className="w-[76rem] rounded-md shadow-2xl ring-1 ring-gray-900/10"
              />*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
