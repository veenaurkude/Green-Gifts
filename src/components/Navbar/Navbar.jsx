import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsCart } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import styles from "./Navbar.module.css";
// import { Input } from "../Input/Input";
import { useCart } from "../../context/CartContext";
import AOS from "aos";
import "aos/dist/aos.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const { totalUniqueProducts } = useCart(); // Get total cart unique products count

  const [searchQuery, setSearchQuery] = useState("");

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query); // Pass the query to the parent component
  };

  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // AOS Init
  useEffect(() => {
    AOS.init({
      duration: 500,
      offset: 100,
      easing: "ease-in-out",
      delay: 0,
      once: true,
    });
  }, []);

  return (
    <>
      {/* Top Navbar Section  */}

      <section className={styles.topNavbar} data-aos="fade-up">
        <div className={styles.title}>
          <span>
            Free Delivery Above ₹499 | <Link to="/plants">Shop Now</Link>
          </span>
          <span>Free Shipping on Orders Over 500</span>
          <span>
            Customer Support : <a href="tel:+917028917456
">+917028917456
</a>
          </span>
        </div>
      </section>

      {/* Main Navbar */}
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

          {/* Search Bar */}
          <div className={styles.searchContainer}>
            <nav className={styles.navLinks}>
              {/* Other navigation links */}
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={handleInputChange}
                className={styles.searchInput}
              />
            </nav>
          </div>

          {/** Login **/}

          <nav
            className={styles.navIcon}
            onMouseEnter={() => setOpenDropdown("login")}
            onMouseLeave={() => setOpenDropdown(null)}
            // onClick={() => toggleDropdown("pots")}
          >
            <Link to="/login">
              <VscAccount />
            </Link>
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

              {totalUniqueProducts > 0 && (
                <span className={styles.cartBadge}>{totalUniqueProducts}</span>
              )}
            </Link>
          </div>
        </nav>

        <button className={styles.hamburger} onClick={toggleMobileMenu}>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
          <span className={styles.bar}></span>
        </button>
      </header>
    </>
  );
};

export default Navbar;
