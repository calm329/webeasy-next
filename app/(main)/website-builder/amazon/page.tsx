'use client';
import { useAppDispatch } from '@/lib/store/hooks';
import { extractASIN } from '@/lib/utils/function';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Example() {
  const [productUrl, setProductUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 ">
        <div className="mx-auto  max-w-3xl lg:mx-0 lg:flex-shrink-0 ">
          {/* <Image src={tailwindIcon} alt="Your Company" className="h-11 ml-auto" /> */}
          {/* <PageStatus /> */}
          <h1 className="text-4xl font-bold leading-relaxed tracking-tight text-gray-900 sm:text-6xl">
            AI-Powered Amazon Landing Page Builder
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Boost your online presence instantly with our state-of-the-art AI
            Amazon landing page builder. Simply share your Amazon affiliate link
            and let&apos;s create your unique landing page in seconds!
          </p>
          <div className="mt-10 flex flex-col gap-5 gap-x-6">
            <p className="mb-5 text-gray-600">
              let&apos;s start with submission of an Amazon affiliate link below
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                className="border-1 sm:min-w-96 min-w-full rounded-md border-gray-300 w"
                placeholder={'Amazon affiliate link'}
                onChange={(e) => setProductUrl(e.target.value)}
              />
            </div>
            <Link
              type="button"
              href={'/amazon?product=' + extractASIN(productUrl)}
              className={`flex w-fit  items-center gap-2 rounded-md px-10 py-2  text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? 'bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-500 '}`}
              // disabled={loading}
            >
              {/* {loading && (
                  <ImSpinner2 className="animate-spin text-lg text-white" />
                )}
                {loading ? "Creating.." : "Create"} */}
              Build
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
