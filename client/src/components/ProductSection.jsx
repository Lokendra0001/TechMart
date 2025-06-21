import React from "react";
import { Card } from "./Index";
import { NavLink } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const ProductSection = ({ heading, products, length, isAdmin = false }) => {
  return (
    <div>
      <section className="my-10 px-2 xl:px-0 ">
        <div className="flex w-full justify-between  items-center">
          <h1 className="font-semibold font-['bahnschrift'] text-2xl text-zinc-800  ">
            {heading}
          </h1>
          <div className=" ">
            <NavLink
              to="/shop"
              className="text-xs sm:text-sm  flex items-center gap-1 font-semibold  text-blue-600 "
            >
              {!isAdmin && (
                <p className="flex items-center gap-1">
                  View All
                  {<ArrowRight size={15} />}
                </p>
              )}
            </NavLink>
          </div>
        </div>
        {!isAdmin && (
          <div className=" w-1/5 md:w-1/15 border my-1 mb-6 border-blue-500" />
        )}
        <div className="grid place-items-center gap-4 sm:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product, i) => {
            if (length) {
              if (i < length)
                return (
                  <Card
                    key={product._id}
                    product={product}
                    isAdmin={isAdmin}
                    index={i}
                  />
                );
            } else {
              return (
                <Card
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                  index={i}
                />
              );
            }
          })}
        </div>
      </section>
    </div>
  );
};

export default ProductSection;
