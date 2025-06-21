import { useState } from "react";
import { NavLink } from "react-router-dom";

const Card = ({ product, qty = 0, isAdmin = false }) => {
  const discountedValue = product.price - product.discount;
  const createdAt = new Date(product.createdAt);
  const now = new Date();
  const diffInDays = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));

  const isNew = diffInDays <= 4;

  return (
    <NavLink
      to={`/product/${product._id}`}
      className={` w-full  sm:w-62  h-37 sm:flex-col sm:h-90 sm:rounded-xl flex  overflow-hidden sm:shadow-lg shadow-md bg-indigo-100 select-none  ${
        isAdmin && "pointer-events-auto select-none"
      }`}
    >
      {/* Image */}
      <div
        className={`relative sm:h-50 
         w-2/5 sm:w-full
   overflow-hidden`}
      >
        <img
          src={product.productImg[0]}
          alt={product.productName}
          className="w-full h-full object-contain object-center"
        />
        {isNew && (
          <span className="absolute top-2 left-2 bg-gradient-to-br from-indigo-600 to-purple-500 text-white text-[8px] sm:text-xs px-2 py-1 rounded">
            NEW
          </span>
        )}
      </div>

      {/* Content */}
      <div className="py-1 px-2 bg-white w-2/3 sm:w-full sm:rounded-tr-2xl sm:rounded-tl-2xl flex flex-col gap-1 sm:gap-2 sm:h-45 justify-around">
        <div>
          <p className="text-[10px] sm:text-xs font-semibold text-gray-500 tracking-wide">
            {product.category}
          </p>
          <h2 className="sm:text-[16px] text-[15px] font-semibold text-gray-800 line-clamp-2">
            {product.productName}
          </h2>
          <p className="text-xs text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        <div className="flex items-center bg-blue-500 w-fit px-2 rounded-md">
          <span className="text-yellow-400">★</span>
          <span className="text-xs sm:text-sm ml-1 text-white">
            {product.rating}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-md font-bold text-blue-600">
            ₹{discountedValue.toLocaleString("en-IN")}
          </span>
          {product.discount > 0 && (
            <span className="text-sm self-center font-semibold text-gray-400 line-through">
              ₹{product.price.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </NavLink>
  );
};

export default Card;
