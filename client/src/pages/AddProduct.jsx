import React from "react";
import { Input } from "../components/Index";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { handleSuccessMsg } from "../utils/ToastFunc";
import { FiUpload, FiDollarSign, FiPercent } from "react-icons/fi";
import apiObj from "../../config";

const AddProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const API = apiObj.apiString;

  const handleAddProduct = (data) => {
    const formData = new FormData();
    formData.append("productName", data.productName);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("rating", data.rating);
    formData.append("category", data.category);
    formData.append("description", data.description);
    Array.from(data.productImg).forEach((file) => {
      formData.append("productImg", file);
    });

    axios
      .post(`${API}/product/create-product`, formData)
      .then((res) => {
        handleSuccessMsg(res.data.message);
        setTimeout(() => {
          navigate("/admin-products");
        }, 1000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-indigo-600 mb-1">
          Add New Product
        </h2>
        <p className="text-gray-400 text-sm sm:text-base ">
          Fill in the details to add a new electronic product
        </p>
      </div>

      <form
        onSubmit={handleSubmit(handleAddProduct)}
        encType="multipart/form-data"
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                {...register("productName", {
                  required: "Product name is required",
                })}
                type="text"
                placeholder="e.g. Sony WH-1000XM4 Headphones"
                className={`w-full pl-4 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.productName ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.productName && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.productName.message}
                </p>
              )}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                ₹
              </div>
              <Input
                {...register("price", {
                  required: "Price is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
                type="number"
                step="0.01"
                placeholder="2999"
                className={`w-full pl-9 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.price ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.price && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Discount
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <FiPercent className="text-gray-400" />
              </div>
              <Input
                {...register("discount", {
                  max: {
                    value: watch("price"),
                    message: "Discount cannot exceed 100%",
                  },
                })}
                type="number"
                placeholder="0"
                className={`w-full pr-9 pl-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                  errors.discount ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.discount && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.discount.message}
                </p>
              )}
            </div>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rating
            </label>
            <Input
              {...register("rating", {
                min: { value: 0, message: "Rating cannot be less than 0" },
                max: { value: 5, message: "Rating cannot exceed 5" },
              })}
              type="number"
              step="0.1"
              placeholder="4.5"
              className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
                errors.rating ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.rating && (
              <p className="mt-1 text-sm text-red-600">
                {errors.rating.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("category", { required: "Category is required" })}
              className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none ${
                errors.category ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select category</option>
              <option value="Computer & Tablet">Computer & Tablet</option>
              <option value="Mobile & Accessories">Mobile & Accessories</option>
              <option value="Tv & Home Theater">TV & Home Theater</option>
              <option value="Audio & HeadPhone">Audio & Headphones</option>
              <option value="Camera & Watches">Camera & Watches</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-600">
                {errors.category.message}
              </p>
            )}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            rows={8}
            placeholder="Enter detailed product description..."
            className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${
              errors.description ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Product Images */}
        <div>
          <label
            htmlFor="productImg"
            className="block text-sm font-semibold    mb-1"
          >
            Product Images*
          </label>
          <input
            {...register("productImg", { required: true })}
            type="file"
            multiple
            className="w-full px-4 py-2 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
          />
          {errors.productImg && (
            <p className="mt-1 text-sm text-red-600">
              {errors.productImg.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
