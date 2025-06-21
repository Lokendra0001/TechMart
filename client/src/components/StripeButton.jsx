import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import apiObj from "../config";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHED_KEY);

const StripeButton = ({ cartItems }) => {
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const API = apiObj.apiString;

    const res = await axios.post(`${API}/api/create-checkout-session`, {
      products: cartItems,
    });

    const result = await stripe.redirectToCheckout({
      sessionId: res.data.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCheckout}
      className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
    >
      Pay with Card
    </button>
  );
};

export default StripeButton;
