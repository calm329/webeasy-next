import AddSectionButtons from "@/components/add-section/buttons";
import CustomContent from "@/lib/content/custom";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

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

export default function FooterSection(props: TProps) {
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
  const [loading, setLoading] = useState(true); // Add loading state

  const handleClick = (field?: TFields) => {
    if (editable && setIsOpen && setSection) {
      setSection("Footer");
      setIsOpen(true);

      setShowForm({ form: "", edit: "", show: false });
      dispatch(updateAppState({ ...appState, focusedField: field, openedSlide: "Customize" }));
    }
  };

  useEffect(() => {
    CustomContent.getFooter({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "footer",
      individual: false,
      type: "list",
    }).then(() => {
      // setContactData(data);
      setLoading(false); // Set loading to false when data is fetched
    });
  }, []);

  return (
    <button
      aria-labelledby="footer-heading"
      className={`group relative w-full bg-white ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={() => handleClick()}
    >
      <AddSectionButtons
        sectionTitle="Footers"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-20 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div
                className={` ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              >
                <h3 className={`text-sm font-semibold leading-6 text-gray-900`}>
                  {loading ? (
                    <Skeleton className="h-4 w-1/2 mb-2" />
                  ) : (
                    appState.aiContent?.footer?.list?.solutions?.title ?? ""
                  )}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <li key={idx}>
                        <Skeleton className="h-4 w-3/4 mb-2" />
                      </li>
                    ))
                  ) : (
                    appState.aiContent?.footer?.list?.solutions?.list?.map((item: any) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div
                className={`mt-10 md:mt-0  ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              >
                <h3 className={`text-sm font-semibold leading-6 text-gray-900`}>
                  {loading ? (
                    <Skeleton className="h-4 w-1/2 mb-2" />
                  ) : (
                    appState.aiContent?.footer?.list?.support?.title ?? ""
                  )}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <li key={idx}>
                        <Skeleton className="h-4 w-3/4 mb-2" />
                      </li>
                    ))
                  ) : (
                    appState.aiContent?.footer?.list?.support?.list?.map((item: any) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div
                className={` ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              >
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {loading ? (
                    <Skeleton className="h-4 w-1/2 mb-2" />
                  ) : (
                    "Company"
                  )}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <li key={idx}>
                        <Skeleton className="h-4 w-3/4 mb-2" />
                      </li>
                    ))
                  ) : (
                    appState.aiContent?.footer?.list?.company?.list?.map((item: any) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
              <div
                className={`mt-10 md:mt-0  ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              >
                <h3 className="text-sm font-semibold leading-6 text-gray-900">
                  {loading ? (
                    <Skeleton className="h-4 w-1/2 mb-2" />
                  ) : (
                    "Legal"
                  )}
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <li key={idx}>
                        <Skeleton className="h-4 w-3/4 mb-2" />
                      </li>
                    ))
                  ) : (
                    appState.aiContent?.footer?.list?.legal?.list?.map((item: any) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className="text-sm leading-6 text-gray-600 hover:text-gray-900"
                        >
                          {item.name}
                        </a>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-10 xl:mt-0">
            <h3 className="text-sm font-semibold leading-6 text-gray-900">
              {loading ? (
                <Skeleton className="h-4 w-1/2 mb-2" />
              ) : (
                appState.aiContent?.footer?.title ?? ""
              )}
            </h3>
            <p className="mt-2 text-sm leading-6 text-gray-600">
              {loading ? (
                <Skeleton className="h-4 w-3/4 mb-2" />
              ) : (
                appState.aiContent?.footer?.description ?? ""
              )}
            </p>
            <form className="mt-6 sm:flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email-address"
                type="email"
                required
                placeholder="Enter your email"
                autoComplete="email"
                className="w-full min-w-0 appearance-none rounded-md border-0 bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:w-64 sm:text-sm sm:leading-6 xl:w-full"
              />
              <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 md:flex md:items-center md:justify-between lg:mt-24">
          <div className="flex space-x-6 md:order-2">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => (
                <Skeleton key={idx} className="h-6 w-6" />
              ))
            ) : (
              appState.aiContent?.footer?.list?.social?.map((item: any) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">{item.name}</span>
                  {/* <item.icon aria-hidden="true" className="h-6 w-6" /> */}
                </Link>
              ))
            )}
          </div>
          <p className="mt-8 text-xs leading-5 text-gray-500 md:order-1 md:mt-0">
            &copy; 2020 Your Company, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </button>
  );
}
