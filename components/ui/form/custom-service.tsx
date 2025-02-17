import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImPower, ImSpinner2 } from "react-icons/im";

type TProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setShowForm: React.Dispatch<
    React.SetStateAction<{
      form: string;
      edit: string;
      show: boolean;
    }>
  >;
  section: TSection;
  showForm: {
    form: string;
    edit: string;
    show: boolean;
  };
  handleChange: (name: string, value: string) => void;
};
import { IoMdArrowBack } from "react-icons/io";
import { FormField, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { generateUniqueId, regenerateIndividual } from "@/lib/utils/function";
import { BsThreeDotsVertical } from "react-icons/bs";
import RegenerateOptions from "@/components/regenerate-options";
import { useSearchParams } from "next/navigation";

const CustomService = (props: TProps) => {
  const { setIsOpen, setShowForm, section, showForm, handleChange } = props;
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [loading, setLoading] = useState(false);
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const [type, setType] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [data, setData] = useState<any>();
  const searchParams = useSearchParams();
  function handleServiceSubmit(id: string) {
    setSelectedField(null);
    console.log("hi");
    if (showForm.edit) {
      dispatch(
        updateAppState({
          ...appState,
          aiContent: {
            ...appState.aiContent,
            services: {
              ...appState.aiContent.services,
              list: appState.aiContent.services.list.map((item) => {
                if (item.id === id) {
                  return {
                    id: item.id,
                    image: item.image,
                    description: data.description,
                    name: data.name,
                  };
                } else {
                  return item;
                }
              }),
            },
          },
        }),
      );
    } else {
      const id = generateUniqueId();

      dispatch(
        updateAppState({
          ...appState,
          aiContent: {
            ...appState.aiContent,
            services: {
              ...appState.aiContent.services,
              list: [
                ...appState.aiContent.services.list,
                {
                  id: id,
                  image: "",
                  description: data.description,
                  name: data.name,
                },
              ],
            },
          },
        }),
      );
    }
    setShowForm({
      form: "",
      edit: "",
      show: false,
    });
  }

  useEffect(() => {
    if (showForm.edit) {
      let services = appState.aiContent.services.list;
      services = services?.filter((service) => service.id === showForm.edit);
      setData(services[0]);
    }
  }, [showForm.edit, appState]);

  console.log("data", data);
  return (
    <div className="h-[55vh] max-h-[600px] overflow-auto">
      <div className=" border-b px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <h2
            className="flex items-center gap-2 text-base font-semibold leading-6 "
            id="slide-over-title"
          >
            <IoMdArrowBack
              onClick={() =>
                setShowForm({
                  form: "",
                  edit: "",
                  show: false,
                })
              }
              className="cursor-pointer"
            />
            Service Settings
          </h2>
          <div className="ml-3 flex h-7 items-center">
            <button
              type="button"
              className="relative rounded-md  text-black  focus:outline-none focus:ring-2 focus:ring-white"
              onClick={() => setIsOpen(false)}
            >
              <span className="absolute -inset-2.5"></span>
              <span className="sr-only">Close panel</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <form className="flex flex-col gap-5 p-5">
        <div className="flex flex-col ">
          <div className="flex justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor="name">Name</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedField("name");
                  setLoadingTitle(true);
                  regenerateIndividual({
                    appState,
                    dispatch,
                    searchParams,
                    fieldName: "serviceName." + (data?.id ?? ""),
                    type,
                  }).then((res) => {
                    setLoadingTitle(false);
                    res &&
                      setData((preval: any) => {
                        return { ...preval, name: res.name };
                      });
                  });
                }}
                className="flex items-center gap-2 "
              >
                {showForm.edit || data?.name ? "Regenerate" : "Generate"}
                {loadingTitle ? (
                  <ImSpinner2 className="animate-spin text-lg text-black" />
                ) : (
                  <ImPower className=" text-xs " />
                )}
              </button>
              <RegenerateOptions setType={setType} type={type} />
            </div>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"name"}
            value={data?.name ?? ""}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
              if (showForm.edit) {
                handleChange(data?.id, {
                  ...{ ...data, name: e.target.value },
                  section,
                });
              }
            }}
          />
        </div>

        <div className="flex flex-col ">
          <div className="flex justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor="description"> Description</label>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedField("description");
                  setLoadingDesc(true);
                  regenerateIndividual({
                    appState,
                    dispatch,
                    searchParams,
                    fieldName: "serviceDescription." + (data?.id ?? ""),
                    type,
                  }).then((res) => {
                    setLoadingDesc(false);
                    res &&
                      setData((preval: any) => {
                        return { ...preval, description: res.description };
                      });
                  });
                }}
                className="flex items-center gap-2 "
              >
                {showForm.edit || data?.description ? "Regenerate" : "Generate"}
                {loadingDesc ? (
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
            value={data?.description ?? ""}
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
              if (showForm.edit) {
                handleChange(data?.id, {
                  ...{ ...data, description: e.target.value },
                  section,
                });
              }
            }}
          />
        </div>
        {!showForm?.edit && (
          <button
            onClick={() => handleServiceSubmit(data?.id)}
            type="button"
            className={`ml-auto  flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? "bg-indigo-500" : "bg-indigo-600 hover:bg-indigo-500 "}`}
            disabled={loading}
          >
            {loading && (
              <ImSpinner2 className="animate-spin text-lg text-white" />
            )}
            Save
          </button>
        )}
      </form>
    </div>
  );
};

export default CustomService;
