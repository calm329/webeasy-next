import Link from 'next/link';

const CustomHomeTab = () => {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:pb-32 lg:flex">
        <div className="mx-auto  max-w-3xl lg:mx-0 lg:flex-shrink-0 ">
          {/* <Image src={tailwindIcon} alt="Your Company" className="h-11 ml-auto" /> */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            AI-Powered Website Builder
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Launch your business online in seconds with our cutting-edge AI
            website builder. Share your tale and let&apos;s build your exclusive
            website!
          </p>
          <div className="mt-10 flex items-center gap-x-6">
            <div className="flex gap-2">
              <Link
                href="/website-builder"
                className="mt-auto rounded-md bg-indigo-600 px-10  py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Build
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomHomeTab;
