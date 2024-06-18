import RegenerateOptions from "@/components/regenerate-options";
import AmazonContent from "@/lib/content/amazon";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { updateAppState, appState as AS } from "@/lib/store/slices/site-slice";
import { regenerateIndividual } from "@/lib/utils/function";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { ImPower, ImSpinner2 } from "react-icons/im";

const DescriptionContent = () => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  return (
    <div className="max-h-[calc(-194px + 80vh)] h-fit  overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        <div className="flex flex-col border-t pt-5">
          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor={"price"} className="block">
              Price
            </label>
          </div>

          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"price"}
            placeholder={"Enter heading..."}
            onChange={(e) => {
              dispatch(
                updateAppState({
                  ...appState,
                  aiContent: {
                    ...appState.aiContent,
                    price: e.target.value,
                  },
                }),
              );
            }}
            //   ref={inputRef}
            value={appState.aiContent.price}
          />
        </div>
        <div className="flex flex-col border-t pt-5">
          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor={"description"} className="block">
              {"description"}
            </label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setLoading(true);
                  AmazonContent.getDescription().then((res) => {
                    dispatch(
                      updateAppState({
                        ...appState,
                        aiContent: {
                          ...appState.aiContent,
                          description: res,
                        },
                        generate: {
                          ...appState.generate,
                          field: "description",
                        },
                      }),
                    );
                    setLoading(false);
                  });
                }}
                className="flex items-center gap-2 "
              >
                Regenerate
                {loading ? (
                  <ImSpinner2 className="animate-spin text-lg text-black" />
                ) : (
                  <ImPower className=" text-xs " />
                )}
              </button>
              <RegenerateOptions setType={setType} type={type} />
            </div>
          </div>
          <textarea
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"description"}
            placeholder={"Enter Sub-heading"}
            onChange={(e) => {
              dispatch(
                updateAppState({
                  ...appState,
                  aiContent: {
                    ...appState.aiContent,
                    description: e.target.value,
                  },
                }),
              );
            }}
            // ref={textareaRef}
            value={appState.aiContent.description}
          />
        </div>
      </form>
    </div>
  );
};

export default DescriptionContent;
