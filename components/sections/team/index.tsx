import AddSectionButtons from "@/components/add-section/buttons";
import CustomContent from "@/lib/content/custom";
import { TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

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
  setSections: Dispatch<SetStateAction<{
    id:string
    title: string;
    content: JSX.Element;
  }[]>>
  sections:{
    id:string
    title: string;
    content: JSX.Element;
  }[]
  id:string
};

const people = [
  {
    name: "Lindsay Walton",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80",
    xUrl: "#",
    linkedinUrl: "#",
  },
  // More people...
];

export default function TeamSection(props: TProps) {
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
      setSection("Team");
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
    CustomContent.getTeam({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "team",
      individual: false,
      type: "list",
    }).then(() => {
      setLoading(false); // Set loading to false when data fetch completes
    });
  }, []);

  return (
    <button
      className={`group relative w-full bg-white py-24 text-left sm:py-32 ${
        editable && "rounded border-2 border-transparent hover:border-indigo-500"
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
        <div className="mx-auto max-w-2xl lg:mx-0">
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
              appState.aiContent?.team?.title ?? ""
            )}
          </h2>
          <p
            className={`mt-6 text-lg leading-8 text-gray-600 ${
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
              appState.aiContent?.team?.description ?? ""
            )}
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {(isLoading || appState.aiContent?.team?.list?.length === 0) ? (
            Array.from({ length: 3 }).map((_, idx) => (
              <li key={idx} className="flex flex-col items-center">
                <Skeleton className="h-48 w-48 rounded-xl mb-4" />
                <Skeleton className="h-6 w-32 mb-2" />
                <Skeleton className="h-4 w-20" />
              </li>
            ))
          ) : (
            appState.aiContent?.team?.list.map((person: any) => (
              <li key={person.id} className="flex flex-col items-center">
                <img
                  alt=""
                  src={person.imageUrl}
                  className={`aspect-[3/2] w-full rounded-2xl object-cover ${
                    editable && "rounded border-2 border-transparent hover:border-indigo-500"
                  }`}
                />
                <h3
                  className={`mt-6 text-lg font-semibold leading-8 tracking-tight text-gray-900 ${
                    editable && "rounded border-2 border-transparent hover:border-indigo-500"
                  }`}
                >
                  {person.name}
                </h3>
                <p
                  className={`text-base leading-7 text-gray-600 ${
                    editable && "rounded border-2 border-transparent hover:border-indigo-500"
                  }`}
                >
                  {person.role}
                </p>
                <ul role="list" className="mt-4 flex gap-x-6">
                  <li>
                    <a
                      href={person.xUrl}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">X</span>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path d="M11.4678 8.77491L17.2961 2H15.915L10.8543 7.88256L6.81232 2H2.15039L8.26263 10.8955L2.15039 18H3.53159L8.87581 11.7878L13.1444 18H17.8063L11.4675 8.77491H11.4678ZM9.57608 10.9738L8.95678 10.0881L4.02925 3.03974H6.15068L10.1273 8.72795L10.7466 9.61374L15.9156 17.0075H13.7942L9.57608 10.9742V10.9738Z" />
                      </svg>
                    </a>
                  </li>
                  <li>
                    <a
                      href={person.linkedinUrl}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <span className="sr-only">LinkedIn</span>
                      <svg
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-5 w-5"
                      >
                        <path
                          d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z"
                          clipRule="evenodd"
                          fillRule="evenodd"
                        />
                      </svg>
                    </a>
                  </li>
                </ul>
              </li>
            ))
          )}
        </ul>
      </div>
    </button>
  );
}
