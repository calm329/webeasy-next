"use client";
import React, { useState } from "react";

import { FaApple, FaFacebook, FaGoogle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { IoClose } from "react-icons/io5";
import { signIn } from "next-auth/react";
import SignInForm from "@/components/ui/form/signin-form";
import RegisterForm from "@/components/ui/form/signup-form";

const AuthModalContent = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex">
          <Image
            className="mx-auto h-10 w-auto"
            src="/WebEasy-logo-dark.svg"
            alt="Your Company"
            height={40}
            width={200}
          />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isSignIn ? "Sign in to your account" : "Sign up for an account"}
        </h2>
      </div>
      {isSignIn ? <SignInForm /> : <RegisterForm />}
      <div>
        <div className="relative mt-10">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-gray-900">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <button
            // href="#"
            onClick={() => signIn("facebook")}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
          >
            <FaFacebook className="size-5 text-[#4267B2]" />
            <span className="text-sm font-semibold leading-6">Facebook</span>
          </button>

          <button
            onClick={() => {
              signIn("google");
            }}
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
          >
            <FaGoogle className="size-5 " />
            <span className="text-sm font-semibold leading-6">Google</span>
          </button>

          <Link
            href="#"
            className="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
          >
            <FaApple className="size-5" />
            <span className="text-sm font-semibold leading-6">Apple</span>
          </Link>
        </div>
        <div className="flex justify-center">
          {isSignIn ? (
            <p className="mt-10 text-center text-sm text-gray-500">
              Don&apos;t have an account?{" "}
              <Link
                href="#"
                onClick={() => setIsSignIn(false)}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Register Now
              </Link>
            </p>
          ) : (
            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                href="#"
                onClick={() => setIsSignIn(true)}
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AuthModalContent;
