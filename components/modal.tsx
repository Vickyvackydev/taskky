import { Transition, Dialog } from "@headlessui/react";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  // state modal params types
  isOpen: boolean;
  isClose: () => void;
  closeBtnColor: string;
  children: React.ReactNode;
  maxWidth: string;
};

// Modal component reusable in all component
const Modal = ({
  isOpen,
  isClose,
  children,
  closeBtnColor,
  maxWidth,
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
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
                  className={` ${maxWidth} transform overflow-hidden rounded-2xl text-center bg-white dark:bg-bg_black p-6 align-middle shadow-xl transition-all h-full`}
                >
                  <button
                    type="button"
                    className={`flex items-center justify-center w-7 h-7 rounded-full ${closeBtnColor} hover:scale-90 transition-all `}
                    onClick={isClose}
                  >
                    <FaTimes />
                  </button>
                  <div className="mt-2 max-h-[500px] overflow-y-auto ">
                    {children}
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

export default Modal;

// end..
