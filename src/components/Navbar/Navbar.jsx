import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import styles from "./Navbar.module.css";

import { useCart } from "../../context/CartContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { totalUniqueProducts } = useCart(); // Get total cart unique products count


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
        <nav className={styles.navItem}>
          <Link to="/">Home</Link>
        </nav>

        {/** Plants **/}
        <nav
          className={styles.navItem}
          onMouseEnter={() => setOpenDropdown("plants")}
          onMouseLeave={() => setOpenDropdown(null)}
          // onClick={() => toggleDropdown("plants")}
        >
          <Link to="/plants">Plants</Link>

          {openDropdown === "plants" && (
            <div
              className={styles.dropdownMenu}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Static Category Links */}
              <Link to="/plants/audio">Indoor Plants</Link>
              <Link to="/plants/gaming">Flowering Plants</Link>
              <Link to="/plants/mobile">Low Maintenance Plants</Link>
              <Link to="/plants/tv">Air Purifying Plants</Link>
            </div>
          )}
        </nav>

        

        {/** Pots & Planters **/}
        <nav
          className={styles.navItem}
          onMouseEnter={() => setOpenDropdown("pots-planters")}
          onMouseLeave={() => setOpenDropdown(null)}
          // onClick={() => toggleDropdown("pots")}
        >
          <Link to="/pots-planters">Pots & Planters</Link>
          {openDropdown === "pots-planters" && (
            <div
              className={styles.dropdownMenu}
              onClick={(e) => e.stopPropagation()}
            >
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
        </nav>

        

        {/** Terrarium **/}
        <nav className={styles.navItem}>
          <Link to="/terrarium">Terrarium</Link>
        </nav>

        {/** Offers **/}
        <nav className={styles.navItem}>
          <Link to="/offers">Offers</Link>
        </nav>

        {/** Login **/}

        <nav
          className={styles.navIcon}
          onMouseEnter={() => setOpenDropdown("login")}
          onMouseLeave={() => setOpenDropdown(null)}
          // onClick={() => toggleDropdown("pots")}
        >
          <Link to="/login"><VscAccount /></Link>
          {openDropdown === "login" && (
            <div
              className={styles.dropdownMenu}
              onClick={(e) => e.stopPropagation()}
            >
              <Link to="/profile">My Profile</Link>
              
            </div>
          )}
        </nav>

        {/* <nav className={styles.navIcon}>
          <Link to="/login">
            <VscAccount />
          </Link>
        </nav> */}

        {/* <div className={styles.navIcon}>
          <Link to="/cart">
            <BsCart />
          </Link>
        </div> */}

        <div className={styles.navIcon}>
        <Link to="/cart" className={styles.cartLink}>
            <BsCart />
            
            {totalUniqueProducts  > 0 && <span className={styles.cartBadge}>{totalUniqueProducts }</span>}
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
