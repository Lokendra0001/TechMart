import { Nav, Footer } from "./components/Index";
import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "./store/slices/authSlice";
import { addAdmin, removeAdmin } from "./store/slices/adminSlice";
import { useState } from "react";
import apiObj from "./config";
import { Zap } from "lucide-react";

const App = () => {
  const location = useLocation();
  const [authLoading, setAuthLoading] = useState(true);
  const dispatch = useDispatch();
  const API = apiObj.apiString;

  const fetchUser = async () => {
    try {
      const result = await axios.get(`${API}/user/getUser`, {
        withCredentials: true,
      });
      dispatch(addUser(result.data));
    } catch (error) {
      dispatch(removeUser());
    }
  };

  const fetchAdmin = async () => {
    try {
      const result = await axios.get(`${API}/admin/getAdmin`, {
        withCredentials: true,
      });
      dispatch(addAdmin(result.data));
    } catch (error) {
      dispatch(removeAdmin());
    }
  };

  useEffect(() => {
    Promise.all([fetchUser(), fetchAdmin()]).finally(() => {
      setTimeout(() => {
        setAuthLoading(false);
      }, 1000);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  if (authLoading)
    return (
      <div className="h-screen w-full flex flex-col justify-center items-center bg-white">
        {/* App Logo Container */}
        <div className="relative  h-24  flex justify-center items-center">
          {/* Pulsing Circle Background */}
          <div className="absolute w-full h-full rounded-full animate-pulse"></div>

          {/* TechMart Text Animation */}
          <h1 className="text-4xl  font-bold animate-[textReveal_1.5s_ease-out] flex items-center gap-0.5">
            <Zap size={35} className="text-indigo-500 animate-none" />
            {["T", "e", "c", "h", "M", "a", "r", "t"].map((letter, index) => (
              <span
                key={index}
                className="inline-block opacity-0 text-transparent bg-clip-text bg-gradient-to-br from-indigo-600 to-blue-500 animate-[letterReveal_0.5s_ease-out_forwards]"
                style={{ animationDelay: `${(index + 1) * 0.1}s` }}
              >
                {letter}
              </span>
            ))}
          </h1>
        </div>

        <p className="text-gray-500 animate-pulse mb-5">
          Loading Your Tech Mart...
        </p>

        {/* Loading Bar */}
        <div className="w-40 h-1 bg-gray-200 rounded-full overflow-hidden ">
          <div className="h-full bg-gradient-to-br from-indigo-600 to-blue-500 rounded-full animate-[loadingBar_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
    ); // This prevent to load the below pages before the authloading set to the false. jab tak data user ya admin ka aa nahi jata ya phir data na bhi ho to vo jo time lagega fetch me us time tak ham below pages ko run nahi karege jab hojaega then ham usko run karege bhale user ho na ho admin hona ho ise hame login page pe jab private route se tabhi jayega jab user nahi hoga login me hame baar barr check karne ki jarurat bahi padega.

  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
      <ToastContainer position="bottom-left" newestOnTop autoClose={1000} />
    </>
  );
};

export default App;
