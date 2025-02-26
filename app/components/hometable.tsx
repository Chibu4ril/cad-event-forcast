"use client";

import { Table } from "flowbite-react";
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { fetchUploadedFiles } from "../api/api";
import DeleteConfirmation from "./modal";

const HomeTable = () => {
  const [isClient, setIsClient] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const getFiles = async () => {
      const uploadedFiles = await fetchUploadedFiles();
      setFiles(uploadedFiles);
    };

    getFiles();
  }, []);
  if (!isClient) return null;

  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="col-span-2">File name</Table.HeadCell>
          <Table.HeadCell>Url</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {files.length > 0 ? (
            files.map((file) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={file.name}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {file.name}
                </Table.Cell>

                <Table.Cell className="truncate">{file.url}</Table.Cell>

                <Table.Cell>
                  <span
                    className="flex items-center hover:text-red-600"
                    onClick={() => setOpenModal(true)}
                  >
                    <Trash2 size={14} />
                    <span className="ml-1 cursor-pointer">Delete</span>
                  </span>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row className="flex justify-center items-center w-full">
              <Table.Cell className="w-full py-4 text-center" rowSpan={3}>
                No files found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <DeleteConfirmation open={openModal} onClose={handleClose} />
    </div>
  );
};
export default HomeTable;
