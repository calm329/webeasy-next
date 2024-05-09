import Template3 from "@/components/templates/template-3";
import { Header } from "@/components/templates/template-3/Header";
import React from "react";

const page = () => {
  return (
    <>
      <div className="fixed inset-0 flex justify-center sm:px-8">
        <div className="flex w-full max-w-7xl lg:px-8">
          <div className="w-full bg-white ring-1 ring-zinc-100 dark:bg-zinc-900 dark:ring-zinc-300/20" />
        </div>
      </div>
      <div className="relative flex w-full flex-col">
        <Header />
        <main className="flex-auto">
          <Template3 />
        </main>
      </div>
    </>
  );
};

export default page;
