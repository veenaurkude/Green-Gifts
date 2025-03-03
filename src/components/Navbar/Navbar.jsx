// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Navbar.module.css';

// const Navbar = () => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <header className={styles.navbar}>
//       <div className={styles.logo}>
//         <Link to="/">Green Gifts</Link>
//       </div>

//       <nav className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
//         <Link to="/" onClick={toggleMobileMenu}>Home</Link>
//         <Link to="/plants" onClick={toggleMobileMenu}>Plants</Link>
//         <Link to="/seeds" onClick={toggleMobileMenu}>Seeds</Link>
//         <Link to="/pots-planters" onClick={toggleMobileMenu}>Pots & Planters</Link>
//         <Link to="/plant-care" onClick={toggleMobileMenu}>Plant Care</Link>
//         <Link to="/gifting" onClick={toggleMobileMenu}>Gifting</Link>
//         <Link to="/blog" onClick={toggleMobileMenu}>Blog</Link>
//         <Link to="/offers" onClick={toggleMobileMenu}>Offers</Link>
//         <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
//       </nav>

//       <button className={styles.hamburger} onClick={toggleMobileMenu}>
//         <span className={styles.bar}></span>
//         <span className={styles.bar}></span>
//         <span className={styles.bar}></span>
//       </button>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Green Gifts</Link>
      </div>

      <nav
        className={`${styles.navLinks} ${
          isMobileMenuOpen ? styles.active : ""
        }`}
      >
        {/** Home **/}
        <div className={styles.navItem} onClick={() => toggleDropdown("home")}>
          <Link to="/">Home</Link>
          {openDropdown === "home" && (
            <div className={styles.dropdownMenu}>
              <Link to="/">Featured</Link>
              <Link to="/">New Arrivals</Link>
            </div>
          )}
        </div>

        {/** Plants **/}
        <div
          className={styles.navItem}
          onClick={() => toggleDropdown("plants")}
        >
          <Link to="/plants">Plants</Link>
          {openDropdown === "plants" && (
            <div className={styles.dropdownMenu}>
              <Link to="/">Indoor Plants</Link>
              <Link to="/">Outdoor Plants</Link>
              <Link to="/">Flowering Plants</Link>
              <Link to="/">Low Maintenance Plants</Link>
              <Link to="/">Air Purifying Plants</Link>
              <Link to="/">Low Light Plants</Link>
              <Link to="/">Hanging Plants</Link>
              <Link to="/">Medicinal & Aromatic Plants</Link>
              <Link to="/">Fruit Plants</Link>
              <Link to="/">Bundles</Link>

            </div>
          )}
        </div>

        {/** Seeds **/}
        <div className={styles.navItem} onClick={() => toggleDropdown("seeds")}>
          <Link to="/seeds">Seeds</Link>
          {openDropdown === "seeds" && (
            <div className={styles.dropdownMenu}>
              <Link to="/">Flower Seeds</Link>
              <Link to="/">Vegetable Seeds</Link>
              <Link to="/">Fruit Seeds</Link>
              <Link to="/">Herb Seeds</Link>
              <Link to="/">Microgreen Seeds </Link>
              <Link to="/">Tree & Grass Seeds</Link>
              <Link to="/">Flower Bulbs</Link>
            </div>
          )}
        </div>

        {/** Pots & Planters **/}
        <div className={styles.navItem} onClick={() => toggleDropdown("pots")}>
          <Link to="/pots-planters">Pots & Planters</Link>
          {openDropdown === "pots-planters" && (
            <div className={styles.dropdownMenu}>
              <Link to="/">Plastic Pots</Link>
              <Link to="/">Ceramic Pots</Link>
              <Link to="/">Metal Pots</Link>
              <Link to="/">Hanging Pots</Link>
              <Link to="/">Wooden Planters</Link>
              <Link to="/">Basket Planters</Link>
              <Link to="/">Plant Stands</Link>
              <Link to="/">Seedling Trays</Link>
            </div>
          )}
        </div>

        {/** Plant Care **/}
        <div
          className={styles.navItem}
          onClick={() => toggleDropdown("plant-care")}
        >
          <Link to="/plant-care">Plant Care</Link>
          {openDropdown === "plant-care" && (
            <div className={styles.dropdownMenu}>
              <Link to="/">Fertilizers</Link>
              <Link to="/">Gardening Tools</Link>
            </div>
          )}
        </div>

        {/** Gifting **/}
        <div
          className={styles.navItem}
          onClick={() => toggleDropdown("gifting")}
        >
          <Link to="/gifting">Gifting</Link>
          {openDropdown === "gifting" && (
            <div className={styles.dropdownMenu}>
              <Link to="/">Birthday Gifts</Link>
              <Link to="/">Anniversary Gifts</Link>
            </div>
          )}
        </div>

        {/** Blog **/}
        <div className={styles.navItem} onClick={() => toggleDropdown("home")}>
          <Link to="/blog">Blog</Link>
        </div>

        {/** Offers **/}
        <div className={styles.navItem} onClick={() => toggleDropdown("home")}>
          <Link to="/offers">Offers</Link>
        </div>

        {/** Login **/}
        <div className={styles.navItem} onClick={() => toggleDropdown("login")}>
          <Link to="/login">
          <VscAccount/>
          </Link>
          
        </div>

        <div className={styles.navItem} onClick={() => toggleDropdown("login")}>
        <Link to="/cart">
        <BsCart/>
        </Link>
        </div>


      </nav>

      <button className={styles.hamburger} onClick={toggleMobileMenu}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
    </header>
  );
};

export default Navbar;
