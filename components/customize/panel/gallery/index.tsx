import Uploader from "@/components/ui/form/uploader";
import { regenerateIndividual } from "@/lib/utils/function";
import { TSection } from "@/types";
import { Switch } from "@headlessui/react";
import React from "react";
import { ImPower, ImSpinner2 } from "react-icons/im";
import { appState as AS } from "@/lib/store/slices/site-slice";
import { useAppSelector } from "@/lib/store/hooks";
import { appState } from "../../../../lib/store/slices/site-slice";
type TProps = {
  section: TSection;
  handleChange: (name: string, value: string) => void;
  subdomain: string;
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
};
const GalleryContent = (props: TProps) => {
  const { setShowForm, section, subdomain, handleChange } = props;
  const appState = useAppSelector(AS);
  return (
    <div className="max-h-[600px] h-[55vh] overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        <div className="flex flex-col gap-5">
          <div className="flex justify-between ">
            <h3 className="text-sm font-medium leading-6 text-gray-900 flex justify-center items-center">
              Primary Image
            </h3>
          </div>
          <div>
            <Uploader
              defaultValue={appState.aiContent.images?.primary.Large.URL}
              name={"image"}
              label={""}
              onChange={(value) => {
                handleChange("primaryImage", value);
                // field.onChange(value);
              }}
            />
          </div>
        </div>

        {appState.aiContent.images?.variant.map((image, i) => (
            i<3 &&
          <div className="flex flex-col gap-5" key={i}>
            <div className="flex justify-between ">
              <h3 className="text-sm font-medium leading-6 text-gray-900 flex justify-center items-center">
                Image {i+1}
              </h3>
            </div>
            <div>
              <Uploader
                defaultValue={image.Large.URL}
                name={"image"+(i+1)}
                label={""}
                onChange={(value) => {
                  handleChange("image"+(i+1), value);
                  // field.onChange(value);
                }}
              />
            </div>
          </div>
        ))}
      </form>
    </div>
  );
};

export default GalleryContent;
