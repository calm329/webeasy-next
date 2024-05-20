"use client";
import Loader from "@/components/ui/loader";
import { getAccessTokenBySiteId, getSitesByUserId } from "@/lib/fetchers";
import { useAppDispatch } from "@/lib/store/hooks";
import { fetchAccessToken } from "@/lib/store/slices/accesstoken-slice";
import { getUsernameFromPosts } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaInstagram } from "react-icons/fa";
import { FaAmazon, FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import SelectSourceModal from "../modal/select-source-modal";

type TSectionObject = Array<{
  logo: React.ReactNode;
  name: TSectionName;
  // href: string;
}>;
const sections: TSectionObject = [
  {
    logo: <FaInstagram />,
    name: "Instagram",
  },
  {
    logo: <FaAmazon />,
    name: "Amazon",
  },
];
type TSectionName = "Instagram" | "Amazon";

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
}> | null;

export default function WebsitesForm() {
  const [selectedSection, setSelectedSection] =
    useState<TSectionName>("Instagram");
  const [sites, setSites] = useState<TSites>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showMobileMenu, setMobileMenuOpen] = useState(false);
  const [showSelectSourceModal, setSelectSourceModal] = useState(false);
  const dispatch = useAppDispatch();
  const getData = async () => {
    try {
      setIsLoading(true);
      const siteData = await getSitesByUserId();
      console.log("sites", siteData);

      setSites(siteData);

      setIsLoading(false);
    } catch (error) {}
  };

  useEffect(() => {
    getData();
  }, []);

  const redirectToAuth = async (siteId: string) => {
    try {
      const accessToken = await getAccessTokenBySiteId(siteId);
      const res = await dispatch(fetchAccessToken({ siteId })).unwrap();

      console.log("accessToken", res);
      if (accessToken) {
        const newURLSearchParams = new URLSearchParams(searchParams);
        newURLSearchParams.set("access_token", accessToken.token);
        newURLSearchParams.set("user_id", accessToken.userId);

        router.replace(`/auth?${newURLSearchParams.toString()}`);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="border-b border-gray-200 ">
          <nav className=" flex " aria-label="Tabs">
            {sections.map((section) => (
              <button
                key={section.name}
                className={`group inline-flex items-center border-b-2  px-1 py-4 text-sm font-medium ${selectedSection === section.name ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center gap-2`}
                onClick={() => setSelectedSection(section.name)}
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
        <>
          {selectedSection === "Instagram" && (
            <div className="flex flex-wrap gap-10 px-5 pt-10">
              {sites?.map((site) => (
                <div
                  key={site.id}
                  className=" flex  max-w-80 flex-col items-center justify-center rounded-lg border   shadow"
                >
                  <Image
                    src={JSON.parse(site?.aiResult)["hero"]["imageUrl"]}
                    height={200}
                    width={500}
                    className="cover rounded-t-lg"
                    alt=""
                  />
                  <div className="flex flex-col gap-5 p-5">
                    <div className="flex flex-col gap-2 ">
                      <h2 className="line-clamp-1 text-xl font-bold">
                        {site?.title}
                      </h2>
                      <p className="line-clamp-3 text-sm">
                        {site?.description}
                      </p>
                    </div>

                    <div className="flex gap-5">
                      <button
                        className="text-500 inline-flex w-full items-center justify-center gap-x-1.5 rounded-md bg-indigo-600 px-5 py-1 text-sm font-semibold text-white hover:bg-indigo-500"
                        onClick={() => redirectToAuth(site.id)}
                      >
                        <FaEdit />
                        Edit
                      </button>
                      <Link
                        href={`https://${site.subdomain}.webeasy.ai`}
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
              <div className=" flex  w-80 max-w-80 flex-col items-center justify-center rounded-lg border   shadow">
                <button
                  type="button"
                  onClick={() => {
                    setSelectSourceModal(true), setMobileMenuOpen(false);
                  }}
                >
                  <IoMdAdd size={100} />
                </button>
              </div>
              <SelectSourceModal
                open={showSelectSourceModal}
                setOpen={setSelectSourceModal}
              />
            </div>
          )}
          {selectedSection === "Amazon" && <div>Amazon</div>}
        </>
      )}
    </div>
  );
}
