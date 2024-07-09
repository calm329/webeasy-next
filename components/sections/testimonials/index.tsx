import Image from "next/image";
import { TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppSelector } from "@/lib/store/hooks";
import CustomContent from "@/lib/content/custom";
import { useAppDispatch } from "../../../lib/store/hooks";
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
export default function TestimonialSection(props: TProps) {
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
  const dispatch = useAppDispatch();
  const handleClick = (field?: TFields) => {
    if (editable && setIsOpen && setSection) {
      setSection("TestimonialSection");
      setIsOpen(true);

      setShowForm({ form: "", edit: "", show: false });
      dispatch(
        updateAppState({
          ...appState,
          focusedField: field,
          openedSlide: "Customize",
        }),
      );
    }
  };

  useEffect(() => {
    CustomContent.getData({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "testimonialsSection",
      individual: false,
      type: "list",
    }).then(() => {
      // setContactData(data);
      // setLoading(false);
    });
  }, []);

  return (
    <button
      className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"} group relative isolate my-10 w-full  overflow-visible bg-white px-6 py-24 sm:py-32 lg:px-8`}
      onClick={() => handleClick()}
    >
      <AddSectionButtons
        sectionTitle="Testimonials"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        <Image
          height={100}
          width={100}
          alt=""
          src={appState.aiContent?.testimonialsSection?.image ?? ""}
          className={`mx-auto h-12 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"} `}
        />
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            <p
              className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"} `}
            >
              {appState.aiContent?.testimonialsSection?.message ?? ""}
            </p>
          </blockquote>
          <figcaption className="mt-10">
            <Image
              height={200}
              width={200}
              alt=""
              src={appState.aiContent?.testimonialsSection?.avatar ?? ""}
              className={`mx-auto h-10 w-10 rounded-full ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            />
            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div
                className={`font-semibold text-gray-900 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              >
                {" "}
                {appState.aiContent?.testimonialsSection?.name ?? ""}
              </div>
              <svg
                width={3}
                height={3}
                viewBox="0 0 2 2"
                aria-hidden="true"
                className="fill-gray-900"
              >
                <circle r={1} cx={1} cy={1} />
              </svg>
              <div
                className={`text-gray-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              >
                {appState.aiContent?.testimonialsSection?.role ?? ""}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </button>
  );
}
