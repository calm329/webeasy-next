import { Container } from "@/components/container";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { BROKEN_IMAGE } from "@/lib/utils/common-constant";
import { TColors, TPosts, TSection } from "@/types";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

function QuoteIcon(props: React.ComponentPropsWithoutRef<"svg">) {
  return (
    <svg aria-hidden="true" width={105} height={78} {...props}>
      <path d="M25.086 77.292c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622C1.054 58.534 0 53.411 0 47.686c0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C28.325 3.917 33.599 1.507 39.324 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Zm54.24 0c-4.821 0-9.115-1.205-12.882-3.616-3.767-2.561-6.78-6.102-9.04-10.622-2.11-4.52-3.164-9.643-3.164-15.368 0-5.273.904-10.396 2.712-15.368 1.959-4.972 4.746-9.567 8.362-13.786a59.042 59.042 0 0 1 12.43-11.3C82.565 3.917 87.839 1.507 93.564 0l11.074 13.786c-6.479 2.561-11.677 5.951-15.594 10.17-3.767 4.219-5.65 7.835-5.65 10.848 0 1.356.377 2.863 1.13 4.52.904 1.507 2.637 3.089 5.198 4.746 3.767 2.41 6.328 4.972 7.684 7.684 1.507 2.561 2.26 5.5 2.26 8.814 0 5.123-1.959 9.19-5.876 12.204-3.767 3.013-8.588 4.52-14.464 4.52Z" />
    </svg>
  );
}

type TProps = {
  posts: TPosts;

  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm?: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  // colors: TColors;
};

export function Posts(props: TProps) {
  const { posts, editable, setIsOpen, setSection, setShowForm, showForm } =
    props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <section
      id="testimonials"
      aria-label="What our customers are saying"
      className="bg-slate-50 py-20 sm:py-32"
    >
      <Container
        className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
        onClick={() => {
          if (setIsOpen && setSection && setShowForm) {
            setIsOpen(true);
            setSection("Posts");
            setShowForm({
              form: "",
              edit: "",
              show: false,
            });
            dispatch(
              updateAppState({
                ...appState,
                openedSlide: "Customize",
              }),
            );
          }
        }}
      >
        <div className="mx-auto max-w-2xl md:text-center">
          <h2 className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl">
            Posts
          </h2>
        </div>
        {posts.show && (
          <ul
            role="list"
            className={`mx-auto mt-16 grid max-w-2xl gap-6 sm:gap-8 lg:mt-20 lg:max-w-none  ${appState.view === "Mobile" && "grid-cols-1"} ${appState.view === "Tablet" && "grid-cols-2"} ${appState.view === "Desktop" && "grid-cols-1 lg:grid-cols-3"}`}
          >
            {posts.list.map(
              (data, i) =>
                posts.limit > i && (
                  <li key={i} className="">
                    <ul role="list" className="flex h-full gap-y-6 sm:gap-y-8">
                      <li key={i}>
                        <figure className="relative flex h-full flex-col justify-between rounded-2xl bg-white p-6 shadow-xl shadow-slate-900/10">
                          <QuoteIcon className="absolute left-6 top-6 fill-slate-100" />
                          <blockquote className="relative">
                            <p className="text-lg tracking-tight text-slate-900">
                              {data.caption}
                            </p>
                          </blockquote>
                          <figcaption className="relative mt-6 flex items-center justify-between border-t border-slate-100 pt-6">
                            <div className="overflow-hidden rounded-full bg-slate-50">
                              <Image
                                className="h-14 w-14 object-cover"
                                src={data.media_url || BROKEN_IMAGE}
                                alt=""
                                width={56}
                                height={56}
                              />
                            </div>
                          </figcaption>
                        </figure>
                      </li>
                    </ul>
                  </li>
                ),
            )}
          </ul>
        )}
      </Container>
    </section>
  );
}
