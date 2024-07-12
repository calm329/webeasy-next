import AddSectionButtons from "@/components/add-section/buttons";
import CustomContent from "@/lib/content/custom";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";

// Import the Skeleton component
import { Skeleton } from "@/components/ui/skeleton";

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

const stats = [
  { id: 1, name: "Creators on the platform", value: "8,000+" },
  { id: 2, name: "Flat platform fee", value: "3%" },
  { id: 3, name: "Uptime guarantee", value: "99.9%" },
  { id: 4, name: "Paid out to creators", value: "$70M" },
];

export default function StatsSection(props: TProps) {
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
      setSection("Stats");
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
    CustomContent.getStats({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "stats",
      individual: false,
      type: "list",
    }).then(() => {
      setLoading(false); // Set loading to false when data fetch completes
    });
  }, []);

  return (
    <button
      className={`group relative w-full bg-white py-24 sm:py-32 ${
        editable && "rounded border-2 border-transparent hover:border-indigo-500"
      }`}
      onClick={() => handleClick()}
    >
      <AddSectionButtons
        sectionTitle="Stats"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2
              className={`text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl ${
                editable && "rounded border-2 border-transparent hover:border-indigo-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick("title");
              }}
            >
              {isLoading ? (
                <Skeleton className="h-12 w-64" />
              ) : (
                appState.aiContent?.stats?.title ?? ""
              )}
            </h2>
            <p
              className={`mt-4 text-lg leading-8 text-gray-600 ${
                editable && "rounded border-2 border-transparent hover:border-indigo-500"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick("description");
              }}
            >
              {isLoading ? (
                <Skeleton className="h-6 w-96" />
              ) : (
                appState.aiContent?.stats?.description ?? ""
              )}
            </p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {(isLoading || appState.aiContent?.stats?.list?.length === 0) ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex flex-col bg-gray-400/5 p-8">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-8 w-20 mt-6" />
                </div>
              ))
            ) : (
              appState.aiContent?.stats?.list.map((stat: any) => (
                <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                  <dt
                    className={`text-sm font-semibold leading-6 text-gray-600 ${
                      editable && "rounded border-2 border-transparent hover:border-indigo-500"
                    }`}
                  >
                    {stat.name}
                  </dt>
                  <dd
                    className={`order-first text-3xl font-semibold tracking-tight text-gray-900 ${
                      editable && "rounded border-2 border-transparent hover:border-indigo-500"
                    }`}
                  >
                    {stat.value}
                  </dd>
                </div>
              ))
            )}
          </dl>
        </div>
      </div>
    </button>
  );
}
