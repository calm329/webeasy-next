import LearnMoreButton from '@/components/ui/button/learn-more-button';
import Link from 'next/link';

export default function Example() {
  return (
    <div className="relative isolate overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl flex-col px-6 pb-24 pt-10 sm:pb-32 lg:flex  ">
        <div className="">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            AI-Powered InstaSite Builder
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Instantly elevate your online presence with our cutting-edge AI
            website builder. Link your Instagram profile and let&apos;s craft
            your exclusive website straight from your feed!
          </p>
        </div>
        <div className=" mx-auto max-w-3xl lg:mx-0 lg:flex-shrink-0 ">
          <div className="mt-10 flex items-center gap-x-6">
            <Link
              id="instagram-login-button"
              href={`${process.env.NEXT_PUBLIC_INSTAGRAM_API_AUTH_ENDPOINT}authorize?client_id=${process.env.NEXT_PUBLIC_FB_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_FB_REDIRECT_URL}&scope=user_profile,user_media&response_type=code`}
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Connect Instagram
            </Link>
            <LearnMoreButton />
          </div>
        </div>
      </div>
    </div>
  );
}
