"use client";
import { NavigationBar } from "./components/navbar";
import { FooterBar } from "./components/footer";
import { HR } from "flowbite-react";
import HomeUpload from "./components/main";
import HomeTable from "./components/hometable";
import { InfoCard } from "./components/info";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className=" flex flex-col justify-between h-screen">
        <NavigationBar />
        <div className="container mx-auto mt-20 xl:px-28 ">
          <div>
            <div className="grid grid-cols-5 gap-x-10">
              <div className="py-0 col-span-3 ">
                <HomeUpload />
              </div>
              <div className="col-span-2">
                <InfoCard />
                <div className="flex justify-end mt-10">
                  <Link
                    href={"/predict"}
                    className="flex items-center bg-purple-600 hover:bg-purple-900 py-4 text-white px-7 "
                  >
                    Start Data Analysis
                    <ChevronRight size={16} className="ml-1" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="my-20">
              <HR />
            </div>

            <div>
              <div>
                <h3 className="mb-4 font-bold uppercase ">Uploaded Datasets</h3>
              </div>
              <div className="overflow-x-auto">
                <HomeTable />
              </div>
            </div>
          </div>
        </div>
        <FooterBar />
      </main>
    </>
  );
}
