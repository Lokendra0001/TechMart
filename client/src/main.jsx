import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./store/store.js";
import {
  About,
  AddProduct,
  AdminProducts,
  AdminProfile,
  Cart,
  Checkout,
  ContactUs,
  Home,
  Login,
  NotFoundPage,
  PaymentSuccess,
  PrivacyPolicy,
  ProductDetail,
  Profile,
  Shop,
  Signup,
} from "./pages/Index.jsx";

import { Provider } from "react-redux";
import { AdminPrivateRoute, UserPrivateRoute } from "./components/Index.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "/shop", element: <Shop /> },
      { path: "/contact", element: <ContactUs /> },
      { path: "/about", element: <About /> },
      { path: "/privacy-policy", element: <PrivacyPolicy /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      { path: "/product/:id", element: <ProductDetail /> },
      {
        path: "/profile",
        element: (
          <UserPrivateRoute>
            <Profile />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/cart",
        element: (
          <UserPrivateRoute>
            <Cart key={location.key} />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/cart/checkout",
        element: (
          <UserPrivateRoute>
            <Checkout />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/payment-successfull",
        element: (
          <UserPrivateRoute>
            <PaymentSuccess />
          </UserPrivateRoute>
        ),
      },
      {
        path: "/admin-products",
        element: (
          <AdminPrivateRoute>
            <AdminProducts />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/add-products",
        element: (
          <AdminPrivateRoute>
            <AddProduct />
          </AdminPrivateRoute>
        ),
      },
      {
        path: "/admin-profile",
        element: (
          <AdminPrivateRoute>
            <AdminProfile />
          </AdminPrivateRoute>
        ),
      },
    ],
  },
  { path: "*", element: <NotFoundPage /> },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
  // </StrictMode>
);
