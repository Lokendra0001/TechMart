import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaUser,
  FaSignOutAlt,
  FaEdit,
  FaCamera,
  FaLink,
  FaPhone,
  FaShoppingCart,
  FaHistory,
  FaCalendarAlt,
  FaLock,
} from "react-icons/fa";
import { useForm } from "react-hook-form";
import { handleSuccessMsg, handleErrorMsg } from "../utils/ToastFunc.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../store/slices/authSlice.js";
import axios from "axios";
import { CartCard } from "../components/Index.jsx";
import apiObj from "../config.js";

const Profile = () => {
  const [hideBtn, setHideBtn] = useState(true);
  const [isAvator, setIsAvator] = useState(false);
  const [loader, setLoader] = useState(false);
  const [orders, setOrders] = useState([]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const profileImgFile = watch("profilePic");
  const navigate = useNavigate();
  const API = apiObj.apiString;

  useEffect(() => {
    setValue("fullName", user?.fullName);
    setValue("email", user?.email);
    setValue("bio", user?.bio || "");
    setValue("contactNo", user?.contactNo || "");
  }, [user, setValue]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleFormSubmit = async (data) => {
    if (
      user?.fullName === data.fullName &&
      user?.email === data.email &&
      user?.contactNo === data.contactNo &&
      user?.bio === data.bio
    ) {
      setHideBtn(true);
      return handleSuccessMsg("Profile is up to date!");
    }
    setLoader(true);
    try {
      const response = await axios.patch(`${API}/user/editBio`, data, {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
      handleSuccessMsg("Profile updated successfully!");
    } catch (err) {
      handleErrorMsg("Failed to update profile");
    } finally {
      setLoader(false);
      setHideBtn(true);
    }
  };

  const handleAvator = async (data) => {
    const formData = new FormData();
    formData.append("profilePic", data.profilePic[0]);
    formData.append("email", user?.email);
    setLoader(true);
    try {
      const response = await axios.patch(`${API}/user/editAvator`, formData, {
        withCredentials: true,
      });
      dispatch(addUser(response.data));
      handleSuccessMsg("Avatar updated successfully!");
    } catch (err) {
      handleErrorMsg("Failed to update avatar");
    } finally {
      setLoader(false);
      setIsAvator(false);
    }
  };

  const handleLogout = async () => {
    const choice = confirm("Are You Sure to Logout");
    if (!choice) return;
    try {
      axios
        .post(`${API}/user/logout`, {}, { withCredentials: true })
        .then(() => {
          handleSuccessMsg("Logout successfully!");
          setTimeout(() => {
            navigate("/login");
            dispatch(addUser(null));
          }, 1000);
        });
    } catch (err) {
      handleErrorMsg("Failed to logout");
    }
  };

  const fetchOrders = async () => {
    axios
      .get(`${API}/orders/getOrders`, {
        headers: { _id: user?._id },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-indigo-50/10   sm:p-5 flex flex-col items-center min-h-screen w-full gap-5">
      <div className="p-3 flex flex-col w-full gap-1 border-b border-slate-300 max-w-6xl">
        <h1 className="text-indigo-500 font-bold text-3xl">Profile</h1>
        <p className="text-slate-500 text-sm sm:text-md">
          View and manage your profile information
        </p>
      </div>

      {/* Profile Card */}
      <div className="flex flex-col lg:flex-row  justify-between w-full items-start gap-5 max-w-6xl">
        {/* Left Side - Profile Card */}
        <form
          onSubmit={handleSubmit(handleAvator)}
          className="w-full lg:w-1/3 flex flex-col items-center gap-5 p-2 sm:p-6 bg-white sm:rounded-xl  border border-gray-300"
          encType="multipart/form-data"
        >
          <div className="relative group">
            <div className="w-40 h-40 rounded-full flex items-center justify-center overflow-hidden ">
              <img
                src={
                  profileImgFile?.[0]
                    ? URL.createObjectURL(profileImgFile[0])
                    : user?.profilePic
                }
                alt="Avatar"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <button
              className="absolute bottom-3 right-3 bg-white p-3 rounded-full shadow-md hover:bg-indigo-500  duration-300 group-hover:opacity-100 opacity-90"
              title="Change profile picture"
            >
              <input
                type="file"
                {...register("profilePic", {
                  onChange: () => setIsAvator(true),
                })}
                accept="image/*"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <FaCamera className="text-indigo-600 group-hover:text-white text-sm" />
            </button>
          </div>

          <div className="text-center">
            <h1 className="text-indigo-500 font-semibold text-2xl">
              {user?.fullName}
            </h1>
            <p className="text-slate-500 text-sm mt-1 line-clamp-2">
              {user?.bio || "No bio added yet"}
            </p>
          </div>

          {/* icons and detail under profile pic */}
          <div className="w-full space-y-3 mt-2">
            <div className="flex items-center gap-3 text-slate-600">
              <FaEnvelope />
              <span className="text-sm">{user?.email}</span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <FaPhone />
              <span className="text-sm">
                {user?.contactNo || "Not provided"}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <FaCalendarAlt />
              <span className="text-sm">
                Joined {new Date(user?.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <FaShoppingCart />
              <span className="text-sm">
                {user?.cart?.length || 0} items in cart
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-600">
              <FaHistory />
              <span className="text-sm">{orders.length || 0} past orders</span>
            </div>
          </div>

          <button
            className={`flex items-center gap-2 mt-4 px-6 py-2 rounded-lg text-sm transition-all ${
              isAvator
                ? "bg-blue-600 text-white hover:shadow-lg"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
            type="submit"
            disabled={!isAvator}
          >
            <FaEdit /> {loader ? "Uploading..." : "Update Avatar"}
          </button>
        </form>

        {/* Right Side - Profile Form */}
        <div className="w-full lg:w-2/3 bg-white py-3 sm:rounded-xl   border border-gray-300 px-2 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-indigo-500 font-bold text-lg sm:text-2xl">
              Personal Information
            </h1>
            {hideBtn ? (
              <button
                type="button"
                className="flex text-sm items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-indigo-100 to-blue-100 hover:from-indigo-200 hover:to-blue-200  text-indigo-900 rounded-lg transition-all shadow-sm"
                onClick={() => setHideBtn(false)}
              >
                <FaEdit className="text-lg sm:text-md" />
                <span className="hidden sm:inline"> Edit Profile</span>
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  className="px-5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg transition-all"
                  onClick={() => setHideBtn(true)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  form="profileForm"
                  className="px-5 py-2 bg-gradient-to-r cursor-pointer from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white rounded-lg transition-all shadow-md"
                >
                  {loader ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>

          {/* Right Side Bio Form */}
          <form
            id="profileForm"
            className="w-full space-y-5"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col w-full">
                <label
                  htmlFor="fullName"
                  className="text-slate-600 mb-2 flex items-center gap-2 text-sm font-medium"
                >
                  <FaUser className="text-indigo-500" /> Full Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  className="px-4 py-3 rounded-lg bg-slate-50 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 border border-slate-200 transition-all"
                  disabled={hideBtn}
                  {...register("fullName")}
                />
              </div>

              <div className="flex flex-col w-full">
                <label
                  htmlFor="email"
                  className="text-slate-600 mb-2 flex items-center gap-2 text-sm font-medium"
                >
                  <FaEnvelope className="text-indigo-500" /> Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  className="px-4 py-3 rounded-lg bg-slate-50 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 border border-slate-200 transition-all"
                  disabled={hideBtn}
                  {...register("email")}
                />
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col md:w-1/2 px-2">
                <label
                  htmlFor="contactNo"
                  className="text-slate-600 mb-2 flex items-center gap-2 text-sm font-medium"
                >
                  <FaPhone className="text-indigo-500" /> Contact Number
                </label>
                <input
                  type="number"
                  id="contactNo"
                  className="px-4 py-3 rounded-lg bg-slate-50 text-black placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 border border-slate-200 transition-all"
                  disabled={hideBtn}
                  {...register("contactNo", {
                    maxLength: {
                      value: 10,
                      message: "Contact No should be only 10.",
                    },
                  })}
                />
                {errors.contactNo && (
                  <p className="text-red-400 text-sm mt-2">
                    {errors.contactNo.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="bio"
                className="text-slate-600 mb-2 flex items-center gap-2 text-sm font-medium"
              >
                <FaLink className="text-indigo-500" /> Bio
              </label>
              <textarea
                id="bio"
                rows="4"
                className="px-4 py-3 rounded-lg bg-slate-50 text-black resize-none placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 border border-slate-200 transition-all"
                disabled={hideBtn}
                {...register("bio")}
                placeholder="Tell us something about yourself..."
              ></textarea>
            </div>
          </form>
        </div>
      </div>

      {/* Your Orders */}
      <div className="mt-5 px-2 ">
        <h1 className="mb-2 font-bold text-2xl text-indigo-600">Your Orders</h1>
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
            Delivery Date
          </div>
        </div>
        <div className=" space-y-4 py-1">
          {orders.map((order, orderIndex) =>
            order.products.map((item, productIndex) => (
              <CartCard
                key={`${orderIndex}-${productIndex}`} // ✅ unique key per item
                product={item.product} // ✅ full product details
                qty={item.quantity} // ✅ quantity
                isOrder={true}
                orderDate={order.createdAt}
              />
            ))
          )}
        </div>
      </div>
      <div className="w-full max-w-6xl flex justify-end p-3">
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-5 py-2.5 bg-red-400 hover:bg-red-500 cursor-pointer rounded-lg text-white transition-all shadow-md"
        >
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
