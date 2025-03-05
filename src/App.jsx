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
import IndoorPlants from "./pages/Plants/Collections/IndoorPlants";
import FloweringPlants from "./pages/Plants/Collections/FloweringPlants";
import LowMaintainPlants from "./pages/Plants/Collections/LowMaintainPlants";
import AirPurifyPlants from "./pages/Plants/Collections/AirPurifyPlants";
import LowLightPlants from "./pages/Plants/Collections/LowLightPlants";
import MediAroPlants from "./pages/Plants/Collections/MediAroPlants";
import HangingPlants from "./pages/Plants/Collections/HangingPlants";
import PetFriendlyPlants from "./pages/Plants/Collections/PetFriendlyPlants";
import FruitPlants from "./pages/Plants/Collections/FruitPlants";
import Bundles from "./pages/Plants/Collections/Bundles";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {/* Main Layout Route */}
          <Route path="/" element={<MainLayout />}>
            {/* Nested Routes */}
            <Route index element={<Home />} />

            {/* Plants and their collections Routes */}
            <Route path="/plants" element={<Plants />} />

            <Route path="/plants/:category" element={<Plants />} />
            {/* <Route path="/plants-collections/indoor-plants" element={<IndoorPlants/>} />
            <Route path="/plants-collections/flowering-plants" element={<FloweringPlants/>} />
            <Route path="/plants-collections/low-maintain-plants" element={<LowMaintainPlants/>} />
            <Route path="/plants-collections/air-purify-plants" element={<AirPurifyPlants/>} />
            <Route path="/plants-collections/low-light-plants" element={<LowLightPlants/>} />
            <Route path="/plants-collections/hanging-plants" element={<HangingPlants/>} />
            <Route path="/plants-collections/medical-aromatic-plants" element={<MediAroPlants/>} />
            <Route path="/plants-collections/pet-friendly-plants" element={<PetFriendlyPlants/>} />
            <Route path="/plants-collections/fruit-plants" element={<FruitPlants/>} />
            <Route path="/plants-collections/bundles" element={<Bundles/>} /> */}

            <Route path="/seeds" element={<Seeds />} />
            <Route path="/pots-planters" element={<PotsPlanters />} />
            <Route path="/plant-care" element={<PlantCare />} />
            <Route path="/gifting" element={<Gifting />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/offers" element={<Offers />} />
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
