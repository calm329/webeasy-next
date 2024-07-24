import Loader from "@/components/ui/loader";
import { getAccessTokenBySiteId, getSitesByUserId } from "@/lib/fetchers";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { fetchAccessToken } from "@/lib/store/slices/accesstoken-slice";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaInstagram } from "react-icons/fa";
import { FaAmazon, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import SelectSourceModal from "../modal/select-source-modal";
import {
  appState as AS,
  deleteSite,
  fetchSitesByUser,
  loading as LD,
  sitesData as SD,
  updateAppState,
} from "@/lib/store/slices/site-slice";
import { BsTrash3 } from "react-icons/bs";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../pagination";
import {
  setSelectedTemplate,
  TemplatesData as TD,
} from "@/lib/store/slices/template-slice";
import Image from "next/image";
import Link from "next/link";
import ResponsiveDialog from "../responsive-dialog/index";
import DeleteContent from "@/components/delete-content";
import { useResponsiveDialog } from "@/lib/context/responsive-dialog-context";

type TSectionObject = Array<{
  logo: React.ReactNode;
  name: TSectionName;
}>;
const sections: TSectionObject = [
  {
    logo: "",
    name: "All",
  },
  {
    logo: <FaInstagram />,
    name: "Instagram",
  },
  {
    logo: <FaAmazon />,
    name: "Amazon",
  },
  {
    logo: "",
    name: "Custom",
  },
];
type TSectionName = "Instagram" | "Amazon" | "Custom" | "All";

type TSites = Array<{
  id: string;
  subdomain: string;
  title: string;
  description: string;
  userId: string | null;
  templateId: string;
  logo: string | null;
  posts: any;
  aiResult: any;
  createdAt: Date;
  updatedAt: Date;
  type: string;
}> | null;

const sortByCreatedAtDescending = (sites: TSites) => {
  return sites
    ?.slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
};

export default function WebsitesForm() {
  const [selectedSection, setSelectedSection] = useState<TSectionName>("All");
  const searchParams = useSearchParams();
  const router = useRouter();
  const sites = useAppSelector(SD);
  const isLoading = useAppSelector(LD);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const dataPerPage = 6;
  const [paginatedData, setPaginatedData] = useState<TSites>(null);
  const { openDialog } = useResponsiveDialog();
  const [selectedItemId, setSelectedItemId] = useState("");
  const pathname = usePathname();
  const templates = useAppSelector(TD);
  const appState = useAppSelector(AS);

  useEffect(() => {
    if (sites) {
      const filteredSites =
        selectedSection === "All"
          ? sites
          : sites.filter((site) => site.type === selectedSection);
      const sortedSites = sortByCreatedAtDescending(filteredSites) ?? [];
      const startIndex = (page - 1) * dataPerPage;
      const endIndex = startIndex + dataPerPage;
      setPaginatedData(sortedSites.slice(startIndex, endIndex));
    }
  }, [page, sites, selectedSection, isLoading]);

  const getData = async () => {
    try {
      const siteData = await dispatch(fetchSitesByUser()).unwrap();
      console.log("siteData", siteData);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const redirectToAuth = async (siteId: string) => {
    try {
      const accessToken = await getAccessTokenBySiteId(siteId);
      const res = await dispatch(fetchAccessToken({ siteId })).unwrap();

      if (accessToken) {
        const newURLSearchParams = new URLSearchParams(searchParams);
        newURLSearchParams.set("access_token", accessToken.token);
        newURLSearchParams.set("user_id", accessToken.userId);

        router.replace(`/auth?${newURLSearchParams.toString()}`);
      }
    } catch (error) {}
  };

  const totalPages = Math.ceil(
    (sites?.filter(
      (site) => selectedSection === "All" || site.type === selectedSection,
    ).length || 0) / dataPerPage,
  );

  const handleDelete = (siteId: string) => {
    dispatch(deleteSite({ id: siteId }));
  };

  return (
    <div className="">
      <ResponsiveDialog id="delete">
        <DeleteContent
          action={() => handleDelete(selectedItemId)}
          data="site"
        />
      </ResponsiveDialog>
      <div className="">
        <div className="border-b border-gray-200 ">
          <nav className="flex" aria-label="Tabs">
            {sections.map((section) => (
              <button
                key={section.name}
                className={`inline-flex items-center border-b-2 px-1 py-4 text-sm font-medium ${selectedSection === section.name ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center gap-2`}
                onClick={() => {
                  setSelectedSection(section.name);
                  setPage(1);
                }}
              >
                {section.logo}
                <span>{section.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {isLoading ? (
        <div className="flex h-96 items-center justify-center ">
          <Loader text="Fetching Websites Data" />
        </div>
      ) : (
        <div className="flex flex-wrap gap-10 px-5 pt-10">
          {paginatedData?.map((site) => (
            <div
              key={site.id}
              className="relative flex max-w-80 flex-col items-center justify-between rounded-lg border shadow"
            >
              <button
                className="z-1 absolute right-2 top-2 rounded-full bg-white p-2"
                onClick={() => {
                  setSelectedItemId(site.id);
                  openDialog("delete");
                }}
              >
                <BsTrash3 color="red" />
              </button>
              <div className="flex h-full min-h-72 w-full items-center justify-center overflow-hidden rounded-t-lg">
                <iframe
                  src={
                    site.type === "Amazon"
                      ? "/preview/amazon?preview_site=" + site.id
                      : "/preview?preview_site=" + site.id
                  }
                  height={500}
                  width={500}
                  // className="scale-50"
                  // alt=""
                  title="preview"
                  allowFullScreen
                />
              </div>
              <div className="flex flex-col gap-5 p-5">
                <div className="flex flex-col gap-2 ">
                  <h2 className="line-clamp-1 text-xl font-bold">
                    {site?.title}
                  </h2>
                  <p className="text-sm">{site?.description}</p>
                </div>

                <div className="flex gap-5">
                  <button
                    className="text-500 inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-5 py-1 text-sm font-semibold text-white hover:bg-indigo-500"
                    onClick={() => {
                      if (templates) {
                        dispatch(setSelectedTemplate(templates[0]));
                      }
                      dispatch(
                        updateAppState({
                          ...appState,
                          view: "Desktop",
                        }),
                      );
                      switch (site.type) {
                        case "Custom":
                          router.push("/custom/" + site.id);
                          break;
                        case "Instagram":
                          redirectToAuth(site.id);
                          break;
                        case "Amazon":
                          router.push("/amazon/" + site.id);
                          break;
                      }
                    }}
                  >
                    <FaEdit />
                    Edit
                  </button>
                  <Link
                    href={
                      site.type === "Amazon"
                        ? "/preview/amazon?preview_site=" + site.id
                        : "/preview?preview_site=" + site.id
                    }
                    target="_blank"
                    className="text-500 inline-flex w-full items-center justify-center gap-x-1.5 rounded-md border-2 border-gray-400 bg-white px-5 py-1 text-sm font-semibold hover:bg-gray-100"
                  >
                    <FaExternalLinkAlt />
                    Preview
                  </Link>
                </div>
              </div>
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
        </div>
      )}
    </div>
  );
}
