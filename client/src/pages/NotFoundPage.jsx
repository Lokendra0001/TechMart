import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const NotFoundPage = () => {
  const admin = useSelector((state) => state.admin.admin);
  return (
    <div className=" p-2 h-[100dvh]  font-serif">
      <section className="flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-4xl text-center">
          <h1 className="text-7xl font-bold text-indigo-500 z-20 ">404</h1>
          <div
            className="bg-center bg-no-repeat bg-cover h-110 flex items-center justify-center z-40"
            style={{
              backgroundImage:
                "url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)",
            }}
          ></div>

          <div className="mt-[-3rem]">
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
              Looks like you're lost
            </h3>
            <p className="text-gray-500 mb-6">
              The page you are looking for is not available!
            </p>
            <Link
              to={admin ? "/admin-profile" : "/"}
              className="inline-block px-6 py-2 text-white bg-indigo-600 hover:bg-indigo-700 rounded transition"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NotFoundPage;
