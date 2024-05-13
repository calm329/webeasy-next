import { FormField, TFields, TSection } from "@/types";
import React, { Dispatch, SetStateAction, useState } from "react";
import { DebouncedState } from "usehooks-ts";
import CustomButton from "@/components/ui/form/custom-button";

type TProps = {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  section: TSection;
  handleChange: DebouncedState<(name: string, value: string) => void>;
  subdomain: string;
  brandCustomizeFields: FormField[];
  heroCustomizeFields: FormField[];
  focusedField: TFields;
  isMobile?: boolean;
  children: React.ReactNode;
  showButtonForm: boolean;
  setShowButtonForm: React.Dispatch<React.SetStateAction<boolean>>;
};

const CustomizePanel = (props: TProps) => {
  const {
    setIsOpen,
    section,
    handleChange,
    subdomain,
    heroCustomizeFields,
    brandCustomizeFields,
    focusedField,
    isMobile,
    children,
    showButtonForm,
    setShowButtonForm,
  } = props;
  const [isContent, setIsContent] = useState(true);

  return showButtonForm ? (
    <CustomButton setIsOpen={setIsOpen} setShowButtonForm={setShowButtonForm} />
  ) : (
    <div className=" ">
      {!isMobile && (
        <>
          <div className=" px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <h2
                className="text-base font-semibold leading-6 "
                id="slide-over-title"
              >
                {section}
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
          <div className="">
            <div className="">
              <div className="border-b border-gray-200 ">
                <nav className=" flex " aria-label="Tabs">
                  <div
                    onClick={() => setIsContent(true)}
                    className={`group inline-flex items-center border-b-2  px-1 py-4 text-sm font-medium ${isContent ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center`}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 20 20"
                      width="24"
                      height="24"
                      aria-hidden="true"
                      className={`-ml-0.5 mr-2 h-5 w-5 ${isContent ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500"}`}
                    >
                      <rect
                        width="7"
                        height="7"
                        strokeWidth="1.5"
                        rx="1.16667"
                        transform="matrix(-1 0 0 1 9 3)"
                      ></rect>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.5"
                        d="m12.5 10 .7857-2M18 10l-.7857-2m0 0L15.25 3l-1.9643 5m3.9286 0h-3.9286"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeWidth="1.5"
                        d="M2 13.5h16M2 17h14"
                      ></path>
                    </svg>
                    <span>Content</span>
                  </div>

                  <div
                    onClick={() => setIsContent(false)}
                    className={`group inline-flex items-center border-b-2 ${!isContent ? "border-indigo-500 text-indigo-600" : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"} w-1/2 justify-center px-1 py-4  text-sm font-medium`}
                    aria-current="page"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      width="24"
                      height="24"
                      className={`-ml-0.5 mr-2 h-5 w-5 ${!isContent ? "text-indigo-500" : "text-gray-400 group-hover:text-gray-500"}`}
                      aria-hidden="true"
                    >
                      <path d="M12.4632 14.7277c.3088.3149.6854.4723 1.13.4723.4446 0 .8236-.1574 1.1369-.4723.3133-.3148.47-.7006.47-1.1574 0-.3568-.07-.6939-.21-1.0111-.14-.3173-.31-.6117-.51-.8833l-.52-.6926c-.0933-.1222-.2133-.1833-.36-.1833s-.2667.0611-.36.1833l-.52.6926c-.2133.2716-.3867.566-.52.8833-.1333.3172-.2.6543-.2 1.0111 0 .4568.1544.8426.4631 1.1574Z"></path>
                      <path
                        fillRule="evenodd"
                        d="M11.0506 1.01682c.1198-.359279-.0744-.747612-.4336-.867371-.3593-.1197581-.74766.074409-.86741.433684L9.058 2.65788l-.88815-.88816c-.53558-.53557-1.40392-.53557-1.9395 0l-4.4605 4.46051c-.53558.53558-.53558 1.40391 0 1.93949l4.4605 4.46048c.15077.1508.3279.2591.51656.325.31398.1097.65988.1017.96926-.0237.1651-.067.31981-.1674.45371-.3013l4.46052-4.46048c.5355-.53557.5355-1.40391 0-1.93949l-2.4882-2.48814.9084-2.72527ZM8.57313 4.1125l-.42354 1.27063c-.11976.35928.0744.74761.43368.86737.35927.11976.74761-.07441.86737-.43368l.2067-.62011 2.00326 2.00327H2.73959L7.2001 2.73947 8.57313 4.1125Z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span>Style</span>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex flex-1 flex-col justify-between">
        {isContent ? (
          <div className="divide-y divide-gray-200 ">{children}</div>
        ) : null}
      </div>
    </div>
  );
};

export default CustomizePanel;
