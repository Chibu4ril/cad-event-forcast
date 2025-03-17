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
  const [trainingSets, setTrainingSets] = useState<
    { name: string; filePathURL: string; fileDirectory: string }[]
  >([]);
  const [status, setStatus] = useState("Reconnecting to backend...");

  useEffect(() => {
    setIsClient(true);
    const getFiles = async () => {
      // const { normal_files, datasets } = await fetchUploadedFiles();
      try {
        const result = await fetchUploadedFiles();
        // console.log("fetchUploadedFiles result:", result); // Debugging

        if (Array.isArray(result)) {
          // If API returns an array directly, just use it
          setFiles(result);

          setUploads(result);
          setTrainingSets(result);
        } else if (
          result &&
          typeof result === "object" &&
          Array.isArray(result.files)
        ) {
          // If API returns { files: [...] }, extract files
          setFiles(result.files);
          setUploads(result.files);
          setTrainingSets(result.files);
        } else {
          console.error("Unexpected API response format:", result);
          setFiles([]); // Default to empty array to avoid breaking UI
        }
      } catch (error) {
        console.error("Error fetching files:", error);
        setFiles([]);
      }
    };

    const checkServer = async () => {
      try {
        const response = await fetch(
          "https://cad-backend-lcaa.onrender.com/api/health"
        );
        const data = await response.json();

        if (data.status === "ok") {
          setStatus("🟢");
        } else {
          setStatus("Restarting... 🟠");
        }
      } catch (error) {
        setStatus("Offline (Server Down) 🔴");
        // alert("⚠️ Server is down! Render may be restarting.");
        console.log(error);
      }
    };

    checkServer();
    const interval = setInterval(checkServer, 10000);

    clearInterval(interval);

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
      <div className="flex justify-end text-xs mb-5 ">
        Backend Status: {status}
      </div>
      <Table hoverable className="mb-10">
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

                <Table.Cell className="truncate ">
                  {files.some((training) => training.name === file.name)
                    ? files.find((training) => training.name === file.name)?.url
                    : file.url}
                </Table.Cell>
                <Table.Cell className="truncate">
                  <span
                    className={
                      uploads.some((upload) => upload.name === file.name)
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {uploads.some((upload) => upload.name === file.name)
                      ? "TESTING SET"
                      : "TRAINING SET"}
                  </span>
                </Table.Cell>

                <Table.Cell>
                  <span
                    className="flex items-center hover:text-red-600"
                    onClick={() => {
                      const fileUrl = trainingSets.some(
                        (training) => training.name === file.name
                      )
                        ? trainingSets.find(
                            (training) => training.name === file.name
                          )?.filePathURL || ""
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
