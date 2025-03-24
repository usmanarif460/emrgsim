"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PurchaseHeader from "@/components/header-purchase";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { ImSpinner9 } from "react-icons/im";

const product = {
  id: "NRMshvhs7EjyYdn-2obO7bu_7NzAeNmGWhTvX8_CYVo=",
  name: "string",
  sim_types: ["ESIM"],
  duration: 1,
  duration_unit: "DAYS",
  data: 1,
  data_unit: "GB",
  price: 20,
  price_currency: "$",
  footprint_code: "string",
};

const Purchase = () => {
  const router = useRouter();
  const [processing, setProcessing] = useState(false);
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
    <div className="h-screen w-screen overflow-y-auto bg-gray-100">
      {processing ? (
        <div className="fixed h-screen w-screen flex flex-col items-center justify-center bg-gray-900 bg-opacity-90 text-white z-50">
          <ImSpinner9 className="text-6xl animate-spin" />
          <h1 className="text-2xl font-medium mt-5">Payment Processing...</h1>
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
                  {product.data} {product.data_unit} ({product.duration}{" "}
                  {product.duration_unit})
                </p>
                <p className="font-medium text-base leading-[164%] text-primary">
                  ${product.price}
                </p>
              </div>
              <div className="flex justify-between text-primary">
                <p className="text-base font-normal leading-[164%] text-primary">
                  Tax
                </p>
                <p className="font-medium text-base leading-[164%] text-primary">
                  ${(product.price * 0.15).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between font-semibold text-lg text-[#00539B] mt-2">
                <p>Total</p>
                <p>${(product.price * 1.15).toFixed(2)}</p>
              </div>
            </div>
            <h2 className="text-lg font-medium leading-[164%]">
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
                  <Image
                    src={method.img}
                    alt={method.label}
                    width={40}
                    height={40}
                    className="mr-3"
                  />
                  <p className="text-primary text-base leading-[164%]">
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
