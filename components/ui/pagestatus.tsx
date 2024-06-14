import Link from "next/link";

export default function PageStatus() {
  return (
    <div className="mt-24 sm:mt-32 lg:mt-16">
      <Link href="#" className="inline-flex space-x-6">
        <span className="rounded-full bg-indigo-600/10 px-3 py-1 text-sm font-semibold leading-6 text-indigo-600 ring-1 ring-inset ring-indigo-600/10">
          WebEasy.AI
        </span>
        <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-gray-600">
          <span>Coming Soon</span>
        </span>
      </Link>
    </div>
  );
}
