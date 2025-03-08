// import React from "react";
// import styles from "./Cart.module.css";
// import { useCart } from "../../context/CartContext";

// const Cart = () => {
//   const { cart, updateQuantity } = useCart();

//   // Calculate total price
//   const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

//   return (
//     <div className={styles.cartContainer}>
//       <h2>Your Cart</h2>
//       {cart.length === 0 ? (
//         <p>Your cart is empty.</p>
//       ) : (
//         <div className={styles.cartList}>
//           {cart.map((item) => (
//             <div key={item.id} className={styles.cartItem}>
//               <img src={item.image} alt={item.title} className={styles.cartImage} />
//               <div className={styles.cartDetails}>
//                 <h3>{item.title}</h3>
//                 <p>Price: ₹{item.price}</p>
//                 <div className={styles.quantityControls}>
//                   <button onClick={() => updateQuantity(item.id, -1)}>-</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => updateQuantity(item.id, 1)}>+</button>
//                 </div>
//                 <p>Total: ₹{item.price * item.quantity}</p>
//               </div>
//               <button>Delete</button>
//             </div>
//           ))}
//         </div>
//       )}
//       <h3 className={styles.totalPrice}>Grand Total: ₹{totalPrice}</h3>
//     </div>
//   );
// };

// export default Cart;


import React from "react";
import styles from "./Cart.module.css";
import { useCart } from "../../context/CartContext";

const Cart = () => {
  const { cart, updateQuantity, removeFromCart } = useCart();

  // Calculate total price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className={styles.cartContainer}>
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className={styles.cartList}>
          {cart.map((item) => (
            <div key={item.id} className={styles.cartItem}>
              <img src={item.image} alt={item.title} className={styles.cartImage} />
              <div className={styles.cartDetails}>
                <h3>{item.title}</h3>
                <p>Price: ₹{item.price}</p>
                <div className={styles.quantityControls}>
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p className={styles.price}>Total: ₹{item.price * item.quantity}</p>
              </div>
              <button onClick={() => removeFromCart(item.id)} className={styles.deleteButton}>
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
      <h3 className={styles.totalPrice}>Grand Total: ₹{totalPrice}</h3>
    </div>
  );
};

export default Cart;
