import Link from "next/link";
import React from "react";

const ProductBreadCrumbs = () => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <li>
          <div className="flex items-center">
            <Link href="#" className="mr-2 text-sm font-medium text-gray-900">
              Men
            </Link>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-4 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>
        <li>
          <div className="flex items-center">
            <Link href="#" className="mr-2 text-sm font-medium text-gray-900">
              Clothing
            </Link>
            <svg
              width="16"
              height="20"
              viewBox="0 0 16 20"
              fill="currentColor"
              aria-hidden="true"
              className="h-5 w-4 text-gray-300"
            >
              <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
            </svg>
          </div>
        </li>

        <li className="text-sm">
          <Link
            href="#"
            aria-current="page"
            className="font-medium text-gray-500 hover:text-gray-600"
          >
            Basic Tee 6-Pack
          </Link>
        </li>
      </ol>
    </nav>
  );
};

export default ProductBreadCrumbs;
