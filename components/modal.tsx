import { Transition, Dialog } from "@headlessui/react";
import React, { Fragment } from "react";
import { FaTimes } from "react-icons/fa";

type ModalProps = {
  isOpen: boolean;
  isClose: () => void;
  children: React.ReactNode;
};
const Modal = ({ isOpen, isClose, children }: ModalProps) => {
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl text-center bg-white p-6 align-middle shadow-xl transition-all h-full">
                  <button
                    type="button"
                    className="flex items-center justify-center w-7 h-7 rounded-full bg-purple-400 text-white hover:scale-90 transition-all "
                    onClick={isClose}
                  >
                    <FaTimes />
                  </button>
                  <div className="mt-2 max-h-[500px] overflow-y-auto">
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
