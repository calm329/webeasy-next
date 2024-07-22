"use client";
import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import Search from "@/components/ui/search";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import {
  fetchSitesByUser,
  loading as LD,
  sitesData as SD,
} from "@/lib/store/slices/site-slice";
import { useEffect, useState } from "react";
import Loader from "../loader";
import { useMediaQuery } from "usehooks-ts";
import { TSite } from "@/types";
import ResponsiveDialog from "../responsive-dialog/index";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import UpdateDomainForm from "./update-domain-form";
export default function DomainForm() {
  const [isUpdateSubdomain, setIsUpdateSubdomain] = useState(false);
  const [selectedSubdomain, setSelectedSubdomain] = useState("");

  const isMobile = useMediaQuery("(max-width: 1024px)");
  const sites = useAppSelector(SD);
  const isLoading = useAppSelector(LD);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const dataPerPage = 4;
  const [paginatedData, setPaginatedData] = useState<Array<TSite> | null>(null);

  useEffect(() => {
    if (sites) {
      const filteredSites = sites.filter((site) => site.subdomain.length <= 20);
      const startIndex = (page - 1) * dataPerPage;
      const endIndex = startIndex + dataPerPage;
      setPaginatedData(filteredSites.slice(startIndex, endIndex));
    }
  }, [page, sites]);

  const totalPages = Math.ceil((paginatedData?.length || 0) / dataPerPage);

  const getData = async () => {
    try {
      const siteData = await dispatch(fetchSitesByUser()).unwrap();
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <ResponsiveDialog id="domain">
        <UpdateDomainForm subdomain={selectedSubdomain} />
      </ResponsiveDialog>

      <div className="px-4 py-5 sm:p-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Current Domains
        </h2>
        {isLoading ? (
          <div className="flex h-96 items-center justify-center ">
            <Loader text="Fetching Domains" />
          </div>
        ) : (
          <>
            {paginatedData?.map((site) => (
              <div
                className="flex items-center justify-between  pt-6 sm:flex"
                key={site.id}
              >
                <div className=" inline-flex items-center font-medium text-indigo-600 hover:text-indigo-500  sm:flex-none">
                  <Link
                    href={`https://${site.subdomain}.webeasy.ai`}
                    target="_blank"
                    className="group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6"
                  >
                    {`${site.subdomain}.webeasy.ai`}
                    <FaExternalLinkAlt
                      className="-ml-0.5 mr-1.5 h-4 w-4 text-indigo-600"
                      aria-hidden="true"
                    />
                  </Link>
                </div>
                <button
                  type="button"
                  className="font-semibold text-indigo-600 hover:text-indigo-500"
                  onClick={() => {
                    setIsUpdateSubdomain(true);
                    setSelectedSubdomain(site.subdomain);
                  }}
                >
                  Update
                </button>
              </div>
            ))}
            <Pagination>
              <PaginationContent>
                {page > 1 && (
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    />
                  </PaginationItem>
                )}
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={i + 1 === page}
                      onClick={() => setPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {page < totalPages && (
                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                      }
                    />
                  </PaginationItem>
                )}
              </PaginationContent>
            </Pagination>
          </>
        )}
      </div>
      <div className="px-4 py-4 sm:px-6 sm:py-5">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Custom Domain
        </h2>
        <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
          <Search placeholder="Search for a domain name..." />
          <Link
            href={"/settings/domain/search"}
            className="rounded border px-5 py-2 shadow"
          >
            Buy
          </Link>
        </div>
      </div>
      <div className="px-4 py-4 sm:px-6">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Existing Domain
        </h2>

        <div className="flex flex-wrap items-center  justify-between pt-6 sm:flex">
          <div className=" inline-flex items-center font-medium   sm:flex-none ">
            Link your existing domain name with Entri. It’s fast and secure.
            <Link
              href="/settings"
              className="group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Learn more
            </Link>
          </div>
          <button
            type="button"
            className="font-semibold text-indigo-600 hover:text-indigo-500"
          >
            Link domain
          </button>
        </div>
      </div>
    </>
  );
}
