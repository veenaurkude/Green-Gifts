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
import { useCart } from "../../context/CartContext"; // Import Cart Context

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // Get addToCart function

  useEffect(() => {
    async function fetchProductDetails() {
      try {
        const response = await axios.get(`${config.BASE_URL}/products/${id}`);
        setProduct(response.data.product || response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    }

    if (id) fetchProductDetails();
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImg}>
        <img
          src={product.image || "https://via.placeholder.com/300"}
          alt={product.title || "No Title"}
          className={styles.productImage}
        />
      </div>
      <div className={styles.productDetails}>
        <h2>{product.title}</h2>
        <p>Brand: {product.brand || "Unknown"}</p>
        <p>Price: ₹{product.price}</p>
        <p>{product.discount ? `Discount: ${product.discount}%` : "No Discount"}</p>
        <Button onClick={() => addToCart(product)}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default ProductDetails;

