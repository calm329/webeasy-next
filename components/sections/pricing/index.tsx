import { CheckIcon } from "@heroicons/react/20/solid";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import CustomContent from "@/lib/content/custom";
import { TFields, TSection, TSectionsType } from "@/types";

import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component here
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import EditComponent from "@/components/edit-component";

type TProps = {
  editable?: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  setSection?: React.Dispatch<React.SetStateAction<TSection>>;
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  setSectionModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTriggerSection: React.Dispatch<
    React.SetStateAction<{ section: string; position: number }>
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

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PricingSection(props: TProps) {
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
      setSection("Pricing");
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
    CustomContent.getPricing({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "pricing",
      individual: false,
      type: "list",
    }).then(() => {
      setLoading(false); // Set loading to false when data fetch completes
    });
  }, []);

  return (
    <button
      className={`group w-full relative bg-white py-24 sm:py-32 ${
        editable &&
        "rounded border-2 border-transparent hover:border-indigo-500"
      }`}
      onClick={() => handleClick()}
    >
      <EditComponent id={id} sections={sections} setSections={setSections}/>
      <AddSectionButtons
        id={id}
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Pricing
          </h2>
          <p
            className={`mt-2 mx-auto text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl ${
              editable &&
              "rounded border-2 border-transparent hover:border-indigo-500"
            }`}
          >
            {isLoading ? (
              <Skeleton className="h-12 w-64" />
            ) : (
              appState.aiContent?.pricing?.title ?? ""
            )}
          </p>
        </div>
        <p
          className={`mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 ${
            editable &&
            "rounded border-2 border-transparent hover:border-indigo-500"
          }`}
        >
          {isLoading ? (
            <Skeleton className="h-6 w-96" />
          ) : (
            appState.aiContent?.pricing?.description ?? ""
          )}
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {(appState.aiContent?.pricing?.list ?? []).length === 0 ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                  editable &&
                  "rounded border-2 border-transparent hover:border-indigo-500"
                }`}
              >
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-4 w-56" />
                <Skeleton className="h-8 w-20 mt-6" />
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {Array.from({ length: 4 }).map((_, idx) => (
                    <li key={idx}>
                      <Skeleton className="h-4 w-3/4 mb-2" />
                    </li>
                  ))}
                </ul>
                <a
                  href="#"
                  className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${
                    editable
                      ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                      : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300"
                  }`}
                >
                  <Skeleton className="h-6 w-20" />
                </a>
              </div>
            ))
          ) : (
            appState.aiContent?.pricing?.list.map((tier: any, tierIdx: number) => (
              <div
                key={tier.id}
                className={`${
                  tier.mostPopular
                    ? "lg:z-10 lg:rounded-b-none"
                    : "lg:mt-8"
                } ${
                  tierIdx === 0 ? "lg:rounded-r-none" : ""
                } ${
                  tierIdx === appState.aiContent?.pricing?.list.length - 1
                    ? "lg:rounded-l-none"
                    : ""
                } ${
                  "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10"
                } ${
                  editable &&
                  "rounded border-2 border-transparent hover:border-indigo-500"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  setShowForm({
                    edit: tier.id,
                    form: "Price",
                    show: true,
                  });
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-x-4">
                    <h3
                      id={tier.id}
                      className={`${classNames(
                        tier.mostPopular
                          ? "text-indigo-600"
                          : "text-gray-900",
                        "text-lg font-semibold leading-8"
                      )}`}
                    >
                      {isLoading ? (
                        <Skeleton className="h-6 w-24" />
                      ) : (
                        tier.name
                      )}
                    </h3>
                    {tier.mostPopular && (
                      <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600">
                        Most popular
                      </p>
                    )}
                  </div>
                  <p
                    className={`mt-4 text-sm leading-6 text-gray-600 ${
                      isLoading && "opacity-0"
                    }`}
                  >
                    {isLoading ? (
                      <Skeleton className="h-4 w-64 mt-2" />
                    ) : (
                      tier.description
                    )}
                  </p>
                  <p className="mt-6 flex items-baseline gap-x-1">
                    <span className="text-4xl font-bold tracking-tight text-gray-900">
                      {isLoading ? (
                        <Skeleton className="h-8 w-16" />
                      ) : (
                        tier.priceMonthly
                      )}
                    </span>
                    <span className="text-sm font-semibold leading-6 text-gray-600">
                      /month
                    </span>
                  </p>
                  <ul
                    role="list"
                    className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                  >
                    {tier.features.map((feature: string) => (
                      <li
                        key={feature}
                        className={`flex items-center gap-x-3 ${
                          isLoading && "opacity-0"
                        }`}
                      >
                        <CheckIcon
                          aria-hidden="true"
                          className="h-6 w-5 flex-none text-indigo-600"
                        />
                        {isLoading ? (
                          <Skeleton className="h-4 w-20" />
                        ) : (
                          feature
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={tier.href}
                  aria-describedby={tier.id}
                  className={`${classNames(
                    tier.mostPopular
                      ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                      : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                    "mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  )}`}
                >
                  {isLoading ? (
                    <Skeleton className="h-6 w-20" />
                  ) : (
                    tier.button ?? "Buy Now"
                  )}
                </a>
              </div>
            ))
          )}
        </div>
      </div>
    </button>
  );
}
