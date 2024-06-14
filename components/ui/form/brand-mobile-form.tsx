import { useEffect, useState } from "react";
import { FaChevronUp, FaTimes } from "react-icons/fa"; // Consolidate imports from 'react-icons'
import DynamicForm from "./dynamic-form";
import { FormField } from "@/types";
import { updateSite } from "@/lib/actions";
import { toast } from "sonner";
// import { updateSite } from "@/lib/actions";

type TProps = {
  subdomain: string;
  brandCustomizeFields: FormField[];
  handleChange: (name: string, value: string) => void;
};
export default function BrandMobileForm(props: TProps) {
  const { subdomain, brandCustomizeFields, handleChange } = props;
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fields, setFields] = useState([brandCustomizeFields[0]]);

  // Update field based on currentIndex
  useEffect(() => {
    setFields([brandCustomizeFields[currentIndex]]);
  }, [currentIndex, brandCustomizeFields]);

  // Function to control the visibility class
  const formContainerClass = showForm
    ? "mx-auto w-full max-w-[500px] h-auto p-4 duration-500 transition-height"
    : "mx-auto w-full max-w-[500px] h-0 duration-500 transition-height";

  return (
    <div className="fixed bottom-0 h-auto w-full bg-white lg:hidden">
      <button
        className={
          showForm
            ? "absolute right-2 top-2"
            : "flex w-full items-center justify-center"
        }
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? <FaTimes /> : <FaChevronUp />}
      </button>
      <div className={formContainerClass}>
        <DynamicForm
          title="Brand Customization"
          fields={fields}
          handler={async (data: any, keys: string[]) => {
            try {
              await updateSite(subdomain, data, keys);
              toast.success("Your brand customization has been saved");
            } catch (error) {
              toast.error("Something went wrong");
            }
          }}
          handleChange={handleChange}
          handleNext={() =>
            setCurrentIndex((prev) =>
              prev < brandCustomizeFields.length - 1 ? prev + 1 : prev,
            )
          }
          handleBack={() =>
            setCurrentIndex((prev) => (prev > 0 ? prev - 1 : prev))
          }
        />
      </div>
    </div>
  );
}
