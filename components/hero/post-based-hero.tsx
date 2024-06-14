import Image from "next/image";

import { Button } from "../ui/button/template-button";
import { Container } from "../container";
import { TColors, THero, TSection } from "@/types";
import { Dispatch, SetStateAction } from "react";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
type TProps = {
  hero: THero;
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
  colors: TColors;
};
export function Hero(props: TProps) {
  const {
    hero,
    colors,
    editable,
    setIsOpen,
    setSection,
    setShowForm,
    showForm,
  } = props;
  const dispatch = useAppDispatch();
  const appState = useAppSelector(AS);
  return (
    <Container
      className={`flex gap-5 pb-16 pt-20 text-center max-lg:flex-col lg:pt-32 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"} ${appState.view==="Mobile"||"Tablet"?"flex-col-reverse justify-center items-center":""}`}
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
          src={hero.image.imageUrl}
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
      <div>
        <h1
          className={`font-display ml-auto max-w-4xl text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
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
          {hero.heading}
        </h1>
        <p
          className={`mx-auto mt-6 max-w-2xl text-lg tracking-tight text-slate-700 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
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
        {hero.button.show && (
          <div
            className={`mx-auto ml-0 mt-10 flex justify-center gap-x-6 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
          >
            {hero.button.list.map((data, i) => (
              <div key={i}>
                <Button
                  href={data.value ?? "#"}
                  text={data.label}
                  bgColor={colors.secondary}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </Container>
  );
}
