import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { appState as AS, updateAppState } from '@/lib/store/slices/site-slice';
import { generateUniqueId } from '@/lib/utils/function';
import { TSection } from '@/types';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { ImSpinner2 } from 'react-icons/im';
import { IoMdArrowBack } from 'react-icons/io';
import { Switch } from '../switch';
import Uploader from './uploader';

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

const CustomPartnerLogo = (props: TProps) => {
  const { setIsOpen, setShowForm, section, showForm, handleChange } = props;

  const [loading, setLoading] = useState(false);
  const appState = useAppSelector(AS);
  const dispatch = useAppDispatch();

  const [selectedField, setSelectedField] = useState<string | null>(null);
  const [data, setData] = useState<any>();

  const [showLinks, setShowLinks] = useState(false);

  function handleLogoSubmit(id: string) {
    setSelectedField(null);
    
    if (showForm.edit) {
      dispatch(
        updateAppState({
          ...appState,
          aiContent: {
            ...appState.aiContent,
            partners: {
              ...appState.aiContent.partners,
              list: appState.aiContent.partners.list?.map((item: any) => {
                if (item.id === id) {
                  return {
                    id: item.id,
                    name: data.name,
                    link: data.link,
                    logo: data.logo,
                  };
                } else {
                  return item;
                }
              }),
            },
          },
        })
      );
    } else {
      const id = generateUniqueId();

      dispatch(
        updateAppState({
          ...appState,
          aiContent: {
            ...appState.aiContent,
            partners: {
              ...appState.aiContent.partners,
              list: [
                ...(appState.aiContent.partners.list ?? []),
                {
                  id: id,
                  name: data.name,
                  link: data.link,
                  logo: data.logo,
                },
              ],
            },
          },
        })
      );
    }
    setShowForm({
      form: '',
      edit: '',
      show: false,
    });
  }

  useEffect(() => {
    if (showForm.edit) {
      const partners = appState?.aiContent?.partners?.list?.filter(
        (data: any) => data.id === showForm.edit
      );

      if (partners) {
        setData(partners[0]);
        setShowLinks(partners[0].link ? true : false);
      }
    }
  }, [showForm.edit, appState]);
        
  return (
    <div
      className={`h-fit ${showLinks ? 'max-h-[600px]' : 'max-h-[500px]'} overflow-auto`}
    >
      <div className=" border-b px-4 py-6 sm:px-6">
        <div className="flex items-center justify-between">
          <h2
            className="flex items-center gap-2 text-base font-semibold leading-6 "
            id="slide-over-title"
          >
            <IoMdArrowBack
              onClick={() =>
                setShowForm({
                  form: '',
                  edit: '',
                  show: false,
                })
              }
              className="cursor-pointer"
            />
            Logos
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
        <div className="flex flex-col gap-5">
          <h1 className="font-bold">
            {!showForm?.edit ? 'Add Logo' : 'Edit Logo'}
          </h1>
          <div className="flex flex-col border-b-2 border-gray-300 pb-5">
            <label className="mx-auto text-center text-sm font-medium leading-6 text-gray-900">
              Tap to upload an image
            </label>
            <Uploader
              defaultValue={data?.logo ?? ''}
              name={'logo'}
              label={''}
              contain
              onChange={(value) => {
                setData({ ...data, logo: value });
                if (showForm.edit) {
                  dispatch(
                    updateAppState({
                      ...appState,
                      aiContent: {
                        ...appState.aiContent,
                        partners: {
                          ...appState.aiContent.partners,
                          list: appState.aiContent.partners.list?.map(
                            (item: any) => {
                              if (item.id === showForm.edit) {
                                return {
                                  ...item,
                                  logo: value,
                                };
                              } else {
                                return item;
                              }
                            }
                          ),
                        },
                      },
                    })
                  );
                }
              }}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3>Add a Link</h3>
              <Switch
                onCheckedChange={(checked) => setShowLinks(checked)}
                checked={showLinks}
              />
            </div>
            {showLinks && (
              <>
                <label className="text-center block text-sm font-medium text-gray-700 mt-3">
                  Enter the URL
                </label>
                <input
                  type="text"
                  name={showForm.edit ?? '1'}
                  id={showForm.edit ?? '1'}
                  className="mt-1 rounded-md border border-gray-300"
                  placeholder="https://www.yourdomain.com"
                  value={data?.link ?? ''}
                  onChange={(e) => {
                    setData({ ...data, link: e.target.value });
                    if (showForm.edit)
                      dispatch(
                        updateAppState({
                          ...appState,
                          aiContent: {
                            ...appState.aiContent,
                            partners: {
                              ...appState.aiContent?.partners,
                              list: appState.aiContent?.partners?.list?.map(
                                (obj) => {
                                  if (obj.id === showForm.edit) {
                                    return { ...obj, link: e.target.value };
                                  } else {
                                    return obj;
                                  }
                                }
                              ),
                            },
                          },
                        })
                      );
                  }}
                />
              </>
            )}
          </div>
        </div>
        {!showForm?.edit && (
          <button
            onClick={() => handleLogoSubmit(data?.id)}
            type="button"
            className={`ml-auto flex gap-2 rounded-md px-3 py-2 text-sm  font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${loading ? 'bg-indigo-500' : 'bg-indigo-600 hover:bg-indigo-500 '}`}
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

export default CustomPartnerLogo;
