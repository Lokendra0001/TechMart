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
      const result = await axios.get("http://localhost:3000/admin/getAdmin", {
        withCredentials: true,
      });
      dispatch(addAdmin(result.data));
    } catch (error) {
      dispatch(removeAdmin());
    }
  };

  useEffect(() => {
    Promise.all([fetchUser(), fetchAdmin()]).finally(() => {
      setAuthLoading(false);
    });
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behaviour: "smooth" });
  }, [location.pathname]);

  if (authLoading)
    return (
      <div>
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>

        <p className="mt-4 text-gray-600">
          Loading your shopping experience...
        </p>
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
