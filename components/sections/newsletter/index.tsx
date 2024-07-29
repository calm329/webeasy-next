import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CustomContent from "@/lib/content/custom";
import { TFields, TSection, TSectionsType } from "@/types";
import { Dispatch, SetStateAction } from "react";

import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component here
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import EditComponent from "@/components/edit-component";
import { sectionsData as SD } from "@/lib/store/slices/section-slice";

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

  id: string;
};

export default function NewsLetterSection(props: TProps) {
  const {
    editable,
    setIsOpen,
    setSection,
    setShowForm,
    setSectionModal,
    setTriggerSection,
    showForm,

    id,
  } = props;

  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const [isLoading, setLoading] = useState(true); // State to manage loading state

  const handleClick = (field?: TFields) => {
    if (editable && setIsOpen && setSection) {
      setSection("newsLetter");
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
    // Simulating data fetching
    CustomContent.getNewsLetter({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "newsLetter",
      individual: false,
      type: "list",
    }).then(() => {
      setLoading(false); // Set loading to false when data fetch completes
    });
  }, []);

  const sections = useAppSelector(SD);

  // Find the section by ID and get the variation
  const section = sections.find((section) => section.id === id);
  const variation = section?.variation || 1;

  const styles: {
    [key: number]: {
      container: string;
      listContainer: string;
      contentContainer: string;
      listCard: string;
    };
  } = {
    1: {
      contentContainer: "",
      listContainer: "",
      container:
        "mx-auto flex justify-between items-center max-w-7xl  gap-10 px-6 flex-wrap  lg:gap-8 lg:px-8",
      listCard: "",
    },
    2: {
      contentContainer: "",
      listContainer: "",
      container:
        "mx-auto max-w-7xl flex-row-reverse gap-10 px-6 flex justify-between items-center flex-wrap  lg:gap-8 lg:px-8",
      listCard: "",
    },
    3: {
      contentContainer: "",
      listContainer: "",
      container:
        "mx-auto max-w-7xl flex-col-reverse gap-10 px-6 flex justify-between items-center flex-wrap  lg:gap-8 lg:px-8",
      listCard: "",
    },
    4: {
      contentContainer: "",
      listContainer: "",
      container:
        "mx-auto max-w-7xl flex-col gap-10 px-6 flex justify-between items-center flex-wrap  lg:gap-8 lg:px-8",
      listCard: "",
    },
    5: {
      contentContainer: "",
      listContainer: "",
      container:
        "mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8",
      listCard: "",
    },
  };

  const { container, listContainer, listCard, contentContainer } =
    styles[variation];

  return (
    <button
      className={`group relative w-full bg-white py-16 text-left sm:py-24 lg:py-32 ${
        editable &&
        "rounded border-2 border-transparent hover:border-indigo-500"
      }`}
      onClick={() => handleClick()}
    >
      <EditComponent id={id} />
      <AddSectionButtons
        id={id}
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className={container}>
        <div className="flex max-w-xl flex-col gap-5 tracking-tight text-gray-900  lg:col-span-7">
          <h2
            className={`inline  text-3xl font-bold sm:block sm:text-4xl lg:inline xl:block ${
              editable &&
              "rounded border-2 border-transparent hover:border-indigo-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick("title");
            }}
          >
            {isLoading ? ( // Conditional rendering based on loading state
              <Skeleton className="h-8 w-48" /> // Example skeleton size
            ) : (
              appState.aiContent?.newsLetter?.title ?? ""
            )}
          </h2>{" "}
          <p
            className={`inline sm:block lg:inline xl:block ${
              editable &&
              "rounded border-2 border-transparent hover:border-indigo-500"
            }`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick("description");
            }}
          >
            {isLoading ? ( // Conditional rendering based on loading state
              <Skeleton className="mt-2 h-6 w-96" /> // Example skeleton size
            ) : (
              appState.aiContent?.newsLetter?.description ?? ""
            )}
          </p>
        </div>
        <form className="w-full max-w-md lg:col-span-5 lg:pt-2">
          <div className="flex gap-x-4">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              autoComplete="email"
              className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="flex-none rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Subscribe
            </button>
          </div>
        </form>
      </div>
    </button>
  );
}
