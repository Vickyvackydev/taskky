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
        <span>Please fill in the details</span>

        <form className="flex flex-col gap-5 mt-5">
          <div className="flex flex-col items-start gap-1">
            <label htmlFor="">{`${taskName} name`}</label>
            <input
              type="text"
              name="task"
              placeholder={`Enter ${taskName} name`}
              onChange={setTaskName}
              className="w-full border h-12 outline-none rounded-lg pl-3"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <label htmlFor="">Description</label>
            <input
              type="text"
              name="description"
              placeholder="Enter description"
              onChange={setDescription}
              className="w-full border h-12 outline-none rounded-lg pl-3"
            />
          </div>

          <div className="flex flex-col items-start gap-1">
            <label htmlFor="">Status</label>

            <select
              name="status"
              onChange={setStatus}
              className="w-full border h-12 outline-none rounded-lg pl-3"
            >
              <option value="Select status">Select status</option>
              <option value="active">active</option>
              <option value="disabled">disabled</option>
            </select>
          </div>
        </form>
        {selectedTask ? (
          <Button
            text={`${loading ? "updating..." : `Update ${taskName}`} `}
            textStyles={textColor}
            btnStyles={`rounded-3xl ${btnStyle} py-3 mt-5`}
            handleClick={handleSelectedToUpdate}
          />
        ) : (
          <Button
            text={`${loading ? "creating..." : `Add ${taskName}`} `}
            textStyles={textColor}
            btnStyles={`rounded-3xl ${btnStyle} py-3 mt-5`}
            handleClick={createTask}
          />
        )}
      </div>
    </Modal>
  );
};

export default AddTaskModal;
