"use client";

import { Dropdown, Table } from "flowbite-react";
import { Ellipsis, Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useState } from "react";
import { deletedUploadedFiles, fetchUploadedFiles } from "../api/api";

const HomeTable = () => {
  const [isClient, setIsClient] = useState(false);
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);

  useEffect(() => {
    setIsClient(true);
    const getFiles = async () => {
      const uploadedFiles = await fetchUploadedFiles();
      setFiles(uploadedFiles);
    };

    getFiles();
  }, []);
  if (!isClient) return null;

  const deleteFile = async (fileUrl: string) => {
    deletedUploadedFiles(fileUrl);
  };

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
                  <Dropdown
                    label=""
                    dismissOnClick={false}
                    placement="right"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    renderTrigger={() => (
                      <span>
                        <Ellipsis />
                      </span>
                    )}
                  >
                    <Dropdown.Item
                      className="hover:text-red-600 py-0"
                      onClick={() => deleteFile(file.url)}
                    >
                      <Trash2 size={14} />
                      <span className="ml-1 cursor-pointer">Delete</span>
                    </Dropdown.Item>
                  </Dropdown>
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
    </div>
  );
};
export default HomeTable;
