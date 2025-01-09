import { ReactNode, useState } from "react";

const Modal = ({
  children,
  isOpen,
  onClose,
}: {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) => {
  // if (!isOpen) return null;

  return (
    <div className="p-4 bg-orange-200 w-full fixed top-1/4 left-0 translate-x-1/2 -translate-y-1/2">
      Content
    </div>
  );
};

export const CustomDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <button>Open</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        Hello World
      </Modal>
    </>
  );
};
export default CustomDialog;
