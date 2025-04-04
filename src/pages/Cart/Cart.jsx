import React, { useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { RiDeleteBin6Line } from "react-icons/ri";
import styles from "./Cart.module.css";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const deliveryFee = 14.0;

  const totalPrice = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );
  const subtotal = totalPrice + deliveryFee - discount;

  const handleUpdateQuantity = useCallback(
    (variantId, change) => {
      updateQuantity(variantId, change);
    },
    [updateQuantity]
  );

  const handleRemoveFromCart = useCallback(
    (variantId) => {
      removeFromCart(variantId);
      toast.success("Item removed from cart!", { position: "top-right", autoClose: 3000 });
    },
    [removeFromCart]
  );

  const handleApplyCoupon = () => {
    if (couponCode.trim().toLowerCase() === "save10") {
      setDiscount(10);
      toast.success("Coupon applied successfully! ₹10 discount added.", {
        position: "top-right",
        autoClose: 3000,
      });
    } else {
      setDiscount(0);
      toast.error("Invalid coupon code.", { position: "top-right", autoClose: 3000 });
    }
  };

  const handleCheckout = () => {
    const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
    if (!tokenData?.jwtToken) {
      toast.error("Please log in to proceed to checkout.", { position: "top-right", autoClose: 3000 });
      navigate("/login");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartWrapper}>
        <div className={styles.cartItems}>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              {cart.length === 0 ? (
                <tr>
                  <td colSpan="4" className={styles.emptyCart}>
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cart.map((item) => (
                  <tr key={item.variantId} className={styles.cartItem}>
                    <td className={styles.productInfo}>
                      <img
                        src={item.imageUrls?.[0] || "/placeholder.jpg"}
                        alt={item.productName || "Product Image"}
                        className={styles.cartImage}
                      />
                      <div className={styles.productDetails}>
                        <span className={styles.productName}>{item.productName || "Unnamed Product"}</span>
                        <span className={styles.productDescription}>Color: {item.color || "N/A"}</span>
                      </div>
                    </td>
                    <td>₹{(item.price || 0).toFixed(2)}</td>
                    <td>
                      <div className={styles.quantityControls}>
                        <button onClick={() => handleUpdateQuantity(item.variantId, -1)}>-</button>
                        <span>{item.quantity || 1}</span>
                        <button onClick={() => handleUpdateQuantity(item.variantId, 1)}>+</button>
                      </div>
                    </td>
                    <td>
                      <RiDeleteBin6Line
                        onClick={() => handleRemoveFromCart(item.variantId)}
                        className={styles.removeButton}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className={styles.cartSummary}>
          <h3>Summary</h3>
          <p>Total Price: ₹{totalPrice.toFixed(2)}</p>
          <p>Delivery Fee: ₹{deliveryFee.toFixed(2)}</p>
          <div>
            <input
              type="text"
              placeholder="Enter coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <button onClick={handleApplyCoupon}>Apply Coupon</button>
          </div>
          <p>Discount: ₹{discount.toFixed(2)}</p>
          <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
          <button onClick={handleCheckout} className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;



// import React, { useState, useCallback } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import styles from "./Cart.module.css";
// import { useCart } from "../../context/CartContext";
// import { toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const Cart = () => {
//   const { cart = [], updateQuantity, removeFromCart } = useCart(); // ✅ Default to an empty array
//   const navigate = useNavigate();
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const deliveryFee = 14.0;

//   // ✅ Calculate total price safely
//   const totalPrice = cart.reduce(
//     (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
//     0
//   );
//   const subtotal = totalPrice + deliveryFee - discount;

//   // ✅ Quantity Update Handler
//   const handleUpdateQuantity = useCallback(
//     (variantId, change) => {
//       const item = cart.find((item) => item.variantId === variantId);
//       if (!item) return;

//       const newQuantity = (item.quantity || 0) + change;
//       if (newQuantity < 1) {
//         handleRemoveFromCart(variantId);
//       } else {
//         updateQuantity(variantId, change);
//       }
//     },
//     [cart, updateQuantity]
//   );

//   // ✅ Remove Item from Cart
//   const handleRemoveFromCart = useCallback(
//     (variantId) => {
//       removeFromCart(variantId);
//       toast.success("Item removed from cart!", { position: "top-right", autoClose: 3000 });
//     },
//     [removeFromCart]
//   );

//   // ✅ Apply Coupon Handler
//   const handleApplyCoupon = () => {
//     if (couponCode.trim().toLowerCase() === "save10") {
//       setDiscount(10);
//       toast.success("Coupon applied successfully! ₹10 discount added.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } else {
//       setDiscount(0);
//       toast.error("Invalid coupon code.", { position: "top-right", autoClose: 3000 });
//     }
//   };

//   // ✅ Checkout Handler
//   const handleCheckout = () => {
//     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
//     if (!tokenData?.jwtToken) {
//       toast.error("Please log in to proceed to checkout.", { position: "top-right", autoClose: 3000 });
//       navigate("/login");
//     } else {
//       navigate("/checkout");
//     }
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <div className={styles.cartWrapper}>
//         <div className={styles.cartItems}>
//           <table className={styles.cartTable}>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className={styles.emptyCart}>
//                     Your cart is empty.
//                   </td>
//                 </tr>
//               ) : (
//                 cart.map((item) => (
//                   <tr key={item.variantId} className={styles.cartItem}>
//                     <td className={styles.productInfo}>
//                       <img
//                         src={item.imageUrls?.[0] || "/placeholder.jpg"} // ✅ Fallback for missing images
//                         alt={item.productName || "Product Image"}
//                         className={styles.cartImage}
//                       />
//                       <div className={styles.productDetails}>
//                         <span className={styles.productName}>{item.productName || "Unnamed Product"}</span>
//                         <span className={styles.productDescription}>Color: {item.color || "N/A"}</span>
//                       </div>
//                     </td>
//                     <td>₹{(item.price || 0).toFixed(2)}</td>
//                     <td>
//                       <div className={styles.quantityControls}>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, -1)}>-</button>
//                         <span>{item.quantity || 1}</span>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, 1)}>+</button>
//                       </div>
//                     </td>
//                     <td>
//                       <RiDeleteBin6Line
//                         onClick={() => handleRemoveFromCart(item.variantId)}
//                         className={styles.removeButton}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className={styles.cartSummary}>
//           {/* Coupon Section */}
//           <div className={styles.couponSection}>
//             <h3>Apply Coupon</h3>
//             <p>Using a promo code?</p>
//             <div className={styles.couponInputWrapper}>
//               <input
//                 type="text"
//                 placeholder="Coupon code"
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value)}
//                 className={styles.couponInput}
//               />
//               <button onClick={handleApplyCoupon} className={styles.applyButton}>
//                 Apply
//               </button>
//             </div>
//           </div>

//           {/* Summary Section */}
//           <div className={styles.summarySection}>
//             <h3>Total</h3>
//             <div className={styles.summaryRow}>
//               <span>Total</span>
//               <span>₹{totalPrice.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Delivery</span>
//               <span>₹{deliveryFee.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Discount</span>
//               <span>-₹{discount.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span className={styles.subtotalLabel}>Subtotal</span>
//               <span className={styles.subtotal}>₹{subtotal.toFixed(2)}</span>
//             </div>

//             <button className={styles.checkoutButton} onClick={handleCheckout}>
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom"; // ✅ Ensure useNavigate is imported
// import styles from "./Cart.module.css";
// import { useCart } from "../../context/CartContext";
// import { toast } from "react-toastify";
// import { RiDeleteBin6Line } from "react-icons/ri";

// const Cart = () => {
//   const { cart, updateQuantity, removeFromCart } = useCart();
//   const navigate = useNavigate(); // ✅ Initialize navigate
//   const [couponCode, setCouponCode] = useState("");
//   const [discount, setDiscount] = useState(0);
//   const deliveryFee = 14.0;

//   // ✅ Ensure cart is an array before using reduce
//   const totalPrice = Array.isArray(cart)
//     ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
//     : 0;
//   const subtotal = totalPrice + deliveryFee - discount;

//   const handleUpdateQuantity = (variantId, change) => {
//     const item = cart.find((item) => item.variantId === variantId);
//     if (!item) return;

//     const newQuantity = item.quantity + change;
//     if (newQuantity < 1) {
//       handleRemoveFromCart(variantId);
//     } else {
//       updateQuantity(variantId, change);
//     }
//   };

//   const handleRemoveFromCart = (variantId) => {
//     removeFromCart(variantId);
//     toast.success("Item removed from cart!", {
//       position: "top-right",
//       autoClose: 3000,
//     });
//   };

//   const handleApplyCoupon = () => {
//     if (couponCode.toLowerCase() === "save10") {
//       setDiscount(10);
//       toast.success("Coupon applied successfully! ₹10 discount added.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     } else {
//       setDiscount(0);
//       toast.error("Invalid coupon code.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   const handleCheckout = () => {
//     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//     const token = tokenData?.jwtToken;

//     if (!token) {
//       toast.error("Please log in to proceed to checkout.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       navigate("/login"); // ✅ Use navigate correctly
//     } else {
//       navigate("/checkout");
//     }
//   };

//   return (
//     <div className={styles.cartContainer}>
//       <div className={styles.cartWrapper}>
//         <div className={styles.cartItems}>
//           <table className={styles.cartTable}>
//             <thead>
//               <tr>
//                 <th>Product</th>
//                 <th>Price</th>
//                 <th>Quantity</th>
//                 <th>Remove</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.length === 0 ? (
//                 <tr>
//                   <td colSpan="4" className={styles.emptyCart}>
//                     Your cart is empty.
//                   </td>
//                 </tr>
//               ) : (
//                 cart.map((item) => (
//                   <tr key={item.variantId} className={styles.cartItem}>
//                     <td className={styles.productInfo}>
//                       <img
//                         src={item.imageUrls?.[0] || "/placeholder.jpg"} // ✅ Ensure an image is always displayed
//                         alt={item.productName}
//                         className={styles.cartImage}
//                       />
//                       <div className={styles.productDetails}>
//                         <span className={styles.productName}>{item.productName}</span>
//                         <span className={styles.productDescription}>
//                           Color: {item.color}
//                         </span>
//                       </div>
//                     </td>
//                     <td>₹{item.price.toFixed(2)}</td>
//                     <td>
//                       <div className={styles.quantityControls}>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, -1)}>
//                           -
//                         </button>
//                         <span>{item.quantity}</span>
//                         <button onClick={() => handleUpdateQuantity(item.variantId, 1)}>
//                           +
//                         </button>
//                       </div>
//                     </td>
//                     <td>
//                       <RiDeleteBin6Line
//                         onClick={() => handleRemoveFromCart(item.variantId)}
//                         className={styles.removeButton}
//                       />
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className={styles.cartSummary}>
//           <div className={styles.couponSection}>
//             <h3>Apply Coupon</h3>
//             <p>Using a promo code?</p>
//             <div className={styles.couponInputWrapper}>
//               <input
//                 type="text"
//                 placeholder="Coupon code"
//                 value={couponCode}
//                 onChange={(e) => setCouponCode(e.target.value)}
//                 className={styles.couponInput}
//               />
//               <button onClick={handleApplyCoupon} className={styles.applyButton}>
//                 Apply
//               </button>
//             </div>
//           </div>

//           <div className={styles.summarySection}>
//             <h3>Total</h3>
//             <div className={styles.summaryRow}>
//               <span>Total</span>
//               <span>₹{totalPrice.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Delivery</span>
//               <span>₹{deliveryFee.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span>Discount</span>
//               <span>-₹{discount.toFixed(2)}</span>
//             </div>
//             <div className={styles.summaryRow}>
//               <span className={styles.subtotalLabel}>Subtotal</span>
//               <span className={styles.subtotal}>₹{subtotal.toFixed(2)}</span>
//             </div>

//             <button className={styles.checkoutButton} onClick={handleCheckout}>
//               Checkout
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// import React from "react";
// import styles from "./Cart.module.css";
// import { useCart } from "../../context/CartContext";

// const Cart = () => {
//   const { cart, updateQuantity, removeFromCart } = useCart();

//   // Handle empty or undefined cart safely
//   const totalPrice = Array.isArray(cart)
//     ? cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
//     : 0;

//   return (
//     <div className={styles.cartContainer}>
//       <h2>Shopping Cart</h2>

//       {/* Show loading or empty message if cart is not an array */}
//       {!Array.isArray(cart) ? (
//         <p>Loading cart data...</p>
//       ) : cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className={styles.cartList}>
//           {cart.map((item) => (
//             <div key={item.variantId} className={styles.cartItem}>
//               <img
//                 src={item.imageUrls}
//                 alt={item.title}
//                 className={styles.cartImage}
//               />
//               <div className={styles.cartDetails}>
//                 <h3>{item.productName}</h3>
//                 <p>Color: {item.color}</p>
//                 <p>Price: ₹{item.price}</p>
//                 <div className={styles.quantityControls}>
//                 <button onClick={() => updateQuantity(item.variantId, 1)}>+</button>
// <span>{item.quantity}</span>
// <button onClick={() => updateQuantity(item.variantId, -1)}>-</button>
//                 </div>
//                 <p className={styles.price}>
//                   Total: ₹{item.price * item.quantity}
//                 </p>
//               </div>
//               <button
//                 onClick={() => removeFromCart(item.variantId)}
//                 className={styles.deleteButton}
//               >
//                 Delete
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <h3 className={styles.totalPrice}>Grand Total: ₹{totalPrice}</h3>
//     </div>
//   );
// };

// export default Cart;
