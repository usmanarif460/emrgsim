"use client";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Header from "@/components/header";
const Thanks = () => {
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
  const [timeoutCount, setTimeoutCount] = useState(0);

  const sendEID = useCallback(
    (bypass?: boolean) => {
      if (!product || !product.id) {
        console.warn("Product ID is not defined");
        return;
      }

      console.log(
        {
          product_id: product.id,
          device: {
            operating_system: "ios",
            model: "iPhone",
          },
        },
        [product]
      );

      fetch("/api/activate_product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@test.com",
          first_name: "firstname",
          last_name: "lastname",
          country_of_residence: "US",
          product_id: product.id,
          device: {
            operating_system: "ios",
            model: "iPhone",
          },
          bypass,
        }),
      })
        .then((resp) => {
          if (resp.status === 403) throw new Error("not ready");
          return resp.json();
        })
        .then((data) => {
          if (data.message !== "SUCCESS") {
            // console.warn(data.message);
            // alert(`Unable to activate, please check your EID: ${data.message}`);
          }
        })
        .catch((err) => {
          if (err.message === "not ready") {
            setTimeoutCount((prev) => prev + 1);
            return;
          }
          // console.warn(err);
          // alert(
          //   `Unable to activate, please check your connection: ${err.message}`
          // );
        });
    },
    [product]
  );

  useEffect(() => {
    sendEID();
  }, [sendEID]);

  useEffect(() => {
    const timer = setTimeout(() => sendEID(), 1000);
    return () => clearTimeout(timer);
  }, [timeoutCount, sendEID]);

  return (
    <div className="w-full h-screen bg-white relative overflow-hidden flex flex-col items-center justify-center">
      <Header className="absolute top-0 " />
      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
        <div className="bg-white rounded-2xl -mt-32 w-[309px] h-[440px] flex flex-col items-center ">
          <div className="bg-[#d6e8eb] w-full h-[222px] rounded-t-2xl flex justify-center items-center">
            <Image
              src="/assets/saudi/success.png"
              alt="Success"
              width={500}
              height={500}
              className="w-full h-full rounded-t-2xl"
            />
          </div>
          <div className="flex p-4 flex-col items-center text-center gap-2 w-full ">
            <h3 className="text-2xl text-primary font-[550] text-center leading-[149%]">
              Success!
            </h3>
            <p className="text-base text-primary leading-[149%] text-center">
              Your eSIM is ready. Please click the link below to install it.
            </p>

            <button
              type="button"
              onClick={() =>
                window.open(
                  "https://esimsetup.apple.com/esim_qrcode_provisioning?carddata=LPA:1$stc.prod.smdpplus.stc.com.sa$B4CD9E5B67506E0FB7FCF4C9DF32F8E8F6B6BBE1E4C2B7D861D2A6C54A883A6B",
                  "_blank"
                )
              }
              className="bg-[#00539B] w-full text-white py-4 px-4 text-lg font-semibold rounded-2xl mt-4 hover:bg-blue-600"
            >
              Install eSIM
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Thanks;
