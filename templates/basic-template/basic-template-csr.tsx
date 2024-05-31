import Image from "next/image";
import PostCard from "@/components/ui/card/post-card";
import ServiceCard from "@/components/ui/card/service-card";
import CTA from "@/components/cta";
import TopBar from "@/components/top-bar";
import { Dispatch, SetStateAction } from "react";
import { TBanner, TColors, TFields, THero, TPosts, TSection } from "@/types";
import EditableBanner from "@/components/editable/banner";
import EditableHero from "@/components/editable/hero";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState } from "../../lib/store/slices/site-slice";

type BasicTemplateProps = {
  hero: THero;
  banner: TBanner;
  colors: TColors;
  services: any[];
  posts: TPosts;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
  showForm: {
    form:string,
    edit: string;
    show: boolean;
  };
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form:string,
      edit: string;
      show: boolean;
    }>
  >;
};

export default function BasicTemplate(props: BasicTemplateProps) {
  const {
    hero,
    banner,
    colors,
    services,
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
          banner={banner}
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
                hero={hero}
                editable={editable}
                setFocusedField={setFocusedField}
                setIsOpen={setIsOpen}
                setSection={setSection}
                showForm={showForm}
                setShowForm={setShowForm}
              />

              <div
                className={`rounded-3xl bg-gray-100 p-8 md:p-12 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
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
                {appState.aiContent.services.show && (
                  <div className="-m-8 flex flex-wrap">
                    {appState.aiContent.services.list.map((service) => (
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
 
        }
      }}>
        <h2 className="sr-only">Posts</h2>
       { appState.iPosts.show && 
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {posts.list.map((post,i) => (
            posts.limit > i &&
            <PostCard
              key={post.id}
              id={post.id}
              permalink={editable?"#":post.permalink}
              media_url={post.media_url}
              media_type={post.media_type}
              caption={post.caption}
              timestamp={post.timestamp}
            />
          ))}
        </div>}
      </div>
    </>
  );
}
