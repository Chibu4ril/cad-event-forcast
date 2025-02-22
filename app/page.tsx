"use client";
import { NavigationBar } from "./components/navbar";
import { FooterBar } from "./components/footer";
import { HR } from "flowbite-react";
import HomeUpload from "./components/main";
import HomeTable from "./components/hometable";
import { InfoCard } from "./components/info";

export default function Home() {
  return (
    <>
      <main className=" flex flex-col justify-between h-screen">
        <NavigationBar />
        <div className="container mx-auto mt-5">
          <div>
            <div className="grid grid-cols-4 gap-10">
              <div className="my-7 col-span-3 ">
                <HomeUpload />
              </div>
              <div className="col-span-1">
                <InfoCard />
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
