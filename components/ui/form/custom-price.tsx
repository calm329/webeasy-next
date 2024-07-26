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
import {
  generateIndividualFeature,
  generateUniqueId,
  getRandomImageFromUnsplash,
  regenerateIndividual,
} from "@/lib/utils/function";
import { BsThreeDotsVertical } from "react-icons/bs";
import RegenerateOptions from "@/components/regenerate-options";
import { useSearchParams } from "next/navigation";
import { features } from "process";
import Uploader from "./uploader";
import { Switch } from "../switch";
import { MdDeleteForever } from 'react-icons/md';

const CustomPrice = (props: TProps) => {
  const { setIsOpen, setShowForm, section, showForm, handleChange } = props;
  const [loadingTitle, setLoadingTitle] = useState(false);
  const [loadingDesc, setLoadingDesc] = useState(false);
  const [loadingAvatar, setLoadingAvatar] = useState(false);

  const [loading, setLoading] = useState(false);
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();
  const [type, setType] = useState("");
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [data, setData] = useState<any>();
  const searchParams = useSearchParams();
  function handleFaqSubmit(id: string) {
    setSelectedField(null);
    console.log("hi");
    if (showForm.edit) {
      dispatch(
        updateAppState({
          ...appState,
          aiContent: {
            ...appState.aiContent,
            pricing: {
              ...appState.aiContent.pricing,
              list: appState.aiContent.pricing.list?.map((item: any) => {
                if (item.id === id) {
                  return {
                    id: item.id,

                    name: data.name,
                    description: data.description,
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
            pricing: {
              ...appState.aiContent.pricing,
              list: [
                ...(appState.aiContent.pricing.list ?? []),
                {
                  id: id,
                  name: data.name,
                  description: data.description,
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
      const pricing = appState?.aiContent?.pricing?.list?.filter(
        (data: any) => data.id === showForm.edit,
      );
      if (pricing) {
        setData(pricing[0]);
      }
    }
  }, [showForm.edit, appState]);

  console.log("data", data);
  return (
    <div className="h-fit max-h-[600px] overflow-auto">
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
            Pricing Settings
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
      <div className="flex justify-between px-5 pt-5">
        <h2>Most Popular:</h2>
        <Switch
          onCheckedChange={(checked) => {
            setData({ ...data, mostPopular: checked });
            if (showForm.edit) {
              const data = appState.aiContent?.pricing?.list?.map(
                (item: any) => {
                  if (item.id === showForm.edit) {
                    return {
                      ...item,
                      mostPopular: checked,
                    };
                  } else {
                    return {
                      ...item,
                      mostPopular: false,
                    };
                  }
                },
              );
              console.log("data", data);
              dispatch(
                updateAppState({
                  ...appState,
                  aiContent: {
                    ...appState.aiContent,
                    pricing: {
                      ...appState.aiContent.pricing,
                      list: data,
                    },
                  },
                }),
              );
            }
          }}
          checked={data?.mostPopular}
        />
      </div>
      <form className="flex flex-col gap-5 p-5">
        <div className="flex flex-col ">
          <div className="flex justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor="name">Name</label>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"name"}
            value={data?.name ?? ""}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
              if (showForm.edit) {
                const data = appState.aiContent?.pricing?.list?.map(
                  (item: any) => {
                    if (item.id === showForm.edit) {
                      return {
                        ...item,
                        name: e.target.value,
                      };
                    } else {
                      return item;
                    }
                  },
                );
                console.log("data", data);
                dispatch(
                  updateAppState({
                    ...appState,
                    aiContent: {
                      ...appState.aiContent,
                      pricing: {
                        ...appState.aiContent.pricing,
                        list: data,
                      },
                    },
                  }),
                );
              }
            }}
          />
        </div>

        <div className="flex flex-col ">
          <div className="flex justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor="description"> description</label>
          </div>
          <textarea
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"description"}
            value={data?.description ?? ""}
            onChange={(e) => {
              setData({ ...data, description: e.target.value });
              if (showForm.edit) {
                dispatch(
                  updateAppState({
                    ...appState,
                    aiContent: {
                      ...appState.aiContent,
                      pricing: {
                        ...appState.aiContent.pricing,
                        list: appState.aiContent.pricing.list?.map(
                          (item: any) => {
                            if (item.id === showForm.edit) {
                              return {
                                ...item,
                                description: e.target.value,
                              };
                            } else {
                              return item;
                            }
                          },
                        ),
                      },
                    },
                  }),
                );
              }
            }}
          />
        </div>
        <div className="flex flex-col ">
          <div className="flex justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor="priceMonthly">priceMonthly</label>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"priceMonthly"}
            value={data?.priceMonthly ?? ""}
            onChange={(e) => {
              setData({ ...data, priceMonthly: e.target.value });
              if (showForm.edit) {
                const data = appState.aiContent?.pricing?.list?.map(
                  (item: any) => {
                    if (item.id === showForm.edit) {
                      return {
                        ...item,
                        priceMonthly: e.target.value,
                      };
                    } else {
                      return item;
                    }
                  },
                );
                console.log("data", data);
                dispatch(
                  updateAppState({
                    ...appState,
                    aiContent: {
                      ...appState.aiContent,
                      pricing: {
                        ...appState.aiContent.pricing,
                        list: data,
                      },
                    },
                  }),
                );
              }
            }}
          />
        </div>

        <div className="flex flex-col ">
          <div className="flex justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor="href">href</label>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"href"}
            value={data?.href ?? ""}
            onChange={(e) => {
              setData({ ...data, href: e.target.value });
              if (showForm.edit) {
                const data = appState.aiContent?.pricing?.list?.map(
                  (item: any) => {
                    if (item.id === showForm.edit) {
                      return {
                        ...item,
                        href: e.target.value,
                      };
                    } else {
                      return item;
                    }
                  },
                );
                console.log("data", data);
                dispatch(
                  updateAppState({
                    ...appState,
                    aiContent: {
                      ...appState.aiContent,
                      pricing: {
                        ...appState.aiContent.pricing,
                        list: data,
                      },
                    },
                  }),
                );
              }
            }}
          />
        </div>

        <div className="flex flex-col ">
          <div className="flex justify-between text-sm font-medium leading-6 text-gray-900">
            <label htmlFor="button">button</label>
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"button"}
            value={data?.button ?? ""}
            onChange={(e) => {
              setData({ ...data, button: e.target.value });
              if (showForm.edit) {
                const data = appState.aiContent?.pricing?.list?.map(
                  (item: any) => {
                    if (item.id === showForm.edit) {
                      return {
                        ...item,
                        button: e.target.value,
                      };
                    } else {
                      return item;
                    }
                  },
                );
                console.log("data", data);
                dispatch(
                  updateAppState({
                    ...appState,
                    aiContent: {
                      ...appState.aiContent,
                      pricing: {
                        ...appState.aiContent.pricing,
                        list: data,
                      },
                    },
                  }),
                );
              }
            }}
          />
        </div>

        <div>
          {appState.aiContent?.pricing?.list?.map((plan: any) => (
            <div key={plan.id}>
              {/* Render form only if edit mode is enabled for this plan */}
              {plan.id === showForm?.edit && (
                <div className="flex flex-col">
                  <h2>Features</h2>
                  {plan.features.map((feature: any, featureIndex: any) => (
                    <div className="flex gap-3 pb-3" key={featureIndex}>
                      <input
                        type="text"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        id={`feature-${plan.id}-${featureIndex}`}
                        value={feature}
                        onChange={(e) => {
                          const updatedFeatures = [...plan.features];
                          updatedFeatures[featureIndex] = e.target.value;
                          const updatedList =
                            appState.aiContent.pricing.list.map((p: any) => {
                              if (p.id === plan.id) {
                                return { ...p, features: updatedFeatures };
                              }
                              return p;
                            });
                          dispatch(
                            updateAppState({
                              ...appState,
                              aiContent: {
                                ...appState.aiContent,
                                pricing: {
                                  ...appState.aiContent.pricing,
                                  list: updatedList,
                                },
                              },
                            }),
                          );
                        }}
                      />
                      {/* Add a delete button for each feature */}
                      <button
                        type="button"
                        className="ml-2 text-red-500"
                        onClick={() => {
                          const updatedFeatures = [...plan.features];
                          updatedFeatures.splice(featureIndex, 1); // Remove the feature at featureIndex
                          const updatedList =
                            appState.aiContent.pricing.list.map((p: any) => {
                              if (p.id === plan.id) {
                                return { ...p, features: updatedFeatures };
                              }
                              return p;
                            });
                          dispatch(
                            updateAppState({
                              ...appState,
                              aiContent: {
                                ...appState.aiContent,
                                pricing: {
                                  ...appState.aiContent.pricing,
                                  list: updatedList,
                                },
                              },
                            }),
                          );
                        }}
                      >
                        <MdDeleteForever/>
                      </button>
                    </div>
                  ))}
                  {/* Button to add a new feature */}
                  <button
                    type="button"
                    className="text-indigo-600 ml-auto mr-0"
                    onClick={() => {
                      const updatedFeatures = [...plan.features, ""]; // Add a new empty feature
                      const updatedList = appState.aiContent.pricing.list.map(
                        (p: any) => {
                          if (p.id === plan.id) {
                            return { ...p, features: updatedFeatures };
                          }
                          return p;
                        },
                      );
                      dispatch(
                        updateAppState({
                          ...appState,
                          aiContent: {
                            ...appState.aiContent,
                            pricing: {
                              ...appState.aiContent.pricing,
                              list: updatedList,
                            },
                          },
                        }),
                      );
                    }}
                  >
                    + Add Feature
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {!showForm?.edit && (
          <button
            onClick={() => handleFaqSubmit(data?.id)}
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

export default CustomPrice;
