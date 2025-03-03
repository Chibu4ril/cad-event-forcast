"use client";

import { Button, Card, Label, Select, Spinner } from "flowbite-react";
import { FooterBar } from "../components/footer";
import { NavigationBar } from "../components/navbar";
import { useEffect, useState } from "react";
import { fetchUploadedFiles, modelPrediction } from "../api/api";
import LogisticsGrowthChart from "./plotly";
import { Info, TrendingUpDown } from "lucide-react";

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

  const [loading, setLoading] = useState(false);

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

  const runPrediction = async () => {
    setLoading(true);
    try {
      const fileUrl = selectedFileUrl?.split("?")[0] ?? "";

      const result = await modelPrediction(fileUrl);

      console.log("📥 Received result from API:", result);

      if (result) {
        setJsonData(result ?? []);
      }
    } catch (error) {
      console.error("❌ Prediction failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const getAccuracyMessage = (accuracy: number) => {
    if (accuracy < 85) {
      return `The prediction model has a low accuracy of ${accuracy}%. 
              This suggests that the data may not fully capture the expected growth, 
              or that there may be other factors affecting registration patterns.`;
    } else if (accuracy < 95) {
      return `The prediction model has a moderate accuracy of ${accuracy}%. 
              While this provides a reasonable estimate, further validation may be needed to refine the predictions.`;
    } else {
      return `The prediction model is highly accurate with an accuracy of ${accuracy}%. 
              This indicates that the model has closely followed the actual trends in registration.`;
    }
  };

  return (
    <div>
      <NavigationBar />
      <main className=" flex flex-col justify-between h-screen">
        <div className="container mx-auto mt-10 xl:px-28 ">
          <div className="mb-10 my-5">
            <h1 className="text-3xl font-bold">Event Forecast</h1>
          </div>
          <div className="grid grid-cols-4 gap-10">
            <div className="col-span-3">
              <div className="grid grid-cols-2 gap-10">
                <div className="mb-5">
                  <div className="mb-2 block">
                    <Label htmlFor="datasets" value="Select a Dataset" />
                  </div>
                  <Select
                    id="datasets"
                    className="mb-5 w-full"
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
                </div>
                {selectedFileUrl && (
                  <div className="flex flex-col mt-7">
                    <Button
                      className="w-full bg-black enabled:hover:bg-gray-600 rounded-sm py-1"
                      onClick={runPrediction}
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner aria-label="Loading spinner" size="sm" />
                          <span className="pl-3">
                            {"Ongoing prediction..."}
                          </span>
                        </>
                      ) : (
                        "Run Prediction"
                      )}
                    </Button>
                  </div>
                )}
              </div>
              <div>
                {jsonData && (
                  <Card className=" h-[650px] rounded-3xl shadow-lg">
                    <LogisticsGrowthChart jsonData={jsonData} />
                  </Card>
                )}
              </div>

              {jsonData && (
                <Card className="p-5 w-full rounded-xl mt-5 mb-10 shadow-xl">
                  <div className="flex text-blue-500">
                    <Info className="me-2" size={40} />
                    <div>
                      <h5 className="text-3xl mb-2 font-bold tracking-tight">
                        Prediction Accuracy Explanation
                      </h5>

                      <p className="font-normal text-lg text-gray-700 dark:text-gray-400">
                        {getAccuracyMessage(
                          jsonData.metadata.prediction_accuracy_percent
                        )}
                      </p>
                    </div>
                  </div>
                </Card>
              )}
            </div>

            <div>
              {jsonData && (
                <Card className="max-w-sm p-5  rounded-xl shadow-xl">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1
                        className={`text-4xl font-black tracking-tight ${
                          jsonData.metadata.prediction_accuracy_percent < 85
                            ? "text-red-500"
                            : jsonData.metadata.prediction_accuracy_percent < 95
                            ? "text-yell-500"
                            : "text-lime-600"
                        }`}
                      >
                        {`${jsonData.metadata.prediction_accuracy_percent}%`}
                      </h1>
                      <p className="font-normal text-gray-700 dark:text-gray-400">
                        Prediction Accuracy
                      </p>
                    </div>

                    <div className="bg-gray-100 p-4 rounded-xl">
                      <TrendingUpDown
                        size={32}
                        className={`
                          ${
                            jsonData.metadata.prediction_accuracy_percent < 85
                              ? "text-red-500"
                              : jsonData.metadata.prediction_accuracy_percent <
                                95
                              ? "text-yell-500"
                              : "text-lime-600"
                          }`}
                      />
                    </div>
                  </div>
                </Card>
              )}
              {/* <Card href="#" className="max-w-sm p-5 rounded-xl my-5 shadow-xl">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </Card>
              <Card href="#" className="max-w-sm p-5 rounded-xl shadow-xl">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Noteworthy technology acquisitions 2021
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
              </Card> */}
            </div>
          </div>
        </div>

        <FooterBar />
      </main>
    </div>
  );
};

export default PredictPro;
