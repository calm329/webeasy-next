import { CheckIcon } from "@heroicons/react/20/solid";
import { TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from '@/lib/store/slices/site-slice';
import CustomContent from "@/lib/content/custom";
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
const tiers = [
  {
    name: "Freelancer",
    id: "tier-freelancer",
    href: "#",
    priceMonthly: "$24",
    description: "The essentials to provide your best work for clients.",
    features: [
      "5 products",
      "Up to 1,000 subscribers",
      "Basic analytics",
      "48-hour support response time",
    ],
    mostPopular: false,
  },
  {
    name: "Startup",
    id: "tier-startup",
    href: "#",
    priceMonthly: "$32",
    description: "A plan that scales with your rapidly growing business.",
    features: [
      "25 products",
      "Up to 10,000 subscribers",
      "Advanced analytics",
      "24-hour support response time",
      "Marketing automations",
    ],
    mostPopular: true,
  },
  {
    name: "Enterprise",
    id: "tier-enterprise",
    href: "#",
    priceMonthly: "$48",
    description: "Dedicated support and infrastructure for your company.",
    features: [
      "Unlimited products",
      "Unlimited subscribers",
      "Advanced analytics",
      "1-hour, dedicated support response time",
      "Marketing automations",
    ],
    mostPopular: false,
  },
];

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
  } = props;


  const appState = useAppSelector(AS);
  const dispatch= useAppDispatch()
  const handleClick = (field?:TFields) => {
    if (editable && setIsOpen && setSection) {
      setSection("Pricing");
      setIsOpen(true);

      setShowForm({ form: "", edit: "", show: false });
      dispatch(updateAppState({ ...appState, focusedField: field, openedSlide: "Customize" }));
    }
  };

  useEffect(() => {
    CustomContent.getData({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "pricing",
      individual: false,
      type: "list",
    }).then(() => {
      // setContactData(data);
      // setLoading(false);
    });
  }, []);

  return (
    <button
      className={`group w-full relative bg-white py-24 sm:py-32 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
    onClick={()=>handleClick()}
   >
      <AddSectionButtons
        sectionTitle="Pricing"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className={`text-base font-semibold leading-7 text-indigo-600 `}>
          Pricing
          </h2>
          <p className={`mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}>
          {appState.aiContent?.pricing?.title ??""}
          </p>
        </div>
        <p className={`mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}>
        {appState.aiContent?.pricing?.description ??""}
        </p>
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {(appState.aiContent?.pricing?.list ??[]).map((tier:any, tierIdx:any) => (
            <div
              key={tier.id}
              className={classNames(
                tier.mostPopular ? "lg:z-10 lg:rounded-b-none" : "lg:mt-8",
                tierIdx === 0 ? "lg:rounded-r-none" : "",
                tierIdx === tiers.length - 1 ? "lg:rounded-l-none" : "",
                "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10",
                editable && "rounded border-2 border-transparent hover:border-indigo-500"
              )}
            >
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3
                    id={tier.id}
                    className={`${classNames(
                      tier.mostPopular ? "text-indigo-600" : "text-gray-900",
                      "text-lg font-semibold leading-8",
                    )} `}
                  >
                    {tier.name}
                  </h3>
                  {tier.mostPopular ? (
                    <p className="rounded-full bg-indigo-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-indigo-600 ">
                      Most popular
                    </p>
                  ) : null}
                </div>
                <p className={`mt-4 text-sm leading-6 text-gray-600  `}>
                  {tier.description}
                </p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className={`text-4xl font-bold tracking-tight text-gray-900 `}>
                    {tier.priceMonthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    /month
                  </span>
                </p>
                <ul
                  role="list"
                  className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                >
                  {tier.features.map((feature:any) => (
                    <li key={feature} className={`flex gap-x-3 `}>
                      <CheckIcon
                        aria-hidden="true"
                        className="h-6 w-5 flex-none text-indigo-600"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href={tier.href}
                aria-describedby={tier.id}
                className={classNames(
                  tier.mostPopular
                    ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
                    : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
                  "mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
                )}
              >
                {tier.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </button>
  );
}
