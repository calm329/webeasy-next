import Link from "next/link";
import { TFields, TSection, TSectionsType } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import CustomContent from "@/lib/content/custom";
import { useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useDispatch } from "react-redux";
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

export default function CtaSection(props: TProps) {
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
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const handleClick = (field: TFields) => {
    if (editable && setIsOpen && setSection) {
      setSection("CTA");
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
    CustomContent.getCTA({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "cta",
      individual: false,
      type: "list",
    }).then((data) => {
      // setBlogs(data);
      setLoading(false);
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
      container: "mx-auto max-w-2xl text-center",
      listContainer: "",
      contentContainer: "",
      listCard: "",
    },
    2: {
      container: "ml-auto mr-0 max-w-2xl text-center",
      listContainer: "",
      contentContainer: "",
      listCard: "",
    },
    3: {
      container: "ml-0 mr-auto max-w-2xl text-center",
      listContainer: "",
      contentContainer: "",
      listCard: "",
    },
    4: {
      container: "mx-auto max-w-2xl text-center",
      listContainer: "",
      contentContainer: " ",
      listCard: "",
    },
    5: {
      container: "mx-auto max-w-2xl text-center",
      listContainer: "",
      contentContainer: "",
      listCard: "",
    },
  };

  const { container, listContainer, listCard, contentContainer } =
    styles[variation];

  return (
    <button
      className={`group relative w-full bg-white ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => handleClick("")}
    >
      <EditComponent id={id} />
      <AddSectionButtons
        id={id}
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="px-6 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className={container}>
          {loading ? (
            <>
              <Skeleton className="mx-auto mb-4 h-8 w-3/4" />
              <Skeleton className="mx-auto mb-8 h-6 w-1/2" />
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Skeleton className="mx-2 h-10 w-24" />
                <Skeleton className="mx-2 h-10 w-24" />
              </div>
            </>
          ) : (
            <>
              <h2
                className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick("title");
                }}
              >
                {appState.aiContent?.cta?.title ?? ""}
              </h2>
              <p
                className={`mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick("description");
                }}
              >
                {appState.aiContent?.cta?.description ?? ""}
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="#"
                  className={`rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                >
                  {appState.aiContent?.cta?.button?.label ?? ""}
                </Link>
                <Link
                  href="#"
                  className={`text-sm font-semibold leading-6 text-gray-900 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                >
                  {appState.aiContent?.cta?.link?.label ?? ""}{" "}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </button>
  );
}
