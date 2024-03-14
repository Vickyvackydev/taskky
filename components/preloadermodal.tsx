import { Transition, Dialog } from "@headlessui/react";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  isOpen: boolean;
  isClose: () => void;
  loaderColor: string;

  loadertext: string;
};

// preloader spinner for the login after successfull authentication
const PreloaderModal = ({
  isOpen,
  isClose,
  loaderColor,
  loadertext,
}: ModalProps) => {
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" onClose={isClose} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full justify-center items-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  className={`transform overflow-hidden  p-6 align-middle transition-all h-full`}
                >
                  <div className="mt-2 max-h-[500px] overflow-y-auto flex justify-center flex-col">
                    <span
                      className={`loading loading-spinner loading-lg ${loaderColor}`}
                    ></span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PreloaderModal;
