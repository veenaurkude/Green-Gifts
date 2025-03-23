// import React, { useState } from "react";
// import styles from "./ProductDetails.module.css";

// const ProductDetails = ({ product, onClose }) => {
//   const [quantity, setQuantity] = useState(1);

//   const increaseQuantity = () => setQuantity(quantity + 1);
//   const decreaseQuantity = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   return (
//     <div className={styles.overlay}>
//       <div className={styles.modal}>
//         <button className={styles.closeBtn} onClick={onClose}>X</button>
//         <img src={product.image} alt={product.name} className={styles.image} />
//         <h2 className={styles.brand}>{product.brand}</h2>
//         <p className={styles.name}>{product.name}</p>
//         <p className={styles.price}>
//           <span className={styles.discounted}>₹{product.discountedPrice}</span>
//           <span className={styles.original}>₹{product.originalPrice}</span>
//           <span className={styles.discount}>{product.discount}% OFF</span>
//         </p>
//         <div className={styles.quantityContainer}>
//           <button onClick={decreaseQuantity}>-</button>
//           <span>{quantity}</span>
//           <button onClick={increaseQuantity}>+</button>
//         </div>
//         <button className={styles.addToCart}>Add to Cart</button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// import React, { useState } from "react";
// import styles from "./ProductDetails.module.css";

// const ProductDetails = ({ product, onClose }) => {
//   if (!product) {
//     return <p>Loading product details...</p>;
//   }

//   const { img, brand, price, discount } = product;
//   const [quantity, setQuantity] = useState(1);

//   const handleIncrease = () => setQuantity(quantity + 1);
//   const handleDecrease = () => {
//     if (quantity > 1) setQuantity(quantity - 1);
//   };

//   return (
//     <div className={styles.productDetails}>
//       <button onClick={onClose}>✖</button>
//       <img src={img} alt={brand} className={styles.productImage} />
//       <div className={styles.productInfo}>
//         <h2 className={styles.productBrand}>{brand}</h2>
//         <p className={styles.productDiscount}>₹{discount}</p>
//         <p className={styles.productPrice}>₹{price}</p>

//         <div className={styles.counter}>
//           <button onClick={handleDecrease}>-</button>
//           <span>{quantity}</span>
//           <button onClick={handleIncrease}>+</button>
//         </div>

//         <button className={styles.addToCartBtn}>Add to Cart</button>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;

// // ==============
// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./ProductDetails.module.css";

// const ProductDetails = () => {
//   const { id } = useParams(); // Get product ID from URL
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     async function fetchProduct() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/products/${id}`);
//         setProduct(response.data.product);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     }
//     fetchProduct();
//   }, [id]);

//   if (!product) return <p>Loading...</p>;

//   return (
//     <div className={styles.productDetails}>
//       <img src={product.image} alt={product.title} className={styles.productImage} />
//       <h2>{product.title}</h2>
//       <p>₹{product.price}</p>
//       <p>{product.description}</p>
//     </div>
//   );
// };

// export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./ProductDetails.module.css";

// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     async function fetchProductDetails() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/products/${id}`);
//         console.log("Fetched Product:", response.data); // Debugging
//         setProduct(response.data);
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     }

//     if (id) {
//       fetchProductDetails();
//     }
//   }, [id]);

//   if (!product) {
//     return <p>Loading...</p>; // Show loading if data is still fetching
//   }

//   return (
//     <>
//       {" "}
//       <div className={styles.productContainer}>
//         <div className={styles.productImg}>
//           <img
//             src={product.image}
//             alt={product.title}
//             className={styles.productImage}
//           />
//         </div>
//         <div className={styles.productDetails}>
//           <h2>{product.title}</h2>
//           <p>Brand: {product.brand}</p>
//           <p>Price: ₹{product.price}</p>
//           <p>Discount: {product.discount}%</p>
//           <button className={styles.addToCart}>Add to Cart</button>
//         </div>
//       </div>
//       <div className={styles.productDescription}>
//         <h4>About the Product</h4>
//         <p>{product.description}</p>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;
// ================================

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./ProductDetails.module.css";
// import Button from "../../components/Button/Button";


// const ProductDetails = () => {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);

//   useEffect(() => {
//     async function fetchProductDetails() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/products/${id}`);
//         console.log("Fetched Product:", response.data);

//         // Check if API wraps the product inside another object
//         const productData = response.data.product || response.data;
//         setProduct({ ...productData });
//       } catch (error) {
//         console.error("Error fetching product details:", error);
//       }
//     }

//     if (id) {
//       console.log("Product ID:", id);
//       fetchProductDetails();
//     }
//   }, [id]);

//   useEffect(() => {
//     console.log("Updated product state:", product);
//   }, [product]);

//   if (!product) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <>
//       <div className={styles.productContainer}>
//         <div className={styles.productImg}>
//           <img
//             src={product.image || "https://via.placeholder.com/300"}
//             alt={product.title || "No Title"}
//             className={styles.productImage}
//           />
//         </div>
//         <div className={styles.productDetails}>
//           <h2>{product.title || "No Title"}</h2>
//           <p>Brand: {product.brand || "Unknown"}</p>
//           <p>Price: ₹{product.price !== undefined ? product.price : "N/A"}</p>
//           <p>{product.discount ? `Discount: ${product.discount}%` : "No Discount"}</p>
//           {/* <button className={styles.addToCart}>Add to Cart</button> */}
//           <Button>Add to Cart</Button>
//         </div>
//       </div>
//       <div className={styles.productDescription}>
//         <h4>About the Product</h4>
//         <p>{product.description || "No Description Available"}</p>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;
// ======================================

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./ProductDetails.module.css";
import Button from "../../components/Button/Button";

const ProductDetails = () => {
  const { id } = useParams(); // Get product ID from URL
  console.log(id)
  const [product, setProduct] = useState(null);



  useEffect(() => {
    async function fetchProductDetails() {
      try {
       
        const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token if your API requires it
            "Content-Type": "application/json",
          },
        });
        console.log("Fetched Product:", response.data);
        setProduct(response.data); // Set the entire product object
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product details:", error.response || error);
        setError("Failed to load product details. Please try again.");
        setLoading(false);
      }
    }

    if (id) {
      console.log("Product ID:", id);
      fetchProductDetails();
    }
  }, [id]);

  // Handle loading and error states
  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  // Assuming the first variant is the "default" one to display initially
  const defaultVariant = product.variants[0] || {};

  return (
    <>
      <div className={styles.productContainer}>
        <div className={styles.productImg}>
          <img
            src={defaultVariant.imageUrls?.[0] || "https://via.placeholder.com/300"}
            alt={product.name || "No Title"}
            className={styles.productImage}
          />
        </div>
        <div className={styles.productDetails}>
          <h2>{product.name || "No Title"}</h2>
          <p>Category: {product.category || "Unknown"}</p>
          <p>Price: ₹{defaultVariant.price !== undefined ? defaultVariant.price : "N/A"}</p>
          <p>
            {defaultVariant.discountedPrice
              ? `Discounted Price: ₹${defaultVariant.discountedPrice}`
              : "No Discount"}
          </p>
          <p>Color: {defaultVariant.color || "N/A"}</p>
          <p>Size: {defaultVariant.size || "N/A"}</p>
          <p>Stock: {defaultVariant.qty !== undefined ? defaultVariant.qty : "N/A"}</p>
          <p>Pickup Location: {product.pickupLocation || "N/A"}</p>
          <Button>Add to Cart</Button>
        </div>
      </div>
      <div className={styles.productDescription}>
        <h4>About the Product</h4>
        <p>{product.description || "No Description Available"}</p>
      </div>

      {/* Optional: Display all variants */}
      {product.variants.length > 1 && (
        <div className={styles.variantsSection}>
          <h4>Available Variants</h4>
          <ul className={styles.variantList}>
            {product.variants.map((variant) => (
              <li key={variant.id} className={styles.variantItem}>
                <img
                  src={variant.imageUrls?.[0] || "https://via.placeholder.com/100"}
                  alt={variant.color}
                  className={styles.variantImage}
                />
                <p>Color: {variant.color}</p>
                <p>Price: ₹{variant.price}</p>
                <p>Discounted: ₹{variant.discountedPrice || "N/A"}</p>
                <p>Size: {variant.size}</p>
                <p>Stock: {variant.qty}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductDetails;