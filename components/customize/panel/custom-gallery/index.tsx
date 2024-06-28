import Uploader from "@/components/ui/form/uploader";
import { getAppState, regenerateIndividual } from "@/lib/utils/function";
import { TSection } from "@/types";
import { Switch } from "@/components/ui/switch";
import React from "react";
import { ImPower, ImSpinner2 } from "react-icons/im";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
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
const CustomGalleryContent = (props: TProps) => {
  const { setShowForm, section, subdomain, handleChange } = props;
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  return (
    <div className="h-[55vh] max-h-[600px] overflow-y-auto py-5 transition-all ease-in-out">
      <div className="flex justify-between ">
        <h3 className=" flex items-center justify-center px-5 pb-3 text-lg font-medium leading-6 text-gray-900">
          Image Gallery
        </h3>
        <div className="flex gap-5">
          <Switch
            onCheckedChange={(checked) =>
              dispatch(
                updateAppState({
                  ...appState,
                  aiContent: {
                    ...appState.aiContent,
                    gallery: {
                      ...appState.aiContent.gallery,
                      show: checked,
                    },
                  },
                }),
              )
            }
            checked={appState.aiContent?.gallery?.show}
          />
        </div>
      </div>
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        {appState.aiContent.gallery?.list.map((image, i) => (
          <div className="flex flex-col gap-5" key={i}>
            <div className="flex justify-between ">
              <h3 className="flex items-center justify-center text-sm font-medium leading-6 text-gray-900">
                Image {i + 1}
              </h3>
            </div>
            <div>
              <Uploader
                defaultValue={image}
                name={"image" + (i + 1)}
                label={""}
                onChange={(value) => {
                  dispatch(updateAppState({
                    ...appState,
                    aiContent:{
                      ...appState.aiContent,
                      gallery:{
                        ...appState.aiContent.gallery,
                        list: [...appState.aiContent.gallery.list.slice(0, i), value,...appState.aiContent.gallery.list.slice(i + 1)],
                      },
                    }
                  }))
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

export default CustomGalleryContent;
