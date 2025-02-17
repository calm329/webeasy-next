import React, { createContext, Fragment, ReactNode } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Drawer, DrawerContent } from "../drawer";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { IoClose } from "react-icons/io5";
import {
  DialogName,
  useResponsiveDialog,
} from "@/lib/context/responsive-dialog-context";

interface ResponsiveDialogProps {
  id: DialogName;
  children: ReactNode;
  showClose?: boolean;
  dismissible?: boolean;
  width?: string; // Added width prop
  [key: string]: any;
}

const ResponsiveDialog: React.FC<ResponsiveDialogProps> = ({
  id,
  children,
  showClose = true,
  dismissible = true,
  width = "480px", // Default width
  ...props
}) => {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { dialogState, closeDialog } = useResponsiveDialog();

  const isOpen = dialogState[id] || false;

  const handleClose = () => {
    closeDialog(id);
  };

  console.log("isOpen", isOpen);
  return (
    <>
      {isDesktop ? (
        <Transition show={isOpen} as={Fragment}>
          <Dialog
            as="div"
            open={isOpen}
            className="relative z-10"
            onClose={() => dismissible && handleClose()}
          >
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/80 transition-opacity" />
            </TransitionChild>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <TransitionChild
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                  enterTo="opacity-100 translate-y-0 sm:scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                  leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                  <DialogPanel
                    className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[480px] sm:p-6"
                    style={{ maxWidth: width }}
                  >
                    {showClose && (
                      <div className="flex w-full">
                        <button onClick={handleClose} className="ml-auto">
                          <IoClose size={20} />
                        </button>
                      </div>
                    )}
                    {children}
                  </DialogPanel>
                </TransitionChild>
              </div>
            </div>
          </Dialog>
        </Transition>
      ) : (
        <Drawer open={isOpen} onClose={handleClose}>
          <DrawerContent>
            <div className="mx-auto w-full max-w-sm px-5 pb-10">{children}</div>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default ResponsiveDialog;
