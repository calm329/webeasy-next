import Uploader from "@/components/ui/form/uploader";
import {
  getAppState,
  getRandomImageFromUnsplash,
  regenerateIndividual,
} from "@/lib/utils/function";
import { TSection } from "@/types";
import { Switch } from "@/components/ui/switch";
import React, { useState } from "react";
import { ImPower, ImSpinner2 } from "react-icons/im";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState } from "../../../../lib/store/slices/site-slice";
import ImagesModal from "@/components/ui/modal/images-modal";
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
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImageId, setSelectedImageId] = useState(0);
  function setImage(data: any) {
    dispatch(
      updateAppState({
        ...appState,
        aiContent: {
          ...appState.aiContent,
          gallery: {
            ...appState.aiContent.gallery,
            list: appState.aiContent.gallery.list.map((image, i) => {
              if (parseInt(selectedImage) === i) {
                return data.urls.small;
              } else {
                return image;
              }
            }),
          },
        },
      }),
    );
  }
  return (
    <div className="h-[55vh] max-h-[600px] overflow-y-auto py-5 transition-all ease-in-out">
      <ImagesModal
        open={showImageModal}
        setOpen={setShowImageModal}
        selectedImage={selectedImage}
        action={setImage}
      />
      <div className="flex justify-between ">
        <h3 className=" flex items-center justify-center px-5 pb-3 text-lg font-medium leading-6 text-gray-900">
          Image Gallery
        </h3>
        {/* <div className="flex gap-5">
          <Switch
            onCheckedChange={(checked) =>
              dispatch(
                updateAppState({
                  ...appState,
                  aiContent: {
                    ...appState.aiContent,
                    gallery: {
                      ...appState.aiContent?.gallery,
                      show: checked,
                    },
                  },
                }),
              )
            }
            checked={appState.aiContent?.gallery?.show}
          />
        </div> */}
      </div>
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        {appState.aiContent?.gallery?.list?.map((image, index) => (
          <div className="flex flex-col gap-5" key={index}>
            <div className="flex justify-between ">
              <h3 className="flex items-center justify-center text-sm font-medium leading-6 text-gray-900">
                Image {index + 1}
              </h3>
              <button
                type="button"
                onClick={() => {
                  setSelectedImageId(index);
                  setLoading(true);
                  getRandomImageFromUnsplash(
                    appState?.aiContent?.businessType ?? "",
                  ).then((data) => {
                    setLoading(false);
                    dispatch(
                      updateAppState({
                        ...appState,
                        aiContent: {
                          ...appState?.aiContent,
                          gallery: {
                            ...appState?.aiContent?.gallery,
                            list: appState?.aiContent?.gallery?.list?.map((image,i)=>{
                              if(i=== index){
                                return data
                              }else{
                                return image
                              }
                            })
                          },
                        },
                      }),
                    );
                  });
                }}
                className="flex items-center gap-2 "
              >
                Regenerate
                {(loading && selectedImageId === index) ? (
                  <ImSpinner2 className="animate-spin text-lg text-black" />
                ) : (
                  <ImPower className=" text-xs " />
                )}
              </button>
            </div>
            <div>
              <Uploader
                defaultValue={image}
                name={"image" + (index + 1)}
                label={""}
                onChange={(value) => {
                  dispatch(
                    updateAppState({
                      ...appState,
                      aiContent: {
                        ...appState.aiContent,
                        gallery: {
                          ...appState.aiContent?.gallery,
                          list: [
                            ...appState.aiContent?.gallery?.list?.slice(0, index),
                            value,
                            ...appState.aiContent?.gallery?.list?.slice(index + 1),
                          ],
                        },
                      },
                    }),
                  );
                  // field.onChange(value);
                }}
              />
            </div>
            <button
              type="button"
              className="mr-auto  rounded-md border bg-red-600 px-5 py-2 font-medium text-white"
              onClick={() => {
                setSelectedImage(index.toString());
                setShowImageModal(true);
              }}
            >
              Swap
            </button>
          </div>
        ))}
      </form>
    </div>
  );
};

export default CustomGalleryContent;
