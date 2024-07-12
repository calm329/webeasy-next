import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CustomContent from "@/lib/content/custom";
import { TFields, TSection } from "@/types";
import { Dispatch, SetStateAction } from "react";

import {Skeleton} from "@/components/ui/skeleton"; // Import the Skeleton component here
import { appState as AS, updateAppState } from '@/lib/store/slices/site-slice';

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

export default function NewsLetterSection(props: TProps) {
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
        })
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

  return (
    <button
      className={`group relative w-full text-left bg-white py-16 sm:py-24 lg:py-32 ${
        editable && "rounded border-2 border-transparent hover:border-indigo-500"
      }`}
      onClick={() => handleClick()}
    >
      <AddSectionButtons
        sectionTitle="NewsLetters"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl tracking-tight text-gray-900 flex flex-col gap-5  lg:col-span-7">
          <h2
            className={`inline  text-3xl sm:text-4xl font-bold sm:block lg:inline xl:block ${
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
              <Skeleton className="h-6 w-96 mt-2" /> // Example skeleton size
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
