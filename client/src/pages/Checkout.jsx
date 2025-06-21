import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Input, OrderSummary, StripeButton } from "../components/Index";
import { ChevronLeft, Truck } from "lucide-react";
import { useForm } from "react-hook-form";
import apiObj from "../config";

const Checkout = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const [products, setProducts] = useState([]);
  const [isReadyToPay, setIsReadyToPay] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const API = apiObj.apiString;

  const fetchCartProducts = async () => {
    try {
      const res = await axios(`${API}/user/getProducts`, {
        headers: { id: user?._id },
        withCredentials: true,
        method: "GET",
      });
      setProducts(res.data.cart);
    } catch (err) {
      console.error("Error fetching cart products:", err);
    }
  };

  useEffect(() => {
    if (user?._id) fetchCartProducts();
  }, [user]);

  const handleForm = async (data) => {
    await axios
      .post(
        `${API}/orders/save-pending-order`,
        { products, userId: user?._id },
        { withCredentials: true }
      )
    setIsReadyToPay(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate(-1)}
            className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft />
          </button>
          <h2 className="text-2xl font-bold text-blue-600">Checkout</h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-1">
                <Truck />
                Shipping Information
              </h3>

              <form onSubmit={handleSubmit(handleForm)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name *
                    </label>
                    <Input
                      type="text"
                      id="firstName"
                      placeholder="Enter First Name"
                      {...register("firstName", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name *
                    </label>
                    <Input
                      type="text"
                      id="lastName"
                      placeholder="Enter Last Name"
                      {...register("lastName", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    {...register("email", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    id="phone"
                    placeholder="Enter Phone Number"
                    {...register("phone", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address1"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Street Address *
                  </label>
                  <Input
                    type="text"
                    id="address1"
                    placeholder="Enter Street Address"
                    {...register("address1", { required: true })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="address2"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Apartment, Suite, etc. (Optional)
                  </label>
                  <Input
                    type="text"
                    id="address2"
                    placeholder="Apartment, suite, etc."
                    {...register("address2")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      City *
                    </label>
                    <Input
                      type="text"
                      id="city"
                      placeholder="Enter City"
                      {...register("city", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="state"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      State *
                    </label>
                    <Input
                      type="text"
                      id="state"
                      placeholder="Enter State"
                      {...register("state", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="zip"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      ZIP Code *
                    </label>
                    <Input
                      type="text"
                      id="zip"
                      placeholder="Enter ZIP Code"
                      {...register("zip", { required: true })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="saveInfo"
                    {...register("saveInfo")}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="saveInfo"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Save this information for next time
                  </label>
                </div>

                {!isReadyToPay && (
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-lg font-medium transition-colors shadow-md hover:shadow-lg"
                  >
                    Save & Pay Now
                  </button>
                )}
              </form>
              <div className="mt-3">
                {isReadyToPay && <StripeButton cartItems={products} />}
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <OrderSummary products={products} isProceedBtn={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
