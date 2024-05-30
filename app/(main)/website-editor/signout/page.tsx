"use client";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

const SignOut = () => {
  useEffect(() => {
    signOut({ callbackUrl: "/" })
      .then(() => {
        console.log("successfully signed out");
      })
      .catch(() => {
        console.log("failed to sign out");
      });
  }, []);
  return null;
};

export default SignOut;
