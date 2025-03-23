

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom"; // Add useNavigate
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./SingleProductDetail.module.css";

// function SingleProductDetail() {
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

// export default SingleProductDetail;



import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./SingleProductDetail.module.css";

function SingleProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProductById() {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/Product/${id}`);
        console.log("Single Product Response:", response.data);
        setProduct(response.data);
        setSelectedVariant(response.data.variants?.[0] || {});
        setSelectedImage(response.data.images?.[0] || "https://via.placeholder.com/300");
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error.response || error);
        setError("Failed to load product details.");
        setLoading(false);
      }
    }
    if (id) getProductById();
  }, [id]);

  const handleVariantChange = (variant) => {
    setSelectedVariant(variant);
  };

  const handleImageChange = (image) => {
    setSelectedImage(image);
  };

  const handleAddToCart = () => {
    // Placeholder for adding to cart functionality
    alert(`Added ${product.name} (${selectedVariant.color}, ${selectedVariant.size}) to cart!`);
    // In a real app, you'd add the product to a cart context or local storage
  };

  if (loading) return <p className={styles.loading}>Loading...</p>;
  if (error) return <p className={styles.error}>{error}</p>;
  if (!product) return <p className={styles.error}>No product found.</p>;

  return (
    <div className={styles.container}>
      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>
          Home
        </Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <Link to="/plants" className={styles.breadcrumbLink}>
          Products
        </Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbActive}>
          {product.name || "Product Details"}
        </span>
      </nav>

      {/* Back Button */}
      <button onClick={() => navigate("/plants")} className={styles.backButton}>
        Back to Products
      </button>

      {/* Product Details */}
      <div className={styles.productContainer}>
        {/* Image Section */}
        <div className={styles.imageSection}>
          <img src={selectedImage} alt={product.name} className={styles.mainImage} />
          {product.images?.length > 1 && (
            <div className={styles.thumbnailGallery}>
              {product.images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`${product.name} ${index + 1}`}
                  className={`${styles.thumbnail} ${selectedImage === image ? styles.thumbnailActive : ""}`}
                  onClick={() => handleImageChange(image)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details Section */}
        <div className={styles.detailsSection}>
          <h1 className={styles.title}>{product.name || "Product Details"}</h1>
          <p className={styles.category}>
            <strong>Category:</strong> {product.category || "N/A"}
          </p>
          <p className={styles.description}>
            <strong>Description:</strong> {product.description || "No description available."}
          </p>
          <p className={styles.price}>
            <strong>Price:</strong> ₹{selectedVariant.price || "N/A"}
            {selectedVariant.discountedPrice && (
              <span className={styles.discountedPrice}>
                (Discounted: ₹{selectedVariant.discountedPrice})
              </span>
            )}
          </p>
          <p className={styles.stock}>
            <strong>Stock:</strong> {selectedVariant.qty || "N/A"}
          </p>
          <p className={styles.pickup}>
            <strong>Pickup Location:</strong> {product.pickupLocation || "N/A"}
          </p>

          {/* Variant Selection */}
          {product.variants?.length > 0 && (
            <div className={styles.variants}>
              <h3 className={styles.variantTitle}>Select Variant:</h3>
              <div className={styles.variantOptions}>
                {product.variants.map((variant, index) => (
                  <button
                    key={index}
                    className={`${styles.variantButton} ${
                      selectedVariant === variant ? styles.variantButtonActive : ""
                    }`}
                    onClick={() => handleVariantChange(variant)}
                  >
                    {variant.color} ({variant.size})
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button className={styles.addToCart} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default SingleProductDetail;