import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PK}`);

const Payment = () => {
  const booking = useLoaderData();
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <div>
      <h2 className="text-2xl text-center my-10">
        Please complete the payment for <span className="font-bold text-green-500">{booking?.productName}</span>
      </h2>
      <div className="max-w-full w-96 mx-auto border rounded-xl p-5">
        <Elements stripe={stripePromise}>
          <CheckoutForm booking={booking} />
        </Elements>
      </div>
    </div>
  );
};

export default Payment;
