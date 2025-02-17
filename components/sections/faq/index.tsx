import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";
import AddSectionButtons from "@/components/add-section/buttons";
import { TFields, TSection, TSectionsType } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import CustomContent from "@/lib/content/custom";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
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

export default function FaqSection(props: TProps) {
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
  const [loading, setLoading] = useState(false); // Add loading state

  const handleClick = (field?: TFields) => {
    if (editable && setIsOpen && setSection) {
      setSection("Faq");
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
    CustomContent.getFAQ({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "faq",
      individual: false,
      type: "list",
    }).then(() => {
      // setContactData(data);
      setLoading(false); // Set loading to false when data is fetched
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
      contentContainer: "mx-auto max-w-4xl divide-y divide-gray-900/10",
      listContainer: "",
      container: "mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40",
      listCard: "",
    },
    2: {
      contentContainer: "ml-auto mr-0 max-w-4xl divide-y divide-gray-900/10",
      listContainer: "",
      container: "mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40",
      listCard: "",
    },
    3: {
      contentContainer: "mr-auto ml-0 max-w-4xl divide-y divide-gray-900/10",
      listContainer: "",
      container: "mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40",
      listCard: "",
    },
    4: {
      contentContainer:
        "mx-auto items-center gap-10 flex w-full max-w-4xl divide-y divide-gray-900/10",
      listContainer: "",
      container: "mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40",
      listCard: "",
    },
    5: {
      contentContainer: "mx-auto max-w-4xl divide-y divide-gray-900/10",
      listContainer: "",
      container: "mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40",
      listCard: "",
    },
  };

  const { container, listContainer, listCard, contentContainer } =
    styles[variation];

  return (
    <button
      className={`group relative w-full  bg-white text-left ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => handleClick()}
    >
      <EditComponent id={id} />
      <AddSectionButtons
        id={id}
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className={container}>
        <div className={contentContainer}>
          <h2
            className={`text-2xl font-bold leading-10 tracking-tight text-gray-900 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick("title");
            }}
          >
            {loading ? (
              <Skeleton className="mb-4 h-8  w-3/4" />
            ) : (
              appState.aiContent?.faq?.title ?? ""
            )}
          </h2>
          <dl className={`mt-10 w-full space-y-6 divide-y divide-gray-900/10`}>
            {loading
              ? Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div key={index} className="pt-6">
                      <Skeleton className="mb-2 h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  ))
              : (appState.aiContent?.faq?.list ?? []).map((faq: any) => (
                  <Disclosure key={faq.id} as="div" className={`pt-6`}>
                    <dt>
                      <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                        <span className="text-base font-semibold leading-7">
                          {faq.question}
                        </span>
                        <span className="ml-6 flex h-7 items-center">
                          <PlusSmallIcon
                            aria-hidden="true"
                            className="h-6 w-6 group-data-[open]:hidden"
                          />
                          <MinusSmallIcon
                            aria-hidden="true"
                            className="h-6 w-6 [.group:not([data-open])_&]:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </dt>
                    <DisclosurePanel as="dd" className="mt-2 pr-12">
                      <p className="text-base leading-7 text-gray-600">
                        {faq.answer}
                      </p>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
          </dl>
        </div>
      </div>
    </button>
  );
}
