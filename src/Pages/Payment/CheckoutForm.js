import React, { useEffect, useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";

const CheckoutForm = ({ booking }) => {
  const { price, productName } = booking;

  const [clientSecret, setClientSecret] = useState("");
  const [cardError, setCardError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PORT}/create-payment-intent`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        setClientSecret(data.client_secret);
      });
  }, [price]);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: "Arial, sans-serif",
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d",
        },
      },
      invalid: {
        fontFamily: "Arial, sans-serif",
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
    }

    setSuccessMessage("");
    setProcessing(true);

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: productName,
          },
        },
      });

    if (confirmError) {
      setCardError(confirmError.message);
    }

    console.log(paymentIntent);

    if (paymentIntent.status === "succeeded") {
      const payment = {
        name: productName,
        price: price,
        transactionId: paymentIntent?.id,
        bookingId: booking?._id,
      };

      fetch(`${process.env.REACT_APP_PORT}/paymentinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            setCardError("");
            setSuccessMessage("Your Payment Successfully Received");
            setTransactionId(paymentIntent?.id);
            setProcessing(false);
          }
         
        });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement id="card-element" options={cardStyle} />
        <p className="pt-2">
          <small>Example Card No: 4242 4242 4242 4242</small>
        </p>
        <button
          className="p-2 bg-green-500 my-5 text-white d-block ml-auto"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Payment
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {successMessage && (
        <p className="text-2xl text-green-500 font-semibold">
          {" "}
          {successMessage}
        </p>
      )}
      {transactionId && (
        <p className="text-xl">Your Transaction Id is: {transactionId}</p>
      )}
    </>
  );
};

export default CheckoutForm;
