import React from "react";
import Modal from "./modal";
import Button from "./Button";

type ModalProps = {
  openModal: boolean;
  closeModal: () => void;
  taskName: string;
  btnStyle: string;
  setTaskName: (value: any) => void;
  setDescription: (value: any) => void;
  setStatus: (value: any) => void;
  selectedTask: any;
  modalCloseColor: any;
  createTask: () => void;
  handleSelectedToUpdate: () => void;
  loading: boolean;
  textColor: string;
};

//  Add Task Modal, reusable component in all to-do component
const AddTaskModal = ({
  openModal,
  closeModal,
  setTaskName,
  setDescription,
  setStatus,
  selectedTask,
  createTask,
  btnStyle,
  taskName,
  handleSelectedToUpdate,
  modalCloseColor,
  loading,
  textColor,
}: ModalProps) => {
  return (
    <Modal
      isOpen={openModal}
      isClose={closeModal}
      closeBtnColor={modalCloseColor}
      maxWidth="w-[400px]"
    >
      <div>
        <span className="dark:text-gray-300">Please fill in the details</span>

        <form className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col items-start gap-1">
            <label
              htmlFor=""
              className="dark:text-gray-300"
            >{`${taskName} name`}</label>
            <input
              type="text"
              name="task"
              placeholder={`Enter ${taskName} name`}
              onChange={setTaskName}
              className="w-full border h-12 outline-none rounded-lg pl-3  dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <label htmlFor="" className="dark:text-gray-300">
              Description
            </label>
            <input
              type="text"
              name="description"
              placeholder="Enter description: min of 5 words"
              minLength={40}
              onChange={setDescription}
              className="w-full border h-12 outline-none rounded-lg pl-3  dark:border-gray-700 dark:text-gray-300 dark:bg-gray-900"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <label htmlFor="" className="dark:text-gray-300">
              Status
            </label>

            <select
              name="status"
              onChange={setStatus}
              className="w-full border h-12 outline-none rounded-lg pl-3 dark:bg-gray-900 dark:border-gray-700 dark:text-gray-300"
            >
              <option value="Select status" className="">
                Select status
              </option>
              <option value="active">active</option>
              <option value="pending">pending</option>
            </select>
          </div>
        </form>
        {selectedTask ? (
          <Button
            text={`${loading ? "updating..." : `Update ${taskName}`} `}
            textStyles={textColor}
            btnStyles={`rounded-3xl ${btnStyle} py-3 mt-5 dark:border-gray-700`}
            handleClick={handleSelectedToUpdate}
          />
        ) : (
          <Button
            text={`${loading ? "creating..." : `Add ${taskName}`} `}
            textStyles={textColor}
            btnStyles={`rounded-3xl ${btnStyle} py-3 mt-5 dark:border-gray-700`}
            handleClick={createTask}
          />
        )}
      </div>
    </Modal>
  );
};

export default AddTaskModal;

// end..
