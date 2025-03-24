"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) return;

    const res = await fetch("/api/checkout/session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 5000 }), // Example: $50.00
    });

    const { sessionId, error } = await res.json();
    if (error) {
      setError(error);
      setLoading(false);
      return;
    }

    const { error: stripeError } = await stripe.redirectToCheckout({
      sessionId,
    });
    if (stripeError)
      setError(stripeError.message || "An unknown error occurred");

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white shadow-lg rounded-lg w-full max-w-md mx-auto"
    >
      <CardElement className="border p-4 rounded" />
      {error && <p className="text-red-500 mt-2">{error}</p>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 w-full"
      >
        {loading ? "Processing..." : "Pay $50"}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <div className="flex justify-center items-center h-screen px-4">
        <CheckoutForm />
      </div>
    </Elements>
  );
};

export default CheckoutPage;
