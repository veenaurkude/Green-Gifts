// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom"; // Add useNavigate
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./ProductDetails.module.css";

// function ProductDetails() {
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate(); // Add navigate

//   useEffect(() => {
//     async function getProductById() {
//       try {
//         const token = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
//         const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("Single Product Response:", response.data);
//         setProduct(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product:", error.response || error);
//         setError("Failed to load product details.");
//         setLoading(false);
//       }
//     }
//     if (id) getProductById();
//   }, [id]);

//   if (loading) return <p className={styles.loading}>Loading...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;
//   if (!product) return <p className={styles.error}>No product found.</p>;

//   const defaultVariant = product.variants?.[0] || {};

//   return (
//     <div className={styles.container}>
//       {/* Breadcrumbs */}
//       <nav className={styles.breadcrumbs}>
//         <Link to="/" className={styles.breadcrumbLink}>Home</Link>
//         <span className={styles.breadcrumbSeparator}>›</span>
//         <Link to="/plants" className={styles.breadcrumbLink}>Plants</Link>
//         <span className={styles.breadcrumbSeparator}>›</span>
//         <span className={styles.breadcrumbActive}>
//           {product.name || "Product Details"}
//         </span>
//       </nav>
//       <h1 className={styles.title}>{product.name || "Product Details"}</h1>

//       {/* <button
//         onClick={() => navigate("/plants")} // Simple back navigation
//         className={styles.backButton}
//       >
//         Back to Plants
//       </button> */}
//       <div className={styles.productContainer}>
//         <div className={styles.imageWrapper}>
//           <img
//             src={defaultVariant.imageUrls?.[0] || "https://via.placeholder.com/300"}
//             alt={product.name}
//             className={styles.productImage}
//           />
//         </div>
//         <div className={styles.details}>

//           <p><strong>Category:</strong> {product.category || "N/A"}</p>
//           <p><strong>Description:</strong> {product.description || "No description"}</p>
//           <p><strong>Price:</strong> ₹{defaultVariant.price || "N/A"}</p>
//           {defaultVariant.discountedPrice && (
//             <p><strong>Discounted Price:</strong> ₹{defaultVariant.discountedPrice}</p>
//           )}
//           <p><strong>Color:</strong> {defaultVariant.color || "N/A"}</p>
//           <p><strong>Stock:</strong> {defaultVariant.qty || "N/A"}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;

// =============================

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./SingleProductDetail.module.css";

// function SingleProductDetail() {
//   const tokenData = JSON.parse(
//     localStorage.getItem("ecommerce_login")
//   )?.jwtToken;
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getProductById() {
//       try {
//         const response = await axios.get(
//           `${config.BASE_URL}/api/Product/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${tokenData}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log("Single Product Response:", response.data);
//         setProduct(response.data);
//         setSelectedVariant(response.data.variants?.[0] || {});
//         // setSelectedImage(response.data.imageUrls?.[0] || "https://via.placeholder.com/300");
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product:", error.response || error);
//         setError("Failed to load product details.");
//         setLoading(false);
//       }
//     }
//     if (id) getProductById();
//   }, [id]);

//   const handleVariantChange = (variant) => {
//     setSelectedVariant(variant);
//   };

//   const handleImageChange = (image) => {
//     setSelectedImage(image);
//   };

//   const handleAddToCart = () => {
//     // Placeholder for adding to cart functionality
//     alert(
//       `Added ${product.name} (${selectedVariant.color}, ${selectedVariant.size}) to cart!`
//     );
//     // In a real app, you'd add the product to a cart context or local storage
//   };

//   if (loading) return <p className={styles.loading}>Loading...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;
//   if (!product) return <p className={styles.error}>No product found.</p>;

//   return (
//     <div className={styles.container}>
//       {/* Breadcrumbs */}
//       <nav className={styles.breadcrumbs}>
//         <Link to="/" className={styles.breadcrumbLink}>
//           Home
//         </Link>
//         <span className={styles.breadcrumbSeparator}>›</span>
//         <Link to="/plants" className={styles.breadcrumbLink}>
//           Products
//         </Link>
//         <span className={styles.breadcrumbSeparator}>›</span>
//         <span className={styles.breadcrumbActive}>
//           {product.name || "Product Details"}
//         </span>
//       </nav>

//       {/* Back Button */}
//       <button onClick={() => navigate("/plants")} className={styles.backButton}>
//         Back to Products
//       </button>

//       {/* Product Details */}
//       <div className={styles.productContainer}>
//         {product.variants.length > 0
//           ? product.variants.map((item, index) => (
//               <div key={index}>
//                 {item.imageUrls && item.imageUrls.length > 0 ? (
//                   item.imageUrls.map((url, imgIndex) => (
//                     <img
//                       key={imgIndex}
//                       src={url}
//                       alt={`Product Image ${imgIndex + 1}`}
//                       className="w-32 h-32 object-cover rounded-md"
//                     />
//                   ))
//                 ) : (
//                   <p>No images available</p>
//                 )}
//               </div>
//             ))
//           : "No images Found"}

//         {/* Details Section */}
//         <div className={styles.detailsSection}>
//           <h1 className={styles.title}>{product.name || "Product Details"}</h1>
//           <p className={styles.category}>
//             <strong>Category:</strong> {product.category || "N/A"}
//           </p>
//           <p className={styles.description}>
//             <strong>Description:</strong>{" "}
//             {product.description || "No description available."}
//           </p>
//           <p className={styles.price}>
//             <strong>Price:</strong> ₹{selectedVariant.price || "N/A"}
//             {selectedVariant.discountedPrice && (
//               <span className={styles.discountedPrice}>
//                 (Discounted: ₹{selectedVariant.discountedPrice})
//               </span>
//             )}
//           </p>
//           <p className={styles.stock}>
//             <strong>Stock:</strong> {selectedVariant.qty || "N/A"}
//           </p>
//           <p className={styles.pickup}>
//             <strong>Pickup Location:</strong> {product.pickupLocation || "N/A"}
//           </p>

//           {/* Variant Selection */}
//           {product.variants?.length > 0 && (
//             <div className={styles.variants}>
//               <h3 className={styles.variantTitle}>Select Variant:</h3>
//               <div className={styles.variantOptions}>
//                 {product.variants.map((variant, index) => (
//                   <button
//                     key={index}
//                     className={`${styles.variantButton} ${
//                       selectedVariant === variant
//                         ? styles.variantButtonActive
//                         : ""
//                     }`}
//                     onClick={() => handleVariantChange(variant)}
//                   >
//                     {variant.color} ({variant.size})
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Add to Cart Button */}
//           <button className={styles.addToCart} onClick={handleAddToCart}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SingleProductDetail;

// // ==================

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./ProductDetails.module.css";
// import { useCart } from "../../context/CartContext"; // Import the Cart Context

// const ProductDetails = () => {
//   const { addToCart } = useCart(); // Get the addToCart function

//   const tokenData = JSON.parse(
//     localStorage.getItem("ecommerce_login")
//   )?.jwtToken;
//   const { id } = useParams();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function getProductById() {
//       try {
//         const tokenData = JSON.parse(
//           localStorage.getItem("ecommerce_login")
//         )?.jwtToken;
//         console.log("Stored Token:", tokenData); // Log the token to verify

//         const response = await axios.get(
//           `${config.BASE_URL}/api/Product/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${tokenData}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("Single Product Response:", response.data);
//         setProduct(response.data);
//         const initialVariant = response.data.variants?.[0] || {};
//         setSelectedVariant(initialVariant);
//         setSelectedImage(initialVariant.imageUrls?.[0] || null);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product:", error.response || error);
//         setError(
//           `Failed to load product details. ${
//             error.response?.data?.message || ""
//           }`
//         );
//         setLoading(false);
//       }
//     }

//     if (id) getProductById();
//   }, [id]);

//   const handleVariantChange = (variant) => {
//     setSelectedVariant(variant);
//     setSelectedImage(variant.imageUrls?.[0] || null);
//   };

//   const handleImageChange = (image) => {
//     setSelectedImage(image);
//   };

//   // const handleAddToCart = () => {
//   //   alert(`Added ${product.name} (${selectedVariant.color}, ${selectedVariant.size}) to cart!`);
//   // };

//   const handleAddToCart = async () => {
//     if (!product || !selectedVariant) {
//       alert("Please select a valid product or variant.");
//       return;
//     }

//     try {
//       await addToCart(product, selectedVariant.id); // Pass both product and variantId
//       alert(
//         `${product.name} (${selectedVariant.color}, ${selectedVariant.size}) added to cart!`
//       );
//     } catch (error) {
//       console.error("Failed to add product to cart:", error);
//       alert("Failed to add product to cart.");
//     }
//   };

//   if (loading) return <p className={styles.loading}>Loading...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;
//   if (!product) return <p className={styles.error}>No product found.</p>;

//   return (
//     <>
//       <div className={styles.container}>
//         <nav className={styles.breadcrumbs}>
//           <Link to="/" className={styles.breadcrumbLink}>
//             Home
//           </Link>
//           <span className={styles.breadcrumbSeparator}>›</span>
//           <Link to="/plants" className={styles.breadcrumbLink}>
//             Products
//           </Link>
//           <span className={styles.breadcrumbSeparator}>›</span>
//           <span className={styles.breadcrumbActive}>
//             {product.name || "Product Details"}
//           </span>
//         </nav>

//         <button
//           onClick={() => navigate("/plants")}
//           className={styles.backButton}
//         >
//           Back to Products
//         </button>

//         <div className={styles.productContainer}>
//           {/* Main Product Image */}
//           <div className={styles.mainImageContainer}>
//             {selectedImage ? (
//               <img
//                 src={selectedImage}
//                 alt="Selected Product"
//                 className="w-64 h-64 object-cover rounded-md"
//               />
//             ) : (
//               <p>No images available</p>
//             )}
//           </div>

//           {/* Details Section */}
//           <div className={styles.detailsSection}>
//             <h1 className={styles.title}>
//               {product.name || "Product Details"}
//             </h1>
//             <p className={styles.category}>
//               <strong>Category:</strong> {product.category || "N/A"}
//             </p>
//             <p className={styles.description}>
//               <strong>Description:</strong>{" "}
//               {product.description || "No description available."}
//             </p>
//             <p className={styles.price}>
//               <strong>Price:</strong> ₹{selectedVariant.price || "N/A"}
//             </p>
//             <p className={styles.stock}>
//               <strong>Stock:</strong> {selectedVariant.qty || "N/A"}
//             </p>
//             <p className={styles.pickup}>
//               <strong>Pickup Location:</strong>{" "}
//               {product.pickupLocation || "N/A"}
//             </p>

//             {/* Variant Selection */}
//             {product.variants?.length > 0 && (
//               <div className={styles.variants}>
//                 <h3 className={styles.variantTitle}>Select Variant:</h3>
//                 <div className={styles.variantOptions}>
//                   {product.variants.map((variant, index) => (
//                     <button
//                       key={index}
//                       className={`${styles.variantButton} ${
//                         selectedVariant === variant
//                           ? styles.variantButtonActive
//                           : ""
//                       }`}
//                       onClick={() => handleVariantChange(variant)}
//                     >
//                       {variant.color} ({variant.size})
//                     </button>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Add to Cart Button */}
//             <button
//               className={styles.addToCart}
//               onClick={() => addToCart(product, product.variants[0]?.id)}
//             >
//               Add to Cart
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./ProductDetails.module.css";
// import { useCart } from "../../context/CartContext";

// const ProductDetails = () => {
//   const { addToCart } = useCart();
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null);
//   const [selectedVariant, setSelectedVariant] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getProductById() {
//       try {
//         const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//         const token = tokenData?.jwtToken;
//         console.log("Stored Token:", token);
//         console.log("Fetching product with ID:", id);

//         if (!token) {
//           navigate("/login");
//           return;
//         }

//         const response = await axios.get(
//           `${config.BASE_URL}/api/Product/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );

//         console.log("Product Details Response:", response.data);
//         setProduct(response.data);
//         const initialVariant = response.data.variants?.[0] || {};
//         setSelectedVariant(initialVariant);
//         setSelectedImage(initialVariant.imageUrls?.[0] || null);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching product:", error.response || error);
//         if (error.response?.status === 401) {
//           localStorage.removeItem("ecommerce_login");
//           navigate("/login");
//         } else {
//           setError(`Failed to load product details: ${error.message}`);
//         }
//         setLoading(false);
//       }
//     }

//     if (id) getProductById();
//   }, [id, navigate]);

//   const handleVariantChange = (variant) => {
//     setSelectedVariant(variant);
//     setSelectedImage(variant.imageUrls?.[0] || null);
//   };

//   const handleAddToCart = async () => {
//     if (!product || !selectedVariant) {
//       alert("Please select a valid product or variant.");
//       return;
//     }

//     try {
//       await addToCart(product, selectedVariant.id);
//       alert(
//         `${product.name} (${selectedVariant.color}, ${selectedVariant.size}) added to cart!`
//       );
//     } catch (error) {
//       console.error("Failed to add product to cart:", error);
//       alert("Failed to add product to cart.");
//     }
//   };

//   if (loading) return <p className={styles.loading}>Loading...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;
//   if (!product) return <p className={styles.error}>No product found.</p>;

//   return (
//     <div className={styles.container}>
//       <nav className={styles.breadcrumbs}>
//         <Link to="/" className={styles.breadcrumbLink}>
//           Home
//         </Link>
//         <span className={styles.breadcrumbSeparator}>›</span>
//         <Link to="/plants" className={styles.breadcrumbLink}>
//           Products
//         </Link>
//         <span className={styles.breadcrumbSeparator}>›</span>
//         <span className={styles.breadcrumbActive}>
//           {product.name || "Product Details"}
//         </span>
//       </nav>

//       <div className={styles.productContainer}>
//         <div className={styles.mainImageContainer}>
//           {selectedImage ? (
//             <img
//               src={selectedImage}
//               alt="Selected Product"
//               className="w-64 h-64 object-cover rounded-md"
//             />
//           ) : (
//             <p>No images available</p>
//           )}
//         </div>

//         <div className={styles.detailsSection}>
//           <h1 className={styles.title}>{product.name || "Product Details"}</h1>
//           <p className={styles.category}>
//             <strong>Category:</strong> {product.category || "N/A"}
//           </p>
//           <p className={styles.description}>
//             <strong>Description:</strong>{" "}
//             {product.description || "No description available."}
//           </p>
//           <p className={styles.price}>
//             <strong>Price:</strong> ₹{selectedVariant.price || "N/A"}
//           </p>
//           <p className={styles.stock}>
//             <strong>Stock:</strong> {selectedVariant.qty || "N/A"}
//           </p>
//           <p className={styles.pickup}>
//             <strong>Pickup Location:</strong>{" "}
//             {product.pickupLocation || "N/A"}
//           </p>

//           {product.variants?.length > 0 && (
//             <div className={styles.variants}>
//               <h3 className={styles.variantTitle}>Select Variant:</h3>
//               <div className={styles.variantOptions}>
//                 {product.variants.map((variant, index) => (
//                   <button
//                     key={index}
//                     className={`${styles.variantButton} ${
//                       selectedVariant === variant
//                         ? styles.variantButtonActive
//                         : ""
//                     }`}
//                     onClick={() => handleVariantChange(variant)}
//                   >
//                     {variant.color} ({variant.size})
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           <button className={styles.addToCart} onClick={() => addToCart(product, product.variants[0]?.id)}>
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetails;


import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./ProductDetails.module.css";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify"; 
import { BsCartCheck } from "react-icons/bs";
import { MdCurrencyRupee } from "react-icons/md";
import Button from "../../components/Button/Button";


const ProductDetails = () => {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Get Product Details-ByID

  useEffect(() => {
    async function getProductById() {
      try {
        const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
        const token = tokenData?.jwtToken;
  
        const headers = token
          ? { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
          : { "Content-Type": "application/json" };
  
        const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`, {
          headers,
        });
  
        setProduct(response.data);
        const initialVariant = response.data.variants?.[0] || {};
        setSelectedVariant(initialVariant);
        setSelectedImage(initialVariant.imageUrls?.[0] || null);
        setLoading(false);
      } catch (error) {
        setError(`Failed to load product details: ${error.message}`);
        setLoading(false);
      }
    }
  
    if (id) getProductById();
  }, [id]);
  

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
    setSelectedImage(variant.imageUrls?.[0] || null);
  };
  
  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (!product || !selectedVariant) {
      toast.error("Please select a valid product or variant.");
      return;
    }
  
    const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
    const token = tokenData?.jwtToken;
  
    const cartItem = {
      id: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      price: selectedVariant.price,
      image: selectedVariant.imageUrls?.[0] || "",
      quantity,
    };
  
    if (token) {
      // User is logged in → Add item via API (Optional)
      try {
        await addToCart(product, selectedVariant.id, quantity);
        toast.success(`${product.name} added to cart!`);
      } catch (error) {
        console.error("Failed to add product to cart:", error);
        toast.error("Failed to add product to cart.");
      }
    } else {
      // Guest user → Store cart in localStorage
      const existingCart = JSON.parse(localStorage.getItem("guest_cart")) || [];
      const updatedCart = [...existingCart, cartItem];
      localStorage.setItem("guest_cart", JSON.stringify(updatedCart));
      toast.success("Added to cart!");
    }
  };
  

  // const handleAddToCart = async () => {
  //   if (!product || !selectedVariant) {
  //     toast.error("Please select a valid product or variant.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //     return;
  //   }

  //   try {
  //     await addToCart(product, selectedVariant.id, quantity);
  //     toast.success(
  //       `${product.name} added to cart!`,
  //       {
  //         position: "top-right",
  //         autoClose: 3000,
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Failed to add product to cart:", error);
  //     toast.error("Failed to add product to cart.", {
  //       position: "top-right",
  //       autoClose: 3000,
  //     });
  //   }
  // };

  

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.error}>No product found.</p>;

  return (
    <div className={styles.container}>
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <Link to="/plants" className={styles.breadcrumbLink}>Products</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbActive}>{product.name}</span>
      </nav>

      <div className={styles.productContainer}>
        <div className={styles.imageSection}>
          {selectedImage ? (
            <img src={selectedImage} alt={product.name} className={styles.mainImage} />
          ) : (
            <p>No images available</p>
          )}
        </div>

        <div className={styles.detailsSection}>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.category}><strong>Category:</strong> {product.category}</p>
          <p className={styles.description}><strong>Description:</strong> {product.description}</p>
          <p className={styles.price}> <strong>Price:</strong> ₹{selectedVariant.price}</p>
          <p className={styles.stock}> <BsCartCheck/> <strong>In Stock:</strong> {selectedVariant.qty}</p>

          {product.variants?.length > 0 && (
            <div className={styles.variants}>
              <h3 className={styles.variantTitle}>Select Variant:</h3>
              <div className={styles.variantOptions}>
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`${styles.variantButton} ${selectedVariant === variant ? styles.variantButtonActive : ""}`}
                    onClick={() => handleVariantChange(variant)}
                  >
                    Color: {variant.color} & Size: {variant.size}
                  </button>
                ))}
              </div>
            </div>
          )}


<div className={styles.quantitySection}>
            <Button
              className={styles.quantityButton}
              onClick={handleDecrement}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className={styles.quantity}>{quantity}</span>
            <Button
              className={styles.quantityButton}
              onClick={handleIncrement}
              disabled={quantity >= selectedVariant.qty}
            >
              +
            </Button>
          </div>

          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

