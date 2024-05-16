import SiteHeader from "@/components/header";
import PageStatus from "@/components/ui/pagestatus";
import Link from "next/link";
import LearnMoreButton from "@/components/ui/button/learn-more-button";
export default function Example() {
  return (
    <>
      <SiteHeader showNavigation={true} />
      <div className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-32">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-xl lg:flex-shrink-0 ">
            {/* <Image src={tailwindIcon} alt="Your Company" className="h-11 ml-auto" /> */}
            <PageStatus />
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

              <LearnMoreButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
