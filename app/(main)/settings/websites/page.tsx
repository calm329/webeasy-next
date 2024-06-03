"use client";
import WebsitesForm from "@/components/ui/form/websites-form";
import SelectSourceModal from "@/components/ui/modal/select-source-modal";
import { useState } from "react";
import { IoMdAdd } from "react-icons/io";

export default function MyWebsites() {
  const [showMobileMenu, setMobileMenuOpen] = useState(false);
  const [showSelectSourceModal, setSelectSourceModal] = useState(false);
  return (
    <>
      <SelectSourceModal
        open={showSelectSourceModal}
        setOpen={setSelectSourceModal}
      />
      <main className="divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-300 bg-white p-5 shadow">
        <div className="mx-auto max-w-2xl space-y-16 max-lg:m-0 max-lg:max-w-full sm:space-y-20 lg:mx-0 lg:max-w-none">
          <div>
            <div className="flex w-full justify-between">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                My Websites
              </h2>
              <button
                type="button"
                onClick={() => {
                  setSelectSourceModal(true);
                  setMobileMenuOpen(false);
                }}
                className="text-bold flex items-center justify-center rounded-lg border bg-indigo-500 px-5 py-2 text-white"
              >
                <IoMdAdd /> Add Website
              </button>
            </div>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              This contains all the information about your websites.
            </p>
            <WebsitesForm />
          </div>
        </div>
      </main>
    </>
  );
}
