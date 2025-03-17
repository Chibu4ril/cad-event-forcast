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
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [uploads, setUploads] = useState<{ name: string; url: string }[]>([]);
  // const [trainingSets, setTrainingSets] = useState<
  //   { name: string; filePathURL: string; fileDirectory: string }[]
  // >([]);

  useEffect(() => {
    setIsClient(true);
    const getFiles = async () => {
      const { normal_files } = await fetchUploadedFiles();

      const mergedFiles = [...normal_files];

      setFiles(mergedFiles);

      setUploads(normal_files);
      // setTrainingSets(datasets);
    };

    getFiles();
  }, []);
  if (!isClient) return null;

  const handleClose = () => {
    setOpenModal(false);
    setSelectedFileUrl(null);
  };

  const handleOpenModal = (fileUrl: string) => {
    setSelectedFileUrl(fileUrl);
    setOpenModal(true);
  };

  return (
    <div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell className="col-span-2">File name</Table.HeadCell>
          <Table.HeadCell>Url</Table.HeadCell>
          <Table.HeadCell>Dataset Type</Table.HeadCell>
          <Table.HeadCell>Action</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {files.length > 0 ? (
            files.map((file, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="whitespace-nowrap font-bold text-gray-900 dark:text-white">
                  {file.name}
                </Table.Cell>

                <Table.Cell className="truncate ">{file.url}</Table.Cell>
                <Table.Cell className="truncate">
                  <span
                    className={
                      uploads.some((upload) => upload.name === file.name)
                        ? "text-lime-500"
                        : "text-lime-500"
                    }
                  >
                    {uploads.some((upload) => upload.name === file.name)
                      ? "TESTING SET"
                      : ""}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <span
                    className="flex items-center hover:text-red-600"
                    onClick={() => {
                      const fileUrl = uploads.some(
                        (training) => training.name === file.name
                      )
                        ? uploads.find(
                            (training) => training.name === file.name
                          )?.name || ""
                        : file.url || "";

                      handleOpenModal(fileUrl);
                    }}
                  >
                    <Trash2 size={14} />
                    <span className="ml-1 cursor-pointer">Delete</span>
                  </span>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row className="flex justify-center items-center w-full">
              <Table.Cell className="w-full py-4 text-center" colSpan={3}>
                No files found
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <DeleteConfirmation
        open={openModal}
        onClose={handleClose}
        fileUrl={selectedFileUrl}
      />
    </div>
  );
};
export default HomeTable;
