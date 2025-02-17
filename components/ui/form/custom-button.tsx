import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";

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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../select";
import { FormField, TSection } from "@/types";
import { DebouncedState } from "use-debounce";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { appState as AS, updateAppState } from "@/lib/store/slices/site-slice";
import { randomUUID } from "crypto";
import { generateUniqueId, validateURL } from "@/lib/utils/function";
import { Switch } from "@/components/ui/switch";
import { sectionsData as SD } from "@/lib/store/slices/section-slice";

const linkTypes = ["External", "Section", "Page", "Email", "Phone"];

const CustomButton = (props: TProps) => {
  const sections = useAppSelector(SD);
  const { setIsOpen, setShowForm, section, showForm, handleChange } = props;
  const [loading, setLoading] = useState(false);
  const appState = useAppSelector(AS);

  const [data, setData] = useState<any>();
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (showForm.edit) {
      switch (section) {
        case "Banner":
          appState.aiContent.banner.button.list?.forEach((child) => {
            if (child.name === showForm.edit) {
              setData(child);
            }
          });

          break;
        case "Hero":
          appState.aiContent.hero.button.list?.forEach((child) => {
            if (child.name === showForm.edit) {
              setData(child);
            }
          });
          break;
      }
    }
  }, [showForm]);
  const [error, setError] = useState("");
  function handleButtonSubmit(name: string) {
    if (!error) {
      if (showForm.edit) {
        switch (section) {
          case "Banner":
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  banner: {
                    ...appState.aiContent.banner,
                    button: {
                      ...appState.aiContent.banner.button,
                      list: appState.aiContent.banner.button.list.map(
                        (item) => {
                          if (item.name === name) {
                            return {
                              name: name,
                              label: data.label,
                              type: data.type,
                              link: data.link,
                            };
                          } else {
                            return item;
                          }
                        },
                      ),
                    },
                  },
                },
              }),
            );
            break;
          case "Hero":
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  hero: {
                    ...appState.aiContent.hero,
                    button: {
                      ...appState.aiContent.hero.button,
                      list: appState.aiContent.hero.button.list.map((item) => {
                        if (item.name === name) {
                          return {
                            name: name,
                            label: data.label,
                            type: data.type,
                            link: data.link,
                          };
                        } else {
                          return item;
                        }
                      }),
                    },
                  },
                },
              }),
            );
            break;
        }
      } else {
        const id = generateUniqueId();
        switch (section) {
          case "Banner":
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  banner: {
                    ...appState.aiContent.banner,
                    button: {
                      ...appState.aiContent.banner.button,
                      list: [
                        ...appState.aiContent.banner.button.list,
                        {
                          name: id,
                          label: data.label,
                          type: "External",
                          link: data.link,
                        },
                      ],
                    },
                  },
                },
              }),
            );
            break;
          case "Hero":
            dispatch(
              updateAppState({
                ...appState,
                aiContent: {
                  ...appState.aiContent,
                  hero: {
                    ...appState.aiContent.hero,
                    button: {
                      ...appState.aiContent.hero.button,
                      list: [
                        ...appState.aiContent.hero.button.list,
                        {
                          name: id,
                          label: data.label,
                          type: "External",
                          link: data.link,
                        },
                      ],
                    },
                  },
                },
              }),
            );
            break;
        }
      }

      setShowForm({
        form: "",
        edit: "",
        show: false,
      });
    }
  }

  function renderFieldByType(type: string) {
    switch (type) {
      case "External":
        return (
          <div className="flex flex-col ">
            <label
              htmlFor="website"
              className="text-sm font-medium leading-6 text-gray-900 "
            >
              Website
            </label>
            <input
              type="text"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id={"website"}
              placeholder="https://www.example.com"
              defaultValue={data?.link ?? ""}
              onChange={(e) => {
                const url = e.target.value;
                setData({ ...data, link: url });

                if (!validateURL(url)) {
                  setError("Please enter a valid URL.");
                } else {
                  setError("");
                }

                if (showForm.edit) {
                  handleChange(data.name, {
                    ...{ ...data, link: url },
                    fieldType: "button",
                    section,
                  });
                }
              }}
            />
            {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
          </div>
        );
      case "Section":
        return (
          <div className="flex flex-col ">
            <label
              htmlFor="linktype"
              className="text-sm font-medium leading-6 text-gray-900 "
            >
              {data?.type}s
            </label>
            {data?.link && (
              <Select
                defaultValue={data.link}
                onValueChange={(url) => {
                  setData({ ...data, link: url });

                  if (showForm.edit) {
                    handleChange(data.name, {
                      ...{ ...data, link: url },
                      fieldType: "button",
                      section,
                    });
                  }
                }}
              >
                <SelectTrigger className="">
                  <SelectValue placeholder={`Select a ${data?.type}`} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {sections.map((section) => (
                      <SelectItem value={section.id} key={section.id}>
                        {section.title}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>
        );
      case "Page":
        return (
          <div className="flex flex-col ">
            <label
              htmlFor="linktype"
              className="text-sm font-medium leading-6 text-gray-900 "
            >
              {data?.type}s
            </label>
            <Select>
              <SelectTrigger className="">
                <SelectValue placeholder={`Select a ${data?.type}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {/* Map your options here */}
                  <SelectItem value="example1">Example</SelectItem>
                  <SelectItem value="example2">Example 2</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        );
      case "Email":
        return (
          <div className="flex flex-col ">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-6 text-gray-900 "
            >
              Email
            </label>
            <input
              type="email"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id={"email"}
              placeholder="example@gmail.com"
              defaultValue={data?.link ?? ""}
              onChange={(e) => {
                const url = e.target.value;
                setData({ ...data, link: url });

                if (showForm.edit) {
                  handleChange(data.name, {
                    ...{ ...data, link: url },
                    fieldType: "button",
                    section,
                  });
                }
              }}
            />
          </div>
        );
      case "Phone":
        return (
          <div className="flex flex-col ">
            <label
              htmlFor="tel"
              className="text-sm font-medium leading-6 text-gray-900 "
            >
              Phone
            </label>
            <input
              type="tel"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              id={"tel"}
              placeholder="1234567890"
              defaultValue={data?.link ?? ""}
              onChange={(e) => {
                const url = e.target.value;
                setData({ ...data, link: url });

                if (showForm.edit) {
                  handleChange(data.name, {
                    ...{ ...data, link: url },
                    fieldType: "button",
                    section,
                  });
                }
              }}
            />
          </div>
        );
      default:
        return null;
    }
  }

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
            Button Settings
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
          <label
            htmlFor="linktype"
            className="text-sm font-medium leading-6 text-gray-900 "
          >
            Link type
          </label>
          {data?.type && (
            <Select
              // defaultValue={data?.type ?? ""}
              defaultValue={data?.type ?? "External"}
              onValueChange={(value) => {
                console.log("value", value);
                setData({ ...data, type: value });
                if (showForm.edit) {
                  handleChange(data?.name, {
                    ...{ ...data, type: value },
                    fieldType: "button",
                    section,
                  });
                }
              }}
            >
              <SelectTrigger className="">
                <SelectValue placeholder="Select a Link Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {linkTypes.map((type) => (
                    <SelectItem value={type} key={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex flex-col ">
          <label
            htmlFor="label"
            className="text-sm font-medium leading-6 text-gray-900 "
          >
            Label
          </label>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            id={"label"}
            defaultValue={data?.label ?? ""}
            onChange={(e) => {
              setData({ ...data, label: e.target.value });
              if (showForm.edit) {
                handleChange(data.name, {
                  ...{ ...data, label: e.target.value },
                  fieldType: "button",
                  section,
                });
              }
            }}
          />
        </div>
        {renderFieldByType(data?.type)}
        {data?.type !== "Phone" && data?.type !== "Section" && (
          <div className="flex items-center justify-between gap-5 ">
            <p className="text-sm font-medium leading-6 text-gray-900">
              Open in a new browser tab
            </p>
            <Switch />
          </div>
        )}
      </form>
    </div>
  );
};

export default CustomButton;
