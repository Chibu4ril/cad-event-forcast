"use client";

import {
  Alert,
  Button,
  Card,
  Checkbox,
  FileInput,
  Label,
  Tooltip,
} from "flowbite-react";
import { handleDatasetUpload, handleFileChange } from "../actions";
import { useEffect, useState } from "react";
import {
  FileSpreadsheet,
  Frown,
  Info,
  Smile,
  UploadCloud,
  X,
} from "lucide-react";
// import { fetchUploadedFiles } from "../api/api";

export function UploadCard() {
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    message: string;
    success: boolean;
  } | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [checkbox, setCheckbox] = useState(false);
  const [dataset, setDataset] = useState<File | null>(null);
  const [fileType, setFileType] = useState(false);

  // Function to handle file selection
  const onFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv" && file.size <= 1024 * 1024) {
      setSelectedFile(file);
      setDataset(file);
    } else {
      setSelectedFile(null);
      setUploadStatus({
        message: "Please select a valid CSV file (max 1MB).",
        success: false,
      });
      return;
    }
  };

  const handleCheckbox = () => {
    setCheckbox((prev) => !prev);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus({
        message: "No file selected. Please select a file first.",
        success: false,
      });
      return;
    }

    let error;
    setUploading(true);
    const fileName = `${selectedFile.name}`;
    if (checkbox && dataset) {
      ({ error } = await handleDatasetUpload(dataset, fileName));
      setFileType(true);
      console.log("dataset folder selected");
    } else {
      ({ error } = await handleFileChange(selectedFile, fileName));
      // console.log("random upload");
      setFileType(false);
    }

    if (error) {
      setUploadStatus({
        message: `${error.message}`,
        success: false,
      });
    } else {
      setUploadStatus({
        message: "You have upload your dataset successfully!",
        success: true,
      });
      setSelectedFile(null);
    }

    setUploading(false);
  };

  useEffect(() => {
    if (uploadStatus) {
      const timer = setTimeout(() => {
        setUploadStatus(null);
        window.location.reload();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [uploadStatus]);

  return (
    <div className="">
      {uploadStatus && (
        <div className="mb-4">
          <Alert
            color={uploadStatus.success ? "success" : "failure"}
            onDismiss={() => setUploadStatus(null)}
            className="rounded-sm"
          >
            <div className="flex items-center">
              <span className="font-medium">
                {uploadStatus.success ? (
                  <Smile size={16} className="text-lime-700 mr-2" />
                ) : (
                  <Frown size={16} className="text-red-700 mr-2" />
                )}
              </span>
              <span>{uploadStatus.message}</span>
            </div>
          </Alert>
        </div>
      )}
      <div>
        <div className="flex items-center gap-2 mb-5">
          <Checkbox id="accept" onChange={handleCheckbox} checked={checkbox} />
          <Label htmlFor="accept" className="flex">
            <span className="flex items-center text-teal-500 hover:underline font-bold">
              Uploading a training dataset? Check this box!{" "}
              <Tooltip
                content="Files will be added to the list of training data sets when this box is checked"
                className="ms-1"
              >
                <Info size={24} />
              </Tooltip>
            </span>
          </Label>
        </div>

        <div className="flex w-full items-center justify-center">
          <Label
            htmlFor="dropzone-file"
            className="flex h-96 w-full cursor-pointer rounded-xl flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <UploadCloud size={32} />
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Click and select a file to upload.
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                CSV files Only! (MAX. 1mb)
              </p>
            </div>
            <FileInput
              id="dropzone-file"
              className="hidden"
              onChange={onFileSelect}
            />
          </Label>
        </div>
      </div>

      <div className="my-10">
        {selectedFile && (
          <div className="mt-4 text-sm text-gray-700 dark:text-gray-400">
            <Card className="shadow-none ">
              <div className="flex justify-between items-center p-3">
                <div className="flex items-center space-x-4">
                  <div className="shrink-0">
                    <FileSpreadsheet className="text-lime-600" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                      {selectedFile.name}
                    </p>
                    <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                      {`Size: ${selectedFile.size} Kb`}
                    </p>
                  </div>
                </div>
                <div>
                  <button
                    onClick={() => {
                      window.location.reload();
                      setSelectedFile(null);
                    }}
                  >
                    <X className="text-red-600" size={16} />
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="flex flex-col mt-4">
          {uploading ? (
            <Button className="w-full rounded-sm py-1 bg-black" disabled>
              Uploading...
            </Button>
          ) : (
            <Button
              className="w-full bg-black enabled:hover:bg-gray-600 rounded-sm py-1"
              onClick={handleUpload}
            >
              Upload New Dataset
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
