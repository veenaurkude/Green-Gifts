import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import TopNavbar from "../components/Navbar/TopNavbar";

const MainLayout = () => {
  return (
    <section className="flex flex-col min-h-screen">
      <TopNavbar/>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </section>
  );
};

export default MainLayout;
