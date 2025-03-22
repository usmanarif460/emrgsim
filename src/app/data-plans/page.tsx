"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import Product from "@/types/product";
import { international } from "@/language";
import common from "@/language/english/common.json";
import PlansHeader from "@/components/plans-header";
import Button from "@/components/button";

const DataPlans = () => {
  const router = useRouter();
  const [productIndex, setProductIndex] = useState(-1);
  const productRef = useRef(null);

  // Dummy products list
  const [products] = useState<Product[]>([
    {
      id: "69YtBXSZ2pP1jm1aR3Qo0A5g7LbudFBShHmFR2f02qo=",
      name: "100MB 30-Days - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 3,
      duration_unit: "DAYS",
      data: 1,
      data_unit: "GB",
      price: 6.0,
      price_currency: "USD",
      footprint_code: "USA",
    },
    {
      id: "69YtBXSZ2pP1jm1aR3Qo0A5g7Lbud123FBShHmFR2f02qo=",
      name: "100MB 30-Days - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 30,
      duration_unit: "DAYS",
      data: 3,
      data_unit: "GB",
      price: 12.0,
      price_currency: "USD",
      footprint_code: "USA",
    },
    {
      id: "69YtBXSZ2pP1jm1aR3Qo0A5g7LbudFBShHmFR2f02qo=",
      name: "100MB 30-Days - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 30,
      duration_unit: "DAYS",
      data: 5,
      data_unit: "GB",
      price: 20.0,
      price_currency: "USD",
      footprint_code: "USA",
    },
  ]);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = international(common.EmrgMobile);
  }, []);

  return (
    <div className="relative h-screen bg-white">
      <PlansHeader />
      <div
        className="bg-gray-100 p-8 overflow-y-scroll h-[calc(100vh-72px)]"
        ref={productRef}
      >
        <div className="text-left text-[24px] font-medium mb-4">
          Select a data plan
        </div>
        {products.length === 0 ? (
          <div className="fixed h-screen w-screen flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 text-white">
            <ImSpinner9 className="text-6xl animate-spin" />
            <h1 className="text-2xl font-medium mt-5">Loading...</h1>
          </div>
        ) : (
          <div className="space-y-4">
            {products.map((prod, i) => (
              <div
                key={prod.id}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition border-2 ${
                  productIndex === i
                    ? "bg-[#EBF7F9] border-[#C0D7DB]"
                    : "bg-white shadow-md border-transparent"
                }`}
                onClick={() => setProductIndex(i)}
              >
                <div className="flex-1 text-center">
                  <input
                    type="radio"
                    checked={productIndex === i}
                    className="hidden"
                    onChange={() => setProductIndex(i)}
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      productIndex === i
                        ? "bg-[#EBF7F9] border-[#C0D7DB]"
                        : "border-gray-300"
                    }`}
                  >
                    {productIndex === i && (
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className="flex-3 text-base font-medium text-[#212121]">
                  {prod.data} {prod.data_unit}
                  <p className="text-base text-[#212121]">
                    {prod.duration} {prod.duration_unit}
                  </p>
                </div>
                <p className="flex-1 text-lg font-semibold">${prod.price}</p>
              </div>
            ))}
          </div>
        )}
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-4/5 text-center">
          <div className="flex items-center justify-center w-full">
            <Button
              disabled={productIndex === -1}
              text="Next"
              onClick={() => router.push("/purchase")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataPlans;
