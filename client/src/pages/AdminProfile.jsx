import { useNavigate } from "react-router-dom";
import { FiLogOut, FiUser, FiMail, FiPhone, FiCalendar } from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { removeAdmin } from "../store/slices/adminSlice";
import { handleErrorMsg } from "../utils/ToastFunc";
import apiObj from "../../config";

const AdminProfile = () => {
  const navigate = useNavigate();
  const admin = useSelector((state) => state.admin.admin);
  const dispatch = useDispatch();
  const API = apiObj.apiString;

  const handleLogout = async () => {
    try {
      await axios.get(`${API}/admin/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully!");
      dispatch(removeAdmin());
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      handleErrorMsg("Logout failed. Try again.");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-100 py-12 px-4 flex justify-center items-center">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 sm:p-12">
        {/* Profile Image and Info */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="w-28 h-28 mb-4 rounded-full overflow-hidden  shadow-md">
            <img
              src={admin?.profilePic}
              alt="Admin"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800">
            {admin?.fullName}
          </h2>
          <p className="text-blue-600 text-sm font-medium mt-1">
            Admin || Owner
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <InfoCard
            icon={<FiUser />}
            label="Full Name"
            value={admin?.fullName}
          />
          <InfoCard
            icon={<FiMail />}
            label="Email Address"
            value={admin?.email}
          />
          <InfoCard
            icon={<FiPhone />}
            label="Contact Number"
            value={admin?.contactNo || "Not provided"}
          />
          <InfoCard
            icon={<FiCalendar />}
            label="Admin Since"
            value={
              admin?.createdAt
                ? new Date(admin.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : "N/A"
            }
          />
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-10 w-full flex items-center justify-center gap-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all"
        >
          <FiLogOut size={20} />
          Logout
        </button>
      </div>
    </div>
  );
};

const InfoCard = ({ icon, label, value }) => (
  <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition">
    <div className="p-3 rounded-full bg-blue-100 text-blue-600">{icon}</div>
    <div>
      <h4 className="text-sm text-gray-500 font-medium">{label}</h4>
      <p className="text-gray-800 font-semibold">{value}</p>
    </div>
  </div>
);

export default AdminProfile;
