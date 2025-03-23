// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './AdminSidebar.module.css';
// import { FaTachometerAlt, FaThList, FaPlus, FaClipboardList, FaImages, FaShoppingCart, FaBars } from 'react-icons/fa';

// const AdminSidebar = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//   const toggleSidebar = () => {
//     setIsSidebarOpen((prev) => !prev);
//   };

//   return (
//     <>
//       {/* Hamburger Menu for Small Screens */}
//       <div className={styles.hamburger} onClick={toggleSidebar}>
//         <FaBars className={styles.hamburgerIcon} />
//       </div>

//       {/* Sidebar */}
//       <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
//         {/* <h2 className={styles.logo}>Green Gifts</h2> */}

//         <nav className={styles.navLinks}>
//           <Link to="/admin" className={styles.navItem} onClick={() => setIsSidebarOpen(false)}>
//             <FaTachometerAlt className={styles.icon} /> Dashboard
//           </Link>
// <div>
//   <div>Category</div>
// <Link to="/admin/plant-category" className={styles.navItem} onClick={() => setIsSidebarOpen(false)}>
//             <FaThList className={styles.icon} /> Plant Category
//           </Link>

//           <Link to="/admin/pot-category" className={styles.navItem} onClick={() => setIsSidebarOpen(false)}>
//             <FaThList className={styles.icon} /> Pot Category
//           </Link>
// </div>

//           <Link to="/admin/add-product" className={styles.navItem} onClick={() => setIsSidebarOpen(false)}>
//             <FaPlus className={styles.icon} /> Add Product
//           </Link>

//           <Link to="/admin/product-list" className={styles.navItem} onClick={() => setIsSidebarOpen(false)}>
//             <FaClipboardList className={styles.icon} /> Product List
//           </Link>

//           <Link to="/admin/offer-banner" className={styles.navItem} onClick={() => setIsSidebarOpen(false)}>
//             <FaImages className={styles.icon} /> Offer Banner
//           </Link>

//           <Link to="/admin/orders" className={styles.navItem} onClick={() => setIsSidebarOpen(false)}>
//             <FaShoppingCart className={styles.icon} /> Orders
//           </Link>
//         </nav>
//       </div>
//     </>
//   );
// };

// export default AdminSidebar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './AdminSidebar.module.css';
import {
  FaTachometerAlt,
  FaThList,
  FaPlus,
  FaClipboardList,
  FaImages,
  FaShoppingCart,
  FaBars,
  FaChevronDown,
} from 'react-icons/fa';
import { GiPorcelainVase } from 'react-icons/gi';
import { AiFillProduct } from 'react-icons/ai';
import { PiPlantFill } from 'react-icons/pi';

const AdminSidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isProductOpen, setIsProductOpen] = useState(false);
  const location = useLocation(); // To determine the active route

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const toggleCategory = () => {
    setIsCategoryOpen((prev) => !prev);
  };

  const toggleProduct = () => {
    setIsProductOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    // Only close the sidebar and dropdowns on mobile devices (below 768px)
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
      setIsCategoryOpen(false);
      setIsProductOpen(false);
    }
  };

  // Automatically open the relevant dropdown if one of its sub-links is active
  useEffect(() => {
    // Open Category dropdown if Plant Category or Pot Category is active
    if (location.pathname.includes('/admin/plant-category') || location.pathname.includes('/admin/pot-category')) {
      setIsCategoryOpen(true);
    } else {
      setIsCategoryOpen(false);
    }

    // Open Products dropdown if Product Add or Product List is active
    if (location.pathname.includes('/admin/add-product') || location.pathname.includes('/admin/product-list')) {
      setIsProductOpen(true);
    } else {
      setIsProductOpen(false);
    }
  }, [location.pathname]);

  return (
    <>
      {/* Hamburger Menu for Small Screens */}
      <div className={styles.hamburger} onClick={toggleSidebar}>
        <FaBars className={styles.hamburgerIcon} />
      </div>

      {/* Sidebar */}
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.sidebarOpen : ''}`}>
        <nav className={styles.navLinks}>
          <Link to="/admin" className={styles.navItem} onClick={handleLinkClick}>
            <FaTachometerAlt className={styles.icon} /> Dashboard
          </Link>

          {/* Category Dropdown */}
          <div className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={toggleCategory}>
              <span className={styles.dropdownLabel}>
                <FaThList className={styles.icon} /> Category
              </span>
              <FaChevronDown className={`${styles.chevron} ${isCategoryOpen ? styles.chevronOpen : ''}`} />
            </div>
            {isCategoryOpen && (
              <div className={styles.dropdownMenu}>
                <Link
                  to="/admin/plant-category"
                  className={styles.navItem}
                  onClick={handleLinkClick}
                >
                  <PiPlantFill className={styles.icon} /> Plant Category
                </Link>
                <Link
                  to="/admin/pot-category"
                  className={styles.navItem}
                  onClick={handleLinkClick}
                >
                  <GiPorcelainVase className={styles.icon} /> Pot Category
                </Link>
              </div>
            )}
          </div>

          {/* Products Dropdown */}
          <div className={styles.dropdown}>
            <div className={styles.dropdownToggle} onClick={toggleProduct}>
              <span className={styles.dropdownLabel}>
                <AiFillProduct className={styles.icon} /> Products
              </span>
              <FaChevronDown className={`${styles.chevron} ${isProductOpen ? styles.chevronOpen : ''}`} />
            </div>
            {isProductOpen && (
              <div className={styles.dropdownMenu}>
                <Link
                  to="/admin/add-product"
                  className={styles.navItem}
                  onClick={handleLinkClick}
                >
                  <FaPlus className={styles.icon} /> Product Add
                </Link>
                <Link
                  to="/admin/product-list"
                  className={styles.navItem}
                  onClick={handleLinkClick}
                >
                  <FaClipboardList className={styles.icon} /> Product List
                </Link>
              </div>
            )}
          </div>

          <Link to="/admin/offer-banner" className={styles.navItem} onClick={handleLinkClick}>
            <FaImages className={styles.icon} /> Offer Banner
          </Link>

          <Link to="/admin/orders" className={styles.navItem} onClick={handleLinkClick}>
            <FaShoppingCart className={styles.icon} /> Orders
          </Link>
        </nav>
      </div>
    </>
  );
};

export default AdminSidebar;