import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AdminSidebar.module.css';
import { FaTachometerAlt, FaThList, FaPlus, FaClipboardList, FaImages, FaShoppingCart } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>Admin Panel</h2>

      <nav className={styles.navLinks}>
        <Link to="/admin" className={styles.navItem}>
          <FaTachometerAlt className={styles.icon} /> Dashboard
        </Link>

        <Link to="/admin/category" className={styles.navItem}>
          <FaThList className={styles.icon} /> Add Category
        </Link>

        <Link to="/admin/add-product" className={styles.navItem}>
          <FaPlus className={styles.icon} /> Add Product
        </Link>

        <Link to="/admin/product-list" className={styles.navItem}>
          <FaClipboardList className={styles.icon} /> Product List
        </Link>

        <Link to="/admin/banner" className={styles.navItem}>
          <FaImages className={styles.icon} /> Banner
        </Link>

        <Link to="/admin/orders" className={styles.navItem}>
          <FaShoppingCart className={styles.icon} /> Orders
        </Link>
      </nav>
    </div>
  );
};

export default AdminSidebar;
