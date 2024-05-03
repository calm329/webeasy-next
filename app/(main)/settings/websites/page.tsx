"use client";
import Loader from "@/components/loader";
import { getAccessTokenByUserId, getSitesByUserId } from "@/lib/fetchers";
import { getUsernameFromPosts } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FaExternalLinkAlt, FaInstagram } from "react-icons/fa";
import { FaAmazon, FaEdit } from "react-icons/fa";

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

export default function MyWebsites() {
  const [selectedSection, setSelectedSection] =
    useState<TSectionName>("Instagram");
  const [sites, setSites] = useState<TSites>(null);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
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
      const accessToken = await getAccessTokenByUserId(siteId);
      console.log("accessToken", accessToken);
      if (accessToken) {
        const newURLSearchParams = new URLSearchParams(searchParams);
        newURLSearchParams.set("access_token", accessToken.token);
        newURLSearchParams.set("user_id", accessToken.userId);

        router.replace(`/auth?${newURLSearchParams.toString()}`);
      }
    } catch (error) {}
  };

  return (
    <main className="px-4 py-10 sm:px-6 lg:flex-auto lg:px-0 lg:py-10">
      <div className="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            My Websites
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            This contains all the information about your websites.
          </p>
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
          </div>
          {isLoading ? (
            <div className="flex h-96 items-center justify-center ">
              <Loader text="Fetch Websites Data" />
            </div>
          ) : (
            <>
              {selectedSection === "Instagram" && (
                <div>
                  {sites?.map((site) => (
                    <div
                      key={site.id}
                      className="m-10 flex aspect-1 max-w-80 flex-col items-center justify-center rounded-lg border   shadow"
                    >
                      <Image
                        src={JSON.parse(site?.aiResult)["hero"]["imageUrl"]}
                        height={200}
                        width={500}
                        className="rounded-t-lg"
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
                </div>
              )}
              {selectedSection === "Amazon" && <div>Amazon</div>}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
