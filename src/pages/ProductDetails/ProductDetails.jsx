
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
          <div className={styles.priceSection}>
          <p className={styles.price}> <strong>Price:</strong> ₹{selectedVariant.price}</p>
          <p className={styles.stock}> <BsCartCheck/> <strong>In Stock</strong> </p>{/* {selectedVariant.qty} */}
          </div>
          
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

