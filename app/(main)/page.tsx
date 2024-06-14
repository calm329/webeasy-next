import SiteHeader from "@/components/header";
import Link from "next/link";
import LearnMoreButton from "@/components/ui/button/learn-more-button";
import PageStatus from "@/components/ui/pagestatus";

export default function Example() {
  return (
    <>
      <SiteHeader showNavigation={true} />
      <div className="relative isolate overflow-hidden bg-white">
        <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl lg:mx-0 lg:flex-shrink-0 ">
            {/* <Image src={tailwindIcon} alt="Your Company" className="h-11 ml-auto" /> */}
            {/* <PageStatus /> */}
            <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              AI that builds a website for you.
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Get your business online in 30 seconds with the #1 AI website
              builder and marketing platform.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <Link
                id="instagram-login-button"
                href={`/website-builder`}
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Generate your website
              </Link>
              {/* <LearnMoreButton /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
