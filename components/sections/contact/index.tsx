import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";
import { TFields, TSection, TSectionsType } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { useAppSelector } from "@/lib/store/hooks";
import CustomContent from "@/lib/content/custom";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { Skeleton } from "@/components/ui/skeleton";
import { useDispatch } from "react-redux";
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

export default function ContactSection(props: TProps) {
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
  const [contactData, setContactData] = useState<any>(null);

  useEffect(() => {
    CustomContent.getContact({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "contact",
      individual: false,
      type: "list",
    }).then((data) => {
      setContactData(data);
      setLoading(false);
    });
  }, []);
  const dispatch = useDispatch();
  const handleClick = (field?: TFields) => {
    if (editable && setIsOpen && setSection) {
      setSection("Contact");
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
      container: "mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2",
      listContainer: "",
      contentContainer: "",
      listCard: "",
    },
    2: {
      container:
        "mx-auto flex justify-between max-w-7xl flex-row-reverse max-lg:flex-col",
      listContainer: "",
      contentContainer: "",
      listCard: "",
    },
    3: {
      container:
        "mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2 text-center",
      listContainer: "",
      contentContainer: "",
      listCard: "",
    },
    4: {
      container:
        "mx-auto flex justify-between max-w-7xl flex-row-reverse max-lg:flex-col text-center",
      listContainer: "",
      contentContainer: " ",
      listCard: "",
    },
    5: {
      container: "mx-auto grid max-w-7xl grid-cols-1 lg:grid-cols-2",
      listContainer: "",
      contentContainer: "",
      listCard: "",
    },
  };

  const { container, listContainer, listCard, contentContainer } =
    styles[variation];

  return (
    <button
      className={`group relative isolate  w-full bg-white text-left ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => handleClick()}
    >
      <EditComponent id={id} />
      <AddSectionButtons
        id={id}
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className={container}>
        <div className="relative px-6 pb-20 pt-24 sm:pt-32 lg:static lg:px-8 lg:py-48">
          <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg">
            <div className="absolute inset-y-0 left-0 -z-10 w-full overflow-hidden bg-gray-100 ring-1 ring-gray-900/10 lg:w-1/2">
              <svg
                aria-hidden="true"
                className="absolute inset-0 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
              >
                <defs>
                  <pattern
                    x="100%"
                    y={-1}
                    id="83fd4e5a-9d52-42fc-97b6-718e5d7ee527"
                    width={200}
                    height={200}
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M130 200V.5M.5 .5H200" fill="none" />
                  </pattern>
                </defs>
                <rect fill="white" width="100%" height="100%" strokeWidth={0} />
                <svg x="100%" y={-1} className="overflow-visible fill-gray-50">
                  <path d="M-470.5 0h201v201h-201Z" strokeWidth={0} />
                </svg>
                <rect
                  fill="url(#83fd4e5a-9d52-42fc-97b6-718e5d7ee527)"
                  width="100%"
                  height="100%"
                  strokeWidth={0}
                />
              </svg>
            </div>
            <h2
              className={`text-3xl font-bold tracking-tight text-gray-900 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick("title");
              }}
            >
              {loading ? (
                <Skeleton className="h-14 w-[300px]" />
              ) : (
                appState?.aiContent?.contact?.title ?? ""
              )}
            </h2>
            <p
              className={`mt-6 text-lg leading-8 text-gray-600 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              onClick={(e) => {
                e.stopPropagation();
                handleClick("description");
              }}
            >
              {loading ? (
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-1/2" />
                </div>
              ) : (
                appState?.aiContent?.contact?.description ?? ""
              )}
            </p>
            <dl className="mt-10 space-y-4 text-base leading-7 text-gray-600">
              <div
                className={`flex gap-x-4 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick("address");
                }}
              >
                <dt className="flex-none">
                  <span className="sr-only">
                    {appState.aiContent?.contact?.address?.label ?? ""}
                  </span>
                  <BuildingOffice2Icon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  {loading ? (
                    <Skeleton className="h-8 w-[200px]" />
                  ) : (
                    appState.aiContent?.contact?.address?.value ?? ""
                  )}
                </dd>
              </div>
              <div
                className={`flex gap-x-4 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick("telephone");
                }}
              >
                <dt className="flex-none">
                  <span className="sr-only">
                    {" "}
                    {appState.aiContent?.contact?.telephone?.label ?? ""}
                  </span>
                  <PhoneIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  {loading ? (
                    <Skeleton className="h-8 w-[150px]" />
                  ) : (
                    <a
                      href={`${editable ? "#" : "tel:" + (appState.aiContent?.contact?.telephone?.value ?? "")}`}
                      className="hover:text-gray-900"
                    >
                      {appState.aiContent?.contact?.telephone?.value ?? ""}
                    </a>
                  )}
                </dd>
              </div>
              <div
                className={`flex gap-x-4 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClick("email");
                }}
              >
                <dt className="flex-none">
                  <span className="sr-only">
                    {" "}
                    {appState.aiContent?.contact?.email?.label ?? ""}
                  </span>
                  <EnvelopeIcon
                    aria-hidden="true"
                    className="h-7 w-6 text-gray-400"
                  />
                </dt>
                <dd>
                  {loading ? (
                    <Skeleton className="h-8 w-[200px]" />
                  ) : (
                    <a
                      href={`${editable ? "#" : "mailto:" + (appState.aiContent?.contact?.email?.value ?? "")}`}
                      className="hover:text-gray-900"
                    >
                      {appState.aiContent?.contact?.email?.value ?? ""}
                    </a>
                  )}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <form
          action="#"
          method="POST"
          className="px-6 pb-24 pt-20 sm:pb-32 lg:px-8 lg:py-48"
        >
          <div className="mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
            <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="first-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  First name
                </label>
                <div className="mt-2.5">
                  <input
                    id="first-name"
                    name="first-name"
                    type="text"
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="last-name"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Last name
                </label>
                <div className="mt-2.5">
                  <input
                    id="last-name"
                    name="last-name"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2.5">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="phone-number"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Phone number
                </label>
                <div className="mt-2.5">
                  <input
                    id="phone-number"
                    name="phone-number"
                    type="tel"
                    autoComplete="tel"
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Message
                </label>
                <div className="mt-2.5">
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    defaultValue={""}
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Send message
              </button>
            </div>
          </div>
        </form>
      </div>
    </button>
  );
}
