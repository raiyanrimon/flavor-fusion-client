import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const coinOptions = [
  { coins: 100, price: 1.0 },
  { coins: 500, price: 5.0 },
  { coins: 1000, price: 10.0 },
];

const PurchaseCoins = () => {
  const [amount, setAmount] = useState(0);

  const handlePurchase = (coins) => {
    const price = coins / 100;
    setAmount(price);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-8 my-10 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Purchase Coins</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {coinOptions.map((option, index) => (
          <div key={index} className="card bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-2">{option.coins} Coins</h2>
            <p className="text-gray-600 mb-4">{option.price.toFixed(2)}</p>
            <button
              onClick={() => handlePurchase(option.coins)}
              className="btn btn-primary w-full"
            >
              Buy Now
            </button>
          </div>
        ))}
      </div>

      {amount > 0 && (
        <div className="w-full my-8">
          <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default PurchaseCoins;
