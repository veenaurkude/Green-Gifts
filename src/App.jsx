import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AdminProvider } from "./context/AdminContext";

import React from "react";
// User Panel Import files
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Auth/Login/Login";
import CreateAccount from "./pages/Auth/Register/CreateAccount";
import Plants from "./pages/Plants/Plants";
import PotsPlanters from "./pages/PotsPlanters/PotsPlanters";
import Offers from "./pages/Offers/Offers";
import Terrarium from "./pages/Terrarium/Terrarium";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";

// Admin Panel Import files
import AdminDashboard from "./admin/AdminDashboard";
import AddProduct from "./Admin/Product/AddProduct";
import ProductList from "./Admin/Product/ProductList";
import AdminLayout from "./layouts/AdminLayout";
import ForgotPassword from "./pages/Auth/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Auth/ResetPassword/ResetPassword";
import Category from "./Admin/Category/Category";
import SingleProductDetail from "./SingleProductDetail";
import AddBanner from "./Admin/Banner/AddBanner";
import Order from "./Admin/Order/Order";
import PrivateRoute from "./utils/PrivateRoute";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
    setIsAuthenticated(!!token); // True if token exists, false otherwise
  }, []);

  return (
    <>
      <CartProvider>
        <AdminProvider>
          <Router>
            <Routes>
              {/* Main Layout Route */}

              <Route path="/" element={<MainLayout />}>
                {/* <Route index element={<Home />} /> */}
                
                {/* Redirect here if not authenticated */}
                <Route path="/" element={<Login />} />{" "}
                <Route
                  element={
                    <PrivateRoute
                      isAuthenticated={isAuthenticated}
                      redirectPath="/"
                    />
                  }
                />

                {/* Auth Route */}
                {/* <Route path="/login" element={<Login />} /> */}
                <Route path="/register" element={<CreateAccount />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                {/* Plants and their collections Routes */}
                <Route path="/plants" element={<Plants />} />
                <Route path="/plants/:category" element={<Plants />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route
                  path="/single_product/:id"
                  element={<SingleProductDetail />}
                />
                <Route path="/pots-planters" element={<PotsPlanters />} />
                <Route path="/terrarium" element={<Terrarium />} />
                <Route path="/offers" element={<Offers />} />
                <Route path="/product-details" element={<ProductDetails />} />
                <Route path="/cart" element={<Cart />} />
              </Route>

              {/* Admin Layout Route (Admin Side) */}
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="/admin/category" element={<Category />} />
                <Route path="/admin/add-product" element={<AddProduct />} />
                <Route path="/admin/product-list" element={<ProductList />} />
                <Route path="/admin/banner" element={<AddBanner />} />
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
