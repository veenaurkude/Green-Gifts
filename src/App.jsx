import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";

import React from "react";
// User Panel Import files
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login/Login";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import CreateAccount from "./pages/Auth/Register/CreateAccount";
import AccountPage from "./pages/Auth/AccountPage/AccountPage";
import Plants from "./pages/Plants/Plants";
import PotsPlanters from "./pages/PotsPlanters/PotsPlanters";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Offers from "./pages/Offers/Offers";
import Terrarium from "./pages/Terrarium/Terrarium";
import Cart from "./pages/Cart/Cart";

// Admin Panel Import files
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import PlantCategory from "./admin/Category/PlantCategory";
import PotCategory from "./admin/Category/PotCategory";
import AddProduct from "./admin/Product/AddProduct";
import ProductList from "./admin/Product/ProductList";
import OfferBanner from "./admin/Banner/OfferBanner";
import Order from "./admin/Order/Order";


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
// ✅ Improved Token Handling
const rawTokenData = localStorage.getItem("ecommerce_login");
let tokenData;
try {
  tokenData = rawTokenData && rawTokenData !== "undefined"
    ? JSON.parse(rawTokenData)
    : null;
} catch (error) {
  console.error("Invalid token data in localStorage:", rawTokenData);
  tokenData = null;
}

const token = tokenData?.jwtToken || ""; // Ensure token is always defined
console.log("Token in HomeBanner:", token); // For debugging

  return (
    <>
      <CartProvider>
        <AdminProvider>
          <Router>
            <Routes>
              {/* Main Layout Route */}

              <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                
                {/* Redirect here if not authenticated */}
                {/* <Route path="/" element={<Login />} />{" "}
                <Route
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      redirectPath="/"
                    />
                  }
                /> */}

                {/* Auth Route */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<CreateAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/account" element={<AccountPage/>} />

                {/* Plants and their collections Routes */}
                <Route path="/plants" element={<Plants />} />
                <Route path="/plants/:category" element={<Plants />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/pots-planters" element={<PotsPlanters />} />
                <Route path="/terrarium" element={<Terrarium />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/product-details" element={<ProductDetails/>} />
                <Route path="/cart" element={<Cart />} />
              </Route>

              {/* Admin Layout Route (Admin Side) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="/admin/plant-category" element={<PlantCategory/>} />
                <Route path="/admin/pot-category" element={<PotCategory/>} />
                <Route path="/admin/add-product" element={<AddProduct/>} />
                <Route path="/admin/product-list" element={<ProductList />} />
                <Route path="/admin/offer-banner" element={<OfferBanner/>} />
                <Route path="/admin/orders" element={<Order />} />
              </Route>
            </Routes>
          </Router>
        </AdminProvider>
      </CartProvider>
    </>
  );
};

export default App;
