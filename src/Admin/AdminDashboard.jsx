// import React from 'react';
// import { Link } from 'react-router-dom';
// import styles from './Admin.module.css';

// const AdminDashboard = () => {
//   return (
//     <div className={styles.dashboardContainer}>
//       <h1>Admin Dashboard</h1>
//       <div className={styles.buttons}>
//         <h2>Hello Admin Dashboard</h2>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;


import React from "react";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css"; // Updated name for clarity

const AdminDashboard = () => {
  // Dummy data for now (replace with API calls later)
  const stats = {
    totalProducts: 25,
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
          <p className={styles.statValue}>{stats.totalProducts}</p>
          <Link to="/admin/product-list" className={styles.statLink}>View Products</Link>
        </div>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p className={styles.statValue}>{stats.totalOrders}</p>
          <Link to="/admin/orders" className={styles.statLink}>View Orders</Link>
        </div>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p className={styles.statValue}>₹{stats.totalRevenue.toLocaleString()}</p>
          <Link to="/admin/reports" className={styles.statLink}>View Reports</Link>
        </div>
        <div className={styles.statCard}>
          <h3>Pending Orders</h3>
          <p className={styles.statValue}>{stats.pendingOrders}</p>
          <Link to="/admin/orders" className={styles.statLink}>Manage Orders</Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.actionsSection}>
        <h2 className={styles.sectionTitle}>Quick Actions</h2>
        <div className={styles.actionButtons}>
          <Link to="/admin/add-product" className={styles.actionButton}>
            Add New Product
          </Link>
          <Link to="/admin/category" className={styles.actionButton}>
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