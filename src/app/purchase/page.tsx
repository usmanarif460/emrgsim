"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PurchaseHeader from "@/components/header-purchase";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { useDataPlanStore } from "@/stores/dataStore"; // Import Zustand store

const Purchase = () => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
  const { selectedPlan } = useDataPlanStore();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  useEffect(() => {
    document.title = "Purchase";
    window.scrollTo(0, 0);
  }, []);

  const paymentMethods = [
    {
      id: "credit-card",
      label: "Credit/Debit Card",
      img: "/assets/kenya/kaa/credit-card.png",
      disabled: false,
    },
    {
      id: "paypal",
      label: "PayPal",
      img: "/assets/kenya/kaa/paypal.png",
      disabled: true,
    },
    {
      id: "apple-pay",
      label: "Apple Pay",
      img: "/assets/kenya/kaa/apple-pay.png",
      disabled: true,
    },
    {
      id: "google-pay",
      label: "Google Pay",
      img: "/assets/kenya/kaa/google-pay.png",
      disabled: true,
    },
  ];

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setProcessing(true);

    // Simulate a delay for processing
    setTimeout(() => {
      setProcessing(false);
      router.push("/thanks");
    }, 5000);
  };

  return (
    <div className="h-auto w-screen overflow-y-auto bg-gray-100">
      {processing ? (
        <div className="fixed h-screen w-screen flex flex-col items-center justify-center bg-[#00539b] text-white z-50">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline size-24 text-gray-200 animate-spin dark:text-gray-600 fill-[#FED762]"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          <h1 className="text-2xl font-medium mt-5">Processing Payment...</h1>
        </div>
      ) : (
        <>
          <PurchaseHeader />
          <div className="w-full bg-white p-6 shadow-md ">
            <h1 className="text-2xl font-semibold mb-6 text-primary leading-[100%]">
              Payment
            </h1>
            <h2 className="text-lg font-semibold text-primary leading-[164%]">
              Order Summary
            </h2>
            <div className="border-b-2 border-[#EFEFEF] pb-4 font-medium mb-4 mt-3">
              <div className="flex justify-between">
                <p className="text-base font-normal leading-[164%] text-primary">
                  {selectedPlan?.data} {selectedPlan?.data_unit} (
                  {selectedPlan?.duration} {selectedPlan?.duration_unit})
                </p>
                <p className="font-medium text-base leading-[164%] text-primary">
                  ${selectedPlan?.price}
                </p>
              </div>
              <div className="flex justify-between text-primary">
                <p className="text-base font-normal leading-[164%] text-primary">
                  Tax
                </p>
                <p className="font-medium text-base leading-[164%] text-primary">
                  $
                  {(selectedPlan?.price
                    ? selectedPlan.price * 0.15
                    : 0
                  ).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between font-semibold text-lg text-[#00539B] mt-2">
                <p>Total</p>
                <p>${((selectedPlan?.price ?? 0) * 1.15).toFixed(2)}</p>
              </div>
            </div>
            <h2 className="text-lg font-[550] leading-[164%]">
              Select Payment Method
            </h2>
            <div className="space-y-3 mt-3">
              {paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                    method.disabled ? "opacity-50 cursor-not-allowed" : ""
                  } ${
                    selectedPayment === method.id
                      ? "border-none"
                      : "border-none"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    disabled={method.disabled}
                    className="hidden"
                    onChange={() => setSelectedPayment(method.id)}
                  />
                  <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-4">
                    {selectedPayment === method.id && (
                      <div className="w-[10px] h-[10px] bg-[#00539B] rounded-full"></div>
                    )}
                  </div>
                  <div className="w-9 h-6">
                    <Image
                      src={method.img}
                      alt={method.label}
                      width={40}
                      height={40}
                      className="mr-3"
                    />
                  </div>
                  <p className="text-primary ml-2 font-normal text-base leading-[164%]">
                    {method.label}
                  </p>
                </label>
              ))}
            </div>
            {selectedPayment === "credit-card" && (
              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="card-number"
                      className="font-bold text-sm leading-[26px] text-[#00539b]"
                    >
                      Card Number
                    </label>
                    <input
                      id="card-number"
                      name="card-number"
                      type="number"
                      className="py-[4px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
                      required
                      autoComplete="cc-number"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="cardholder-name"
                      className="font-bold text-sm leading-[26px] text-[#00539b]"
                    >
                      Cardholder Name
                    </label>
                    <input
                      id="cardholder-name"
                      name="cardholder-name"
                      type="text"
                      className="py-[4px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
                      required
                      autoComplete="cc-name"
                    />
                  </div>
                  <div className="flex space-x-4">
                    <div className="flex-1">
                      <label
                        htmlFor="expiry-date"
                        className="font-bold text-sm leading-[26px] text-[#00539b]"
                      >
                        Expiry Date
                      </label>
                      <input
                        id="expiry-date"
                        name="expiry-date"
                        type="text"
                        className="py-[4px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
                        required
                        autoComplete="cc-exp"
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor="cvc"
                        className="font-bold text-sm leading-[26px] text-[#00539b]"
                      >
                        CW/CVC
                      </label>
                      <input
                        id="cvc"
                        name="cvc"
                        type="number"
                        className="py-[4px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
                        required
                        autoComplete="cc-csc"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="font-bold text-sm leading-[26px] text-[#00539b]"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="text"
                      className="py-[4px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
                      required
                      autoComplete="cc-name"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" className="w-4 h-4" />
                    <p className="text-primary font-normal text-base ml-2 leading-6">
                      Save card for future payments
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <Button text="Submit" />
                  </div>
                </div>
              </form>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Purchase;
