
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">Green Gifts</Link>
      </div>
      
      <nav className={`${styles.navLinks} ${isMobileMenuOpen ? styles.active : ''}`}>
        <Link to="/" onClick={toggleMobileMenu}>Home</Link>
        <Link to="/plants" onClick={toggleMobileMenu}>Plants</Link>
        <Link to="/seeds" onClick={toggleMobileMenu}>Seeds</Link>
        <Link to="/pots-planters" onClick={toggleMobileMenu}>Pots & Planters</Link>
        <Link to="/plant-care" onClick={toggleMobileMenu}>Plant Care</Link>
        <Link to="/gifting" onClick={toggleMobileMenu}>Gifting</Link>
        <Link to="/blog" onClick={toggleMobileMenu}>Blog</Link>
        <Link to="/offers" onClick={toggleMobileMenu}>Offers</Link>
        <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
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
