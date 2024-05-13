"use client";

import { signIn, useSession } from "next-auth/react";

export default function InstagramLogin() {
  const session = useSession();

  console.log(session);

  return (
    <button
      type="button"
      id="instagram-login-button"
      onClick={() => signIn("instagram", { callbackUrl: "/edit" })}
      className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
    >
      Connect Instagram
    </button>
  );
}
