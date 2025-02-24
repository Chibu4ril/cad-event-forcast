"use client";

import { Button, Card, HR, Label, Select, TextInput } from "flowbite-react";
import { FooterBar } from "../components/footer";
import { NavigationBar } from "../components/navbar";
import { useEffect, useState } from "react";
import { fetchUploadedFiles, modelPrediction } from "../api/api";

const PredictPro = () => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [eventName, setEventName] = useState("");
  const [predictionData, setPredictionData] = useState(null);

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventName(event.target.value);
  };

  useEffect(() => {
    setIsClient(true);
    const getFiles = async () => {
      try {
        const uploadedFiles = await fetchUploadedFiles();
        setFiles(uploadedFiles);
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };
    getFiles();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFile = files.find((file) => file.name === event.target.value);
    setSelectedFileUrl(selectedFile ? selectedFile.url : null);
  };
  if (!isClient) return null;

  const runPrediction = async () => {
    try {
      const result = await modelPrediction(selectedFileUrl);
      if (result?.future_predictions) {
        setPredictionData(result.future_predictions);
      }
      console.log(predictionData);
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <main className=" flex flex-col justify-between h-screen">
        <div className="container mx-auto mt-5">
          <div className="mb-10 my-5">
            <h1 className="text-3xl font-bold">
              {eventName + " "} Event Forecast
            </h1>
          </div>
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <Card className="shadow-none">
                <div className="grid-cols-2 grid p-2 gap-5">
                  <Card className="p-3 shadow-none"></Card>
                </div>
              </Card>
            </div>

            <Card className="shadow-none border-none py-0  ">
              <div className="">
                <div className="mb-5">
                  <div className="">
                    <div className="mb-2 block">
                      <Label htmlFor="eventname" value="Event Name" />
                    </div>
                    <TextInput
                      onChange={handleEventNameChange}
                      type="text"
                      placeholder="Enter an event title here!"
                      required
                    />
                  </div>

                  <Card className="shadow-none rounded-none py-0 my-0 ">
                    <div className="p-5">
                      <p className="block text-sm py-0 mb-0 font-medium">
                        Event Name:
                      </p>
                      <HR className="my-2" />
                      {eventName ? (
                        <div>
                          <div className=" text-sm break-all rounded  text-gray-500 py-0">
                            <span aria-valuetext="Enter event name">
                              {eventName}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <span className="text-sm italic text-gray-400">
                          Enter an event title here!
                        </span>
                      )}
                    </div>
                  </Card>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="datasets" value="Select a Datasets" />
                  </div>
                  <Select id="datasets" onChange={handleFileSelect}>
                    <option value="">Select a dataset</option>
                    {files.length > 0 ? (
                      files.map((file) => (
                        <option key={file.name} value={file.name}>
                          {file.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No files found</option>
                    )}
                  </Select>
                </div>

                <Card className="shadow-none rounded-none py-0 my-0 ">
                  <div className="p-5">
                    <p className="block text-sm py-0 mb-0 font-bold">
                      Dataset URL:
                    </p>
                    <HR className="my-0" />

                    {selectedFileUrl && (
                      <div>
                        <div className=" text-sm break-all rounded  text-blue-400 py-0">
                          <span>{selectedFileUrl}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            </Card>
          </div>
          {selectedFileUrl && (
            <div className="flex flex-col mt-4">
              <Button
                className="w-full bg-black enabled:hover:bg-gray-600 rounded-sm py-1"
                onClick={runPrediction}
              >
                Run Prediction
              </Button>
            </div>
          )}
        </div>
        <FooterBar />
      </main>
    </div>
  );
};

export default PredictPro;
