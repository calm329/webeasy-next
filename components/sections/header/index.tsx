import {
  LifebuoyIcon,
  NewspaperIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { TFields, TSection, TSectionsType } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import CustomContent from "@/lib/content/custom";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component
import EditComponent from "@/components/edit-component";
import { BROKEN_IMAGE } from "@/lib/utils/common-constant";
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

export default function HeaderSection(props: TProps) {
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
  const [loading, setLoading] = useState(true); // Add loading state

  const handleClick = (field?: TFields) => {
    if (editable && setIsOpen && setSection) {
      setSection("Header");
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
    CustomContent.getHeader({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "header",
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
      contentContainer: "mx-auto max-w-2xl lg:mx-0",
      listContainer:
        "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8",
      container: "mx-auto max-w-7xl px-6 lg:px-8",
      listCard:
        "flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10",
    },
    2: {
      contentContainer: "mx-auto max-w-2xl lg:mx-0",
      listContainer:
        "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8",
      container: "mx-auto max-w-7xl px-6 lg:px-8 text-center",
      listCard:
        "flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10",
    },
    3: {
      contentContainer: "mx-auto max-w-2xl lg:mx-0",
      listContainer:
        "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8",
      container: "flex gap-10 mx-auto items-center max-w-7xl px-6 lg:px-8",
      listCard:
        "flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10",
    },
    4: {
      contentContainer: "mx-auto max-w-2xl lg:mx-0",
      listContainer:
        "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8",
      container:
        "flex gap-10 flex-row-reverse mx-auto items-center max-w-7xl px-6 lg:px-8",
      listCard:
        "flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10",
    },
    5: {
      contentContainer: "mx-auto max-w-2xl lg:mx-0",
      listContainer:
        "mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8",
      container:
        "flex flex-col-reverse gap-10 mx-auto items-center max-w-7xl px-6 lg:px-8",
      listCard:
        "flex gap-x-4 rounded-xl bg-white/5 p-6 ring-1 ring-inset ring-white/10",
    },
  };

  const { container, listContainer, listCard, contentContainer } =
    styles[variation];

  return (
    <button
      className="group relative isolate mx-auto w-full overflow-visible bg-gray-900  py-24 text-left sm:py-32"
      onClick={() => handleClick()}
    >
      <EditComponent id={id} />
      <AddSectionButtons
        id={id}
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <Image
        height={1000}
        width={1000}
        alt=""
        src={appState.aiContent?.header?.bg || BROKEN_IMAGE}
        className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
      />
      <div className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu">
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
        />
      </div>
      <div className={container}>
        <div className={contentContainer}>
          <h2
            className={`text-4xl font-bold tracking-tight text-white sm:text-6xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick("title");
            }}
          >
            {loading ? (
              <Skeleton className="mb-2 h-6 w-3/4" />
            ) : (
              appState.aiContent?.header?.title ?? ""
            )}
          </h2>
          <p
            className={`mt-6 text-lg leading-8 text-gray-300 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick("description");
            }}
          >
            {loading ? (
              <Skeleton className="mb-2 h-4 w-3/4" />
            ) : (
              appState.aiContent?.header?.description ?? ""
            )}
          </p>
        </div>
        <div className={listContainer}>
          {loading
            ? Array.from({ length: 3 }).map((_, idx) => (
                <Skeleton key={idx} className="h-40 w-full rounded-xl" />
              ))
            : (appState.aiContent?.header?.list ?? []).map((card: any) => (
                <div
                  key={card.name}
                  className={`${listCard} ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowForm({ form: "Card", edit: card.id, show: true });
                  }}
                >
                  {/* <card.icon
                  aria-hidden="true"
                  className="h-7 w-5 flex-none text-indigo-400"
                /> */}
                  <div className="text-base leading-7">
                    <h3 className="font-semibold text-white">{card.name}</h3>
                    <p className="mt-2 text-gray-300">{card.description}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </button>
  );
}
