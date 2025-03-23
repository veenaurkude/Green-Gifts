// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import { useAdmin } from "../../context/AdminContext";
// import styles from "./AddProduct.module.css";
// import Input from "../../components/Input/Input";
// import Button from "../../components/Button/Button";

// const AddProduct = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;
//   console.log(token);

//   const [productData, setProductData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     pickupLocation: "",
//     variants: [{ color: "", price: "", qty: "", size: "" }],
//     image:"",
//   });

//   const handleSubmit = () =>{

//     const response = axios.post(`${config.BASE_URL}/api/addProduct`)

//   }

//   return (
//     <>
//       <div className={styles.addProductContainer}>
//         <h1 className={styles.title}>Add New Product</h1>
//         <p className={styles.subtitle}>
//           Fill in the details to add a new eco-friendly gift.
//         </p>

//         <form onSubmit={handleSubmit} className={styles.form}>
//           <Input
//             type="text"
//             name="name"
//             placeholder="Enter product name"
//             value={productData.name}
//             required
//           />

//           <Input
//             type="text"
//             name="description"
//             placeholder="Enter description"
//             value={productData.description}
//             required
//           />

//           <Input
//             type="text"
//             name="category"
//             placeholder="Enter category"
//             value={productData.category}

//             required
//           />

//           <Input
//             type="text"
//             name="pickupLocation"
//             placeholder="Enter pickup location"
//             value={productData.pickupLocation}

//             required
//           />

//           {productData.variants.map((variant, index) => (
//             <div key={index} className={styles.variantGroup}>
//               <label>Variant {index + 1}</label>
//               <Input
//                 type="text"
//                 name="color"
//                 placeholder="Color"
//                 value={variant.color}

//                 required
//               />
//               <Input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={variant.price}

//                 required
//               />
//               <Input
//                 type="number"
//                 name="qty"
//                 placeholder="Quantity"
//                 value={variant.qty}
//                 required
//               />
//               <Input
//                 type="text"
//                 name="size"
//                 placeholder="Size"
//                 value={variant.size}
//                 required
//               />
//             </div>
//           ))}

//           <Input
//             type="file"
//             name="images"

//           />

//           <Button type="submit" className={styles.submitButton}>
//             Add Product
//           </Button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddProduct;

// import React, { useState } from "react";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./AddProduct.module.css";
// import Input from "../../components/Input/Input";
// import Button from "../../components/Button/Button";

// const AddProduct = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   const [productData, setProductData] = useState({
//     name: "",
//     description: "",
//     category: "",
//     pickupLocation: "",
//     variants: [{ color: "", price: "", qty: "", size: "" }],
//   });

//   const [images, setImages] = useState([]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProductData({ ...productData, [name]: value });
//   };

//   // Handle variant changes
//   const handleVariantChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedVariants = [...productData.variants];
//     updatedVariants[index][name] = value;
//     setProductData({ ...productData, variants: updatedVariants });
//   };

//   // Handle image selection
//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   // Submit form data
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("product", JSON.stringify(productData));
//     images.forEach((image) => formData.append("images", image));

//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/addProduct`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ Correctly set Authorization
//             "Content-Type": "multipart/form-data", // ✅ Correct Content-Type
//           },
//         }
//       );

//       if (response.status === 201) {
//         console.log("Product added successfully:", response.data);
//         alert("Product added successfully!");
//       } else {
//         console.error("Failed to add product.");
//         alert("Failed to add product. Please try again.");
//       }
//     } catch (error) {
//       console.error("Error adding product:", error);
//       alert(
//         `Error: ${
//           error.response?.data?.message || "Check console for details."
//         }`
//       );
//     }
//   };

//   return (
//     <>
//       <div className={styles.addProductContainer}>
//         <h1 className={styles.title}>Add New Product</h1>
//         <p className={styles.subtitle}>
//           Fill in the details to add a new eco-friendly gift.
//         </p>

//         <form onSubmit={handleSubmit} className={styles.form}>
//           <Input
//             type="text"
//             name="name"
//             placeholder="Enter product name"
//             value={productData.name}
//             onChange={handleChange}
//             required
//           />

//           <Input
//             type="text"
//             name="description"
//             placeholder="Enter description"
//             value={productData.description}
//             onChange={handleChange}
//             required
//           />

//           <Input
//             type="text"
//             name="category"
//             placeholder="Enter category"
//             value={productData.category}
//             onChange={handleChange}
//             required
//           />

//           <Input
//             type="text"
//             name="pickupLocation"
//             placeholder="Enter pickup location"
//             value={productData.pickupLocation}
//             onChange={handleChange}
//             required
//           />

//           {productData.variants.map((variant, index) => (
//             <div key={index} className={styles.variantGroup}>
//               <label>Variant {index + 1}</label>
//               <Input
//                 type="text"
//                 name="color"
//                 placeholder="Color"
//                 value={variant.color}
//                 onChange={(e) => handleVariantChange(index, e)}
//                 required
//               />
//               <Input
//                 type="number"
//                 name="price"
//                 placeholder="Price"
//                 value={variant.price}
//                 onChange={(e) => handleVariantChange(index, e)}
//                 required
//               />
//               <Input
//                 type="number"
//                 name="qty"
//                 placeholder="Quantity"
//                 value={variant.qty}
//                 onChange={(e) => handleVariantChange(index, e)}
//                 required
//               />
//               <Input
//                 type="text"
//                 name="size"
//                 placeholder="Size"
//                 value={variant.size}
//                 onChange={(e) => handleVariantChange(index, e)}
//                 required
//               />
//             </div>
//           ))}

//           <Input
//             type="file"
//             name="images"
//             accept="image/*" // ✅ Ensures only image files are selected
//             multiple // ✅ Allows multiple file uploads if needed
//             onChange={(e) => setImages([...e.target.files])} // ✅ Updates image state
//           />

//           <Button type="submit" className={styles.submitButton}>
//             Add Product
//           </Button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddProduct;

// ===================

// import { useState } from "react";
// import axios from "axios";
// import config from "../../config/apiconfig";

// export default function AddProduct() {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     pickupLocation: "",
//     variants: [{ color: "", price: "", qty: "", size: "" }],
//   });
//   const [images, setImages] = useState([]);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleVariantChange = (index, e) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[index][e.target.name] = e.target.value;
//     setProduct({ ...product, variants: updatedVariants });
//   };

//   const addVariant = () => {
//     setProduct({
//       ...product,
//       variants: [...product.variants, { color: "", price: "", qty: "", size: "" }],
//     });
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("product", new Blob([JSON.stringify(product)], { type: "application/json" }));
//     images.forEach((image) => formData.append("images", image));

//     try {
//       const response = await axios.post(`${config.BASE_URL}/api/addProduct`, formData, {
//         headers: {
//           Authorization:`Bearer ${tokenData}`,
//            "Content-Type": "multipart/form-data"

//           },
//       });
//       alert("Product added successfully!");
//     } catch (error) {
//       console.error("Error adding product", error);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-xl font-bold">Add Product</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input name="name" placeholder="Name" onChange={handleChange} className="block w-full p-2 border" />
//         <input name="description" placeholder="Description" onChange={handleChange} className="block w-full p-2 border" />
//         <input name="category" placeholder="Category" onChange={handleChange} className="block w-full p-2 border" />
//         <input name="pickupLocation" placeholder="Pickup Location" onChange={handleChange} className="block w-full p-2 border" />

//         {product.variants.map((variant, index) => (
//           <div key={index} className="p-2 border rounded">
//             <input name="color" placeholder="Color" onChange={(e) => handleVariantChange(index, e)} className="block w-full p-2 border" />
//             <input name="price" placeholder="Price" type="number" onChange={(e) => handleVariantChange(index, e)} className="block w-full p-2 border" />
//             <input name="qty" placeholder="Quantity" type="number" onChange={(e) => handleVariantChange(index, e)} className="block w-full p-2 border" />
//             <input name="size" placeholder="Size" onChange={(e) => handleVariantChange(index, e)} className="block w-full p-2 border" />
//           </div>
//         ))}
//         <button type="button" onClick={addVariant} className="px-4 py-2 bg-blue-500 text-white">Add Variant</button>

//         <input type="file" multiple onChange={handleImageChange} className="block w-full p-2 border" />
//         <button type="submit" className="px-4 py-2 bg-green-500 text-white">Submit</button>
//       </form>
//     </div>
//   );
// }

// --------------

// import { useState } from "react";
// import axios from "axios";
// import { Input, Textarea } from "../../components/Input/Input";
// import Button from "../../components/Button/Button";
// import config from "../../config/apiconfig";
// import styles from "./AddProduct.module.css";
// import { FiUpload } from "react-icons/fi";
// import { FaPlus } from "react-icons/fa";
// import { IoIosClose } from "react-icons/io";


// const AddProduct = () => {
//   const tokenData = JSON.parse(
//     localStorage.getItem("ecommerce_login")
//   )?.jwtToken;
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     pickupLocation: "",
//     variants: [{ color: "", price: "", qty: "", size: "" }],
//   });
//   const [images, setImages] = useState([]);

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
//   };

//   const handleVariantChange = (index, e) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[index][e.target.name] = e.target.value;
//     setProduct({ ...product, variants: updatedVariants });
//   };

//   const addVariant = () => {
//     setProduct({
//       ...product,
//       variants: [
//         ...product.variants,
//         { color: "", price: "", qty: "", size: "" },
//       ],
//     });
//   };

//   const handleImageChange = (e) => {
//     setImages([...e.target.files]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append(
//       "product",
//       new Blob([JSON.stringify(product)], { type: "application/json" })
//     );
//     images.forEach((image) => formData.append("images", image));

//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/addProduct`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${tokenData}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       alert("Product added successfully!");
//       setProduct({
//         name: "",
//         description: "",
//         category: "",
//         pickupLocation: "",
//         variants: [{ color: "", price: "", qty: "", size: "" }],
//       });
//       setImages([]);
//     } catch (error) {
//       console.error("Error adding product", error);
//       alert("Failed to add product");
//     }
//   };

//   return (
//     <>
//       <div className={styles.container}>
//         <div className={styles.headContainer}>
//           <div>
//             <h2>Add a new Product</h2>
//           </div>
//           <div>
//             {/* Centered Add Product Button */}
//             <div className={styles.buttonContainer}>
//               <Button
//                 type="submit"
//                 // className={styles.submitBtn}
//               >
//                 Add Product
//               </Button>
//             </div>
//           </div>
//         </div>

//         <form onSubmit={handleSubmit} className={styles.form}>
//           <div className={styles.grid}>
//             {/* Left Column */}
//             <div className={styles.leftColumn}>
//               {/* Product Information */}
//               <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Product Information</h3>
//                 <div className={styles.inputGroup}>
//                   <Input
//                     name="name"
//                     value={product.name}
//                     placeholder="Product Name"
//                     onChange={handleChange}
//                     // className={styles.input}
//                     required
//                   />

//                   <Textarea
//                     name="description"
//                     value={product.description}
//                     placeholder="Description (Optional)"
//                     onChange={handleChange}
//                     // className={styles.textarea}
//                     rows="4"
//                   />
//                   <Input
//                     name="category"
//                     value={product.category}
//                     onChange={handleChange}
//                     placeholder="Category"
//                     // className={styles.select}
//                     required
//                   />
//                   {/* <select
//                   name="category"
//                   value={product.category}
//                   onChange={handleChange}
//                   className={styles.select}
//                   required
//                 >
//                   <option value="">Select Category</option>
//                   <option value="category1">Category 1</option>
//                   <option value="category2">Category 2</option>
//                 </select> */}
//                 </div>
//               </div>

//               {/* Product Image */}
//               <div className={styles.section}>
//                 <div className={styles.imageHeader}>
//                   <h3 className={styles.sectionTitle}>Product Image</h3>
//                   {/* <button type="button" className={styles.urlButton}>
//                   Add media from URL
//                 </button> */}
//                 </div>
//                 <div className={styles.imageUpload}>
//                   <div className={styles.dragDrop}>
//                     {/* <span className={styles.uploadIcon}>📤</span> */}
//                     <FiUpload />
//                     <p>Drag and Drop Your Image Here.</p>
//                     <Input
//                       type="file"
//                       multiple
//                       onChange={handleImageChange}
//                       className={styles.fileInput}
//                       accept="image/*"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Pickup Location */}
//               <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Pickup Location</h3>
//                 <div className={styles.inputGroup}>
//                   <Input
//                     name="pickupLocation"
//                     value={product.pickupLocation}
//                     onChange={handleChange}
//                     placeholder="Pickup Location"
//                     // className={styles.select}
//                     required
//                   />
//                   {/* <select
//                   name="pickupLocation"
//                   value={product.pickupLocation}
//                   onChange={handleChange}
//                   className={styles.select}
//                   required
//                 >
//                   <option value="">Select Pickup Location</option>
//                   <option value="location1">Location 1</option>
//                   <option value="location2">Location 2</option>
//                 </select> */}
//                 </div>
//               </div>

//               {/* Centered Add Product Button */}
//               {/* <div className={styles.buttonContainer}>
//                 <Button
//                   type="submit"
//                   // className={styles.submitBtn}
//                 >
//                   Add Product
//                 </Button>
//               </div> */}
//             </div>

//             {/* Right Column */}
//             <div className={styles.rightColumn}>
//               {/* Variants */}
//               <div className={styles.section}>
//                 <h3 className={styles.sectionTitle}>Variants</h3>
                
//                 {product.variants.map((variant, index) => (
//                   <div key={index} className={styles.variantContainer}>
//                     <IoIosClose />
//                     <div className={styles.variantGrid}>
//                       <div className={styles.inputGroup}>
//                         <Input
//                           name="color"
//                           value={variant.color}
//                           placeholder="Color"
//                           onChange={(e) => handleVariantChange(index, e)}
//                           // className={styles.input}
//                           required
//                         />
//                       </div>
//                       <div className={styles.inputGroup}>
//                         <Input
//                           name="price"
//                           type="number"
//                           value={variant.price}
//                           placeholder="Price"
//                           onChange={(e) => handleVariantChange(index, e)}
//                           // className={styles.input}
//                           required
//                           min="0"
//                           step="0.01"
//                         />
//                       </div>
//                       <div className={styles.inputGroup}>
//                         <Input
//                           name="qty"
//                           type="number"
//                           value={variant.qty}
//                           placeholder="Quantity"
//                           onChange={(e) => handleVariantChange(index, e)}
//                           // className={styles.input}
//                           required
//                           min="0"
//                         />
//                       </div>
//                       <div className={styles.inputGroup}>
//                         <Input
//                           name="size"
//                           value={variant.size}
//                           placeholder="Size"
//                           onChange={(e) => handleVariantChange(index, e)}
//                           // className={styles.input}
//                           required
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//                 <div className={styles.addVariantBtn}>
//                   <Button type="button" onClick={addVariant}>
//                     <span className={styles.buttonContent}>
//                       <FaPlus className={styles.buttonIcon} />
//                       Add Variant
//                     </span>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </form>
//       </div>
//     </>
//   );
// };

// export default AddProduct;


// =


import { useState } from "react";
import axios from "axios";
import { Input, Textarea } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import config from "../../config/apiconfig";
import styles from "./AddProduct.module.css";
import { FiUpload } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";

const AddProduct = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;
  const [product, setProduct] = useState({
    name: "",
    description: "",
    category: "",
    pickupLocation: "",
    variants: [{ color: "", price: "", qty: "", size: "" }],
  });
  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, e) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index][e.target.name] = e.target.value;
    setProduct({ ...product, variants: updatedVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        { color: "", price: "", qty: "", size: "" },
      ],
    });
  };

  const removeVariant = (index) => {
    const updatedVariants = product.variants.filter((_, i) => i !== index);
    setProduct({ ...product, variants: updatedVariants });
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append(
      "product",
      new Blob([JSON.stringify(product)], { type: "application/json" })
    );
    images.forEach((image) => formData.append("images", image));

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/addProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${tokenData}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("Product added successfully!");
      setProduct({
        name: "",
        description: "",
        category: "",
        pickupLocation: "",
        variants: [{ color: "", price: "", qty: "", size: "" }],
      });
      setImages([]);
    } catch (error) {
      console.error("Error adding product", error);
      alert("Failed to add product");
    }
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.headContainer}>
          <div className={styles.heading}>
            <h2>Add a new Product</h2>
          </div>
          <div className={styles.buttonContainer}>
            <Button type="submit" form="addProductForm">
              Add Product
            </Button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className={styles.form} id="addProductForm">
          <div className={styles.grid}>
            {/* Left Column */}
            <div className={styles.leftColumn}>
              {/* Product Information */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Product Information</h3>
                <div className={styles.inputGroup}>
                  <Input
                    name="name"
                    value={product.name}
                    placeholder="Product Name"
                    onChange={handleChange}
                    required
                  />
                  <Textarea
                    name="description"
                    value={product.description}
                    placeholder="Description (Optional)"
                    onChange={handleChange}
                    rows="4"
                  />
                  <Input
                    name="category"
                    value={product.category}
                    onChange={handleChange}
                    placeholder="Category"
                    required
                  />
                </div>
              </div>

              {/* Product Image */}
              <div className={styles.section}>
                <div className={styles.imageHeader}>
                  <h3 className={styles.sectionTitle}>Product Image</h3>
                </div>
                <div className={styles.imageUpload}>
                  <div className={styles.dragDrop}>
                    <FiUpload />
                    <p>Drag and Drop Your Image Here.</p>
                    <Input
                      type="file"
                      multiple
                      onChange={handleImageChange}
                      className={styles.fileInput}
                      accept="image/*"
                    />
                  </div>
                </div>
              </div>

              {/* Pickup Location */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Pickup Location</h3>
                <div className={styles.inputGroup}>
                  <Input
                    name="pickupLocation"
                    value={product.pickupLocation}
                    onChange={handleChange}
                    placeholder="Pickup Location"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className={styles.rightColumn}>
              {/* Variants */}
              <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Variants</h3>
                {product.variants.map((variant, index) => (
                  <div key={index} className={styles.variantContainer}>
                    <IoIosClose
                      className={styles.closeIcon}
                      onClick={() => removeVariant(index)}
                    />
                    <div className={styles.variantGrid}>
                      <div className={styles.inputGroup}>
                        <Input
                          name="color"
                          value={variant.color}
                          placeholder="Color"
                          onChange={(e) => handleVariantChange(index, e)}
                          required
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <Input
                          name="price"
                          type="number"
                          value={variant.price}
                          placeholder="Price"
                          onChange={(e) => handleVariantChange(index, e)}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <Input
                          name="qty"
                          type="number"
                          value={variant.qty}
                          placeholder="Quantity"
                          onChange={(e) => handleVariantChange(index, e)}
                          required
                          min="0"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <Input
                          name="size"
                          value={variant.size}
                          placeholder="Size"
                          onChange={(e) => handleVariantChange(index, e)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <div className={styles.addVariantBtn}>
                  <Button type="button" onClick={addVariant}>
                    <span 
                    className={styles.buttonContent}
                    >
                      <FaPlus className={styles.buttonIcon} />
                      Add Variant
                    </span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddProduct;