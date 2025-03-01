"use client";

import { Button, Card, Datepicker, HR, Label, Select } from "flowbite-react";
import { FooterBar } from "../components/footer";
import { NavigationBar } from "../components/navbar";
import { useEffect, useState } from "react";
import { fetchUploadedFiles, modelPrediction } from "../api/api";
// import PredictionChart from "./plotting";
import LogisticsGrowthChart from "./plotly";

interface LogisticGrowthData {
  x: number[]; // Array of values representing the x-axis
  y: number[]; // Array of actual data points corresponding to y
  futureWeeks: number[]; // Array of future week numbers
  futurePredictions: number[]; // Array of future predicted values
  parameters: {
    K: number; // Carrying capacity
    N0: number; // Initial population or initial value
    r: number; // Growth rate
  };
  weeks: string[]; // Array of strings representing weeks (e.g., 'Week 1', 'Week 2', ...)
  metadata: {
    final_predicted_registrations: number; // Final predicted registrations
    prediction_accuracy_percent: number; // Prediction accuracy percentage
    weeks_until_event: number; // Weeks until the event
    initial_growth_rate_r: number; // Initial growth rate (before any adjustments)
    adjusted_growth_rate_r: number; // Adjusted growth rate (after optimization)
  };
  logistic_growth_values: number[]; // Array of logistic growth values based on the logistic model
}

const PredictPro = () => {
  const [files, setFiles] = useState<{ name: string; url: string }[]>([]);
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [jsonData, setJsonData] = useState<LogisticGrowthData | undefined>(
    undefined
  );
  const [selectedEventDate, setSelectedEventDate] = useState<Date | null>(null);
  const [eventDate, setEventDate] = useState<string>("");

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

  useEffect(() => {
    if (jsonData) {
      console.log("📊 Updated predictionData:", jsonData);
    }
  }, [jsonData]);

  const handleFileSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFile = files.find((file) => file.name === event.target.value);
    setSelectedFileUrl(selectedFile ? selectedFile.url : null);
  };
  if (!isClient) return null;

  const handleEventDateChange = (date: Date | null) => {
    setSelectedEventDate(date);
    if (date) {
      setEventDate(formatDate(date));
    }
    console.log("Selected Date:", date ? formatDate(date) : "No date selected");
  };

  // Function to format the date to match Pandas (%d-%m-%Y)
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Adding 1 as getMonth() is 0-indexed
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  const runPrediction = async () => {
    try {
      const fileUrl = selectedFileUrl?.split("?")[0] ?? "";

      console.log("📤 Sending request with:", fileUrl, eventDate);
      const result = await modelPrediction(fileUrl, eventDate);

      console.log("📥 Received result from API:", result);

      if (result) {
        setJsonData(result ?? []);
      }
      // if (result) {
      //   setWeeks(result.weeks ?? []);
      // }

      // if (result?.future_predictions) {
      //   setPredictionData(result.future_predictions ?? []); // Ensure it's never null
      // }
      // if (result?.weeks) {
      //   setWeeks(result.weeks ?? []);
      // } else {
      //   console.warn("⚠️ Missing future_predictions in response:", result);
      // }
    } catch (error) {
      console.error("❌ Prediction failed:", error);
    }
  };

  return (
    <div>
      <NavigationBar />
      <main className=" flex flex-col justify-between h-screen">
        <div className="container mx-auto mt-20 lg:px-48 ">
          <div className="mb-10 my-5">
            <h1 className="text-3xl font-bold">Event Forecast</h1>
          </div>
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <Card className="shadow-none">
                <div className="grid-cols-1 grid p-2 gap-5">
                  <Card className="p-3 shadow-none h-full">
                    {/* {jsonData && jsonData.length > 0 ? (
                      // <PredictionChart
                      //   weeks={weeks}
                      //   futurePredictions={predictionData}
                      // />
                      <LogisticsGrowthChart jsonData={jsonData} />
                    ) : (
                      <p>Loading prediction data...</p>
                    )} */}

                    {jsonData && <LogisticsGrowthChart jsonData={jsonData} />}
                  </Card>
                </div>
              </Card>
            </div>

            <Card className="shadow-none border-none py-0  ">
              <div className="">
                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="datasets" value="Select a Datasets" />
                  </div>
                  <Select
                    id="datasets"
                    className="mb-5"
                    onChange={handleFileSelect}
                  >
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

                  {selectedFileUrl && (
                    <Card className="shadow-none rounded-none py-0 my-0 ">
                      <div className="p-5">
                        <p className="block text-sm py-0 mb-0 font-bold">
                          Dataset URL:
                        </p>
                        <HR className="my-0" />

                        <div>
                          <div className=" text-sm break-all rounded  text-blue-400 py-0">
                            <span>{selectedFileUrl}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                <div className="mb-5">
                  <div className=" mb-5">
                    <div className="mb-2 block">
                      <Label htmlFor="eventname" value="Date of the Event" />
                    </div>
                    <Datepicker
                      value={selectedEventDate ?? undefined}
                      onChange={handleEventDateChange}
                    />
                  </div>

                  {selectedEventDate && (
                    <div>
                      <p className="block text-sm py-0 mb-0 font-bold  pb-2 ">
                        Expected Date of Event:
                      </p>
                      <HR className="my-0" />
                      <div className="text-sm  rounded  text-gray-500 p-2 pl-0">
                        {selectedEventDate.toDateString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>
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
        </div>
        <FooterBar />
      </main>
    </div>
  );
};

export default PredictPro;
