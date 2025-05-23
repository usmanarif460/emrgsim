"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";
import { useDataPlanStore } from "@/stores/dataStore"; // Import Zustand store
import Product from "@/types/product";
import common from "@/language/english/common.json";
import PlansHeader from "@/components/plans-header";
import Button from "@/components/button";

const DataPlans = () => {
  const router = useRouter();
  const { setSelectedPlan } = useDataPlanStore(); // Use Zustand store
  const [productIndex, setProductIndex] = useState(-1);
  const productRef = useRef(null);

  const [products] = useState<Product[]>([
    {
      id: "plan1",
      name: "100MB 30-Days - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 3,
      duration_unit: "days",
      data: 1,
      data_unit: "GB",
      price: 6.0,
      price_currency: "USD",
      footprint_code: "USA",
    },
    {
      id: "plan2",
      name: "500MB 30-Days - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 14,
      duration_unit: "days",
      data: 3,
      data_unit: "GB",
      price: 12.0,
      price_currency: "USD",
      footprint_code: "USA",
    },
    {
      id: "plan3",
      name: "1GB 30-Days - ConnectAPITest - Local USA Data Bundle",
      sim_types: ["ESIM"],
      duration: 14,
      duration_unit: "days",
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
        <h1 className="text-left text-2xl font-semibold">Select a data plan</h1>
        {products.length === 0 ? (
          <div className="fixed h-screen w-screen flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 text-white">
            <ImSpinner9 className="text-6xl animate-spin" />
            <h1 className="text-2xl font-medium mt-5">Loading...</h1>
          </div>
        ) : (
          <div className="space-y-3 mt-8">
            {products.map((prod, i) => (
              <div
                key={prod.id}
                className={`flex items-center p-4 rounded-xl cursor-pointer transition border-2 ${
                  productIndex === i
                    ? "bg-[#EBF7F9] border-[#C0D7DB]"
                    : "bg-white shadow-md border-transparent"
                }`}
                onClick={() => {
                  setProductIndex(i);
                  setSelectedPlan(prod); // Store selected plan in Zustand
                }}
              >
                <div className="flex-1 text-center">
                  <input
                    type="radio"
                    checked={productIndex === i}
                    onChange={() => setProductIndex(i)}
                    className="hidden"
                  />
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition ${
                      productIndex === i ? "bg-[#D6E8EB]" : "border-[#D6E8EB]"
                    }`}
                  >
                    {productIndex === i && (
                      <div className="w-[10px] h-[10px] bg-white rounded-full"></div>
                    )}
                  </div>
                </div>
                <div className="flex-3 text-base font-semibold text-[#212121]">
                  {prod.data} {prod.data_unit}
                  <p className="text-base text-[#212121] font-normal">
                    {prod.duration} {prod.duration_unit}
                  </p>
                </div>
                <p className="flex-1 text-base font-semibold">${prod.price}</p>
              </div>
            ))}
          </div>
        )}

        <div className="flex items-center justify-center w-full mt-12">
          <Button
            disabled={productIndex === -1}
            text="Next"
            onClick={() => router.push("/purchase")}
          />
        </div>
      </div>
    </div>
  );
};

export default DataPlans;
function international(EmrgMobile: {
  value: string;
  description: string;
}): string {
  return EmrgMobile.value;
}
