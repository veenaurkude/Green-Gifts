import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import config from "../config/apiconfig";
import axios from "axios";

const AdminDashboard = () => {
  const [totalProducts, setTotalProducts] = useState(0); // Total products
  const [totalVariants, setTotalVariants] = useState(0); // Total products with variants

  const [totalOrders, setTotalOrders] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalReturns, setTotalReturns] = useState(0);
  const [totalRefunds, setTotalRefunds] = useState(0);
  const [totalDiscounts, setTotalDiscounts] = useState(0);

  // Total Products
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await axios.get(`${config.BASE_URL}/api/AllProduct`);
  //       setTotalProducts(res.data.length); // Assuming the API returns an array of products
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // Total Variant Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${config.BASE_URL}/api/AllProduct`);
        const allProducts = res.data;

        // Count total number of variant IDs
        const variantCount = allProducts.reduce((total, product) => {
          return total + (product.variants?.length || 0);
        }, 0);

        setTotalVariants(variantCount);
      } catch (error) {
        console.error("Error fetching product variants:", error);
      }
    };

    fetchProducts();
  }, []);

  // Dummy data for now (replace with API calls later)
  const stats = {
    totalOrders: 150,
    totalRevenue: 12500,
    pendingOrders: 8,
  };

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      {/* <header className={styles.header}>
        <h1 className={styles.title}>Green Gifts Admin Dashboard</h1>
        <p className={styles.subtitle}>Welcome, Admin! Manage your eco-friendly empire.</p>
      </header> */}

      {/* Stats Cards */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <h3>Total Products</h3>
          {/* Total No. of Products without Varient */}
          {/* <p className={styles.statValue}>{totalProducts}</p> */}

          {/* Total No. of Products with Varient */}
          <p className={styles.statValue}>{totalVariants}</p>

          <Link to="/admin/product-list" className={styles.statLink}>
            View Products
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p className={styles.statValue}>{stats.totalOrders}</p>
          <Link to="/admin/orders" className={styles.statLink}>
            View Orders
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p className={styles.statValue}>
            ₹{stats.totalRevenue.toLocaleString()}
          </p>
          <Link to="/admin/reports" className={styles.statLink}>
            View Reports
          </Link>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Orders</h3>
          <p className={styles.statValue}>{stats.pendingOrders}</p>
          <Link to="/admin/orders" className={styles.statLink}>
            Manage Orders
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionButtons}>
          <Link to="/admin/add-product" className={styles.actionButton}>
            Add New Product
          </Link>
          <Link to="/admin/plant-category" className={styles.actionButton}>
            Manage Categories
          </Link>
          <Link to="/admin/orders" className={styles.actionButton}>
            View All Orders
          </Link>
        </div>
      </div>

      {/* Placeholder for Chart or Recent Activity */}
      <div className={styles.chartSection}>
        <h2 className={styles.sectionTitle}>Sales Overview</h2>
        <div className={styles.chartPlaceholder}>
          <p>Chart coming soon! (e.g., Sales over time)</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
