import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OrderSummary, CartCard } from "../components/Index";
import { addUser } from "../store/slices/authSlice";
import apiObj from "../../config";

const Cart = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [shouldFetch, setShouldFetch] = useState(true);
  const API = apiObj.apiString;

  const fetchCartProducts = async () => {
    try {
      const res = await axios(`${API}/user/getProducts`, {
        headers: { id: user?._id },
        withCredentials: true,
        method: "GET",
      });
      setProducts(res.data.cart);
      dispatch(addUser(res.data));
    } catch (err) {
      console.error("Error fetching cart products:", err);
    }
  };

  useEffect(() => {
    if (shouldFetch) fetchCartProducts();
  }, [shouldFetch]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="sm:text-2xl text-xl font-bold text-blue-600 ">
            Your Shopping Cart
          </h1>
          <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs sm:text-sm font-medium">
            {products.reduce((acc, cur) => {
              return (acc = cur.quantity + acc);
            }, 0)}{" "}
            items
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Cart Items Section */}
          <div className="lg:w-2/3">
            {/* Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 mb-4 px-4 py-2 bg-white rounded-lg shadow-sm">
              <div className="col-span-6 text-sm font-medium text-gray-500">
                PRODUCT
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-500 text-center">
                QUANTITY
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-500 text-end">
                PRICE (Per Pc)
              </div>
              <div className="col-span-2 text-sm font-medium text-gray-500 text-end">
                Rem.
              </div>
            </div>

            {/* Empty State */}
            {products.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center">
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  Your cart is empty
                </h3>
                <p className="mt-1 text-gray-500">
                  Start shopping to add items to your cart
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((item, i) => (
                  <CartCard
                    key={`${item.productId._id}-${i}`}
                    product={item.productId}
                    qty={item.quantity}
                    onQtyChange={setShouldFetch}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Order Summary Section */}
          <div className="lg:w-1/3">
            <OrderSummary products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
