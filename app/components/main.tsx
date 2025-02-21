import { Button, Card } from "flowbite-react";
import { ChevronRight, Download, DownloadCloud, SheetIcon } from "lucide-react";
import React from "react";
import { UploadCard } from "./uploadcard";
import Link from "next/link";

const HomeUpload = () => {
  return (
    <div>
      <div className="flex justify-between">
        <Card className="shadow-none rounded-sm">
          <div className="flex justify-between p-3">
            <div className="flex items-center">
              <SheetIcon className="text-lime-600 mr-2"></SheetIcon>
              <p className="text-sm">Download Dataset CSV Template</p>
            </div>
            <a href="" className="ml-10 hover:bg-gray-100 p-2 rounded-md">
              <Download />
            </a>
          </div>
        </Card>
        <Link
          href={"/predict"}
          className="flex items-center btn bg-teal-600 hover:bg-teal-700 text-white  px-7 "
        >
          Start Data Analysis
          <ChevronRight size={16} className="ml-1" />
        </Link>
      </div>
      <UploadCard />
    </div>
  );
};

export default HomeUpload;
