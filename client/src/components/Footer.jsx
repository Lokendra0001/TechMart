import { Facebook, Twitter, Instagram, Linkedin, Zap } from "lucide-react";
import { NavLink } from "react-router-dom";

const quickLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Deals", path: "/deals" },
  { label: "About Us", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const categories = [
  { label: "Smartphones", path: "/category/smartphones" },
  { label: "Laptops", path: "/category/laptops" },
  { label: "Accessories", path: "/category/accessories" },
  { label: "Smart Watches", path: "/category/smart-watches" },
  { label: "Gaming", path: "/category/gaming" },
];

const Footer = () => {
  return (
    <footer className="bg-white text-gray-800 pt-5 pb-2 border-t border-gray-200">
      <div className="container mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-4">
          {/* About */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-blue-500 mb-3 bg-clip-text text-transparent cursor-pointer flex items-center">
              <Zap size={24} className="text-blue-600 mr-2" />
              TechMart
            </h3>
            <p className="text-gray-600 mb-4">
              Your one-stop destination for the latest gadgets and tech
              accessories at unbeatable prices.
            </p>
            <div className="flex gap-4">
              <Facebook className="text-gray-600 hover:text-blue-700 cursor-pointer" />
              <Twitter className="text-gray-600 hover:text-sky-700 cursor-pointer" />
              <Instagram className="text-gray-600 hover:text-indigo-600 cursor-pointer" />
              <Linkedin className="text-gray-600 hover:text-sky-500 cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 w-fit pb-1  text-blue-600">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map(({ label, path }) => (
                <li key={label}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600"
                      }  hover:text-blue-500 transition`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold border-b-2 border-blue-500 w-fit pb-1 mb-4 text-blue-600">
              Categories
            </h3>
            <ul className="space-y-2">
              {categories.map(({ label, path }) => (
                <li key={label}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      `${
                        isActive
                          ? "text-blue-600 font-semibold"
                          : "text-gray-600"
                      }  hover:text-blue-500 transition`
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 border-b-2 border-blue-500 w-fit pb-1  text-blue-600">
              Contact Us
            </h3>
            <address className="not-italic text-gray-600 space-y-2 text-sm">
              <p>123 Tech Street, Surat</p>
              <p>Gujarat 394210, India</p>
              <p>Email: rakesh@techmart.com</p>
              <p>Phone: +91 98765 43210</p>
            </address>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 pt-6">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tech Mart. All rights reserved.
          </p>
          <div className="flex gap-4 text-sm">
            {["Privacy Policy", "Shipping Policy"].map((text) => (
              <NavLink
                key={text}
                to="#"
                className="text-gray-600 font-semibold hover:text-blue-600 transition"
              >
                {text}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
