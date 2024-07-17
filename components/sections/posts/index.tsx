import React, { Dispatch, SetStateAction } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import PostCard from "@/components/ui/card/post-card";
import { TSection } from "@/types";
import EditComponent from "@/components/edit-component";

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
};

const PostsSection = (props: TProps) => {
  const appState = useAppSelector(AS);
  const { editable, setIsOpen, setSection, setShowForm } = props;
  const dispatch = useAppDispatch();
  return (
    <section className="relative group">
      <EditComponent />
      {appState.iPosts.list.length > 0 && (
        <button
          className={`mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8  ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
          onClick={() => {
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
                form: "",
                edit: "",
                show: false,
              });
            }
          }}
        >
          <h2 className="sr-only">Posts</h2>
          {appState?.iPosts?.show && (
            <div className="flex flex-wrap gap-5">
              {appState?.iPosts?.list.map(
                (post, i) =>
                  appState?.iPosts?.limit > i && (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      permalink={editable ? "#" : post.permalink}
                      media_url={post.media_url}
                      media_type={post.media_type}
                      caption={post.caption}
                      timestamp={post.timestamp}
                      showHash={appState?.iPosts?.showHash}
                    />
                  ),
              )}
            </div>
          )}
        </button>
      )}
    </section>
  );
};

export default PostsSection;
