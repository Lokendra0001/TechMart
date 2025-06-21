import { ChevronLeft, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FaTag } from "react-icons/fa";
import { Card } from "../components/Index";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../store/slices/authSlice";
import { handleErrorMsg, handleSuccessMsg } from "../utils/ToastFunc";
import apiObj from "../config";

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [showMoreProducts, setShowMoreProducts] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const admin = useSelector((state) => state.admin.admin);
  const dispatch = useDispatch();
  const API = apiObj.apiString;

  useEffect(() => {
    axios
      .get(`${API}/product/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product:", err));
    axios
      .get(`${API}/product/`)
      .then((res) => setShowMoreProducts(res.data.products))
      .catch((err) => console.error("Error fetching product:", err));
  }, [id]);

  const handleAddToCart = async (id) => {
    try {
      const res = await axios.patch(`${API}/user/addToCart`, {
        id,
        email: user?.email,
      });
      dispatch(addUser(res.data.user));
      handleSuccessMsg(res.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const discountedPrice = product?.price - product?.discount;

  if (!product) {
    return <div className="p-10 text-center">Loading product...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="py-2 sm:py-4 px-6 sticky top-[10dvh] z-20 ">
        <button
          onClick={() => navigate(-1)}
          className="flex  items-center font-medium backdrop-blur-xs px-2 text-blue-500 hover:text-blue-700 cursor-pointer"
        >
          <ChevronLeft size={20} />
          Back
        </button>
      </header>

      {/* Main Product Section */}
      <main className="container mx-auto px-4  py-3">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Images */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-xl shadow-xs  mb-6">
              <img
                src={product?.productImg[currentImage]}
                alt={product?.productName}
                className="w-full h-60 sm:h-90  object-contain"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {product?.productImg.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-20 h-13 sm:20 rounded-md overflow-hidden   border-2 ${
                    currentImage === index
                      ? "border-blue-500"
                      : "border-[1.5px] border-gray-200"
                  }`}
                >
                  <img
                    src={img}
                    alt=""
                    className="w-full h-full object-contain "
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="lg:w-1/2 ">
            <div className="bg-white rounded-xl shadow-sm p-4 ">
              <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product?.productName}
                </h1>
                <div className="flex items-center">
                  <div className="flex text-indigo-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        fill={i + 1 < product.rating ? "currentColor" : "none"}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({0 || 23}) Reviews</span>
                </div>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex gap-2 items-end">
                  <p className="text-3xl font-bold text-blue-600">
                    ₹{discountedPrice.toLocaleString("en-IN")}
                  </p>
                  {product.discount > 0 && (
                    <p className="text-lg text-gray-500 line-through">
                      ₹{product.price.toLocaleString("en-IN")}
                    </p>
                  )}
                </div>
                {product.discount > 0 && (
                  <p className="text-green-600 font-medium mt-1 text-sm sm:text-base">
                    Save{" "}
                    <span className="font-semibold">
                      ₹{product.discount.toLocaleString("en-IN")}
                    </span>
                    <span className="ml-2 inline-flex items-center gap-1 px-2.5 py-1 bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-xs sm:text-sm rounded-full shadow-md animate-pulse hover:animate-none transition-all">
                      <FaTag className="text-yellow-400 text-sm" />
                      {Math.round((product.discount * 100) / product.price)}%
                      OFF
                    </span>
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="mb-4">
                <h2 className="text-xl font-medium text-gray-900 mb-2">
                  Description
                </h2>
                <pre className="font-sans font-medium text-sm text-gray-600 w-full overflow-hidden text-wrap">
                  {product.description}
                </pre>
              </div>

              {/* Add to Cart */}
              {!admin && (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      if (!user) {
                        return handleErrorMsg(
                          "Please Login First to add product"
                        );
                      }
                      handleAddToCart(product?._id);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-16 rounded-lg font-medium flex items-center justify-center transition-colors"
                  >
                    <ShoppingCart className="mr-2" />
                    Add to Cart
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Related Section */}
      <section className=" px-4 pt-7 sm:py-12">
        <h2 className="container mx-auto text-2xl font-bold text-gray-900 mb-6">
          You May Also Like
        </h2>

        <div className="w-full  sm:py-8 pb-8">
          <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {showMoreProducts.map(
              (prod, index) =>
                product.category === prod.category &&
                product.productName != prod.productName && (
                  <Card key={index} product={prod} />
                )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetail;
