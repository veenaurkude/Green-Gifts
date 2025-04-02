import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/apiconfig";
import styles from "./ProductList.module.css";
import axios from "axios";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [productIdToDelete, setProductIdToDelete] = useState(null); // State for product ID to delete

  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError(
          "Error fetching products: " +
            (err.response?.data?.message || err.message)
        );
        setLoading(false);
      }
    };

    if (!token) {
      setError("Please log in to view products.");
      setLoading(false);
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [token, navigate]);

  // Update Product
  const handleUpdate = (id) => {
    navigate(`/update-product/${id}`);
  };

  // Open Modal for Delete Confirmation
  const openDeleteModal = (id) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  // Delete Product
  const handleDelete = async () => {
    if (!productIdToDelete) return;

    try {
      const response = await axios.delete(
        `${config.BASE_URL}/api/deleteProduct/${productIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Delete response:", response);

      if (response.status === 200 || response.status === 204) {
        toast.success("Product and its variants deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productIdToDelete)
        );
      }
    } catch (error) {
      console.error("Delete error:", error.response || error);
      toast.error(
        `Failed to delete product: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      closeModal(); // Close the modal after the action
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className={styles.loading}>Loading products...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.productListContainer}>
      <div className={styles.header}>
        <div>
          <Input
            type="text"
            placeholder="Search Product"
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <Button
            onClick={() => navigate("/admin/add-product")}
          >
            <span className={styles.buttonContent}>
              <FaPlus className={styles.buttonIcon} />
              Add Product
            </span>
          </Button>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <table className={styles.productTable}>
          <thead>
            <tr>
              <th>PRODUCTS</th>
              <th>CATEGORY</th>
              <th>Color</th>
              <th>Size</th>
              <th>PRICE</th>
              <th>QTY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) =>
              product.variants.map((variant) => (
                <tr key={variant.id}>
                  <td className={styles.productInfo}>
                    <img
                      src={variant.imageUrls[0]}
                      alt={`${product.name} ${variant.color}`}
                      className={styles.productImage}
                    />
                    <p className={styles.productTitle}>{product.name}</p>
                  </td>
                  <td>
                    <span className={styles.categoryTag}>
                      {product.category}
                    </span>
                  </td>
                  <td>{variant.color}</td>
                  <td>{variant.size}</td>
                  <td>₹{variant.price}</td>
                  <td>{variant.qty}</td>
                  <td className={styles.actions}>
                    <Button onClick={() => handleUpdate(product.id)}>
                      Edit
                    </Button>
                    <Button
                      className={styles.deleteButton}
                      onClick={() => openDeleteModal(product.id)} // Open modal instead of window.confirm
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this product and its variants? This action cannot be undone."
      />
    </div>
  );
};

export default ProductList;



// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import config from "../../config/apiconfig";
// import styles from "./ProductList.module.css";
// import axios from "axios";
// import Button from "../../components/Button/Button";
// import { Input } from "../../components/Input/Input";
// import { FaPlus } from "react-icons/fa";
// import { toast } from "react-toastify"; // Import toast


// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const navigate = useNavigate();
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   // Fetch Products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError(
//           "Error fetching products: " +
//             (err.response?.data?.message || err.message)
//         );
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [token]);

//   // Update Product
//   const handleUpdate = async (id) => {
//     navigate(`/update-product/${id}`);
//   };

//   // Delete Product
//   const handleDelete = async (id) => {
//     if (
//       window.confirm(
//         "Are you sure you want to delete this product and its variants?"
//       )
//     ) {
//       try {
//         const response = await axios.delete(
//           `${config.BASE_URL}/api/deleteProduct/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("Delete response:", response); // Log response for debugging

//         if (response.status === 200 || response.status === 204) {
//           alert("Product and its variants deleted successfully!");
//           setProducts((prevProducts) =>
//             prevProducts.filter((product) => product.id !== productId)
//           );
//         }
//       } catch (error) {
//         console.error("Delete error:", error.response || error);
//         alert(
//           `Failed to delete product: ${
//             error.response?.data?.message || error.message
//           }`
//         );
//       }
//     }
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filtered products based on search term
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <p>Loading products...</p>;
//   }

//   return (
//     <div className={styles.productListContainer}>
//       <div className={styles.header}>
//         <div>
//           <Input
//             type="text"
//             placeholder="Search Product"
//             className={styles.searchInput}
//             value={searchTerm}
//             onChange={handleSearchChange}
//           />
//         </div>

//         <div>
//           <Button
//             // className={styles.addButton}
//             onClick={() => navigate("/admin/add-product")} // Navigate to add product page
//           >
//             <span className={styles.buttonContent}>
//               <FaPlus className={styles.buttonIcon} />
//               Add Product
//             </span>
//           </Button>
//         </div>
//       </div>

//       {filteredProducts.length === 0 ? (
//         <p>No products available.</p>
//       ) : (
//         <table className={styles.productTable}>
//           <thead>
//             <tr>
//               {/* <th>Sr.No.</th> */}
//               <th>PRODUCTS</th>
//               <th>CATEGORY</th>
//               <th>Color</th>
//               <th>Size</th>
//               <th>PRICE</th>
//               <th>QTY</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((product) =>
//               product.variants.map((variant) => (
//                 <tr key={variant.id}>
//                   {/* <td>{variant.id}</td> */}
//                   <td className={styles.productInfo}>
//                     <img
//                       src={variant.imageUrls[0]}
//                       alt={`${product.name} ${variant.color}`}
//                       className={styles.productImage}
//                     />
//                     <p className={styles.productTitle}>{product.name}</p>
//                   </td>
//                   <td>
//                     <span className={styles.categoryTag}>
//                       {product.category}
//                     </span>
//                   </td>
//                   <td>{variant.color}</td>
//                   <td>{variant.size}</td>
//                   <td>₹{variant.price}</td>
//                   <td>{variant.qty}</td>
//                   <td className={styles.actions}>
//                     <Button onClick={() => handleUpdate(product.id)}>
//                       Edit
//                     </Button>
//                     <Button
//                       className={styles.deleteButton}
//                       onClick={() => handleDelete(product.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ProductList;

// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import config from '../../config/apiconfig';
// import styles from './ProductList.module.css';
// import axios from 'axios';
// import Button from '../../components/Button/Button';
// import { Input } from '../../components/Input/Input';

// const ProductList = () => {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   const navigate = useNavigate();
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   // Fetch products
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setProducts(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching products: ' + (err.response?.data?.message || err.message));
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, [token]);

//   // Product delete
//   const handleDelete = async (id) => {
//     try {
//       const response = await axios.delete(`${config.BASE_URL}/api/deleteProduct/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type" : "application/json"
//         },
//       });

//       console.log('Delete response:', response); // Log response for debugging

//       if (response.status === 200 || response.status === 204) {
//         alert("Product deleted successfully!");
//         setProducts(); // Refresh products after deletion
//       }
//     } catch (error) {
//       console.error("Delete error:", error.response || error);
//       alert(`Failed to delete product: ${error.response?.data?.message || error.message}`);
//     }
//   };

//   // Handle search input change
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // Filtered products based on search term
//   const filteredProducts = products.filter((product) =>
//     product.name.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading) {
//     return <p>Loading products...</p>;
//   }

//   return (
//     <div className={styles.productListContainer}>
//       <div className={styles.header}>
//         <Input
//           type="text"
//           placeholder="Search Product"
//           className={styles.searchInput}
//           value={searchTerm}
//           onChange={handleSearchChange}
//         />
//         <div className={styles.headerActions}>
//           <Button
//             // className={styles.addButton}
//             onClick={() => navigate('/admin/add-product')} // Navigate to add product page
//           >
//             Add Product
//           </Button>
//         </div>
//       </div>

//       {filteredProducts.length === 0 ? (
//         <p>No products available.</p>
//       ) : (
//         <table className={styles.productTable}>
//           <thead>
//             <tr>
//               <th>Sr.No.</th>
//               <th>PRODUCT</th>
//               <th>CATEGORY</th>
//               <th>Color</th>
//               <th>Size</th>
//               <th>PRICE</th>
//               <th>QTY</th>
//               <th>ACTIONS</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredProducts.map((product) =>
//               product.variants.map((variant) => (
//                 <tr key={variant.id}>
//                   <td>{variant.id}</td>
//                   <td className={styles.productInfo}>
//                     <img
//                       src={variant.imageUrls[0]}
//                       alt={`${product.name} ${variant.color}`}
//                       className={styles.productImage}
//                     />
//                     <p className={styles.productTitle}>{product.name}</p>
//                   </td>
//                   <td>
//                     <span className={styles.categoryTag}>{product.category}</span>
//                   </td>
//                   <td>{variant.color}</td>
//                   <td>{variant.size}</td>
//                   <td>₹{variant.price}</td>
//                   <td>{variant.qty}</td>
//                   <td className={styles.actions}>
//                     <Button>Edit</Button>
//                     <Button
//                       className={styles.deleteButton}
//                       onClick={() => handleDelete(product.id)}
//                     >
//                       Delete
//                     </Button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ProductList;
