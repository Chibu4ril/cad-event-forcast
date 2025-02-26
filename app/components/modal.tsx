"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  open,
  onClose,
}) => {
  return (
    <>
      <Modal
        show={open}
        size="md"
        onClose={onClose}
        popup
        className="rounded-2xl"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-red-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this dataset?
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="rounded-md" color="failure" onClick={onClose}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={onClose}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteConfirmation;
