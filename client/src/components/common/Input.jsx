import React from "react";
import { forwardRef } from "react";

const Input = forwardRef(function (
  { label, type = "text", className = "", ...props },
  ref
) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium dark:text-gray-500 text-gray-800   mb-1">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`
          w-full px-3 py-1.5 rounded-md border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:border-transparent transition-all duration-200
          shadow-sm  placeholder-gray-400
          ${className}
        `}
        {...props}
        // autoComplete="off"
        ref={ref}
      />
    </div>
  );
});

export default Input;
