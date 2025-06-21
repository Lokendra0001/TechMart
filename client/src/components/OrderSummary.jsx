import React from "react";
import { Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderSummary = ({ products, isProceedBtn = true }) => {


  
  const navigate = useNavigate();
  const subtotal = products.reduce(
    (acc, cur) => acc + cur.productId.price * cur.quantity,
    0
  );
  const totalDiscount = products.reduce(
    (acc, cur) => acc + cur.productId.discount * cur.quantity,
    0
  );
  const shippingCost = subtotal > 499 ? 0 : subtotal * 0.05;
  const total = subtotal - totalDiscount + shippingCost;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-[14dvh]">
      <div className=" px-6 py-4 bg-gradient-to-br from-indigo-600 to-blue-500">
        <h2 className="text-lg font-semibold  text-white">Order Summary</h2>
      </div>

      <div className="p-6">
        {/* Products List */}
        <div className="max-h-64 overflow-y-auto pr-2 space-y-3 mb-6">
          {products.map((item, i) => (
            <div key={i} className="flex justify-between items-center text-sm">
              <div className="flex items-center">
                <span className="bg-indigo-50 text-blue-600 text-xs font-medium rounded px-2 py-1 mr-2">
                  x{item.quantity}
                </span>
                <span className="text-gray-700 truncate max-w-[140px]">
                  {item.productId.productName}
                </span>
              </div>
              <span className="font-medium text-gray-900">
                ₹
                {(item.productId.price * item.quantity).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
        </div>

        {/* Price Breakdown */}
        <div className="space-y-3 border-t border-gray-200 pt-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-900">
              ₹{subtotal.toLocaleString("en-IN")}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="text-green-600">
              -{" "}
              {totalDiscount != 0 &&
                `₹${totalDiscount.toLocaleString("en-IN")}`}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span
              className={
                shippingCost === 0 ? "text-green-600" : "text-gray-900"
              }
            >
              {subtotal == 0
                ? "-"
                : shippingCost === 0
                ? "Free"
                : `₹${shippingCost.toLocaleString("en-IN")}`}
            </span>
          </div>
          <div className="flex justify-between text-base font-medium pt-3">
            <span className="text-gray-900">Total</span>
            <span className="text-blue-600">
              ₹{total.toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Checkout Button */}
        {isProceedBtn && (
          <button
            disabled={products.length === 0}
            onClick={() => navigate("/cart/checkout")}
            className={`w-full mt-6 py-3 rounded-md font-medium text-white transition-colors ${
              products.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            }`}
          >
            Proceed to Checkout
          </button>
        )}

        {/* Security Info */}
        <div className="mt-4 flex items-center justify-center text-xs text-gray-500">
          <Lock size={11} color="blue" className="mr-1" />
          Secure encrypted checkout
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
