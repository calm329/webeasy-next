import Link from "next/link";
import { TSection } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import { useAppSelector } from "@/lib/store/hooks";
import { appState as AS } from '@/lib/store/slices/site-slice';
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

  useEffect(() => {
    CustomContent.getData({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "newsLetter",
      individual: false,
      type: "list",
    }).then(() => {
      // setContactData(data);
      // setLoading(false);
    });
  }, []);

  return (
    <div
      className={`group relative bg-white py-16 sm:py-24 lg:py-32 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
    >
      <AddSectionButtons
        sectionTitle="NewsLetters"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="max-w-xl text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:col-span-7">
          <h2 className={`inline sm:block lg:inline xl:block ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}>
          {appState.aiContent?.newsLetter?.title ?? ""}
          </h2>{" "}
          <p className={`inline sm:block lg:inline xl:block ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}>
          {appState.aiContent?.newsLetter?.description ?? ""}
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
          <p className="mt-4 text-sm leading-6 text-gray-900">
            We care about your data. Read our{" "}
            <Link
              href="#"
              className="font-semibold text-indigo-600 hover:text-indigo-500"
            >
              privacy&nbsp;policy
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
