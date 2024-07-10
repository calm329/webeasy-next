import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import AddSectionButtons from "@/components/add-section/buttons";
import { TFields, TSection } from "@/types";

import { Dispatch, SetStateAction, useEffect } from "react";
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { appState as AS, updateAppState } from '@/lib/store/slices/site-slice';
import CustomContent from '@/lib/content/custom';
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

export default function FaqSection(props: TProps) {
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
      setSection("Faq");
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
      fieldName: "faq",
      individual: false,
      type: "list",
    }).then(() => {
      // setContactData(data);
      // setLoading(false);
    });
  }, []);
  return (
    <button
      className={`w-full text-left bg-white group relative ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={()=>handleClick()}
    >
      <AddSectionButtons
        sectionTitle="FAQ"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 lg:py-40">
        <div className="mx-auto max-w-4xl divide-y divide-gray-900/10">
          <h2 className={`text-2xl font-bold leading-10 tracking-tight text-gray-900  ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}>
          {(appState.aiContent?.faq?.title?? [])}
          </h2>
          <dl className={`mt-10 space-y-6 divide-y divide-gray-900/10`}>
            {(appState.aiContent?.faq?.list?? [])?.map((faq:any) => (
              <Disclosure key={faq.question} as="div" className={`pt-6`}>
                <dt>
                  <DisclosureButton className="group flex w-full items-start justify-between text-left text-gray-900">
                    <span className="text-base font-semibold leading-7">{faq.question}</span>
                    <span className="ml-6 flex h-7 items-center">
                      <PlusSmallIcon aria-hidden="true" className="h-6 w-6 group-data-[open]:hidden" />
                      <MinusSmallIcon aria-hidden="true" className="h-6 w-6 [.group:not([data-open])_&]:hidden" />
                    </span>
                  </DisclosureButton>
                </dt>
                <DisclosurePanel as="dd" className="mt-2 pr-12">
                  <p className="text-base leading-7 text-gray-600">{faq.answer}</p>
                </DisclosurePanel>
              </Disclosure>
            ))}
          </dl>
        </div>
      </div>
    </button>
  );
}
