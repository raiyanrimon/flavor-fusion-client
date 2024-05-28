import { useEffect, useState, useContext } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { AuthContext } from "../Provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

const CheckoutForm = ({ amount }) => {
  const { user } = useContext(AuthContext);
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [error, setError] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (amount > 0) {
      axiosSecure
        .post("/create-payment-intent", { price: amount })
        .then((res) => {
          console.log(res.data.clientSecret);
          setClientSecret(res.data.clientSecret);
        })
        .catch((error) => {
          console.error("Error creating payment intent:", error);
          Swal.fire("Error", "Failed to create payment intent", "error");
        });
    }
  }, [amount, axiosSecure]);

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
      setError(error.message);
      return;
    } else {
      console.log("payment method", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      Swal.fire("Payment Error", confirmError.message, "error");
      return;
    }

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      await axiosSecure.post("/update-coins", {
        email: user.email,
        coins: amount * 100,
      });
      Swal.fire(
        "Payment Successful",
        "Coins added to your account",
        "success"
      ).then(() => {
        navigate("/recipes"); // or navigate to the recipe details page
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
    >
      <div className="mb-6">
        <label
          htmlFor="card-element"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Card Details
        </label>
        <div id="card-element" className="p-2 border rounded-md">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#111827",
                  "::placeholder": {
                    color: "#9CA3AF",
                  },
                },
                invalid: {
                  color: "#EF4444",
                },
              },
            }}
          />
        </div>
        <p className="mt-1 text-sm text-red-500">{error}</p>
      </div>

      <button
        className="w-full py-3 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay Now
      </button>

      {transactionId && (
        <p className="mt-4 text-green-600">Transaction ID: {transactionId}</p>
      )}
    </form>
  );
};

CheckoutForm.propTypes = {
  amount: PropTypes.number,
};

export default CheckoutForm;
