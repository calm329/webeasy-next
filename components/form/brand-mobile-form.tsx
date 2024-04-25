import { useEffect, useState } from "react";
import { FaChevronUp, FaTimes } from "react-icons/fa"; // Consolidate imports from 'react-icons'
import DynamicForm from "./dynamic-form";
import { FormField } from "@/types";
// import { updateSite } from "@/lib/actions";

export default function BrandMobileForm({
  brandCustomizeFields,
  handleChange,
}: {
  brandCustomizeFields: FormField[];
  handleChange: (name: string, value: string) => void;
}) {
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
        // size="sm"
        className={showForm ? "absolute right-2 top-2" : "w-full"}
        // radius={showForm ? "full" : "none"}
        // isIconOnly={showForm}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? <FaTimes /> : <FaChevronUp />}
      </button>
      <div className={formContainerClass}>
        <DynamicForm
          title="Brand Customization"
          fields={fields}
          handler={() => {}} // updateSite}
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
