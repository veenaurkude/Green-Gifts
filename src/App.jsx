import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import React from "react";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/Register/CreateAccount";
import Plants from "./pages/Plants/Plants";
import Seeds from "./pages/Seeds/Seeds";
import PotsPlanters from "./pages/PotsPlanters/PotsPlanters";
import PlantCare from "./pages/PlantCare/PlantCare";
import Gifting from "./pages/Gifting/Gifting";
import Blog from "./pages/Blog/Blog";
import Offers from "./pages/Offers/Offers";
import Terrarium from "./pages/Terrarium/Terrarium";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";


const App = () => {
  return (
    <>
    <CartProvider>
      <Router>
        <Routes>
          {/* Main Layout Route */}
          <Route path="/" element={<MainLayout />}>
            
            <Route index element={<Home />} />

            {/* Plants and their collections Routes */}
            <Route path="/plants" element={<Plants />} />
            <Route path="/plants/:category" element={<Plants />} />
            <Route path="/product/:id" element={<ProductDetails />} />

            <Route path="/seeds" element={<Seeds />} />
            <Route path="/pots-planters" element={<PotsPlanters />} />
            <Route path="/plant-care" element={<PlantCare />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/gifting" element={<Gifting />} />
            <Route path="/terrarium" element={<Terrarium/>} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreateAccount />} />
            <Route path="/product-details" element={<ProductDetails/>} />
            <Route path="/cart" element={<Cart/>} />
            
          </Route>
        </Routes>
      </Router>
      </CartProvider>
    </>
  );
};

export default App;
