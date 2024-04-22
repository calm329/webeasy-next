import { Button } from "@nextui-org/react";
import { useState } from "react";
import { FaChevronUp } from "react-icons/fa6";
import DynamicForm from "./dynamic-form";
import { updateSite } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { FaTimes } from "react-icons/fa";

export default function BrandMobileForm({
  brandCustomizeFields,
  handleChange,
}: {
  brandCustomizeFields: any[];
  handleChange: (name: string, value: string) => void;
}) {
  const [showForm, setShowForm] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="fixed bottom-0 h-auto w-full bg-white lg:hidden">
      {showForm ? (
        <Button
          size="sm"
          className="absolute right-2 top-2"
          radius="full"
          isIconOnly
          onClick={() => setShowForm(false)}
        >
          <FaTimes />
        </Button>
      ) : (
        <Button
          size="sm"
          className="w-full"
          radius="none"
          onClick={() => setShowForm(true)}
        >
          <FaChevronUp />
        </Button>
      )}
      <div
        className={cn(
          "mx-auto w-full max-w-[500px] duration-500 transition-height",
          {
            "h-0": !showForm,
            "h-auto p-4": showForm,
          },
        )}
      >
        <DynamicForm
          title="Brand Customization"
          fields={[brandCustomizeFields[currentIndex]]}
          handler={updateSite}
          handleChange={handleChange}
          handleNext={() => {
            if (currentIndex < brandCustomizeFields.length - 1) {
              setCurrentIndex(currentIndex + 1);
            }
          }}
          handleBack={
            currentIndex > 0
              ? () => {
                  setCurrentIndex(currentIndex - 1);
                }
              : undefined
          }
        />
      </div>
    </div>
  );
}
