"use client";

import {
  Button,
  Card,
  HR,
  Label,
  Select,
  Datepicker,
  TextInput,
} from "flowbite-react";
import { FooterBar } from "../components/footer";
import { NavigationBar } from "../components/navbar";
import { useEffect, useState } from "react";
import { fetchUploadedFiles } from "../api/api";

const PredictPro = () => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [eventName, setEventName] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [regristrationSource, setRegristrationSource] = useState<string | null>(
    null
  );
  const [dataReady, setDataReady] = useState(false);

  const handleEventNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEventName(event.target.value);
  };
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    // console.log(date);
  };
  const handleMarketinBudget = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedBudget(event.target.value);
  };

  const handleSource = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRegristrationSource(event.target.value);
  };

  useEffect(() => {
    setIsClient(true);
    const getFiles = async () => {
      const uploadedFiles = await fetchUploadedFiles();
      setFiles(uploadedFiles);
    };

    getFiles();
  }, []);

  const handleFileSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFile = files.find((file) => file.name === event.target.value);
    setSelectedFileUrl(selectedFile ? selectedFile.url : null);
  };
  if (!isClient) return null;

  const sendFormDataToPython = async () => {
    const formData = new FormData();
    formData.append("eventName", eventName);
    formData.append(
      "selectedDate",
      selectedDate ? selectedDate.toISOString() : ""
    );
    formData.append("selectedBudget", selectedBudget || "");
    formData.append("registrationSource", regristrationSource || "");
    formData.append("selectedFileUrl", selectedFileUrl || ""); // URL, not a file

    try {
      const response = await fetch(
        "http://localhost:8000/api/sendDataToPython",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to send form data to Python script");
      }

      const result = await response.json();
      setDataReady(true);
      console.log("Response from Python:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const runPrediction = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/runPrediction", {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to execute prediction script");
      }

      const result = await response.json();
      console.log("Prediction script output:", result.output || result.error);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <main className=" flex flex-col justify-between h-screen">
        <NavigationBar />

        <div className="container mx-auto w-3/6 mt-5">
          <div className="mb-10 my-5">
            <h1 className="text-3xl font-bold">Event Prediction </h1>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div>
              <Card className="shadow-none">
                <div className="p-5">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="datasets" value="Datasets" />
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
                  <div>
                    <div className="flex max-w-md flex-col gap-4">
                      <div>
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
                      <div>
                        <div className="mb-2 block">
                          <Label htmlFor="date" value="Date to Event" />
                        </div>
                        <Datepicker id="date" onChange={handleDateChange} />
                      </div>
                      <div>
                        <div className="mb-2 block">
                          <Label
                            htmlFor="marketingbdg"
                            value="Marketing Budget"
                          />
                        </div>
                        <Select
                          id="marketingbdg"
                          onChange={handleMarketinBudget}
                        >
                          <option value="100">$100</option>
                          <option value="150">$150</option>
                          <option value="200">$200</option>
                        </Select>
                      </div>

                      <div>
                        <div className="mb-2 block">
                          <Label
                            htmlFor="regsource"
                            value="Registration Sources"
                          />
                        </div>
                        <Select id="regsource" onChange={handleSource}>
                          <option value="social_media">Social Media</option>
                          <option value="email">Email</option>
                          <option value="website">Website</option>
                          <option value="referral">Referral</option>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="shadow-none border-none py-0  ">
              <div className="p-5">
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

                <Card className="border-none shadow-none py-0 mt-0">
                  <div className="p-5">
                    <div className="my-5">
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
                    <div className="my-5">
                      <div>
                        <p className="block text-sm py-0 mb-0 font-medium">
                          Date to Event:
                        </p>
                        <HR className="my-2" />

                        {selectedDate ? (
                          <div>
                            <div className=" text-sm break-all rounded  text-gray-500 py-0">
                              <span>{selectedDate.toDateString()}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm italic text-gray-400">
                            dd/mm/yyyy
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="my-5">
                      <div>
                        <p className="block text-sm py-0 mb-0">
                          Marketing Budget:
                        </p>
                        <HR className="my-2" />

                        {selectedBudget ? (
                          <div>
                            <div className=" text-sm break-all rounded  text-gray-500 py-0">
                              <span>{selectedBudget}</span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm italic text-gray-400">
                            $0
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="my-5">
                      <div>
                        <p className="block text-sm py-0 mb-0 font-bold">
                          Registration Source:
                        </p>
                        <HR className="my-2" />

                        {regristrationSource ? (
                          <div>
                            <div className=" text-sm break-all rounded  text-gray-500 py-0">
                              <span className="capitalize">
                                {regristrationSource}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm italic text-gray-400">
                            Website
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </Card>
          </div>
          {!dataReady ? (
            <div className="my-5 flex flex-col ">
              <Button
                className="rounded-none py-1"
                onClick={sendFormDataToPython}
              >
                Add Parameters
              </Button>
            </div>
          ) : (
            <div className="my-5 flex flex-col ">
              <Button className="rounded-none py-1" onClick={runPrediction}>
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
