"use client";

import { useEffect, useState } from "react";
import { ImSpinner9 } from "react-icons/im";
import Product from "@/types/product";
import User from "@/types/user";
import HeaderEid from "@/components/header-eid";
import Button from "@/components/button";

type Props = {
  disableBack: () => void;
  onContinue: (eid: string) => void;
  product: Product;
  user: User;
  viewPlan: () => void;
  dontSubmit: boolean;
};

const EID = (props: Props) => {
  const [eid, setEID] = useState<string>("");
  const [isActivating, setIsActivating] = useState<boolean>(false);
  const [activated, setActivated] = useState<boolean>(false);
  const [errorActivating, setErrorActivating] = useState<string | null>("");

  useEffect(() => {
    document.title = "EmrgMobile";
    if (typeof props.disableBack === "function") {
      props.disableBack();
    }
  }, [props.disableBack]);

  const activateSIM = (eid: string, done: (err: string | null) => void) => {
    fetch("/api/activate_product", {
      method: "POST",
      body: JSON.stringify({
        email: props.user.email,
        first_name: props.user.firstName,
        last_name: props.user.lastName,
        country_of_residence: "US",
        product_id: props.product.id,
        device: { id: eid, eid: eid, operating_system: "ios", model: "iPhone" },
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.message === "SUCCESS") {
          done(null);
        } else {
          done("Unable to activate, please check your EID");
        }
      })
      .catch(() => {
        done("Unable to activate, please check your connection.");
      });
  };

  return (
    <div className="h-screen w-screen flex flex-col items-center text-center bg-gray-100 ">
      {(isActivating || activated) && (
        <div className="fixed inset-0 flex flex-col items-center justify-center bg-black bg-opacity-80 text-white">
          {activated ? (
            <h1 className="text-3xl font-semibold">Success!</h1>
          ) : (
            <div>
              <h1 className="text-2xl">eSIM Setup</h1>
              <div className="animate-spin text-4xl mt-4">
                <ImSpinner9 />
              </div>
            </div>
          )}
          <p className="mt-4">
            You should have received a notification to install your eSIM
          </p>
        </div>
      )}

      <HeaderEid />
      {errorActivating && (
        <p className="text-red-500 mt-2">{errorActivating}</p>
      )}

      <div className="bg-white p-6 h-full rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-medium text-left text-[#212121] leading-[100%]">
          Thanks for your order!
        </h1>
        <h1 className="text-2xl mt-1 font-medium text-left text-[#212121] leading-[100%]">
          Just one little thing...
        </h1>
        <h2 className="mt-4 text-base text-left font-normal  leading-6">
          {props.dontSubmit
            ? "Complete the steps below."
            : "To install your eSIM you’ll need to complete the quick steps below:"}
        </h2>
        <ol className="text-left mt-4 space-y-2">
          <li className="text-base leading-7 text-[#212121]">
            1. Go to your phone <b>Settings</b>
          </li>
          <li className="text-base leading-7 text-[#212121]">
            2. Select <b>General</b>, then <b>About</b>
          </li>
          <li className="text-base leading-7 text-[#212121]">
            3. Scroll down and select <b>EID</b>
          </li>
          <li className="text-base leading-7 text-[#212121]">
            4. Copy the EID (long hold to copy)
          </li>
          <li className="text-base leading-7 text-[#212121]">
            5. Paste it below
          </li>
        </ol>
        <form
          className="mt-4 flex flex-col space-y-4"
          onSubmit={(ev) => {
            ev.preventDefault();
            if (props.dontSubmit) return;
            if (!isActivating) {
              setIsActivating(true);
              setTimeout(() => {
                activateSIM(eid, (err) => {
                  setErrorActivating(err);
                  if (!err) setActivated(true);
                  setIsActivating(false);
                });
              }, 1000);
            }
          }}
        >
          <input
            type="text"
            className=" px-6 py-3 rounded-md text-base w-full border-2  border-[#DADADA] placeholder:text-[#212121]"
            placeholder="Enter EID"
            value={eid}
            onChange={(ev) => setEID(ev.target.value.trim())}
          />
          <div className="flex items-center justify-center">
            {!props.dontSubmit && !activated && (
              <Button
                text="Install eSIM"
                disabled={eid.length === 0}
                onClick={() => props.onContinue(eid)}
              />
            )}
          </div>
          {!props.dontSubmit && activated && (
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md"
              onClick={() => props.viewPlan()}
            >
              View Plan
            </button>
          )}
          {props.dontSubmit && (
            <button
              className="bg-gray-700 text-white py-2 px-4 rounded-md"
              onClick={() => props.onContinue(eid)}
            >
              Continue
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EID;
