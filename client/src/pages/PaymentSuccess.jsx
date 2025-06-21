import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/slices/authSlice";
import apiObj from "../config";

const PaymentSuccess = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const API = apiObj.apiString;

  useEffect(() => {
    if (user?._id) {
      axios
        .patch(`${API}/orders/order-confirmed`, { user })
        .catch((err) => console.log(err));

      axios
        .patch(`${API}/user/removeCart`, {
          userId: user?._id,
        })
        .then((res) => dispatch(addUser(res.data)))
        .catch((err) => console.log(err));
    }
  }, [user?._id]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center  p-4">
      <CheckCircle className="text-green-500 w-20 h-20 mb-4" />
      <h1 className="text-3xl font-bold mb-2">Payment Successful!</h1>
      <p className="text-lg mb-6">
        Thank you for your purchase. Your order has been placed.
      </p>
      <div className="flex gap-4 sm:flex-row flex-col">
        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-sm font-semibold text-center transition-all"
        >
          Go to Home
        </Link>
        <Link
          to="/profile"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-sm font-semibold text-center transition-all"
        >
          View All Orders
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccess;
