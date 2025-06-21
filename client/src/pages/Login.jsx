import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { CanvaCont, Input } from "../components/Index.jsx";
import { LogIn, Zap, Shield } from "lucide-react";
import axios from "axios";
import { handleSuccessMsg } from "../utils/ToastFunc.js";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/slices/authSlice.js";
import { addAdmin } from "../store/slices/adminSlice.js";
import apiObj from "../config.js";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.admin.admin);
  const API = apiObj.apiString;

  const handleLogin = async (data) => {
    setErr("");
    const route = isAdminLogin ? `${API}/admin/signin` : `${API}/user/signin`;

    axios
      .post(route, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      })
      .then((data) => {
        handleSuccessMsg(data.data.message);
        dispatch(
          isAdminLogin
            ? addAdmin(data.data.admin)
            : addUser(data.data.userWithoutPassword)
        );
        navigate(isAdminLogin ? "/admin-products" : "/");
      })
      .catch((err) => setErr(err.response.data.message));
  };

  useEffect(() => {
    admin && navigate("/admin-products");
    user && navigate("/profile");
  }, [user, admin]);

  return (
    <CanvaCont>
      <div className="max-w-[1200px] w-full md:w-[850px] mx-auto border-2 border-gray-200 sm:rounded-xl shadow-md overflow-hidden flex flex-col md:flex-row">
        {/* Left Image Panel */}
        <div className="hidden sm:flex md:w-1/2 py-3 relative items-center justify-center">
          <div
            className={`absolute inset-0 bg-cover bg-center ${
              isAdminLogin
                ? "bg-[url('https://plus.unsplash.com/premium_photo-1661510711440-282cdd988ead?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZWxlY3Ryb25pYyUyMHNob3B8ZW58MHx8MHx8fDA%3D')]"
                : "bg-[url('https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?auto=format&fit=crop&w=1487&q=80')]"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-blue-700 to-indigo-400/80" />
          <div className="relative z-10 text-center max-w-md px-6">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight text-white">
                {isAdminLogin ? "Admin Panel" : "Welcome Back"}
              </h2>
              <p className="text-white/85 font-light">
                {isAdminLogin
                  ? "Log in to manage your store"
                  : "Sign in to access your personalized dashboard"}
              </p>
            </div>
            <div className="pt-4 border-t border-white/15">
              {!isAdminLogin && (
                <>
                  <p className="text-white/75 text-sm mb-3">
                    NEW TO OUR PLATFORM?
                  </p>
                  <Link
                    to="/signup"
                    className="inline-block px-5 py-2.5 text-sm text-white font-medium border border-white/30 rounded-lg bg-white/5 hover:bg-white/10 transition"
                  >
                    Create Account
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="w-full md:w-1/2 p-6 bg-white rounded-md flex flex-col justify-center">
          <div className="text-center mb-7">
            <div className="inline-flex items-center justify-center gap-2">
              <Zap className="h-7 w-7 text-indigo-600 animate-pulse" />
              <h1 className="text-3xl font-extrabold bg-gradient-to-br from-indigo-600 to-blue-500 bg-clip-text text-transparent">
                TechMart
              </h1>
            </div>
            <p className="text-gray-600 text-sm font-medium mt-2">
              {isAdminLogin
                ? "Enter admin credentials"
                : "Enter your credentials to continue"}
            </p>
            {err && (
              <Alert
                severity="error"
                sx={{
                  fontWeight: "500",
                  boxShadow: 3,
                  paddingY: "2px",
                  marginX: 3,
                }}
              >
                {err}
              </Alert>
            )}
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
            <Input
              type="email"
              label="Email :"
              placeholder="Enter your email"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}

            <Input
              type="password"
              label="Password :"
              placeholder="Enter your password"
              className="focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}

            <div className="flex items-center justify-between">
              <label className="flex items-center text-sm text-slate-600">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                />
                <span className="ml-2">Accept all Terms & Conditions</span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white py-2 sm:py-2.5 font-semibold rounded-sm shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <LogIn size={17} /> {isAdminLogin ? "Admin Login" : "Login"}
            </button>

            {!isAdminLogin && (
              <div className="text-center text-sm text-slate-500">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Signup
                </Link>
              </div>
            )}
          </form>
          <div className="flex items-center gap-4 my-3">
            <div className="h-px flex-1 bg-gray-300" />
            <p className="text-sm text-gray-500">OR</p>
            <div className="h-px flex-1 bg-gray-300" />
          </div>

          {/* Toggle Admin/User */}
          <button
            onClick={() => setIsAdminLogin(!isAdminLogin)}
            className={`w-full flex justify-center items-center gap-2 mt-3 py-2 sm:py-2.5 font-semibold rounded-md shadow transition-all duration-200 ${
              isAdminLogin
                ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
                : "bg-gray-900 text-white hover:bg-gray-800"
            }`}
          >
            <Shield size={17} />
            {isAdminLogin ? "Switch to User Login" : "Login as Admin"}
          </button>
        </div>
      </div>
    </CanvaCont>
  );
}

export default Login;
