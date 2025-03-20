// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import config from "./config/apiconfig";
// import { data, useParams } from "react-router-dom";
// function SingleProductDetail() {
//   const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
// const { id } = useParams(); 
// console.log(id)
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     async function getProductBtId() {
//       try {
//         const response = await axios.get(
//           `${config.BASE_URL}/api/Product/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(response.data);
//       } catch (error) {
//         console.log(error);
//       }
//     }
//     getProductBtId();
//   }, []);
//   return (
//     <div>
//       <h1>Single Product Detail</h1>
//       <p>{product.name}</p>
//     </div>
//   );
// }

// export default SingleProductDetail;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Fixed import
import axios from "axios";
import config from "./config/apiconfig";
// import styles from "./SingleProductDetail.module.css";

function SingleProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getProductById() {
      try {
        const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
        const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Single Product Response:", response.data);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error.response || error);
        setError("Failed to load product details.");
        setLoading(false);
      }
    }
    if (id) getProductById();
  }, [id]);

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.error}>No product found.</p>;

  // Assuming the API returns a product with variants
  const defaultVariant = product.variants?.[0] || {};

  return (
    <>
    <div className={styles.container}>
      <h1 className={styles.title}>{product.name || "Product Details"}</h1>
      <div className={styles.productContainer}>
        <div className={styles.imageWrapper}>
          <img
            src={defaultVariant.imageUrls?.[0] || "https://via.placeholder.com/300"}
            alt={product.name}
            className={styles.productImage}
          />
        </div>
        <div className={styles.details}>
          <p><strong>Category:</strong> {product.category || "N/A"}</p>
          <p><strong>Description:</strong> {product.description || "No description available"}</p>
          <p><strong>Price:</strong> ₹{defaultVariant.price || "N/A"}</p>
          {defaultVariant.discountedPrice && (
            <p><strong>Discounted Price:</strong> ₹{defaultVariant.discountedPrice}</p>
          )}
          <p><strong>Color:</strong> {defaultVariant.color || "N/A"}</p>
          <p><strong>Stock:</strong> {defaultVariant.qty || "N/A"}</p>
          <p><strong>Pickup Location:</strong> {product.pickupLocation || "N/A"}</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default SingleProductDetail;