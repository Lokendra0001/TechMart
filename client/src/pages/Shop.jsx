import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { Select, Card, Container } from "../components/Index";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import apiObj from "../config";

const Shop = () => {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagesPer, setPagesPer] = useState(8);
  const [noOfPages, setNoOfPages] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPrice, setSelectedPrice] = useState("Relevance");
  const search = useSelector((state) => state.search.val);
  const API = apiObj.apiString;

  useEffect(() => {
    setLoader(true);
    axios(`${API}/product`).then((data) => {
      setOriginalData(data.data.products);
      setLoader(false);
    });
  }, []);

  useEffect(() => {
    if (loader) return;

    let filtered = [...originalData];

    // Search filter
    if (search) {
      filtered = filtered.filter(
        (product) =>
          product.productName.toLowerCase().includes(search.toLowerCase()) ||
          product.category.toLowerCase().includes(search.toLowerCase()) ||
          product.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "All Category") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Sorting
    switch (selectedPrice) {
      case "Newest First":
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case "Price -- High to Low":
        filtered.sort((a, b) => b.price - b.discount - (a.price - a.discount));
        break;
      case "Price -- Low to High":
        filtered.sort((a, b) => a.price - a.discount - (b.price - b.discount));
        break;
    }

    // Save filtered data
    setFilteredData(filtered);

    // Pagination
    const firstIndex = (currentPage - 1) * pagesPer;
    const lastIndex = currentPage * pagesPer;
    const paginated = filtered.slice(firstIndex, lastIndex);

    setProducts(paginated);
    setNoOfPages(Math.ceil(filtered.length / pagesPer));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [originalData, selectedCategory, selectedPrice, currentPage, search]);

  useEffect(() => {
    setCurrentPage(1); // Reset page on filter change
  }, [selectedCategory, selectedPrice, search]);

  return (
    <Container className="bg-gray-50 min-h-screen ">
      {/* Header Section */}
      <div className="bg-white ">
        <div className="px-2 py-2 sm:py-2">
          <h1 className="text-2xl font-bold bg-gradient-to-bl from-indigo-600 to-blue-500 text-transparent bg-clip-text ">
            Products
          </h1>
          <p className="text-gray-500 font-semibold text-xs">
            {filteredData.length === 0 ? (
              "No Product Found!"
            ) : (
              <>
                (Showing results{" "}
                {Math.min(
                  (currentPage - 1) * pagesPer + 1,
                  filteredData.length
                )}{" "}
                - {Math.min(currentPage * pagesPer, filteredData.length)} of{" "}
                {filteredData.length} products)
              </>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="px-2 sm-2 py-2 flex flex-col sm:flex-row bg-white border-b border-gray-200 flex-wrap gap-4 sm:items-center sm:justify-between w-full sticky top-[10dvh] z-1">
        <button className="hidden sm:flex w-fit text-sm sm:text-md  items-center gap-2 px-2 py-1.5 bg-blue-600 text-white rounded-lg">
          <FiFilter />
          <span>Filters</span>
        </button>

        <div className="flex justify-around w-full sm:w-auto sm:gap-4 ">
          <Select
            name={"Category"}
            options={[
              "All Category",
              "Computer & Tablet",
              "Mobile & Accessories",
              "Tv & Home Theater",
              "Audio & HeadPhone",
              "Camera & Camcoders",
            ]}
            onChangeSomething={setSelectedCategory}
            classname="w-[150px]"
          />

          <Select
            name={"Sort By"}
            options={[
              "Relevance",
              "Newest First",
              "Price -- Low to High",
              "Price -- High to Low",
            ]}
            onChangeSomething={setSelectedPrice}
            classname="w-[150px]"
          />
        </div>
      </div>

      {/* Loader */}
      {loader ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          {/* No Products */}
          {!loader && filteredData.length === 0 ? (
            <div className="flex flex-col items-center justify-center min-h-[70dvh] w-full text-center px-4 space-y-4">
              <img
                src="https://assets-v2.lottiefiles.com/a/a464b720-5614-11ef-8779-c752757af61c/CK1suC217k.gif"
                alt="No Products"
                className="w-60 h-60 object-contain"
              />
              <h1 className="text-3xl font-extrabold text-blue-600">
                Oops! No Products Found
              </h1>
              <p className="text-gray-500 max-w-md text-sm">
                We couldn’t find any products that match your filters or search.
                Try adjusting your search terms or category.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 mb-10 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Refresh Page
              </button>
            </div>
          ) : (
            <>
              {/* Products Grid */}
              <div className="w-full sm:px-4 py-8">
                <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {products.map((product, index) => (
                    <Card key={index} product={product} />
                  ))}
                </div>
              </div>

              {/* Pagination */}
              <div className="my-5 flex  justify-center">
                <nav className="flex flex-wrap items-center gap-2 sm:gap-1">
                  {/* Prev */}
                  <button
                    onClick={() =>
                      currentPage > 1 && setCurrentPage((prev) => prev - 1)
                    }
                    className={`px-2 py-2.5 sm:py-1.5 rounded-md border border-gray-300 ${
                      currentPage === 1
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
                    } text-gray-600 transition-colors flex items-center gap-1`}
                  >
                    <ChevronLeft size={15} />
                    <span className="hidden sm:block">Prev</span>
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1 mx-1.5">
                    {noOfPages <= 4 ? (
                      Array.from({ length: noOfPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            className={`px-3 py-1 rounded-md border cursor-pointer border-gray-300 font-medium ${
                              currentPage === page
                                ? "bg-blue-600 text-white"
                                : "text-gray-700 hover:text-blue-600"
                            }`}
                            onClick={() => setCurrentPage(page)}
                          >
                            {page}
                          </button>
                        )
                      )
                    ) : (
                      <>
                        {Array.from({ length: 3 }, (_, i) => i + 1).map(
                          (page) => (
                            <button
                              key={page}
                              className={`px-3 py-1 rounded-md border cursor-pointer border-gray-300 font-medium ${
                                currentPage === page
                                  ? "bg-blue-600 text-white"
                                  : "text-gray-700 hover:text-blue-600"
                              }`}
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          )
                        )}
                        <span>....</span>
                      </>
                    )}
                  </div>

                  {/* Next */}
                  <button
                    onClick={() =>
                      currentPage < noOfPages &&
                      setCurrentPage((prev) => prev + 1)
                    }
                    className={`px-2 py-2.5 sm:py-1.5 rounded-md border border-gray-300 ${
                      currentPage === noOfPages
                        ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                        : "hover:bg-blue-100 hover:text-blue-500 cursor-pointer"
                    } text-gray-600 transition-colors flex items-center gap-1`}
                  >
                    <span className="hidden sm:block">Next</span>
                    <ChevronRight size={15} />
                  </button>
                </nav>
              </div>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default Shop;
