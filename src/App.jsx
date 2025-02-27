
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useState } from "react";
// import './App.css'

import React from "react";
import Home from "./pages/Home/Home";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login/Login";
import CreateAccount from "./pages/Register/CreateAccount";


const App = () => {
  return (
    <>
      <Router>
        <Routes>

          {/* Main Layout Route */}
          <Route path="/" element={<MainLayout/>}>

            {/* Nested Routes */}
            <Route index element={<Home/>} />
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
