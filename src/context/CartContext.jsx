import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import config from "../config/apiconfig";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // **Fetch Cart Data from API**
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/cart/view`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken}`,
        },
      });
      setCart(response.data); // Assuming the response structure is correct
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // **Add item to cart via API**

  const addToCart = async (product) => {
    try {
      const response = await axios.post(`${config.BASE_URL}/cart/add/${product.id}?quantity=1`, null, 
        {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken}`,
        },
      });

      // Refresh cart data after adding
      fetchCart();
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  // **Update Quantity via API**

  const updateQuantity = async (id, change) => {
    const updatedItem = cart.find((item) => item.id === id);
    if (!updatedItem) return;

    const newQuantity = updatedItem.quantity + change;

    if (newQuantity < 1) {
      removeFromCart(id); // If quantity becomes zero, remove the item
    } else {
      try {
        await axios.post(`${config.BASE_URL}/cart/add/${id}?quantity=${newQuantity}`, null, {
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken}`,
          },
        });

        // Refresh cart data after updating
        fetchCart();
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  // **Remove item from cart**

  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${config.BASE_URL}/cart/remove/${id}`, {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken}`,
        },
      });

      // Refresh cart data after removing
      fetchCart();
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  // Fetch cart data on mount
  useEffect(() => {
    fetchCart();
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
