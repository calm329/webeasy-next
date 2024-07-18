import Image from "next/image";
import { TFields, TSection, TSectionsType } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppSelector } from "@/lib/store/hooks";
import CustomContent from "@/lib/content/custom";
import { useAppDispatch } from "../../../lib/store/hooks";

// Import the Skeleton component
import { Skeleton } from "@/components/ui/skeleton";
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
  setSectionModal: React.Dispatch<SetStateAction<boolean>>;
  setTriggerSection: React.Dispatch<
    SetStateAction<{ section: string; position: number }>
  >;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setSections: Dispatch<SetStateAction<TSectionsType[]>>
  sections:TSectionsType[]
  id:string
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
    setSections,
    sections,
    id,
  } = props;

  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(true); // State to manage loading state

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
    CustomContent.getTestimonialsSection({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "testimonialsSection",
      individual: false,
      type: "list",
    }).then(() => {
      setLoading(false); // Set loading to false when data fetch completes
    });
  }, []);

  return (
    <button
      className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"} group relative isolate my-10 w-full overflow-visible bg-white px-6 py-24 sm:py-32 lg:px-8`}
      onClick={() => handleClick()}
    >
      <EditComponent id={id} sections={sections} setSections={setSections}/>
      <AddSectionButtons
        id={id}
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />

      <div className="mx-auto max-w-2xl lg:max-w-4xl">
        {/* Image with conditional rendering for skeleton */}
        {isLoading ? (
          <Skeleton className="mx-auto h-12 w-12" />
        ) : (
          <Image
            height={100}
            width={100}
            alt=""
            src={appState.aiContent?.testimonialsSection?.image ?? ""}
            className={`mx-auto h-12 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"} `}
          />
        )}
        <figure className="mt-10">
          <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
            {/* Testimonial message with conditional rendering for skeleton */}
            {isLoading ? (
              <Skeleton className="h-16 w-full" />
            ) : (
              <p
                className={`${editable && "rounded border-2 border-transparent hover:border-indigo-500"} `}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick("message");
                }}
              >
                {appState.aiContent?.testimonialsSection?.message ?? ""}
              </p>
            )}
          </blockquote>
          <figcaption className="mt-10">
            {isLoading ? (
              <Skeleton className="mx-auto h-12 w-12 rounded-full" />
            ) : (
              <Image
                height={200}
                width={200}
                alt=""
                src={appState.aiContent?.testimonialsSection?.avatar ?? ""}
                className={`mx-auto h-10 w-10 rounded-full ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              />
            )}

            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
              <div
                className={`font-semibold text-gray-900 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick("name");
                }}
              >
                {" "}
                {/* Testimonial name with conditional rendering for skeleton */}
                {isLoading ? (
                  <Skeleton className="h-6 w-24" />
                ) : (
                  appState.aiContent?.testimonialsSection?.name ?? ""
                )}
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
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick("role");
                }}
              >
                {/* Testimonial role with conditional rendering for skeleton */}
                {isLoading ? (
                  <Skeleton className="h-4 w-16" />
                ) : (
                  appState.aiContent?.testimonialsSection?.role ?? ""
                )}
              </div>
            </div>
          </figcaption>
        </figure>
      </div>
    </button>
  );
}
