"use client";

import { Card } from "flowbite-react";
import { Cog, Download, InfoIcon, UploadCloud } from "lucide-react";

export function InfoCard() {
  return (
    <Card className="max-w-sm p-6 bg-blue-50 bg-opacity-50 border-none shadow-none">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        Key Notes
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are some key points to help you use this app effectively:
      </p>
      <ul className="my-7 space-y-5">
        <li className="flex space-x-3">
          <Card className="w-full p-4 border-none bg-lime-50 bg-opacity-50 shadow-none rounded-sm">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <Download className="text-lime-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  Download Dataset Template
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  .CSV file
                </p>
              </div>
              {/* <div className="inline-flex items-center text-sm  text-gray-900 dark:text-white">
                4Kb
              </div> */}
            </div>
          </Card>
        </li>
        <li className="flex space-x-3">
          <Card className="w-full p-4 border-none bg-orange-50  shadow-none rounded-sm">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <InfoIcon className="text-orange-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                  Fill Your CSV File
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  Fill and save file as .CSV
                </p>
              </div>
            </div>
          </Card>
        </li>
        <li className="flex space-x-3">
          <Card className="w-full p-4 border-none bg-purple-50  shadow-none rounded-sm">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <UploadCloud className="text-purple-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate capitalize text-sm font-semibold text-gray-900 dark:text-white">
                  Upload your dataset
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  Upload preprocessed dataset
                </p>
              </div>
            </div>
          </Card>
        </li>
        <li className="flex space-x-3">
          <Card className="w-full p-4 border-none bg-fuchsia-50  shadow-none rounded-sm">
            <div className="flex items-center space-x-4">
              <div className="shrink-0">
                <Cog className="text-fuchsia-600" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate capitalize text-sm font-semibold text-gray-900 dark:text-white">
                  Run Predictions
                </p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">
                  Train and test.
                </p>
              </div>
            </div>
          </Card>
        </li>
      </ul>
    </Card>
  );
}
