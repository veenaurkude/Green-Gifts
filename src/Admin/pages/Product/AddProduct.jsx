// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Input, Textarea } from "../../../components/Input/Input";
// import Button from "../../../components/Button/Button";
// import config from "../../../config/apiconfig";
// import styles from "./AddProduct.module.css";
// import { FiUpload } from "react-icons/fi";
// import { FaPlus } from "react-icons/fa";
// import { IoIosClose } from "react-icons/io";
// import { toast } from "react-toastify";
// import { useParams, useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const token = JSON.parse(
//     localStorage.getItem("ecommerce_login")
//   )?.jwtToken;
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const isEditMode = !!productId;

//   // const initialProductState = {
//   //   name: "",
//   //   description: "",
//   //   category: "",
//   //   pickupLocation: "",
//   //   variants: [{ color: "", price: "", qty: "", size: "", images: [] }],
//   // };

//   // const [product, setProduct] = useState(initialProductState);
//   const [loading, setLoading] = useState(false);

//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     cat: "", // for frontend: 'plants' or 'pots'
//     category: "", // will be subcategory name from API
//     pickupLocation: "",
//     variants: [{ color: "", price: "", qty: "", size: "", images: [] }],
//     // Terrarium fields if needed
//     type: "", // TERRARIUM or Variants
//     terrarimumQty: "",
//     terrariumPrice: "",
//     terrariumStatus: "",
//     terrariumImg: "",
//   });

//   const [plantCategories, setPlantCategories] = useState([]);
//   const [potCategories, setPotCategories] = useState([]);

//   // Plant Category get api

//   useEffect(() => {
//     const getPlantCategory = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/Allcategory`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log(response.data);
//         setPlantCategories(response.data); // Or adjust based on actual API shape
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     getPlantCategory();
//   }, []);

//   // Pot Category get api = /pot-categories

//   useEffect(() => {
//     const getPotCategory = async () => {
//       try {
//         const response = await axios.get(
//           `${config.BASE_URL}/api/pot-categories`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "application/json",
//             },
//           }
//         );
//         console.log(response.data);
//         setPotCategories(response.data); // Or adjust based on actual API shape
//       } catch (error) {
//         console.error("Error fetching categories:", error);
//       }
//     };

//     getPotCategory();
//   }, []);

//   const handleCategoryChange = (e) => {
//     const { name, value } = e.target;

//     setProduct((prev) => ({
//       ...prev,
//       [name]: value,
//       subcategory: name === "category" ? "" : value, // reset subcategory if category changes
//     }));
//   };

//   // Product Edit
//   useEffect(() => {
//     if (isEditMode && token) {
//       const fetchProduct = async () => {
//         setLoading(true);
//         try {
//           const response = await axios.get(
//             `${config.BASE_URL}/api/AllProduct`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//                 "Content-Type": "application/json",
//               },
//             }
//           );

//           const productToEdit = response.data.find(
//             (p) => p.id === Number(productId)
//           );
//           if (productToEdit) {
//             setProduct({
//               name: productToEdit.name,
//               description: productToEdit.description || "",
//               category: productToEdit.category,
//               pickupLocation: productToEdit.pickupLocation || "",
//               variants: productToEdit.variants.map((variant) => ({
//                 color: variant.color,
//                 price: variant.price,
//                 qty: variant.qty,
//                 size: variant.size,
//                 images: [],
//               })),
//             });
//           }
//         } catch (error) {
//           toast.error("Failed to load product data");
//         } finally {
//           setLoading(false);
//         }
//       };
//       fetchProduct();
//     }
//   }, [isEditMode, productId, token]);

//   // const handleChange = (e) => {
//   //   setProduct({ ...product, [e.target.name]: e.target.value });
//   // };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleVariantChange = (index, e) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[index][e.target.name] = e.target.value;
//     setProduct({ ...product, variants: updatedVariants });
//   };

//   const handleImageChange = (index, e) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[index].images = Array.from(e.target.files);
//     setProduct({ ...product, variants: updatedVariants });
//   };

//   const addVariant = () => {
//     setProduct({
//       ...product,
//       variants: [
//         ...product.variants,
//         { color: "", price: "", qty: "", size: "", images: [] },
//       ],
//     });
//   };

//   const removeVariant = (indexToRemove) => {
//     setProduct((prevProduct) => ({
//       ...prevProduct,
//       variants: prevProduct.variants.filter(
//         (_, index) => index !== indexToRemove
//       ),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     formData.append(
//       "product",
//       new Blob(
//         [
//           JSON.stringify({
//             name: product.name,
//             description: product.description,
//             category: product.category,
//             pickupLocation: product.pickupLocation,
//             variants: product.variants.map(({ images, ...variant }) => variant),
//             type: product.type,
//             terrarimumQty: product.terrarimumQty,
//             terrariumPrice: product.terrariumPrice,
//             terrariumStatus: product.terrariumStatus,
//             terrariumImg: product.terrariumImg,
//           }),
//         ],
//         { type: "application/json" }
//       )
//     );

//     // product.variants.forEach((variant) => {
//     //   variant.images.forEach((image) => {
//     //     if (image instanceof File) {
//     //       formData.append("images", image);
//     //     }
//     //   });
//     // });

//     product.variants.forEach((variant, index) => {
//       variant.images.forEach((image) => {
//         if (image instanceof File) {
//           formData.append(`images_variant_${index}`, image);
//         }
//       });
//     });

//     try {
//       let response;

//       if (isEditMode) {
//         response = await axios.put(
//           `${config.BASE_URL}/api/updateProduct/${productId}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         console.log("Product updated:", response.data);
//         toast.success("Product updated successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         navigate("/admin/product-list");
//       } else {
//         response = await axios.post(
//           `${config.BASE_URL}/api/addProduct`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               "Content-Type": "multipart/form-data",
//             },
//           }
//         );
//         console.log("Product added:", response.data);
//         toast.success("Product added successfully!", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//         // Reset form after adding
//         setProduct({
//           name: "",
//           description: "",
//           cat: "",
//           category: "",
//           pickupLocation: "",
//           variants: [{ color: "", price: "", qty: "", size: "", images: [] }],
//           type: "",
//           terrarimumQty: "",
//           terrariumPrice: "",
//           terrariumStatus: "",
//           terrariumImg: "",
//         });
//       }
//     } catch (error) {
//       console.error("Submission error:", error);
//       toast.error(
//         `Failed to ${isEditMode ? "update" : "add"} product: ${
//           error.response?.data?.message || error.message || "Unknown error"
//         }`,
//         {
//           position: "top-right",
//           autoClose: 3000,
//         }
//       );
//     }
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div className={styles.container}>
//       <div className={styles.headContainer}>
//         <h2>{isEditMode ? "Update Product" : "Add a New Product"}</h2>

//         <Button type="submit">
//           {isEditMode ? "Update Product" : "Add Product"}
//         </Button>
//       </div>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <Button type="submit">
//           {isEditMode ? "Update Product" : "Add Product"}
//         </Button>

//         <div className={styles.grid}>
//           <div className={styles.leftColumn}>
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Product Information</h3>
//               <div className={styles.inputGroup}>
//                 <Input
//                   name="name"
//                   placeholder="Product Name"
//                   onChange={handleChange}
//                   value={product.name}
//                   required
//                 />
//                 <Textarea
//                   name="description"
//                   placeholder="Description (Optional)"
//                   onChange={handleChange}
//                   value={product.description}
//                   rows="6"
//                 />

//                 <div className={styles.inputGroup}>
//                   {/* Main Category Dropdown */}
//                   <select
//                     name="cat"
//                     onChange={handleCategoryChange}
//                     value={product.cat}
//                     required
//                     className={styles.selectInput} // Make sure this is styled in your CSS module
//                   >
//                     <option value="" disabled>
//                       Select Main Category
//                     </option>
//                     <option value="plants">Plants</option>
//                     <option value="pots">Pots</option>
//                   </select>

//                   {/* Subcategory Dropdown */}
//                   {product.cat && (
//                     <select
//                       name="category"
//                       onChange={handleCategoryChange}
//                       value={product.category}
//                       required
//                       className={`${styles.selectInput} ${styles.subcategorySelect}`} // optional extra class
//                     >
//                       <option value="" disabled>
//                         Select Subcategory
//                       </option>

//                       {product.cat === "plants" &&
//                         plantCategories.map((cat) => (
//                           <option key={cat.categoryId} value={cat.categoryName}>
//                             {cat.categoryName}
//                           </option>
//                         ))}

//                       {product.cat === "pots" &&
//                         potCategories.map((cat) => (
//                           <option
//                             key={cat.potCategoryId}
//                             value={cat.potCategoryName}
//                           >
//                             {cat.potCategoryName}
//                           </option>
//                         ))}
//                     </select>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Pickup Location</h3>
//               <div className={styles.inputGroup}>
//                 <Input
//                   name="pickupLocation"
//                   onChange={handleChange}
//                   value={product.pickupLocation}
//                   placeholder="Pickup Location"
//                   required
//                 />
//               </div>
//             </div>

//             {/* <Button type="submit">
//               {isEditMode ? "Update Product" : "Add Product"}
//             </Button> */}
//           </div>

//           <div className={styles.rightColumn}>
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Type</h3>

//               <select
//                 name="type"
//                 onChange={handleChange}
//                 value={product.type}
//                 required
//                 className={styles.selectInput}
//               >
//                 <option value="" disabled>
//                   Select Type
//                 </option>
//                 <option value="Variants">Variants</option>
//                 <option value="TERRARIUM">Terrarium</option>
//               </select>

//               {/* Terrarium Section */}
//               {product.type === "TERRARIUM" && (
//                 <div className={styles.terrariumSection}>
//                   <Input
//                     name="terrarimumQty"
//                     placeholder="Terrarium Qty"
//                     value={product.terrarimumQty}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Input
//                     name="terrariumPrice"
//                     placeholder="Terrarium Price"
//                     value={product.terrariumPrice}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Input
//                     name="terrariumStatus"
//                     placeholder="Terrarium Status"
//                     value={product.terrariumStatus}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     name="terrariumImg"
//                     onChange={(e) =>
//                       setProduct((prev) => ({
//                         ...prev,
//                         terrariumImg: e.target.files[0],
//                       }))
//                     }
//                   />
//                 </div>
//               )}

//               {/* Variants Section */}
//               {product.type === "Variants" &&
//                 Array.isArray(product.variants) &&
//                 product.variants.map((variant, index) => (
//                   <div key={index} className={styles.variantContainer}>
//                     <IoIosClose
//                       className={styles.closeIcon}
//                       onClick={() => removeVariant(index)}
//                     />
//                     <div className={styles.variantContent}>
//                       <div className={styles.variantDetails}>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Color</label>
//                           <Input
//                             name="color"
//                             placeholder="Color"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.color}
//                             required
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Price</label>
//                           <Input
//                             name="price"
//                             type="number"
//                             placeholder="Price"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.price}
//                             required
//                             min="0"
//                             step="0.01"
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Quantity</label>
//                           <Input
//                             name="qty"
//                             type="number"
//                             placeholder="Quantity"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.qty}
//                             required
//                             min="0"
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Size</label>
//                           <Input
//                             name="size"
//                             placeholder="Size"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.size}
//                             required
//                           />
//                         </div>
//                       </div>

//                       <div className={styles.imageHeader}>
//                         <h3 className={styles.sectionTitle}>
//                           Product Image Upload
//                         </h3>
//                       </div>
//                       <label className={styles.imageUpload}>
//                         <div className={styles.dragDrop}>
//                           <FiUpload className={styles.uploadIcon} />
//                           <p className={styles.uploadText}>
//                             Drag and Drop Your Image Here.
//                           </p>
//                           <span className={styles.orText}>or</span>
//                           <span className={styles.browseButton}>
//                             Browse Image
//                           </span>
//                         </div>
//                         <Input
//                           type="file"
//                           multiple
//                           onChange={(e) => handleImageChange(index, e)}
//                           className={styles.fileInput}
//                           accept="image/*"
//                         />
//                       </label>

//                       <div className={styles.imageAfterUpload}>
//                         <div className={styles.imageHeader}>
//                           <h3 className={styles.sectionTitle}>
//                             Image After Uploaded
//                           </h3>
//                         </div>
//                         {variant.images.length > 0 ? (
//                           <div className={styles.imagePreview}>
//                             {variant.images.map((image, i) => (
//                               <img
//                                 key={i}
//                                 src={URL.createObjectURL(image)}
//                                 alt={`Preview ${i}`}
//                                 className={styles.imageThumbnail}
//                               />
//                             ))}
//                           </div>
//                         ) : (
//                           <p className={styles.noImages}>
//                             No images uploaded yet.
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//               {/* Add Variant Button (only if type is Variants) */}
//               {product.type === "Variants" && (
//                 <div className={styles.addVariantBtn}>
//                   <Button type="button" onClick={addVariant}>
//                     <span className={styles.buttonContent}>
//                       <FaPlus />
//                       Add Variant
//                     </span>
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

// ====================

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Input, Textarea } from "../../../components/Input/Input";
// import Button from "../../../components/Button/Button";
// import config from "../../../config/apiconfig";
// import styles from "./AddProduct.module.css";
// import { FiUpload } from "react-icons/fi";
// import { FaPlus } from "react-icons/fa";
// import { IoIosClose } from "react-icons/io";
// import { toast } from "react-toastify";
// import { useParams, useNavigate } from "react-router-dom";

// const AddProduct = () => {

//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;
//   console.log(token);

//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const isEditMode = !!productId;

//   const [loading, setLoading] = useState(false);
//   const [plantCategories, setPlantCategories] = useState([]);
//   const [potCategories, setPotCategories] = useState([]);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     cat: "",
//     category: "",
//     pickupLocation: "",
//     variants: [{ color: "", price: "", qty: "", size: "", images: [] }],
//     type: "",
//     terrarimumQty: "",
//     terrariumPrice: "",
//     terrariumStatus: "",
//     terrariumImg: null,
//   });

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const [plantRes, potRes] = await Promise.all([
//           axios.get(`${config.BASE_URL}/api/Allcategory`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${config.BASE_URL}/api/pot-categories`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);
//         setPlantCategories(plantRes.data);
//         setPotCategories(potRes.data);
//       } catch (err) {
//         toast.error("Failed to fetch categories");
//       }
//     };
//     fetchCategories();
//   }, [token]);

//   useEffect(() => {
//     if (!isEditMode) return;

//     const fetchProduct = async () => {
//       setLoading(true);
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         const foundProduct = response.data.find(p => p.id === Number(productId));
//         if (!foundProduct) return;

//         setProduct({
//           ...product,
//           name: foundProduct.name,
//           description: foundProduct.description || "",
//           cat: foundProduct.cat || "",
//           category: foundProduct.category,
//           pickupLocation: foundProduct.pickupLocation || "",
//           type: foundProduct.type,
//           terrarimumQty: foundProduct.terrarimumQty || "",
//           terrariumPrice: foundProduct.terrariumPrice || "",
//           terrariumStatus: foundProduct.terrariumStatus || "",
//           variants: foundProduct.variants?.map(v => ({
//             color: v.color,
//             price: v.price,
//             qty: v.qty,
//             size: v.size,
//             images: [],
//           })) || [],
//         });
//       } catch {
//         toast.error("Failed to load product data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [isEditMode, productId, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCategoryChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({
//       ...prev,
//       [name]: value,
//       ...(name === "cat" && { category: "" }),
//     }));
//   };

//   const handleVariantChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedVariants = [...product.variants];
//     updatedVariants[index][name] = value;
//     setProduct(prev => ({ ...prev, variants: updatedVariants }));
//   };

//   const handleImageChange = (index, e) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[index].images = Array.from(e.target.files);
//     setProduct(prev => ({ ...prev, variants: updatedVariants }));
//   };

//   const addVariant = () => {
//     setProduct(prev => ({
//       ...prev,
//       variants: [...prev.variants, { color: "", price: "", qty: "", size: "", images: [] }],
//     }));
//   };

//   const removeVariant = (index) => {
//     setProduct(prev => ({
//       ...prev,
//       variants: prev.variants.filter((_, i) => i !== index),
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();

//     // Flat append
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("cat", product.cat);
//     formData.append("category", product.category);
//     formData.append("pickupLocation", product.pickupLocation);
//     formData.append("type", product.type);

//     if (product.type === "TERRARIUM") {
//       formData.append("terrarimumQty", product.terrarimumQty);
//       formData.append("terrariumPrice", product.terrariumPrice);
//       formData.append("terrariumStatus", product.terrariumStatus);
//       if (product.terrariumImg instanceof File) {
//         formData.append("terrariumImg", product.terrariumImg);
//       }
//     }

//     if (product.type === "Variants") {
//       product.variants.forEach((variant, index) => {
//         formData.append(`variants[${index}][color]`, variant.color);
//         formData.append(`variants[${index}][price]`, variant.price);
//         formData.append(`variants[${index}][qty]`, variant.qty);
//         formData.append(`variants[${index}][size]`, variant.size);
//         variant.images.forEach((img, i) => {
//           if (img instanceof File) {
//             formData.append(`variants[${index}][images][${i}]`, img);
//           }
//         });
//       });
//     }

//     try {
//       const url = isEditMode
//         ? `${config.BASE_URL}/api/updateProduct/${productId}`
//         : `${config.BASE_URL}/api/addProduct`;

//       const response = await axios[isEditMode ? "put" : "post"](url, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           // "Content-Type": "multipart/form-data",
//         },
//       });

//       toast.success(`Product ${isEditMode ? "updated" : "added"} successfully!`);
//       navigate("/admin/product-list");
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       toast.error(error.response?.data?.message || "Failed to save product");
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.headContainer}>
//         <h2>{isEditMode ? "Update Product" : "Add a New Product"}</h2>
//         <Button type="submit" onClick={handleSubmit}>
//           {isEditMode ? "Update Product" : "Add Product"}
//         </Button>
//       </div>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         {/* <Button type="submit">
//           {isEditMode ? "Update Product" : "Add Product"}
//         </Button> */}

//         <div className={styles.grid}>
//           <div className={styles.leftColumn}>
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Product Information</h3>
//               <div className={styles.inputGroup}>
//                 <Input
//                   name="name"
//                   placeholder="Product Name"
//                   onChange={handleChange}
//                   value={product.name}
//                   required
//                 />
//                 <Textarea
//                   name="description"
//                   placeholder="Description (Optional)"
//                   onChange={handleChange}
//                   value={product.description}
//                   rows="6"
//                 />

//                 <div className={styles.inputGroup}>
//                   {/* Main Category Dropdown */}
//                   <select
//                     name="cat"
//                     onChange={handleCategoryChange}
//                     value={product.cat}
//                     required
//                     className={styles.selectInput} // Make sure this is styled in your CSS module
//                   >
//                     <option value="" disabled>
//                       Select Main Category
//                     </option>
//                     <option value="plants">Plants</option>
//                     <option value="pots">Pots</option>
//                   </select>

//                   {/* Subcategory Dropdown */}
//                   {product.cat && (
//                     <select
//                       name="category"
//                       onChange={handleCategoryChange}
//                       value={product.category}
//                       required
//                       className={`${styles.selectInput} ${styles.subcategorySelect}`} // optional extra class
//                     >
//                       <option value="" disabled>
//                         Select Subcategory
//                       </option>

//                       {product.cat === "plants" &&
//                         plantCategories.map((cat) => (
//                           <option key={cat.categoryId} value={cat.categoryName}>
//                             {cat.categoryName}
//                           </option>
//                         ))}

//                       {product.cat === "pots" &&
//                         potCategories.map((cat) => (
//                           <option
//                             key={cat.potCategoryId}
//                             value={cat.potCategoryName}
//                           >
//                             {cat.potCategoryName}
//                           </option>
//                         ))}
//                     </select>
//                   )}
//                 </div>
//               </div>
//             </div>

//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Pickup Location</h3>
//               <div className={styles.inputGroup}>
//                 <Input
//                   name="pickupLocation"
//                   onChange={handleChange}
//                   value={product.pickupLocation}
//                   placeholder="Pickup Location"
//                   required
//                 />
//               </div>
//             </div>

//             {/* <Button type="submit">
//               {isEditMode ? "Update Product" : "Add Product"}
//             </Button> */}
//           </div>

//           <div className={styles.rightColumn}>
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Type</h3>

//               <select
//                 name="type"
//                 onChange={handleChange}
//                 value={product.type}
//                 required
//                 className={styles.selectInput}
//               >
//                 <option value="" disabled>
//                   Select Type
//                 </option>
//                 <option value="Variants">Variants</option>
//                 <option value="TERRARIUM">Terrarium</option>
//               </select>

//               {/* Terrarium Section */}
//               {product.type === "TERRARIUM" && (
//                 <div className={styles.terrariumSection}>
//                   <Input
//                     name="terrarimumQty"
//                     placeholder="Terrarium Qty"
//                     value={product.terrarimumQty}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Input
//                     name="terrariumPrice"
//                     placeholder="Terrarium Price"
//                     value={product.terrariumPrice}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Input
//                     name="terrariumStatus"
//                     placeholder="Terrarium Status"
//                     value={product.terrariumStatus}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     name="terrariumImg"
//                     onChange={(e) =>
//                       setProduct((prev) => ({
//                         ...prev,
//                         terrariumImg: e.target.files[0],
//                       }))
//                     }
//                   />
//                 </div>
//               )}

//               {/* Variants Section */}
//               {product.type === "Variants" &&
//                 Array.isArray(product.variants) &&
//                 product.variants.map((variant, index) => (
//                   <div key={index} className={styles.variantContainer}>
//                     <IoIosClose
//                       className={styles.closeIcon}
//                       onClick={() => removeVariant(index)}
//                     />
//                     <div className={styles.variantContent}>
//                       <div className={styles.variantDetails}>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Color</label>
//                           <Input
//                             name="color"
//                             placeholder="Color"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.color}
//                             required
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Price</label>
//                           <Input
//                             name="price"
//                             type="number"
//                             placeholder="Price"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.price}
//                             required
//                             min="0"
//                             step="0.01"
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Quantity</label>
//                           <Input
//                             name="qty"
//                             type="number"
//                             placeholder="Quantity"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.qty}
//                             required
//                             min="0"
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Size</label>
//                           <Input
//                             name="size"
//                             placeholder="Size"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.size}
//                             required
//                           />
//                         </div>
//                       </div>

//                       <div className={styles.imageHeader}>
//                         <h3 className={styles.sectionTitle}>
//                           Product Image Upload
//                         </h3>
//                       </div>
//                       <label className={styles.imageUpload}>
//                         <div className={styles.dragDrop}>
//                           <FiUpload className={styles.uploadIcon} />
//                           <p className={styles.uploadText}>
//                             Drag and Drop Your Image Here.
//                           </p>
//                           <span className={styles.orText}>or</span>
//                           <span className={styles.browseButton}>
//                             Browse Image
//                           </span>
//                         </div>
//                         <Input
//                           type="file"
//                           multiple
//                           onChange={(e) => handleImageChange(index, e)}
//                           className={styles.fileInput}
//                           accept="image/*"
//                         />
//                       </label>

//                       <div className={styles.imageAfterUpload}>
//                         <div className={styles.imageHeader}>
//                           <h3 className={styles.sectionTitle}>
//                             Image After Uploaded
//                           </h3>
//                         </div>
//                         {variant.images.length > 0 ? (
//                           <div className={styles.imagePreview}>
//                             {variant.images.map((image, i) => (
//                               <img
//                                 key={i}
//                                 src={URL.createObjectURL(image)}
//                                 alt={`Preview ${i}`}
//                                 className={styles.imageThumbnail}
//                               />
//                             ))}
//                           </div>
//                         ) : (
//                           <p className={styles.noImages}>
//                             No images uploaded yet.
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}

//               {/* Add Variant Button (only if type is Variants) */}
//               {product.type === "Variants" && (
//                 <div className={styles.addVariantBtn}>
//                   <Button type="button" onClick={addVariant}>
//                     <span className={styles.buttonContent}>
//                       <FaPlus />
//                       Add Variant
//                     </span>
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

// ==============================

// import { useEffect, useState } from "react";
// import axios from "axios";
// import { Input, Textarea } from "../../../components/Input/Input";
// import Button from "../../../components/Button/Button";
// import config from "../../../config/apiconfig";
// import styles from "./AddProduct.module.css";
// import { FiUpload } from "react-icons/fi";
// import { FaPlus } from "react-icons/fa";
// import { IoIosClose } from "react-icons/io";
// import { toast } from "react-toastify";
// import { useParams, useNavigate } from "react-router-dom";

// const AddProduct = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const isEditMode = !!productId;

//   const [loading, setLoading] = useState(false);
//   const [plantCategories, setPlantCategories] = useState([]);
//   const [potCategories, setPotCategories] = useState([]);
//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     cat: "",
//     category: "",
//     pickupLocation: "",
//     variants: [{ color: "", price: "", discountedPrice: "", qty: "", size: "", images: [] }],
//     type: "",
//     terrarimumQty: "",
//     terrariumPrice: "",
//     terrariumStatus: "",
//     terrariumImg: null,
//   });

//   // Check token validity
//   const checkTokenValidity = () => {
//     if (!token) {
//       console.error("No token found in localStorage");
//       toast.error("Authentication required. Please log in.", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       return false;
//     }
//     console.log("Token:", token);
//     return true;
//   };

//   // Fetch categories
//   useEffect(() => {
//     const fetchCategories = async () => {
//       if (!checkTokenValidity()) return;
//       setLoading(true);
//       try {
//         console.log("Fetching categories with URLs:", {
//           plants: `${config.BASE_URL}/api/Allcategory`,
//           pots: `${config.BASE_URL}/api/pot-categories`,
//         });
//         const [plantRes, potRes] = await Promise.all([
//           axios.get(`${config.BASE_URL}/api/Allcategory`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get(`${config.BASE_URL}/api/pot-categories`, {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);
//         console.log("Plant Categories Response:", plantRes.data);
//         console.log("Pot Categories Response:", potRes.data);
//         const plantCategoriesArray = Array.isArray(plantRes.data)
//           ? plantRes.data
//           : plantRes.data.categories && Array.isArray(plantRes.data.categories)
//           ? plantRes.data.categories
//           : plantRes.data && typeof plantRes.data === "object" && plantRes.data.categoryId
//           ? [plantRes.data]
//           : [];
//         const potCategoriesArray = Array.isArray(potRes.data)
//           ? potRes.data
//           : potRes.data.categories && Array.isArray(potRes.data.categories)
//           ? potRes.data.categories
//           : potRes.data && typeof potRes.data === "object" && potRes.data.potCategoryId
//           ? [plantRes.data]
//           : [];
//         setPlantCategories(plantCategoriesArray);
//         setPotCategories(potCategoriesArray);
//       } catch (err) {
//         console.error("Error fetching categories:", {
//           message: err.message,
//           response: err.response ? {
//             status: err.response.status,
//             data: err.response.data,
//             headers: err.response.headers,
//           } : null,
//         });
//         toast.error(err.response?.data?.message || "Failed to fetch categories", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, [token]);

//   // Fetch product data for edit mode
//   useEffect(() => {
//     if (!isEditMode) return;

//     const fetchProduct = async () => {
//       if (!checkTokenValidity()) return;
//       setLoading(true);
//       try {
//         console.log("Fetching product with URL:", `${config.BASE_URL}/api/AllProduct`);
//         const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
//         console.log("Product Response:", response.data);
//         const foundProduct = response.data.find(p => p.id === Number(productId));
//         if (!foundProduct) {
//           toast.error("Product not found", {
//             position: "top-right",
//             autoClose: 3000,
//           });
//           return;
//         }

//         setProduct({
//           name: foundProduct.name || "",
//           description: foundProduct.description || "",
//           cat: foundProduct.cat || (foundProduct.category.includes("Pots") ? "pots" : "plants"),
//           category: foundProduct.category || "",
//           pickupLocation: foundProduct.pickupLocation || "",
//           type: foundProduct.type === "OTHER" ? "OTHER" : foundProduct.type || "",
//           terrarimumQty: foundProduct.terrarimumQty || "",
//           terrariumPrice: foundProduct.terrariumPrice || "",
//           terrariumStatus: foundProduct.terrariumStatus || "",
//           terrariumImg: null,
//           variants: foundProduct.variants?.map(v => ({
//             color: v.color || "",
//             price: v.price || "",
//             discountedPrice: v.discountedPrice || v.price || "",
//             qty: v.qty || "",
//             size: v.size || "",
//             images: [],
//           })) || [{ color: "", price: "", discountedPrice: "", qty: "", size: "", images: [] }],
//         });
//       } catch (err) {
//         console.error("Error fetching product:", {
//           message: err.message,
//           response: err.response ? {
//             status: err.response.status,
//             data: err.response.data,
//             headers: err.response.headers,
//           } : null,
//         });
//         toast.error(err.response?.data?.message || "Failed to load product data", {
//           position: "top-right",
//           autoClose: 3000,
//         });
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProduct();
//   }, [isEditMode, productId, token]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({ ...prev, [name]: value }));
//   };

//   const handleCategoryChange = (e) => {
//     const { name, value } = e.target;
//     setProduct(prev => ({
//       ...prev,
//       [name]: value,
//       ...(name === "cat" && { category: "" }),
//     }));
//   };

//   const handleVariantChange = (index, e) => {
//     const { name, value } = e.target;
//     const updatedVariants = [...product.variants];
//     updatedVariants[index][name] = value;
//     if (name === "price" && !updatedVariants[index].discountedPrice) {
//       updatedVariants[index].discountedPrice = value;
//     }
//     setProduct(prev => ({ ...prev, variants: updatedVariants }));
//   };

//   const handleImageChange = (index, e) => {
//     const updatedVariants = [...product.variants];
//     updatedVariants[index].images = Array.from(e.target.files);
//     setProduct(prev => ({ ...prev, variants: updatedVariants }));
//   };

//   const addVariant = () => {
//     setProduct(prev => ({
//       ...prev,
//       variants: [...prev.variants, { color: "", price: "", discountedPrice: "", qty: "", size: "", images: [] }],
//     }));
//   };

//   const removeVariant = (index) => {
//     setProduct(prev => ({
//       ...prev,
//       variants: prev.variants.filter((_, i) => i !== index),
//     }));
//   };

//   const validateForm = () => {
//     if (!product.name.trim()) return "Product name is required";
//     if (!product.cat) return "Main category is required";
//     if (!product.category) return "Subcategory is required";
//     if (!product.pickupLocation.trim()) return "Pickup location is required";
//     if (!product.type) return "Product type is required";

//     const validCategories = product.cat === "plants"
//       ? plantCategories.map(c => c.categoryName)
//       : potCategories.map(c => c.potCategoryName);
//     if (!validCategories.includes(product.category)) {
//       return "Selected subcategory is invalid";
//     }

//     if (product.type === "TERRARIUM") {
//       if (!product.terrarimumQty) return "Terrarium quantity is required";
//       if (!product.terrariumPrice) return "Terrarium price is required";
//       if (!product.terrariumStatus) return "Terrarium status is required";
//       if (!isEditMode && !product.terrariumImg) return "Terrarium image is required";
//     }

//     if (product.type === "OTHER") {
//       for (let i = 0; i < product.variants.length; i++) {
//         const v = product.variants[i];
//         if (!v.color.trim()) return `Variant ${i + 1}: Color is required`;
//         if (!v.price) return `Variant ${i + 1}: Price is required`;
//         if (!v.qty) return `Variant ${i + 1}: Quantity is required`;
//         if (!v.size.trim()) return `Variant ${i + 1}: Size is required`;
//         if (!isEditMode && v.images.length === 0) return `Variant ${i + 1}: At least one image is required`;
//       }
//     }

//     return null;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!checkTokenValidity()) return;

//     const validationError = validateForm();
//     if (validationError) {
//       toast.error(validationError, { position: "top-right", autoClose: 3000 });
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", product.name);
//     formData.append("description", product.description);
//     formData.append("category", product.cat === "plants" ? product.category : product.category);
//     formData.append("pickupLocation", product.pickupLocation);
//     formData.append("type", product.type === "OTHER" ? "OTHER" : "TERRARIUM");

//     if (product.type === "TERRARIUM") {
//       formData.append("terrarimumQty", product.terrarimumQty);
//       formData.append("terrariumPrice", product.terrariumPrice);
//       formData.append("terrariumStatus", product.terrariumStatus);
//       if (product.terrariumImg instanceof File) {
//         formData.append("terrariumImg", product.terrariumImg);
//       }
//     }

//     if (product.type === "OTHER") {
//       product.variants.forEach((variant, index) => {
//         formData.append(`variants[${index}][color]`, variant.color);
//         formData.append(`variants[${index}][price]`, variant.price);
//         formData.append(`variants[${index}][discountedPrice]`, variant.discountedPrice || variant.price);
//         formData.append(`variants[${index}][qty]`, variant.qty);
//         formData.append(`variants[${index}][size]`, variant.size);
//         variant.images.forEach((img, i) => {
//           if (img instanceof File) {
//             formData.append(`variants[${index}][images][${i}]`, img);
//           }
//         });
//       });
//     }

//     console.log("Submitting FormData:");
//     for (let [key, value] of formData.entries()) {
//       console.log(`${key}:`, value instanceof File ? value.name : value);
//     }

//     try {
//       const url = isEditMode
//         ? `${config.BASE_URL}/api/updateProduct/${productId}`
//         : `${config.BASE_URL}/api/addProduct`;

//       const response = await axios[isEditMode ? "put" : "post"](url, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       console.log("API Response:", response.data);
//       toast.success(`Product ${isEditMode ? "updated" : "added"} successfully!`, {
//         position: "top-right",
//         autoClose: 3000,
//       });
//       navigate("/admin/product-list");
//     } catch (error) {
//       console.error("Error saving product:", {
//         message: error.message,
//         response: error.response ? {
//           status: error.response.status,
//           data: error.response.data,
//           headers: error.response.headers,
//         } : null,
//         request: error.request,
//         config: error.config,
//       });
//       toast.error(error.response?.data?.message || "Failed to save product", {
//         position: "top-right",
//         autoClose: 3000,
//       });
//     }
//   };

//   if (loading) return <p>Loading...</p>;

//   return (
//     <div className={styles.container}>
//       <div className={styles.headContainer}>
//         <h2>{isEditMode ? "Update Product" : "Add a New Product"}</h2>
//         <Button type="button" onClick={handleSubmit}>
//           {isEditMode ? "Update Product" : "Add Product"}
//         </Button>
//       </div>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.grid}>
//           <div className={styles.leftColumn}>
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Product Information</h3>
//               <div className={styles.inputGroup}>
//                 <Input
//                   name="name"
//                   placeholder="Product Name"
//                   onChange={handleChange}
//                   value={product.name}
//                   required
//                 />
//                 <Textarea
//                   name="description"
//                   placeholder="Description (Optional)"
//                   onChange={handleChange}
//                   value={product.description}
//                   rows="6"
//                 />
//                 <div className={styles.inputGroup}>
//                   <select
//                     name="cat"
//                     onChange={handleCategoryChange}
//                     value={product.cat}
//                     required
//                     className={styles.selectInput}
//                   >
//                     <option value="" disabled>
//                       Select Main Category
//                     </option>
//                     <option value="plants">Plants</option>
//                     <option value="pots">Pots</option>
//                   </select>
//                   {product.cat && (
//                     <select
//                       name="category"
//                       onChange={handleCategoryChange}
//                       value={product.category}
//                       required
//                       className={`${styles.selectInput} ${styles.subcategorySelect}`}
//                     >
//                       <option value="" disabled>
//                         Select Subcategory
//                       </option>
//                       {product.cat === "plants" &&
//                         plantCategories.map((cat) => (
//                           <option key={cat.categoryId} value={cat.categoryName}>
//                             {cat.categoryName}
//                           </option>
//                         ))}
//                       {product.cat === "pots" &&
//                         potCategories.map((cat) => (
//                           <option
//                             key={cat.potCategoryId}
//                             value={cat.potCategoryName}
//                           >
//                             {cat.potCategoryName}
//                           </option>
//                         ))}
//                     </select>
//                   )}
//                 </div>
//               </div>
//             </div>
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Pickup Location</h3>
//               <div className={styles.inputGroup}>
//                 <Input
//                   name="pickupLocation"
//                   onChange={handleChange}
//                   value={product.pickupLocation}
//                   placeholder="Pickup Location"
//                   required
//                 />
//               </div>
//             </div>
//           </div>
//           <div className={styles.rightColumn}>
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Type</h3>
//               <select
//                 name="type"
//                 onChange={handleChange}
//                 value={product.type}
//                 required
//                 className={styles.selectInput}
//               >
//                 <option value="" disabled>
//                   Select Type
//                 </option>
//                 <option value="OTHER">OTHER</option>
//                 <option value="TERRARIUM">TERRARIUM</option>
//               </select>
//               {product.type === "TERRARIUM" && (
//                 <div className={styles.terrariumSection}>
//                   <Input
//                     name="terrarimumQty"
//                     placeholder="Terrarium Qty"
//                     value={product.terrarimumQty}
//                     onChange={handleChange}
//                     required
//                   />
//                   <Input
//                     name="terrariumPrice"
//                     placeholder="Terrarium Price"
//                     value={product.terrariumPrice}
//                     onChange={handleChange}
//                     required
//                   />
//                   <select
//                     name="terrariumStatus"
//                     value={product.terrariumStatus}
//                     onChange={handleChange}
//                     required
//                   >
//                     <option value="">Select Terrarium Status</option>
//                     <option value="KIT">KIT</option>
//                     <option value="SINGLE">SINGLE</option>
//                   </select>
//                   <Input
//                     type="file"
//                     accept="image/*"
//                     name="terrariumImg"
//                     onChange={(e) =>
//                       setProduct((prev) => ({
//                         ...prev,
//                         terrariumImg: e.target.files[0],
//                       }))
//                     }
//                   />
//                 </div>
//               )}
//               {product.type === "OTHER" &&
//                 Array.isArray(product.variants) &&
//                 product.variants.map((variant, index) => (
//                   <div key={index} className={styles.variantContainer}>
//                     <IoIosClose
//                       className={styles.closeIcon}
//                       onClick={() => removeVariant(index)}
//                     />
//                     <div className={styles.variantContent}>
//                       <div className={styles.variantDetails}>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Color</label>
//                           <Input
//                             name="color"
//                             placeholder="Color"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.color}
//                             required
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Price</label>
//                           <Input
//                             name="price"
//                             type="number"
//                             placeholder="Price"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.price}
//                             required
//                             min="0"
//                             step="0.01"
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Discounted Price</label>
//                           <Input
//                             name="discountedPrice"
//                             type="number"
//                             placeholder="Discounted Price"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.discountedPrice}
//                             required
//                             min="0"
//                             step="0.01"
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Quantity</label>
//                           <Input
//                             name="qty"
//                             type="number"
//                             placeholder="Quantity"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.qty}
//                             required
//                             min="0"
//                           />
//                         </div>
//                         <div className={styles.inputGroup}>
//                           <label className={styles.label}>Size</label>
//                           <Input
//                             name="size"
//                             placeholder="Size"
//                             onChange={(e) => handleVariantChange(index, e)}
//                             value={variant.size}
//                             required
//                           />
//                         </div>
//                       </div>
//                       <div className={styles.imageHeader}>
//                         <h3 className={styles.sectionTitle}>
//                           Product Image Upload
//                         </h3>
//                       </div>
//                       <label className={styles.imageUpload}>
//                         <div className={styles.dragDrop}>
//                           <FiUpload className={styles.uploadIcon} />
//                           <p className={styles.uploadText}>
//                             Drag and Drop Your Image Here.
//                           </p>
//                           <span className={styles.orText}>or</span>
//                           <span className={styles.browseButton}>
//                             Browse Image
//                           </span>
//                         </div>
//                         <Input
//                           type="file"
//                           multiple
//                           onChange={(e) => handleImageChange(index, e)}
//                           className={styles.fileInput}
//                           accept="image/*"
//                         />
//                       </label>
//                       <div className={styles.imageAfterUpload}>
//                         <div className={styles.imageHeader}>
//                           <h3 className={styles.sectionTitle}>
//                             Image After Uploaded
//                           </h3>
//                         </div>
//                         {variant.images.length > 0 ? (
//                           <div className={styles.imagePreview}>
//                             {variant.images.map((image, i) => (
//                               <img
//                                 key={i}
//                                 src={URL.createObjectURL(image)}
//                                 alt={`Preview ${i}`}
//                                 className={styles.imageThumbnail}
//                               />
//                             ))}
//                           </div>
//                         ) : (
//                           <p className={styles.noImages}>
//                             No images uploaded yet.
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               {product.type === "OTHER" && (
//                 <div className={styles.addVariantBtn}>
//                   <Button type="button" onClick={addVariant}>
//                     <span className={styles.buttonContent}>
//                       <FaPlus />
//                       Add Variant
//                     </span>
//                   </Button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;

import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Textarea } from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import config from "../../../config/apiconfig";
import styles from "./AddProduct.module.css";
import { FiUpload, FiChevronDown, FiChevronUp } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!productId;

  const [loading, setLoading] = useState(false);
  const [plantCategories, setPlantCategories] = useState([]);
  const [potCategories, setPotCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    cat: "",
    category: "",
    pickupLocation: "",
    variants: [
      {
        color: "",
        price: "",
        discountedPrice: "",
        qty: "",
        size: "",
        images: [],
      },
    ],
    type: "",
    terrarimumQty: "",
    terrariumPrice: "",
    terrariumStatus: "",
    terrariumImg: null,
  });

  // State for dropdown open/closed
  const [isMainCatOpen, setIsMainCatOpen] = useState(false);
  const [isSubCatOpen, setIsSubCatOpen] = useState(false);
  const [isTerrariumStatusOpen, setIsTerrariumStatusOpen] = useState(false);
  const [isTypeOpen, setIsTypeOpen] = useState(false); // Added missing state

  const checkTokenValidity = () => {
    if (!token) {
      console.error("No token found in localStorage");
      toast.error("Authentication required. Please log in.", {
        position: "top-right",
        autoClose: 3000,
      });
      return false;
    }
    console.log("Token:", token);
    return true;
  };

  useEffect(() => {
    const fetchCategories = async () => {
      if (!checkTokenValidity()) return;
      setLoading(true);
      try {
        console.log("Fetching categories with URLs:", {
          plants: `${config.BASE_URL}/api/Allcategory`,
          pots: `${config.BASE_URL}/api/pot-categories`,
        });
        const [plantRes, potRes] = await Promise.all([
          axios.get(`${config.BASE_URL}/api/Allcategory`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${config.BASE_URL}/api/pot-categories`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        const plantCategoriesArray = Array.isArray(plantRes.data)
          ? plantRes.data
          : plantRes.data.categories && Array.isArray(plantRes.data.categories)
          ? plantRes.data.categories
          : plantRes.data &&
            typeof plantRes.data === "object" &&
            plantRes.data.categoryId
          ? [plantRes.data]
          : [];
        const potCategoriesArray = Array.isArray(potRes.data)
          ? potRes.data
          : potRes.data.categories && Array.isArray(potRes.data.categories)
          ? potRes.data.categories
          : potRes.data &&
            typeof potRes.data === "object" &&
            plantRes.data.potCategoryId
          ? [plantRes.data]
          : [];
        setPlantCategories(plantCategoriesArray);
        setPotCategories(potCategoriesArray);
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error(
          err.response?.data?.message || "Failed to fetch categories",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (!isEditMode) return;
    const fetchProduct = async () => {
      if (!checkTokenValidity()) return;
      setLoading(true);
      try {
        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const foundProduct = response.data.find(
          (p) => p.id === Number(productId)
        );
        if (!foundProduct) {
          toast.error("Product not found", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
        setProduct({
          name: foundProduct.name || "",
          description: foundProduct.description || "",
          cat:
            foundProduct.cat ||
            (foundProduct.category.includes("Pots") ? "pots" : "plants"),
          category: foundProduct.category || "",
          pickupLocation: foundProduct.pickupLocation || "",
          type:
            foundProduct.type === "OTHER"
              ? "Variants"
              : foundProduct.type || "",
          terrarimumQty: foundProduct.terrarimumQty || "",
          terrariumPrice: foundProduct.terrariumPrice || "",
          terrariumStatus: foundProduct.terrariumStatus || "",
          terrariumImg: null,
          variants: foundProduct.variants?.map((v) => ({
            color: v.color || "",
            price: v.price || "",
            discountedPrice: v.discountedPrice || v.price || "",
            qty: v.qty || "",
            size: v.size || "",
            images: [],
          })) || [
            {
              color: "",
              price: "",
              discountedPrice: "",
              qty: "",
              size: "",
              images: [],
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching product:", err);
        toast.error(
          err.response?.data?.message || "Failed to load product data",
          {
            position: "top-right",
            autoClose: 3000,
          }
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [isEditMode, productId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "cat" && { category: "" }),
    }));
  };

  const handleVariantChange = (index, e) => {
    const { name, value } = e.target;
    const updatedVariants = [...product.variants];
    updatedVariants[index][name] = value;
    if (name === "price" && !updatedVariants[index].discountedPrice) {
      updatedVariants[index].discountedPrice = value;
    }
    setProduct((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleImageChange = (index, e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) {
      console.warn(`No files selected for Variant ${index}`);
      toast.warn("Please select at least one image for the variant", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    console.log(
      `Variant ${index} images selected:`,
      files.map((f) => f.name)
    );
    const validFiles = files.filter(
      (f) => f instanceof File && f.type.startsWith("image/")
    );
    if (validFiles.length === 0) {
      console.warn(`No valid image files selected for Variant ${index}`);
      toast.warn("Selected files are not valid images", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    const updatedVariants = [...product.variants];
    updatedVariants[index].images = validFiles;
    setProduct((prev) => ({ ...prev, variants: updatedVariants }));
  };

  const handleTerrariumImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.warn("No file selected for Terrarium image");
      toast.warn("Please select an image for the terrarium", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    if (!(file instanceof File) || !file.type.startsWith("image/")) {
      console.warn("Selected terrarium file is not a valid image:", file);
      toast.warn("Selected file is not a valid image", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    console.log("Terrarium image selected:", file.name);
    setProduct((prev) => ({ ...prev, terrariumImg: file }));
  };

  const handleDrop = (index, e, isTerrarium = false) => {
    e.preventDefault();
    e.stopPropagation();
    const files = Array.from(e.dataTransfer.files || []).filter((f) =>
      f.type.startsWith("image/")
    );
    if (files.length === 0) {
      console.warn(
        `No valid image files dropped for ${
          isTerrarium ? "Terrarium" : `Variant ${index}`
        }`
      );
      toast.warn("Dropped files are not valid images", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }
    console.log(
      `${isTerrarium ? "Terrarium" : `Variant ${index}`} images dropped:`,
      files.map((f) => f.name)
    );
    if (isTerrarium) {
      setProduct((prev) => ({ ...prev, terrariumImg: files[0] }));
    } else {
      const updatedVariants = [...product.variants];
      updatedVariants[index].images = files;
      setProduct((prev) => ({ ...prev, variants: updatedVariants }));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const addVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [
        ...prev.variants,
        {
          color: "",
          price: "",
          discountedPrice: "",
          qty: "",
          size: "",
          images: [],
        },
      ],
    }));
  };

  const removeVariant = (index) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index),
    }));
  };

  const validateForm = () => {
    if (!product.name.trim()) return "Product name is required";
    if (!product.cat) return "Main category is required";
    if (!product.category) return "Subcategory is required";
    if (!product.pickupLocation.trim()) return "Pickup location is required";
    if (!product.type) return "Product type is required";

    const validCategories =
      product.cat === "plants"
        ? plantCategories.map((c) => c.categoryName)
        : potCategories.map((c) => c.potCategoryName);
    if (!validCategories.includes(product.category)) {
      return "Selected subcategory is invalid";
    }

    if (product.type === "TERRARIUM") {
      if (!product.terrarimumQty) return "Terrarium quantity is required";
      if (!product.terrariumPrice) return "Terrarium price is required";
      if (!product.terrariumStatus) return "Terrarium status is required";
      if (!isEditMode && !product.terrariumImg)
        return "Terrarium image is required";
    }

    if (product.type === "Variants") {
      for (let i = 0; i < product.variants.length; i++) {
        const v = product.variants[i];
        if (!v.color.trim()) return `Variant ${i + 1}: Color is required`;
        if (!v.price) return `Variant ${i + 1}: Price is required`;
        if (!v.qty) return `Variant ${i + 1}: Quantity is required`;
        if (!v.size.trim()) return `Variant ${i + 1}: Size is required`;
        if (!isEditMode && v.images.length === 0)
          return `Variant ${i + 1}: At least one image is required`;
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!checkTokenValidity()) return;

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError, { position: "top-right", autoClose: 3000 });
      return;
    }

    const formData = new FormData();

    // Prepare product data as JSON Blob
    const productData = {
      name: product.name,
      description: product.description,
      category: product.cat === "plants" ? product.category : product.category,
      pickupLocation: product.pickupLocation,
      type: product.type === "Variants" ? "OTHER" : "TERRARIUM",
      ...(product.type === "TERRARIUM" && {
        terrarimumQty: product.terrarimumQty,
        terrariumPrice: product.terrariumPrice,
        terrariumStatus: product.terrariumStatus,
      }),
      ...(product.type === "Variants" && {
        variants: product.variants.map((variant) => ({
          color: variant.color,
          price: variant.price,
          discountedPrice: variant.discountedPrice || variant.price,
          qty: variant.qty,
          size: variant.size,
        })),
      }),
    };

    console.log("Product Data for Blob:", productData);
    formData.append(
      "product",
      new Blob([JSON.stringify(productData)], { type: "application/json" })
    );

    // Append images
    if (product.type === "TERRARIUM") {
      console.log("Terrarium Image:", product.terrariumImg);
      if (product.terrariumImg instanceof File) {
        formData.append("terrariumImg", product.terrariumImg);
        console.log(`Appended terrariumImg: ${product.terrariumImg.name}`);
      } else {
        console.warn("No valid terrariumImg found");
        if (!isEditMode) {
          toast.error("Terrarium image is required", {
            position: "top-right",
            autoClose: 3000,
          });
          return;
        }
      }
    } else if (product.type === "Variants") {
      let hasImages = false;
      product.variants.forEach((variant, index) => {
        console.log(`Variant ${index} Images:`, variant.images);
        variant.images.forEach((img, i) => {
          if (img instanceof File) {
            formData.append(`variants[${index}][images][${i}]`, img);
            console.log(
              `Appended variants[${index}][images][${i}]: ${img.name}`
            );
            hasImages = true;
          } else {
            console.warn(`Variant ${index} Image ${i} is not a File:`, img);
          }
        });
      });
      if (!hasImages && !isEditMode) {
        console.warn("No valid images found for any variants");
        toast.error("At least one image is required for variants", {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }

    console.log("Submitting FormData:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value instanceof File ? value.name : value);
    }

    try {
      const url = isEditMode
        ? `${config.BASE_URL}/api/updateProduct/${productId}`
        : `${config.BASE_URL}/api/addProduct`;

      const response = await axios[isEditMode ? "put" : "post"](url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("API Response:", response.data);
      toast.success(
        `Product ${isEditMode ? "updated" : "added"} successfully!`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
      navigate("/admin/product-list");
    } catch (error) {
      console.error("Error saving product:", {
        message: error.message,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers,
            }
          : null,
      });
      toast.error(
        error.response?.data?.message ||
          "Failed to save product. Please try again.",
        {
          position: "top-right",
          autoClose: 5000,
        }
      );
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.headContainer}>
        <h2>{isEditMode ? "Update Product" : "Add a New Product"}</h2>
        <Button type="button" onClick={handleSubmit}>
          {isEditMode ? "Update Product" : "Add Product"}
        </Button>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          <div className={styles.leftColumn}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Product Information</h3>
              <div className={styles.inputGroup}>
                <Input
                  name="name"
                  placeholder="Product Name"
                  onChange={handleChange}
                  value={product.name}
                  required
                />
                <Textarea
                  name="description"
                  placeholder="Description (Optional)"
                  onChange={handleChange}
                  value={product.description}
                  rows="6"
                />
                <div className={styles.inputGroup}>
                  <div className={styles.selectWrapper}>
                    <select
                      id="main-category"
                      name="cat"
                      onChange={handleCategoryChange}
                      value={product.cat}
                      required
                      className={styles.selectInput}
                      onFocus={() => setIsMainCatOpen(true)}
                      onBlur={() => setIsMainCatOpen(false)}
                    >
                      <option value="" disabled>
                        Select Main Category
                      </option>
                      <option value="plants">Plants</option>
                      <option value="pots">Pots</option>
                    </select>
                    {isMainCatOpen ? (
                      <FiChevronUp className={styles.selectIcon} />
                    ) : (
                      <FiChevronDown className={styles.selectIcon} />
                    )}
                  </div>
                  {product.cat && (
                    <div className={styles.selectWrapper}>
                      <select
                        id="sub-category"
                        name="category"
                        onChange={handleCategoryChange}
                        value={product.category}
                        required
                        className={`${styles.selectInput} ${styles.subcategorySelect}`}
                        onFocus={() => setIsSubCatOpen(true)}
                        onBlur={() => setIsSubCatOpen(false)}
                      >
                        <option value="" disabled>
                          Select Subcategory
                        </option>
                        {product.cat === "plants" &&
                          plantCategories.map((cat) => (
                            <option
                              key={cat.categoryId}
                              value={cat.categoryName}
                            >
                              {cat.categoryName}
                            </option>
                          ))}
                        {product.cat === "pots" &&
                          potCategories.map((cat) => (
                            <option
                              key={cat.potCategoryId}
                              value={cat.potCategoryName}
                            >
                              {cat.potCategoryName}
                            </option>
                          ))}
                      </select>
                      {isSubCatOpen ? (
                        <FiChevronUp className={styles.selectIcon} />
                      ) : (
                        <FiChevronDown className={styles.selectIcon} />
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Pickup Location</h3>
              <div className={styles.inputGroup}>
                <Input
                  name="pickupLocation"
                  onChange={handleChange}
                  value={product.pickupLocation}
                  placeholder="Pickup Location"
                  required
                />
              </div>
            </div>
          </div>
          <div className={styles.rightColumn}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Type</h3>
              <div className={styles.selectWrapper}>
                <select
                  name="type"
                  onChange={handleChange}
                  value={product.type}
                  required
                  className={styles.selectInput}
                  onFocus={() => setIsTypeOpen(true)}
                  onBlur={() => setIsTypeOpen(false)}
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  <option value="Variants">Variants</option>
                  <option value="TERRARIUM">Terrarium</option>
                </select>
                {isTypeOpen ? (
                  <FiChevronUp className={styles.selectIcon} />
                ) : (
                  <FiChevronDown className={styles.selectIcon} />
                )}
              </div>
              {product.type === "TERRARIUM" && (
                <div className={styles.terrariumSection}>
                  <div className={styles.inputGroup}>
                    {/* <label className={styles.label}>Terrarium Quantity</label> */}
                    <Input
                      name="qtyterrarimumQty"
                      placeholder="Terrarium Qty"
                      onChange={handleChange}
                      value={product.terrarimumQty}
                      required
                    />
                  </div>

                  <div className={styles.inputGroup}>
                    {/* <label className={styles.label}>Terrarium Price</label> */}
                    <Input
                      name="terrariumPrice"
                      placeholder="Terrarium Price"
                      onChange={handleChange}
                      value={product.terrariumPrice}
                      required
                    />
                  </div>

                  <div className={styles.selectWrapper}>
                    <select
                      name="terrariumStatus"
                      value={product.terrariumStatus}
                      onChange={handleChange}
                      required
                      className={styles.selectInput}
                      onFocus={() => setIsTerrariumStatusOpen(true)}
                      onBlur={() => setIsTerrariumStatusOpen(false)}
                    >
                      <option value="">Select Terrarium Status</option>
                      <option value="KIT">KIT</option>
                      <option value="SINGLE">SINGLE</option>
                    </select>
                    {isTerrariumStatusOpen ? (
                  <FiChevronUp className={styles.selectIcon} />
                ) : (
                  <FiChevronDown className={styles.selectIcon} />
                )}
                  </div>
                  <div
                    className={styles.imageUpload}
                    onDrop={(e) => handleDrop(0, e, true)}
                    onDragOver={handleDragOver}
                  >
                    <label className={styles.dragDrop}>
                      <FiUpload className={styles.uploadIcon} />
                      <p className={styles.uploadText}>
                        Drag and Drop Your Image Here.
                      </p>
                      <span className={styles.orText}>or</span>
                      <span className={styles.browseButton}>Browse Image</span>
                      <Input
                        type="file"
                        accept="image/*"
                        name="terrariumImg"
                        onChange={handleTerrariumImageChange}
                        className={styles.fileInput}
                      />
                    </label>
                    {product.terrariumImg && (
                      <div className={styles.imagePreview}>
                        <img
                          src={URL.createObjectURL(product.terrariumImg)}
                          alt="Terrarium Preview"
                          className={styles.imageThumbnail}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
              {product.type === "Variants" &&
                Array.isArray(product.variants) &&
                product.variants.map((variant, index) => (
                  <div key={index} className={styles.variantContainer}>
                    <IoIosClose
                      className={styles.closeIcon}
                      onClick={() => removeVariant(index)}
                    />
                    <div className={styles.variantContent}>
                      <div className={styles.variantDetails}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Color</label>
                          <Input
                            name="color"
                            placeholder="Color"
                            onChange={(e) => handleVariantChange(index, e)}
                            value={variant.color}
                            required
                          />
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Size</label>
                          <Input
                            name="size"
                            placeholder="Size"
                            onChange={(e) => handleVariantChange(index, e)}
                            value={variant.size}
                            required
                          />
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Quantity</label>
                          <Input
                            name="qty"
                            type="text"
                            placeholder="Quantity"
                            onChange={(e) => handleVariantChange(index, e)}
                            value={variant.qty}
                            required
                          />
                        </div>
                      </div>

                      <div className={styles.variantDetails}>
                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Price</label>
                          <Input
                            name="price"
                            type="text"
                            placeholder="Price"
                            onChange={(e) => handleVariantChange(index, e)}
                            value={variant.price}
                            required
                          />
                        </div>

                        <div className={styles.inputGroup}>
                          <label className={styles.label}>Discount</label>
                          <Input
                            name="discountedPrice"
                            type="text"
                            placeholder="Discounted Price"
                            onChange={(e) => handleVariantChange(index, e)}
                            value={variant.discountedPrice}
                            required
                          />
                        </div>
                      </div>
                      {/* <div className={styles.imageHeader}>
                        <h3 className={styles.sectionTitle}>
                          Product Image Upload
                        </h3>
                      </div> */}
                      <div
                        className={styles.imageUpload}
                        onDrop={(e) => handleDrop(index, e)}
                        onDragOver={handleDragOver}
                      >
                        <label className={styles.dragDrop}>
                          <FiUpload className={styles.uploadIcon} />
                          <p className={styles.uploadText}>
                            Drag and Drop Your Image Here.
                          </p>
                          <span className={styles.orText}>or</span>
                          <span className={styles.browseButton}>
                            Browse Image
                          </span>
                          <Input
                            type="file"
                            multiple
                            onChange={(e) => handleImageChange(index, e)}
                            className={styles.fileInput}
                            accept="image/*"
                          />
                        </label>
                        {variant.images.length > 0 && (
                          <div className={styles.imagePreview}>
                            {variant.images.map((image, i) => (
                              <img
                                key={i}
                                src={URL.createObjectURL(image)}
                                alt={`Preview ${i}`}
                                className={styles.imageThumbnail}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              {product.type === "Variants" && (
                <div className={styles.addVariantBtn}>
                  <Button type="button" onClick={addVariant}>
                    <span className={styles.buttonContent}>
                      <FaPlus />
                      Add Variant
                    </span>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
