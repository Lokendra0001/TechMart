import React, { useEffect, useState } from "react";
import { Container } from "./Index";
import {
  Home,
  ShoppingBag,
  Zap,
  Info,
  Search,
  ShoppingCart,
  X,
  Headphones,
  PlusCircle,
} from "lucide-react";
import { RiAdminLine, RiMenu4Fill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addSearch } from "../store/slices/searchSlice";

const Nav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.admin.admin);
  const userNavLinks = [
    { name: "Home", icon: <Home size={18} />, to: "/" },
    { name: "Shop", icon: <ShoppingBag size={18} />, to: "/shop" },
    { name: "Contact", icon: <Headphones size={18} />, to: "/contact" },
    { name: "About", icon: <Info size={18} />, to: "/about" },
  ];

  const adminNavLinks = [
    {
      name: "All Products",
      icon: <ShoppingBag size={18} />,
      to: "/admin-products",
    },
    {
      name: "Add Product",
      icon: <PlusCircle size={18} />,
      to: "/add-products",
    },
    {
      name: "Profile",
      icon: <RiAdminLine size={18} />,
      to: "/admin-profile",
    },
  ];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(addSearch(searchVal));
    searchVal && navigate("/shop");
  }, [searchVal]);

  useEffect(() => {}, [user]);

  return (
    <>
      <div className=" z-50  bg-white ">
        {/* Top Promo Banner */}
        <div className="bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-center py-1 text-xs sm:text-sm font-medium">
          🚀 Free shipping on orders over $399 | Limited time offer!
        </div>
      </div>
      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b-[1px] border-gray-200">
        <Container>
          <div className=" flex items-center justify-between py-3 px-2">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center">
              <button
                className="lg:hidden mr-3 p-2 rounded-lg hover:bg-gray-100 "
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={24} /> : <RiMenu4Fill size={24} />}
              </button>
              <div className="flex items-center">
                <Zap size={24} className="text-blue-600 mr-2" />
                <NavLink
                  to={admin ? "/admin-products" : "/"}
                  className={`text-2xl font-bold bg-gradient-to-br from-indigo-600 to-blue-500  bg-clip-text text-transparent cursor-pointer `}
                >
                  TechMart
                </NavLink>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex font-semibold  items-center space-x-11">
              {admin
                ? adminNavLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center py-1
                  ${
                    isActive
                      ? "border-b-2 border-blue-500 rounded-xs text-blue-600 shadow-sm"
                      : "text-gray-700 font-medium hover:text-blue-600 "
                  }`
                      }
                    >
                      <span className="mr-1">{link.icon}</span>
                      <span>{link.name}</span>
                    </NavLink>
                  ))
                : userNavLinks.map((link) => (
                    <NavLink
                      key={link.to}
                      to={link.to}
                      className={({ isActive }) =>
                        `flex items-center py-1
                  ${
                    isActive
                      ? "border-b-2 border-blue-500 rounded-xs text-blue-600 shadow-sm"
                      : "text-gray-700 font-medium hover:text-blue-600 "
                  }`
                      }
                    >
                      <span className="mr-1">{link.icon}</span>
                      <span>{link.name}</span>
                    </NavLink>
                  ))}
            </nav>

            {/* Search and Actions for Desktop */}
            <div className={`flex items-center space-x-4 ${admin && "hidden"}`}>
              <div className="relative hidden sm:block">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg  focus:outline-none  w-48 sm:w-56 transition-all duration-200 hover:shadow-sm"
                  onChange={(e) => setSearchVal(e.target.value)}
                />
              </div>

              <div
                className={`flex items-center space-x-3 sm:space-x-5 ${
                  admin && "hidden"
                }`}
              >
                <NavLink
                  to="/cart"
                  className={({ isActive }) =>
                    `${
                      isActive ? "text-blue-700 bg-blue-100" : "text-gray-600"
                    } p-2 rounded-full  relative `
                  }
                >
                  <ShoppingCart size={20} />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-sm">
                    {user?.cart?.length || 0}
                  </span>
                </NavLink>

                {user ? (
                  <NavLink
                    to={"/profile"}
                    className={({ isActive }) =>
                      `  ${isActive && " text-white"} rounded-full `
                    }
                  >
                    <img
                      src={user?.profilePic}
                      className={`cursor-pointer h-8 w-8 rounded-full`}
                    />
                  </NavLink>
                ) : (
                  <NavLink
                    to={"/login"}
                    className={({ isActive }) =>
                      `  ${
                        isActive && "bg-blue-600 text-white"
                      } rounded-sm  relative px-2 sm:px-3 text-sm py-0.5 border-2 border-blue-600 hover:bg-blue-600 hover:text-white font-semibold`
                    }
                  >
                    <button className={`cursor-pointer `}>Login</button>
                  </NavLink>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden bg-white py-2 px-2 rounded-lg  border-b border-gray-200  ">
              {/* Mobile Search (visible only when menu is open) */}
              <div
                className={`${admin && "hidden"}  relative mb-4 mx-2 sm:hidden`}
              >
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-1.5 border border-gray-300 rounded-lg  focus:outline-none  w-full transition-all duration-200 hover:shadow-sm"
                />
              </div>

              {/* Mobile Navigation Links */}
              <nav className="flex flex-col space-y-2">
                {admin
                  ? adminNavLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-3">{link.icon}</span>
                        <span>{link.name}</span>
                      </NavLink>
                    ))
                  : userNavLinks.map((link) => (
                      <NavLink
                        key={link.to}
                        to={link.to}
                        className={({ isActive }) =>
                          `flex items-center px-4 py-3 rounded-lg transition-all duration-200
                    ${
                      isActive
                        ? "bg-blue-100 text-blue-600 font-medium"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`
                        }
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="mr-3">{link.icon}</span>
                        <span>{link.name}</span>
                      </NavLink>
                    ))}
              </nav>
            </div>
          )}
        </Container>
      </header>
    </>
  );
};

export default Nav;
