import axios from "axios";
import React, { useEffect, useState } from "react";
import { ProductSection } from "../components/Index";
import {
  ShoppingCart,
  LoaderCircle,
  Package,
  PlusCircle,
  Filter,
} from "lucide-react";
import { useSelector } from "react-redux";
import { handleErrorMsg } from "../utils/ToastFunc";
import apiObj from "../config";
import { NavLink } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const admin = useSelector((state) => state.admin.admin);
  const API = apiObj.apiString;

  const fetchAllProducts = async () => {
    try {
      const res = await axios.get(`${API}/product/`); // already returns array
      setProducts(res.data.products);
    } catch (err) {
      handleErrorMsg("Something went wrong. Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (admin) {
      fetchAllProducts();
    }
  }, [admin]);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Product Dashboard
            </h1>
            <p className="text-gray-500 text-sm">Manage store inventory</p>
          </div>
        </div>

        <NavLink
          to="/add-products"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span className="text-sm">Add Product</span>
        </NavLink>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Products</p>
              <h3 className="text-2xl font-bold mt-1">{products.length}</h3>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Package className="w-5 h-5 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-500" />
            Product Inventory
          </h2>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <LoaderCircle className="animate-spin w-8 h-8 text-gray-400" />
            <p className="mt-3 text-gray-500">Loading product inventory...</p>
          </div>
        ) : (
          <ProductSection products={products} isAdmin={true} className="p-5" />
        )}
      </div>
    </div>
  );
};

export default AdminProducts;
