import Image from "next/image";
import PostCard from "@/components/ui/card/post-card";
import ServiceCard from "@/components/ui/card/service-card";
import CTA from "@/components/cta";
import TopBar from "@/components/top-bar";
import { Dispatch, SetStateAction } from "react";
import {
  TBanner,
  TColors,
  TFields,
  THero,
  TPosts,
  TSection,
  TServices,
} from "@/types";
import EditableBanner from "@/components/editable/banner";
import EditableHero from "@/components/editable/hero";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState } from "../../lib/store/slices/site-slice";
import { Skeleton } from "@/components/ui/skeleton";

type BasicTemplateProps = {
  colors: TColors;
  posts: TPosts;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showForm: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};

export default function BasicTemplate(props: BasicTemplateProps) {
  const {
    colors,
    posts,
    setIsOpen,
    setSection,
    editable,
    setFocusedField,
    showForm,
    setShowForm,
  } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);

  return (
    <>
      <section className="bg-white py-6">
        <EditableBanner
          banner={appState.aiContent?.banner}
          colors={colors}
          editable={editable}
          setFocusedField={setFocusedField}
          setIsOpen={setIsOpen}
          setSection={setSection}
          showForm={showForm}
          setShowForm={setShowForm}
        />
      </section>
      <section className=" bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="rounded-3xl bg-white px-8 py-16  pb-10">
            <div className="mx-auto max-w-7xl">
              <EditableHero
                colors={colors}
                hero={appState.aiContent?.hero}
                editable={editable}
                setFocusedField={setFocusedField}
                setIsOpen={setIsOpen}
                setSection={setSection}
                showForm={showForm}
                setShowForm={setShowForm}
              />

              <div
                className={`rounded-3xl  p-8 md:p-12 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"} ${!appState.aiContent.services?.show ? "bg-transparent" : "bg-gray-100"}`}
                onClick={() => {
                  if (setIsOpen && setSection) {
                    setIsOpen(true);
                    setSection("Services");
                    dispatch(
                      updateAppState({
                        ...appState,
                        openedSlide: "Customize",
                      }),
                    );
                  }
                }}
              >
                {appState.aiContent?.services ? (
                  appState.aiContent.services?.show && (
                    <div className="-m-8 flex flex-wrap">
                      {appState.aiContent.services?.list.map((service) => (
                        <ServiceCard
                          id={service["id"]}
                          key={service["name"]}
                          name={service["name"]}
                          description={service["description"]}
                          color={colors.primary}
                          editable={editable}
                          setIsOpen={setIsOpen}
                          setSection={setSection}
                          showForm={showForm}
                          setShowForm={setShowForm}
                        />
                      ))}
                    </div>
                  )
                ) : (
                  <div className="-m-8 flex flex-wrap">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex gap-5">
                        <Skeleton className="h-10 w-10" />
                        <div className="flex flex-col gap-5">
                          <Skeleton className="h-10 w-28" />
                          <div className="flex flex-col gap-2">
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-32" />
                            <Skeleton className="h-8 w-32" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={`mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`} onClick={()=>{
        if (setIsOpen && setSection) {
          setIsOpen(true);
          setSection("Posts");
          dispatch(
            updateAppState({
              ...appState,
              openedSlide: "Customize",
            }),
          );
          setShowForm({
            form:"",
            edit:"",
            show:false,
          })
        }
      }}>
        <h2 className="sr-only">Posts</h2>
        {appState?.aiContent?.services && appState?.iPosts?.show && (
          <div className="flex flex-wrap gap-5">
            {posts.list.map(
              (post, i) =>
                posts.limit > i && (
                  <PostCard
                    key={post.id}
                    id={post.id}
                    permalink={editable ? "#" : post.permalink}
                    media_url={post.media_url}
                    media_type={post.media_type}
                    caption={post.caption}
                    timestamp={post.timestamp}
                  />
                ),
            )}
          </div>
        )}
      </div>
    </>
  );
}
