import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import React from "react";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";

const TitleContent = () => {
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  return (
    <div className="max-h-[600px] h-[55vh] overflow-y-auto py-5 transition-all ease-in-out">
      <form action="" className="flex flex-col gap-5 px-4 sm:px-6">
        <div className="flex flex-col border-t pt-5">
          <div className="flex  justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor={"title"} className="block">
              Title
            </label>
            {/* <div className="flex items-center gap-2">
        <button
          type="button"
        //   onClick={() => {
        //     setSelectedField(data);
        //     setLoadingHeading(true);
        //     regenerateIndividual({
        //       appState,
        //       dispatch,
        //       searchParams,
        //       fieldName: data,
        //       type,
        //     }).then(() => {
        //       setLoadingHeading(false);
        //     });
        //   }}
          className="flex items-center gap-2 "
        >
          Regenerate
          {loadingHeading  ? (
            <ImSpinner2 className="animate-spin text-lg text-black" />
          ) : (
            <ImPower className=" text-xs " />
          )}
        </button>
        <RegenerateOptions setType={setType} type={type} />
      </div> */}
          </div>

          <textarea
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"title"}
            placeholder={"Enter heading..."}
            onChange={(e) => {
              dispatch(
                updateAppState({
                  ...appState,
                  aiContent: {
                    ...appState.aiContent,
                    title: e.target.value,
                  },
                }),
              );
            }}
            //   ref={inputRef}
            value={appState.aiContent?.title}
          />
        </div>
      </form>
    </div>
  );
};

export default TitleContent;
