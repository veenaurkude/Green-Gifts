// import React, { useState } from "react";
// import { useAdmin } from "../../context/AdminContext";
// import styles from "../Admin.module.css";
// import Input from "../../components/Input/Input";
// import Button from "../../components/Button/Button";

// const AddProduct = () => {
//   const { addProduct } = useAdmin();
//   const [productData, setProductData] = useState({
//     title: "",
//     image: "",
//     price: "",
//     description: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     addProduct(productData);
//     setProductData({ title: "", image: "", price: "", description: "" });
//   };

//   return (
//     <div className={styles.formContainer}>
//       <h2>Add New Product</h2>
//       <form onSubmit={handleSubmit}>
//         <Input
//           type="text"
//           name="title"
//           placeholder="Product Title"
//           value={productData.title}
//           onChange={handleChange}
//           required
//         />

//         <Input
//           type="text"
//           name="image"
//           placeholder="Image URL"
//           value={productData.image}
//           onChange={handleChange}
//           required
//         />

//         <Input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={productData.price}
//           onChange={handleChange}
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Description"
//           value={productData.description}
//           onChange={handleChange}
//           required
//         ></textarea>

//         <Button type="submit">Add Product</Button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState } from "react";
import { useAdmin } from "../../context/AdminContext";
import styles from "./AddProduct.module.css"; // Updated path for clarity
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

const AddProduct = () => {
  const { addProduct } = useAdmin();
  const [productData, setProductData] = useState({
    title: "",
    image: "",
    price: "",
    description: "",
  });
  const [message, setMessage] = useState(""); // For success/error feedback

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      addProduct(productData); // Assuming this handles API call
      setMessage("Product added successfully!");
      setProductData({ title: "", image: "", price: "", description: "" });
    } catch (error) {
      setMessage("Failed to add product. Please try again.");
    }
    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className={styles.addProductContainer}>
      <h1 className={styles.title}>Add New Product</h1>
      <p className={styles.subtitle}>Fill in the details to add a new eco-friendly gift.</p>

      {message && <p className={message.includes("success") ? styles.success : styles.error}>{message}</p>}

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="title" className={styles.label}>Product Title</label>
          <Input
            type="text"
            name="title"
            id="title"
            placeholder="Enter product title"
            value={productData.title}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="image" className={styles.label}>Image URL</label>
          <Input
            type="text"
            name="image"
            id="image"
            placeholder="Enter image URL"
            value={productData.image}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price" className={styles.label}>Price (₹)</label>
          <Input
            type="number"
            name="price"
            id="price"
            placeholder="Enter price"
            value={productData.price}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
            className={styles.input}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="description" className={styles.label}>Description</label>
          <Input
            type="textarea" // Assuming Input supports textarea
            name="description"
            id="description"
            placeholder="Enter product description"
            value={productData.description}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>

        <Button type="submit" className={styles.submitButton}>Add Product</Button>
      </form>
    </div>
  );
};

export default AddProduct;