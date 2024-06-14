import { Button } from "../ui/button/template-button";
import { Container } from "../container";
import clsx from "clsx";
import Image from "next/image";
import { TColors, TFields, THero, TSection } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export function BackgroundImage({
  className,
  position = "left",
}: {
  className?: string;
  position?: "left" | "right";
}) {
  return (
    <div
      className={clsx(
        "absolute inset-0 overflow-hidden bg-indigo-50",
        className,
      )}
    >
      <Image
        className={clsx(
          "absolute top-0",
          position === "left" &&
            "left-0 translate-x-[-55%] translate-y-[-10%] -scale-x-100 sm:left-1/2 sm:translate-x-[-98%] sm:translate-y-[-6%] lg:translate-x-[-106%] xl:translate-x-[-122%]",
          position === "right" &&
            "left-full -translate-x-1/2 sm:left-1/2 sm:translate-x-[-20%] sm:translate-y-[-15%] md:translate-x-0 lg:translate-x-[5%] lg:translate-y-[4%] xl:translate-x-[27%] xl:translate-y-[-8%]",
        )}
        src={"/images/background.jpg"}
        alt=""
        width={918}
        height={1495}
        priority
        unoptimized
      />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white" />
    </div>
  );
}

type TProps = {
  hero: THero;
  colors: TColors;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  editable?: boolean;
  setFocusedField?: Dispatch<SetStateAction<TFields>>;
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
};

export function Hero(props: TProps) {
  const { hero, colors, setIsOpen, setSection, setShowForm, editable } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <div className="relative py-20 sm:pb-24 sm:pt-36 ">
      <BackgroundImage className="-bottom-14 -top-36 max-sm:-top-48" />
      <Container
        className={`relative flex ${appState.view==="Tablet"|| appState.view==="Mobile"?"flex-col-reverse justify-center items-center":""} max-lg:flex-col-reverse ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
        onClick={() => {
          if (editable && setIsOpen && setSection && setShowForm) {
            setSection("Hero");
            setIsOpen(true);
            dispatch(updateAppState({ ...appState, openedSlide: "Customize" }));
            setShowForm({
              show: false,
              edit: "",
              form: "",
            });
          }
        }}
      >
        {hero.image.show && (
          <Image
            src={appState.aiContent.hero?.image?.imageUrl ?? ""}
            alt=""
            height={400}
            width={300}
            className={`mt-5 rounded-lg object-contain drop-shadow max-lg:mx-auto ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            onClick={() => {
              if (editable && setIsOpen && setSection && setShowForm) {
                setSection("Hero");
                setIsOpen(true);
                setShowForm({
                  form: "",
                  edit: "",
                  show: false,
                });
              }
            }}
          />
        )}
        <div className={`ml-auto max-w-2xl ${appState.view === "Desktop"&&"max-lg:mx-auto lg:max-w-4xl lg:px-12"} `}>
          <h1
            className={`font-display text-5xl font-bold tracking-tighter text-blue-600 sm:text-7xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            style={{ color: colors.primary }}
            onClick={(e) => {
              e.stopPropagation();
              if (editable && setIsOpen && setSection && setShowForm) {
                setSection("Hero");
                setIsOpen(true);
                setShowForm({
                  form: "",
                  edit: "",
                  show: false,
                });
                dispatch(
                  updateAppState({
                    ...appState,
                    focusedField: "heading",
                    openedSlide: "Customize",
                  }),
                );
              }
            }}
          >
            <span className="sr-only">DeceptiConf - </span>
            {hero.heading}
          </h1>
          <div className="font-display mt-6 space-y-6 text-2xl tracking-tight text-blue-900">
            <p
              className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              onClick={(e) => {
                e.stopPropagation();
                if (editable && setIsOpen && setSection && setShowForm) {
                  setSection("Hero");
                  setIsOpen(true);
                  setShowForm({
                    form: "",
                    edit: "",
                    show: false,
                  });
                  dispatch(
                    updateAppState({
                      ...appState,
                      focusedField: "subheading",
                      openedSlide: "Customize",
                    }),
                  );
                }
              }}
            >
              {hero.subheading}
            </p>
          </div>
          {hero.button.show && (
            <div
              className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"} flex gap-5 `}
              onClick={() => {
                if (editable && setIsOpen && setSection) {
                  setSection("Hero");
                  setIsOpen(true);
                }
              }}
            >
              {hero.button.list.map((data, i) => (
                <div key={i} className="w-full">
                  <Button
                    href={data.value ?? "#"}
                    text={data.label}
                    bgColor={colors.secondary}
                    className="mt-10 w-full "
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
