import { Dropdown, Table } from "flowbite-react";
import { Ellipsis, Trash2 } from "lucide-react";
import React from "react";
import { useEffect, useState } from "react";
import { fetchUploadedFiles } from "../api/api";

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

  return (
    <div>
      <Table hoverable>
        <Table.Head>
          <Table.HeadCell col-span-2>File name</Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
          <Table.HeadCell></Table.HeadCell>
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

                <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell>

                <Table.Cell>
                  <a
                    href="#"
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                  >
                    <Dropdown
                      label=""
                      dismissOnClick={false}
                      placement="right"
                      renderTrigger={() => (
                        <span>
                          <Ellipsis />
                        </span>
                      )}
                    >
                      <Dropdown.Item className="hover:text-red-600 py-0">
                        <Trash2 size={14} />
                        <span className="ml-1 cursor-pointer">Delete</span>
                      </Dropdown.Item>
                    </Dropdown>
                  </a>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <div className="flex justify-center items-center w-full">
              <p className=" w-full py-4">No files found</p>
            </div>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default HomeTable;
