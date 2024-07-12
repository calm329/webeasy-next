import AddSectionButtons from "@/components/add-section/buttons";
import CustomContent from "@/lib/content/custom";
import { TSection } from "@/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { appState as AS } from "@/lib/store/slices/site-slice";
import { useAppSelector } from "@/lib/store/hooks";
import { Skeleton } from "@/components/ui/skeleton";

const posts = [
  // Your initial posts data
];

type TProps = {
  editable?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  setShowForm: React.Dispatch<
    SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  setSectionModal: React.Dispatch<SetStateAction<boolean>>;
  setTriggerSection: React.Dispatch<
    SetStateAction<{ section: string; position: number }>
  >;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
};

export default function BlogSection(props: TProps) {
  const {
    editable,
    setIsOpen,
    setSection,
    setShowForm,
    setSectionModal,
    setTriggerSection,
    showForm,
  } = props;
  const appState = useAppSelector(AS);
  const [loading, setLoading] = useState(true);
  // const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    CustomContent.getBlogs({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "blog",
      individual: false,
      type: "list",
    }).then((data) => {
      // setBlogs(data);
      setLoading(false);
    });
  }, []);

  return (
    <div
      className={`group relative bg-white py-24 sm:py-32 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
    >
      <AddSectionButtons
        sectionTitle="Blog"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
          >
            {loading ? (
              <Skeleton className="h-8 w-3/4" />
            ) : (
              appState.aiContent?.blog?.title ?? ""
            )}
          </h2>
          <p
            className={`mt-2 text-lg leading-8 text-gray-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
          >
            {loading ? (
              <Skeleton className="h-6 w-full" />
            ) : (
              appState.aiContent?.blog?.description ?? ""
            )}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {loading
            ? Array(3)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start justify-between"
                  >
                    <div className="relative w-full">
                      <Skeleton className="h-52 w-full rounded-2xl" />
                    </div>
                    <div className="max-w-xl">
                      <div className="mt-8 flex items-center gap-x-4 text-xs">
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-20 rounded-full" />
                      </div>
                      <div className="group relative">
                        <Skeleton className="mt-3 h-6 w-full" />
                        <Skeleton className="mt-5 h-16 w-full" />
                      </div>
                      <div className="relative mt-8 flex items-center gap-x-4">
                        <Skeleton className="h-10 w-10 rounded-full" />
                        <div className="text-sm leading-6">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
            : appState.aiContent?.blog?.posts?.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col items-start justify-between"
                >
                  <div
                    className={`relative w-full ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                  >
                    <Image
                      height={200}
                      width={200}
                      alt=""
                      src={post.imageUrl}
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="max-w-xl">
                    <div className="mt-8 flex items-center gap-x-4 text-xs">
                      <time
                        dateTime={post.datetime}
                        className={`text-gray-500 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                      >
                        {post.date}
                      </time>
                      <a
                        href={post.category.href}
                        className={`relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                      >
                        {post.category.title}
                      </a>
                    </div>
                    <div className="group relative">
                      <h3
                        className={`mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                      >
                        <a href={post.href}>
                          <span className="absolute inset-0" />
                          {post.title}
                        </a>
                      </h3>
                      <p
                        className={`mt-5  text-sm leading-6 text-gray-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                      >
                        {post.description}
                      </p>
                    </div>
                    <div className="relative mt-8 flex items-center gap-x-4">
                      <Image
                        height={100}
                        width={100}
                        alt=""
                        src={post.author.imageUrl}
                        className={`h-10 w-10 rounded-full bg-gray-100 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                      />
                      <div className="text-sm leading-6">
                        <p className={`font-semibold text-gray-900 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}>
                          <a href={post.author.href}>
                            <span className="absolute inset-0" />
                            {post.author.name}
                          </a>
                        </p>
                        <p className={`text-gray-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}>{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
        </div>
      </div>
    </div>
  );
}
