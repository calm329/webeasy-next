import Image from "next/image";
import { TFields, TSection } from "@/types";
import { Dispatch, SetStateAction, useEffect } from "react";
import AddSectionButtons from "@/components/add-section/buttons";
import CustomContent from "@/lib/content/custom";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
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
};
export default function LogoSection(props: TProps) {
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
      setSection("logoClouds");
      setIsOpen(true);

      setShowForm({ form: "", edit: "", show: false });
      dispatch(updateAppState({ ...appState, focusedField: field, openedSlide: "Customize" }));
    }
  };

  useEffect(() => {
    CustomContent.getLogoClouds({
      data: {
        businessName: appState.aiContent.banner.businessName,
        businessType: appState.aiContent.businessType ?? "",
        location: appState.aiContent.location ?? "",
      },
      fieldName: "logoClouds",
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
      <EditComponent />
      <AddSectionButtons
        sectionTitle="Logo"
        setSectionModal={setSectionModal}
        setTriggerSection={setTriggerSection}
      />
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            className={`text-lg font-semibold leading-8 text-gray-900 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
            onClick={(e) => {
              e.stopPropagation();
              handleClick("title");
            }}
          >
            {appState.aiContent?.logoClouds?.title ?? ""}
          </h2>
          <div className="mx-auto mt-10 grid grid-cols-4 items-start gap-x-8 gap-y-10 sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:grid-cols-5">
            {(appState.aiContent?.logoClouds?.list ?? [])?.map((data: any) => (
              <Image
                alt="Transistor"
                key={data.link}
                src={data.image}
                width={158}
                height={48}
                className={`col-span-2 max-h-12 w-full object-contain object-left lg:col-span-1 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </button>
  );
}
