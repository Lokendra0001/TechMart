import React, { useEffect, useState } from "react";
import { Input, CanvaCont } from "../components/Index.jsx";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus, ShieldCheck, Rocket, Zap, LogInIcon } from "lucide-react";
import axios from "axios";
import { handleErrorMsg, handleSuccessMsg } from "../utils/ToastFunc.js";
import apiObj from "../config";

function Signup() {
  const user = useSelector((state) => state.auth.user);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const API = apiObj.apiString;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSignUp = async (data) => {
    const formData = new FormData();
    formData.append("profilePic", data.profilePic[0]);
    formData.append("fullName", data.fullName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    axios
      .post(`${API}/user/signup`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((data) => {
        handleSuccessMsg(data.data.message);
        setTimeout(() => navigate("/login"), 500);
      })
      .catch((err) => handleErrorMsg(err.response.data.message));
  };

  useEffect(() => {
    user && navigate("/profile");
  }, [user]);

  return (
    <CanvaCont classname="py-10">
      <div className="max-w-[1200px] md:w-[900px] mx-auto border-2 border-gray-200  bg-white rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row ">
        {/* Left Section */}
        <div className="hidden sm:flex md:w-1/2 py-10 relative items-center justify-center">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')] bg-cover bg-center"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-700/90 to-indigo-500/90" />
          <div className="relative z-10 text-center max-w-md px-6">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/20 backdrop-blur-sm">
                <UserPlus className="h-8 w-8 text-white" strokeWidth={1.5} />
              </div>
              <h2 className="text-3xl font-bold mb-3 tracking-tight text-white">
                Join Our Community
              </h2>
              <p className="text-white/85 font-light">
                Create your account and start your journey with us
              </p>
            </div>
            <div className="space-y-4 text-left mb-8">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-blue-300 mt-0.5" />
                <span className="text-white/80 text-sm">
                  Secure and encrypted data protection
                </span>
              </div>
              <div className="flex items-start gap-3">
                <Rocket className="h-5 w-5 text-blue-300 mt-0.5" />
                <span className="text-white/80 text-sm">
                  Instant access to all features
                </span>
              </div>
            </div>
            <div className="pt-4 border-t border-white/15">
              <p className="text-white/75 text-sm mb-3">
                ALREADY HAVE AN ACCOUNT?
              </p>
              <Link
                to="/login"
                className="inline-block px-5 py-2.5 text-sm text-white font-medium border border-white/30 rounded-lg bg-white/5 hover:bg-white/10 transition"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 py-3 px-4 sm:p-6 bg-white flex flex-col justify-center">
          <div className="text-center mb-7 flex flex-col">
            <div className="inline-flex items-center justify-center gap-2">
              <Zap className="h-7 w-7 text-indigo-600 animate-pulse" />
              <h1 className="md:text-4xl font-extrabold bg-gradient-to-br from-indigo-600 to-blue-500 bg-clip-text text-transparent tracking-tight text-[30px] mb-1 pointer-events-auto select-none">
                TechMart
              </h1>
            </div>
            <p className="text-gray-600 text-xs sm:text-sm font-medium px-4 py-1.5">
              Enter your credentials to continue your journey
            </p>
          </div>

          {err && (
            <p className="text-red-600 bg-red-200 w-full text-center py-2">
              {err}
            </p>
          )}

          <form
            onSubmit={handleSubmit(handleSignUp)}
            encType="multipart/form-data"
            className="space-y-4"
          >
            <Input
              type="file"
              label="Profile Pic :"
              accept="image/*"
              {...register("profilePic")}
              className="text-gray-700 "
              placeholder="Choose File asdfjasldjf"
            />

            <Input
              type="text"
              label="Username :"
              placeholder="Enter Username"
              {...register("fullName", {
                required: "Username is required",
              })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}

            <Input
              type="email"
              label="Email :"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Please enter a valid email",
                },
              })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}

            <Input
              type="password"
              label="Password :"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            <label className="flex items-center text-sm text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <span className="ml-2 select-none">Remember me</span>
            </label>

            <button
              type="submit"
              className="w-full  flex gap-1 justify-center items-center bg-blue-700 hover:bg-blue-800 text-white py-2 sm:py-3 px-4 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
            >
              <LogInIcon size={17} />
              Sign Up
            </button>

            <div className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                SignIn
              </Link>
            </div>
          </form>
        </div>
      </div>
    </CanvaCont>
  );
}

export default Signup;
