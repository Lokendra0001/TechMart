import { useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../../store/slices/authSlice";
import apiObj from "../../config";

const CartCard = ({
  product,
  qty,
  isOrder = false,
  orderDate = null,
  onQtyChange,
}) => {
  const navigate = useNavigate();
  const [localQty, setQty] = useState(qty);
  const user = useSelector((state) => state.auth.user);
  const [deliveryDate, setDeliveryDate] = useState("");
  const API = apiObj.apiString;

  useEffect(() => {
    if (!orderDate) return;

    const date = new Date(
      new Date(orderDate).getTime() + 7 * 24 * 60 * 60 * 1000
    );

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const deliver = `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    setDeliveryDate(deliver);
  }, [orderDate]);

  const handleRemoveItem = async (e) => {
    if (onQtyChange) onQtyChange(false);
    e.preventDefault();
    e.stopPropagation();
    axios
      .patch(`${API}/user/deleteProduct`, {
        id: product?._id,
        userId: user?._id,
      })
      .then((res) => {
        onQtyChange(true);
      })
      .catch((err) => console.log(err));
  };

  const handleQtyChange = async () => {
    if (onQtyChange) onQtyChange(false);
    axios
      .patch(`${API}/user/updateQty`, {
        id: product?._id,
        userId: user?._id,
        qty: localQty,
      })
      .then((res) => {
        if (onQtyChange) onQtyChange(true);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    handleQtyChange();
  }, [localQty]);

  return (
    <div
      onClick={() => !isOrder && navigate(`/product/${product._id}`)}
      className="w-full border-l-4 border-l-indigo-500 px-4 py-4 bg-white hover:shadow-sm transition-shadow duration-200 rounded-md border border-gray-300"
    >
      <div
        className={`grid grid-cols-12 gap-4 items-center ${
          isOrder ? "select-none pointer-events-none" : "cursor - pointer"
        }`}
      >
        {/* Image & Info */}
        <div className="col-span-12 sm:col-span-6 flex items-center gap-4">
          <img
            src={product?.productImg[0]}
            alt={product?.productName}
            className="w-20 h-20 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-semibold text-gray-800 text-sm sm:text-base">
              {product?.productName}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
              {product?.description}
            </p>
          </div>
        </div>

        {/* Quantity */}
        <div className="col-span-4 sm:col-span-2 place-self-center mt-2 sm:mt-0">
          <div
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <div
              className={`flex items-center ${
                !isOrder && "border border-gray-300"
              } rounded-lg gap-1 overflow-hidden`}
            >
              <button
                onClick={() => setQty(Math.max(1, localQty - 1))}
                className={`px-3 py-1 text-gray-600 hover:bg-red-100 ${
                  isOrder && "hidden"
                }`}
              >
                -
              </button>
              <span className="grow text-center cursor-default ">
                {isOrder ? `Qty : ${localQty}` : localQty}
              </span>
              <button
                onClick={() => setQty(localQty + 1)}
                className={`px-3 py-1 text-gray-600 hover:bg-green-200 ${
                  isOrder && "hidden"
                }`}
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="col-span-4 sm:col-span-2 text-right mt-2 sm:mt-0">
          <span className="text-sm sm:text-base font-semibold text-blue-600">
            ₹ {product?.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Remove Button */}
        <div className="col-span-4 sm:col-span-2 text-right mt-2 sm:mt-0">
          {orderDate ? (
            <>
              <h1 className="text-sm sm:text-base">{deliveryDate}</h1>
            </>
          ) : (
            <button
              onClick={(e) => handleRemoveItem(e)}
              className="text-red-300 hover:text-red-600  font-medium"
            >
              <X size={19} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartCard;
