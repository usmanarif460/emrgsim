"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Product from "../../types/product";
import PurchaseHeader from "@/components/header-purchase";
import Button from "@/components/button";

type Props = {
  enabledBack: () => void;
  product?: Product;
  onPurchase: (email: string) => void;
};

const defaultProduct: Product = {
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

const Purchase = ({
  enabledBack,
  product = defaultProduct,
  onPurchase,
}: Props) => {
  useEffect(() => {
    document.title = "Purchase";
    if (typeof enabledBack === "function") {
      enabledBack();
    }
    window.scrollTo(0, 0);
  }, [enabledBack]);

  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);

  const paymentMethods = [
    {
      id: "credit-card",
      label: "Credit Card",
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

  return (
    <div className="h-screen w-screen overflow-y-auto bg-gray-100">
      <PurchaseHeader />
      <div className="w-full bg-white p-6 shadow-md ">
        <h1 className="text-2xl font-semibold mb-6 text-[#212121] leading-[100%]">
          Payment
        </h1>
        <h2 className="text-lg font-medium text-[#212121] leading-[100%]">
          Cart Summary
        </h2>
        <div className="border-b-2 border-[#EFEFEF] pb-4 mb-4 mt-3">
          <div className="flex justify-between">
            <p className="text-base font-normal">
              {product.data} {product.data_unit} ({product.duration}{" "}
              {product.duration_unit})
            </p>
            <p>${product.price}</p>
          </div>
          <div className="flex justify-between text-gray-600">
            <p>Tax</p>
            <p>${(product.price * 0.15).toFixed(2)}</p>
          </div>
          <div className="flex justify-between font-semibold text-lg text-[#00539B] mt-2">
            <p>Total</p>
            <p>${(product.price * 1.15).toFixed(2)}</p>
          </div>
        </div>
        <h2 className="text-lg font-medium">Select Payment Method</h2>
        <div className="space-y-3 mt-3">
          {paymentMethods.map((method) => (
            <label
              key={method.id}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition ${
                method.disabled ? "opacity-50 cursor-not-allowed" : ""
              } ${
                selectedPayment === method.id ? "border-none" : "border-none"
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
              <div className="w-5 h-5 rounded-full border flex items-center justify-center mr-4">
                {selectedPayment === method.id && (
                  <div className="w-3 h-3 bg-[#00539B] rounded-full"></div>
                )}
              </div>
              <Image
                src={method.img}
                alt={method.label}
                width={40}
                height={40}
                className="mr-3"
              />
              <p>{method.label}</p>
            </label>
          ))}
        </div>
        {selectedPayment === "credit-card" && (
          <form
            className="mt-6"
            onSubmit={(ev) => {
              onPurchase("test@email.com");
              ev.preventDefault();
            }}
          >
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
                  type="text"
                  className="py-[8px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
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
                  className="py-[8px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
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
                    className="py-[8px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
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
                    type="text"
                    className="py-[8px] font-normal outline-none text-base leading-[26px] border-b border-[#e6e6e6] w-full"
                    required
                    autoComplete="cc-csc"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4" />
                <p className="text-[#212121] font-normal text-base ml-2 leading-[24px]">
                  Save card for future payments
                </p>
              </div>
              <div className="flex items-center justify-center">
                <Button
                  text="Submit Payment"
                  onClick={() => console.log("I am clicked")}
                />
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Purchase;
