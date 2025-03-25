

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import config from "../config/apiconfig";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  // ✅ Improved Token Handling
  const rawTokenData = localStorage.getItem("ecommerce_login");
  let tokenData;
  try {
    tokenData = rawTokenData && rawTokenData !== "undefined"
      ? JSON.parse(rawTokenData)
      : null;
  } catch (error) {
    console.error("Invalid token data in localStorage:", rawTokenData);
    tokenData = null;
  }
  
  const token = tokenData?.jwtToken || ""; // Ensure token is always defined

  const [cart, setCart] = useState([]);

  // **Fetch Cart Data from API**
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/cart/view`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("API Response Data:", response.data);

      const cartData = Array.isArray(response.data.cartItems)
        ? response.data.cartItems
        : []; // Ensure data is always an array

      setCart(cartData); // Update cart with proper data structure
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setCart([]); // Fallback to empty array if data fetch fails
    }
  };

  // **Add item to cart via API**
  const addToCart = async (product, variantId) => {
    if (!token) {
      console.error("Token missing or expired. Please log in again.");
      return;
    }

    try {
      const response = await axios.post(
        `${config.BASE_URL}/cart/addToCart/${variantId}`,
        {
          productId: product.id,
          variantId: variantId.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Item added successfully:", response.data);
      fetchCart(); // Refresh cart after adding
    } catch (error) {
      console.error("Error adding to cart:", error.response?.data || error);
    }
  };

  // **Update Quantity via API**
  const updateQuantity = async (variantId, change) => {
    const updatedItem = cart.find((item) => item.variantId === variantId);
    if (!updatedItem) return;

    const newQuantity = updatedItem.quantity + change;

    if (newQuantity < 1) {
      removeFromCart(variantId);
    } else {
      try {
        await axios.post(
          `${config.BASE_URL}/cart/add/${variantId}?quantity=${newQuantity}`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        fetchCart(); // Refresh cart data after updating
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // **Remove item from cart**
  const removeFromCart = async (variantId) => {
    try {
      await axios.delete(`${config.BASE_URL}/cart/remove/${variantId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      fetchCart(); // Refresh cart data after removing
      console.log(`Item with variantId ${variantId} removed successfully.`);
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Fetch cart data on mount
  useEffect(() => {
    if (token) fetchCart(); // Only fetch if token exists
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        totalUniqueProducts: cart.length,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
// import axios from "axios";
// import { createContext, useContext, useEffect, useState } from "react";
// import config from "../config/apiconfig";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {

//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;
//   console.log(token);

//   const [cart, setCart] = useState([]);

//   // **Fetch Cart Data from API**

// const fetchCart = async () => {
//   try {
//     const response = await axios.get(`${config.BASE_URL}/cart/view`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//     });
//     console.log("API Response Data:", response.data);
//     const cartData = Array.isArray(response.data.cartItems)
//       ? response.data.cartItems
//       : []; // Ensure data is always an array

//     setCart(cartData); // Update cart with proper data structure
   
//   } catch (error) {
//     console.error("Error fetching cart data:", error);
//     setCart([]); // Fallback to empty array if data fetch fails
//   }
// };

//   // **Add item to cart via API**
//   const addToCart = async (product, variantId) => {
//     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//     const token = tokenData?.jwtToken;
  
//     if (!token) {
//       console.error("Token missing or expired. Please log in again.");
//       return;
//     }
  
//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/cart/addToCart/${variantId}`,
//         {
//           productId: product.id,  // Common product ID
//           variantId: variantId.id,  // Specific variant ID
//           // quantity: 1             // Default quantity
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
  
//       console.log("Item added successfully:", response.data);
//       fetchCart(); // Refresh cart after adding
//     } catch (error) {
//       console.error("Error adding to cart:", error.response?.data || error);
//     }
//   };
  
  

//   // **Update Quantity via API**

//   const updateQuantity = async (variantId, change) => {
//     const updatedItem = cart.find((item) => item.variantId === variantId);
//     if (!updatedItem) return;

//     const newQuantity = updatedItem.quantity + change;

//     if (newQuantity < 1) {
//       removeFromCart(variantId); // If quantity becomes zero, remove the item
//     } else {
//       try {
//         await axios.post(
//           `${config.BASE_URL}/cart/add/${variantId}?quantity=${newQuantity}`,
//           null,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         // Refresh cart data after updating
//         fetchCart();
//       } catch (error) {
//         console.error("Error updating quantity:", error);
//       }
//     }
//   };

//   // **Remove item from cart**

//   const removeFromCart = async (variantId) => {
//     try {
//       await axios.delete(`${config.BASE_URL}/cart/remove/${variantId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
  
//       // Refresh cart data after removing
//       fetchCart();
//       console.log(`Item with variantId ${variantId} removed successfully.`);
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };
  

//   // Fetch cart data on mount
//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         totalUniqueProducts: cart.length,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);

// ========================

// import { createContext, useContext, useState } from "react";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   // Add item to cart
//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.id === product.id);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.id === product.id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...product, quantity: 1 }];
//       }
//     });
//   };

//   // Update quantity
//   const updateQuantity = (id, change) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         item.id === id
//           ? { ...item, quantity: Math.max(1, item.quantity + change) }
//           : item
//       )
//     );
//   };

//   // Remove item from cart
//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => item.id !== id));
//   };

//   // Calculate total number of unique products
//   const totalUniqueProducts = cart.length;

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         updateQuantity,
//         removeFromCart,
//         totalUniqueProducts, // Updated logic here
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);
