import React, { useEffect, useState, useSyncExternalStore } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  ArrowRight,
  BadgeCheck,
  Headphones,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { ProductSection, Card, Container } from "../components/Index";
import apiObj from "../../config";

const Home = () => {
  const [data, setData] = useState([]);
  const API = apiObj.apiString;

  useEffect(() => {
    axios(`${API}/product`).then((data) => setData(data.data.products));
  }, []);

  const extraLink = [
    {
      icon: <Rocket size={27} className="text-sky-600" />,
      heading: "Whole India delivery",
      desc: "free shiping above ₹499",
    },
    {
      icon: <BadgeCheck size={27} className="text-indigo-700" />,
      heading: "Money back garauntee",
      desc: "Return in 20 days",
    },
    {
      icon: <Headphones size={27} className="text-blue-500" />,
      heading: "Online Support",
      desc: "Any query contact us",
    },
    {
      icon: <ShieldCheck size={27} className="text-green-600" />,
      heading: "100% Secure",
      desc: "Providing security",
    },
  ];

  return (
    <Container>
      {/* Banner Section */}
      <section className="md:h-[80dvh] md:pl-2 min-h-[40dvh] w-full overflow-hidden md:my-3 flex flex-col md:flex-row justify-between gap-2 select-none">
        <div className="w-full  md:w-4/6 h-full relative ">
          <img
            src="/firstbanner.png"
            alt=""
            className="w-full h-full pointer-events-none xl:object-cover "
          />
          <NavLink
            to={"/shop"}
            className="sm:border-2 border-blue-400 rounded-sm cursor-pointer  font-medium text-blue-500 hover:bg-blue-600 hover:border-blue-600  hover:text-white text-[10px] sm:text-sm px-1   sm:px-2 sm:py-1 absolute bottom-1/3  sm:right-10 right-2 border-[1px]"
          >
            Shop Now
          </NavLink>
        </div>
        <div className=" grow px-2 flex md:flex-col gap-2 ">
          <div className="w-full  h-1/2">
            <img
              src="/secondbanner.png"
              alt=""
              className="w-full h-full pointer-events-none "
            />
          </div>
          <div className="w-full h-1/2">
            <img
              src="/thirdbanner.png"
              alt=""
              className="w-full h-full pointer-events-none "
            />
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <ProductSection products={data} heading="Treding Product" length={4} />

      {/* Second Banner Section */}
      <section className="sm:h-70 lg:w-6/7 mx-auto flex sm:flex-row flex-col gap-2 md:gap-10 px-8 my-8 overflow-hidden select-none pointer-events-none">
        <div className="w-full h-full">
          <img src="/s2banner.png" alt="" className="w-full h-full " />
        </div>
        <div className="w-full h-full hidden md:block">
          <img src="/s3banner.png" alt="" className="w-full h-full " />
        </div>
      </section>

      <section className="px-2   w-full min-h-25 flex justify-around items-center flex-wrap gap-4">
        {extraLink.map((link, i) => (
          <div
            className="flex flex-col  justify-center items-center gap-2"
            key={i}
          >
            {link.icon}
            <div className="flex flex-col justify-center items-center">
              <p className="text-xs sm:text-sm font-semibold font-['bahnschrift']">
                {link.heading}
              </p>
              <p className="font-medium text-xs text-zinc-500">{link.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* New Arrival Section */}
      <section className="my-10 px-2 xl:px-0 ">
        <div className="flex w-full justify-between  items-center">
          <h1 className="font-semibold font-['bahnschrift'] text-2xl text-zinc-800  ">
            New Arrival
          </h1>
          <div className=" ">
            <NavLink
              to="/shop"
              className="text-xs sm:text-sm  flex items-center gap-1 font-semibold  text-blue-600 "
            >
              View All <ArrowRight size={15} />
            </NavLink>
          </div>
        </div>
        <div className=" w-1/5 md:w-1/15 border my-1 mb-6 border-blue-500" />
        <div className="grid place-items-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data.map((product, i) => {
            if (i < 4) {
              const diffInDays = Math.floor(
                (new Date() - new Date(product.createdAt)) /
                  (1000 * 24 * 60 * 60)
              );
              const isNew = diffInDays < 5;
              return isNew && <Card key={product._id} product={product} />;
            }
          })}
        </div>
      </section>

      {/* Third Banner */}
      <section className="w-full h-25 md:h-65 px-2 my-2 md:my-8 select-none pointer-events-none">
        <img src="/lastbanner.jpg" alt="not found" className="w-full h-full" />
      </section>
    </Container>
  );
};

export default Home;
