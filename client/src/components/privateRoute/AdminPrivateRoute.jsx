import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const admin = useSelector((state) => state.admin.admin);
  const navigate = useNavigate();

  useEffect(() => {
    !admin && navigate("/login");
  }, [admin]);

  return admin && children;
};

export default AdminPrivateRoute;
