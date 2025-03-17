"use client";
import { NavigationBar } from "./components/navbar";
import { FooterBar } from "./components/footer";
import { Banner, HR } from "flowbite-react";
import HomeUpload from "./components/main";
import HomeTable from "./components/hometable";
import { InfoCard } from "./components/info";
import Link from "next/link";
import { ChevronRight, X } from "lucide-react";

export default function Home() {
  return (
    <>
      <main className=" flex flex-col justify-between h-screen">
        <NavigationBar />
        <div className="container mx-auto mt-20 xl:px-28 ">
          <div>
            <Banner className="mb-10">
              <div className="flex w-full items-center justify-between border-b border-gray-200 bg-gray-800 p-4 dark:border-gray-600 dark:bg-gray-700">
                <div className="mx-auto flex w-full shrink-0 items-center sm:w-auto">
                  <p className="text-white text-2xl">
                    This Project has been{" "}
                    <span className="font-bold">PAUSED!</span>
                  </p>
                </div>
              </div>
            </Banner>

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
                    Start Prediction
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
