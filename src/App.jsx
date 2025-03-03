
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";
// import './App.css'

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


const App = () => {
  return (
    <>
      <Router>
        <Routes>

          {/* Main Layout Route */}
          <Route path="/" element={<MainLayout/>}>

            {/* Nested Routes */}
            <Route index element={<Home/>} />
            <Route path="/plants" element={<Plants/>} />
            <Route path="/seeds" element={<Seeds/>} />
            <Route path="/pots-planters" element={<PotsPlanters/>} />
            <Route path="/plant-care" element={<PlantCare/>} />
            <Route path="/gifting" element={<Gifting/>} />
            <Route path="/blog" element={<Blog/>} />
            <Route path="/offers" element={<Offers/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<CreateAccount />} />
            
            {/* <Route path="product/:id" element={<ProductDetails />} /> */}
            
          </Route>
        </Routes>
      </Router>
    </>
  );
};

export default App;
