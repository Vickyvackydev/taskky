import React from "react";
import Modal from "./modal";

type Props = {
  open: boolean;
  close: () => void;
  items: any;
};
const DetailsBox = ({ open, close, items }: Props) => {
  return (
    <Modal isOpen={open} isClose={close}>
      <div>{items && <span>{items.input1}</span>}</div>
    </Modal>
  );
};

export default DetailsBox;
