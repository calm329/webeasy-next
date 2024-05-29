import { Dispatch, SetStateAction } from "react";
import { ServiceIcon } from "../../icons";
import { TSection } from "@/types";

type ServiceCardProps = {
  name: string;
  description: string;
  color: string;
  editable?: boolean;
  setIsOpen?: Dispatch<SetStateAction<boolean>>;
  setSection?: Dispatch<SetStateAction<TSection>>;
  showForm?: {
    form: string;
    edit: string;
    show: boolean;
  };
  setShowForm?: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  id: string;
};

export default function ServiceCard(props: ServiceCardProps) {
  const { id, name, description, color, editable, showForm, setShowForm } =
    props;
  return (
    <div
      className={`w-full p-8 md:w-1/3 ${editable && "rounded border-2 border-transparent hover:border-indigo-500"}`}
      onClick={(e) => {
   
        setShowForm &&
          setShowForm({
            edit: id,
            form: "Service",
            show: true,
          });
      }}
    >
      <div className="-m-3 flex flex-wrap">
        <div className="w-auto p-3 md:w-full lg:w-auto">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white">
            <ServiceIcon color={color} size={24} />
          </div>
        </div>
        <div className="flex-1 p-3">
          <h3 className="font-heading mb-2 text-xl font-black text-gray-900">
            {name}
          </h3>
          <p className="text-sm font-bold text-gray-700">{description}</p>
        </div>
      </div>
    </div>
  );
}
