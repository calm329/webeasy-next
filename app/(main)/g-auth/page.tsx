"use client"
import { signIn } from "next-auth/react";

export default function AuthError({ error }:any) {
  const errors = {
    OAuthAccountNotLinked:
      "The email associated with this OAuth account is already in use. Please sign in with the same method previously used.",
  };

  return (
    <div>
      <h1>Sign In Error</h1>
      <p>{(errors as any)[error ]  || "An unknown error occurred."}</p>
      <button onClick={() => signIn()}>Try again</button>
    </div>
  );
}

AuthError.getInitialProps = ({ query }:any) => {
  return {
    error: query.error,
  };
};
