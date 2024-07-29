"use client";

export default function EditWebsiteHeader() {
  return (
    <div className="lg:flex lg:items-center lg:justify-between">
      <div className="mt-5 flex hidden sm:block lg:ml-5 lg:mr-5 lg:mt-0">
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Back"
        ></nav>
      </div>
    </div>
  );
}
