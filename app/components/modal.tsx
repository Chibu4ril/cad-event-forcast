"use client";

import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { handleFileDelete } from "../actions";

interface DeleteConfirmationProps {
  open: boolean;
  onClose: () => void;
  fileUrl: string | null;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  open,
  onClose,
  fileUrl,
}) => {
  const deleteSet = async () => {
    if (!fileUrl) return;
    const deleteFile = await handleFileDelete(fileUrl);
    onClose();
    return deleteFile;
  };
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
              <Button
                className="rounded-md"
                color="failure"
                onClick={deleteSet}
              >
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
