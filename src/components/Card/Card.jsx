import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import styles from "./Card.module.css";
import { AiFillStar } from "react-icons/ai";
import Button from "../Button/Button";
import { toast } from "react-toastify";
import { MdAddShoppingCart } from "react-icons/md";
import { IoHeartOutline } from "react-icons/io5";
import { useCart } from "../../context/CartContext";  // Import the CartContext

const Card = ({ id, image, title, category, price, discount, isTrending, product }) => {
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();  // Get addToCart function from context
  const navigate = useNavigate();  // Use useNavigate for navigation

  const handleAddToCart = async () => {
    if (!selectedVariant) {
      toast.error("Please select a valid product variant.");
      return;
    }

    const cartItem = {
      id: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      category: product.category,
      price: selectedVariant.price,
      image: selectedVariant.imageUrls?.[0] || "",
      quantity,
    };

    try {
      await addToCart(product, selectedVariant.id, quantity);  // Add to cart
      toast.success(`${product.name} added to cart!`);
      navigate('/cart');  // Redirect to cart page after adding
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.tagContainer}>
        {discount && (
          <span className={styles.discountTag}>
            {Math.round(((price - discount) / price) * 100)}% Off
          </span>
        )}
        {isTrending && <span className={styles.trendingTag}>Trending</span>}
      </div>

      <div className={styles.imageWrapper}>
        <Link to={`/product/${id}`}>
          <img
            src={image || "https://via.placeholder.com/150"}
            alt={title}
            className={styles.cardImage}
          />
        </Link>
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title || "No Title"}</h3>

        <div className={styles.cardDetails}>
          <div className={styles.details}>
            <p>Category: {category || "No Category"}</p>
            <div className={styles.priceContainer}>
              <span className={styles.price}>
                ₹{discount !== undefined ? discount : price || "N/A"}
              </span>
              {discount && (
                <span className={styles.originalPrice}>₹{price}</span>
              )}
            </div>
            <div className={styles.rating}>
              {[...Array(5)].map((_, i) => (
                <AiFillStar key={i} className={styles.starIcon} />
              ))}
            </div>
          </div>

          <div className={styles.cardIcons}>
            <IoHeartOutline />
            <MdAddShoppingCart onClick={handleAddToCart} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;



// import React from "react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import styles from "./Card.module.css";
// import { AiFillStar } from "react-icons/ai";
// import Button from "../Button/Button";
// import { toast } from "react-toastify";
// import { MdAddShoppingCart } from "react-icons/md";
// import { IoHeartOutline } from "react-icons/io5";

// const Card = ({ id, image, title, category, price, discount, isTrending }) => {
//   const [product, setProduct] = useState(null);

//   const handleAddToCart = async () => {
//     if (!product || !selectedVariant) {
//       toast.error("Please select a valid product or variant.");
//       return;
//     }

//     // const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//     // const token = tokenData?.jwtToken;

//     const cartItem = {
//       id: product.id,
//       variantId: selectedVariant.id,
//       name: product.name,
//       category: product.category,
//       price: selectedVariant.price,
//       image: selectedVariant.imageUrls?.[0] || "",
//       quantity,
//     };

//     if (token) {
//       // User is logged in → Add item via API (Optional)
//       try {
//         await addToCart(product, selectedVariant.id, quantity);
//         toast.success(`${product.name} added to cart!`);
//       } catch (error) {
//         console.error("Failed to add product to cart:", error);
//         toast.error("Failed to add product to cart.");
//       }
//     } else {
//       // Guest user → Store cart in localStorage
//       const existingCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
//       const updatedCart = [...existingCart, cartItem];
//       localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
//       toast.success("Added to cart!");
//     }
//   };

//   return (
//     <div className={styles.card}>
//       <div className={styles.tagContainer}>
//         {discount && (
//           <span className={styles.discountTag}>
//             {Math.round(((price - discount) / price) * 100)}% Off
//           </span>
//         )}
//         {isTrending && <span className={styles.trendingTag}>Trending</span>}
//       </div>

//       <div className={styles.imageWrapper}>
//         <Link to={`/product/${id}`}>
//         <img
//           src={image || "https://via.placeholder.com/150"}
//           alt={title}
//           className={styles.cardImage}
//         />
//         </Link>
//       </div>

//       <div className={styles.cardContent}>
//         <h3 className={styles.cardTitle}>{title || "No Title"}</h3>

//         <div className={styles.cardDetails}>
//           <div className={styles.details}>
//             <p>Category: {category || "No Category"}</p>
//             <div className={styles.priceContainer}>
//               <span className={styles.price}>
//                 ₹{discount !== undefined ? discount : price || "N/A"}
//               </span>
//               {discount && (
//                 <span className={styles.originalPrice}>₹{price}</span>
//               )}
//             </div>
//             <div className={styles.rating}>
//               {[...Array(5)].map((_, i) => (
//                 <AiFillStar key={i} className={styles.starIcon} />
//               ))}
//             </div>
//           </div>

//           <div className={styles.cardIcons}>
//             <IoHeartOutline />
//             <MdAddShoppingCart onClick={handleAddToCart} />
//           </div>
//         </div>

//         {/* <Link to={`/product/${id}`}>
//           <Button className={styles.button}>View Product</Button>
//         </Link> */}
//       </div>
//     </div>
//   );
// };

// export default Card;

// =============================

// import React from "react";
// import { Link } from "react-router-dom";
// import styles from "./Card.module.css";
// import { AiFillStar } from "react-icons/ai";
// import Button from "../Button/Button";

// const Card = ({ id, image, title, price, discount, isTrending }) => {
//   return (
//     <div className={styles.card}>
//       <div className={styles.tagContainer}>
//         {discount && (
//           <span className={styles.discountTag}>
//             {Math.round(((price - discount) / price) * 100)}% Off
//           </span>
//         )}
//         {isTrending && <span className={styles.trendingTag}>Trending</span>}
//       </div>

//       <div className={styles.imageWrapper}>
//         <img
//           src={image || "https://via.placeholder.com/150"}
//           alt={title}
//           className={styles.cardImage}
//         />
//       </div>

//       <div className={styles.cardContent}>
//         <h3 className={styles.cardTitle}>{title || "No Title"}</h3>
//         <div className={styles.priceContainer}>
//           <span className={styles.price}>
//             ₹{discount !== undefined ? discount : price || "N/A"}
//           </span>
//           {discount && <span className={styles.originalPrice}>₹{price}</span>}
//         </div>
//         <div className={styles.rating}>
//           {[...Array(5)].map((_, i) => (
//             <AiFillStar key={i} className={styles.starIcon} />
//           ))}
//         </div>
//         <Link to={`/product/${id}`}>
//           <Button>View Product</Button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default Card;
