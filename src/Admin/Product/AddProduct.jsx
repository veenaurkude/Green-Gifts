import { useState } from "react";
import axios from "axios";
import { Input, Textarea } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import config from "../../config/apiconfig";
import styles from "./AddProduct.module.css";
import { FiUpload } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify"; // Import toast

const AddProduct = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;

  // Initial state for the form
  const initialProductState = {
    name: "",
    description: "",
    category: "",
    pickupLocation: "",
    variants: [{ color: "", price: "", qty: "", size: "", images: [] }],
  };

  const [product, setProduct] = useState(initialProductState);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleVariantChange = (index, e) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index][e.target.name] = e.target.value;
    setProduct({ ...product, variants: updatedVariants });
  };

  const handleImageChange = (index, e) => {
    const updatedVariants = [...product.variants];
    updatedVariants[index].images = Array.from(e.target.files);
    setProduct({ ...product, variants: updatedVariants });
  };

  const addVariant = () => {
    setProduct({
      ...product,
      variants: [
        ...product.variants,
        { color: "", price: "", qty: "", size: "", images: [] },
      ],
    });
  };

  const removeVariant = (indexToRemove) => {
    setProduct((prevProduct) => ({
      ...prevProduct,
      variants: prevProduct.variants.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append(
      "product",
      new Blob(
        [
          JSON.stringify({
            name: product.name,
            description: product.description,
            category: product.category,
            pickupLocation: product.pickupLocation,
            variants: product.variants.map(({ images, ...variant }) => variant),
          }),
        ],
        { type: "application/json" }
      )
    );

    product.variants.forEach((variant) => {
      variant.images.forEach((image) => {
        if (image instanceof File) {
          formData.append("images", image);
        } else {
          console.error("Invalid image file detected:", image);
        }
      });
    });

    console.log("FormData Content:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

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

      // Show success toast
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 5000, // 5 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      console.log("Success:", response.data);

      // Reset the form to its initial state
      setProduct(initialProductState);
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data || error.message
      );

      // Show error toast
      toast.error(
        `Failed to add product: ${
          error.response?.data?.message || "Unknown error"
        }`,
        {
          position: "top-right",
          autoClose: 5000, // 5 seconds
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.headContainer}>
        <div className={styles.heading}>
          <h2>Add a New Product</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.grid}>
          {/* Left Column */}
          <div className={styles.leftColumn}>
            {/* Product Information */}
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
                  rows="4"
                />
                <Input
                  name="category"
                  onChange={handleChange}
                  value={product.category}
                  placeholder="Category"
                  required
                />
              </div>
            </div>

            {/* Pickup Location */}
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
            <Button type="submit">Add Product</Button>
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

                  <div className={styles.variantContent}>
                    {/* Variant Details (Top Section) */}
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
                        <label className={styles.label}>Price</label>
                        <Input
                          name="price"
                          type="number"
                          placeholder="Price"
                          onChange={(e) => handleVariantChange(index, e)}
                          value={variant.price}
                          required
                          min="0"
                          step="0.01"
                        />
                      </div>
                      <div className={styles.inputGroup}>
                        <label className={styles.label}>Quantity</label>
                        <Input
                          name="qty"
                          type="number"
                          placeholder="Quantity"
                          onChange={(e) => handleVariantChange(index, e)}
                          value={variant.qty}
                          required
                          min="0"
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
                    </div>

                    {/* Image Upload (Middle Section - Full Width) */}
                    <div className={styles.imageSection}>
                      <div className={styles.imageHeader}>
                        <h3 className={styles.sectionTitle}>Product Image Upload</h3>
                      </div>
                      <label className={styles.imageUpload}>
                        <div className={styles.dragDrop}>
                          <FiUpload className={styles.uploadIcon} />
                          <p className={styles.uploadText}>Drag and Drop Your Image Here.</p>
                          <span className={styles.orText}>or</span>
                          <span className={styles.browseButton}>Browse Image</span>
                        </div>
                        <Input
                          type="file"
                          multiple
                          onChange={(e) => handleImageChange(index, e)}
                          className={styles.fileInput}
                          accept="image/*"
                        />
                      </label>
                    </div>

                    {/* Image After Uploaded (Bottom Section - Full Width) */}
                    <div className={styles.imageAfterUpload}>
                      <div className={styles.imageHeader}>
                        <h3 className={styles.sectionTitle}>Image After Uploaded</h3>
                      </div>
                      {variant.images.length > 0 ? (
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
                      ) : (
                        <p className={styles.noImages}>No images uploaded yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className={styles.addVariantBtn}>
                <Button type="button" onClick={addVariant}>
                  <span className={styles.buttonContent}>
                    <FaPlus />
                    Add Variant
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;


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
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"))?.jwtToken;

//   const [product, setProduct] = useState({
//     name: "",
//     description: "",
//     category: "",
//     pickupLocation: "",
//     variants: [{ color: "", price: "", qty: "", size: "", images: [] }],
//   });

//   const handleChange = (e) => {
//     setProduct({ ...product, [e.target.name]: e.target.value });
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
//       variants: prevProduct.variants.filter((_, index) => index !== indexToRemove),
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
//           }),
//         ],
//         { type: "application/json" }
//       )
//     );

//     product.variants.forEach((variant) => {
//       variant.images.forEach((image) => {
//         if (image instanceof File) {
//           formData.append("images", image);
//         } else {
//           console.error("Invalid image file detected:", image);
//         }
//       });
//     });

//     console.log("FormData Content:");
//     for (let pair of formData.entries()) {
//       console.log(`${pair[0]}:`, pair[1]);
//     }

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
//       console.log("Success:", response.data);
//     } catch (error) {
//       console.error(
//         "Error adding product:",
//         error.response?.data || error.message
//       );
//       alert(
//         `Failed to add product: ${
//           error.response?.data?.message || "Unknown error"
//         }`
//       );
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.headContainer}>
//         <div className={styles.heading}>
//           <h2>Add a New Product</h2>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className={styles.form}>
//         <div className={styles.grid}>
//           {/* Left Column */}
//           <div className={styles.leftColumn}>
//             {/* Product Information */}
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Product Information</h3>
//               <div className={styles.inputGroup}>
//                 <Input
//                   name="name"
//                   placeholder="Product Name"
//                   onChange={handleChange}
//                   required
//                 />
//                 <Textarea
//                   name="description"
//                   placeholder="Description (Optional)"
//                   onChange={handleChange}
//                   rows="4"
//                 />
//                 <Input
//                   name="category"
//                   onChange={handleChange}
//                   placeholder="Category"
//                   required
//                 />
//               </div>
//             </div>

//             {/* Pickup Location */}
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Pickup Location</h3>
//               <div className={styles.inputGroup}>
//                 <Input
//                   name="pickupLocation"
//                   onChange={handleChange}
//                   placeholder="Pickup Location"
//                   required
//                 />
//               </div>
//             </div>
//             <Button type="submit">Add Product</Button>
//           </div>

//           {/* Right Column */}
//           <div className={styles.rightColumn}>
//             {/* Variants */}
//             <div className={styles.section}>
//               <h3 className={styles.sectionTitle}>Variants</h3>

//               {product.variants.map((variant, index) => (
//                 <div key={index} className={styles.variantContainer}>
//                   <IoIosClose
//                     className={styles.closeIcon}
//                     onClick={() => removeVariant(index)}
//                   />

//                   <div className={styles.variantContent}>
//                     {/* Variant Details (Top Section) */}
//                     <div className={styles.variantDetails}>
//                       <div className={styles.inputGroup}>
//                         <label className={styles.label}>Color</label>
//                         <Input
//                           name="color"
//                           placeholder="Color"
//                           onChange={(e) => handleVariantChange(index, e)}
//                           required
//                         />
//                       </div>
//                       <div className={styles.inputGroup}>
//                         <label className={styles.label}>Price</label>
//                         <Input
//                           name="price"
//                           type="number"
//                           placeholder="Price"
//                           onChange={(e) => handleVariantChange(index, e)}
//                           required
//                           min="0"
//                           step="0.01"
//                         />
//                       </div>
//                       <div className={styles.inputGroup}>
//                         <label className={styles.label}>Quantity</label>
//                         <Input
//                           name="qty"
//                           type="number"
//                           placeholder="Quantity"
//                           onChange={(e) => handleVariantChange(index, e)}
//                           required
//                           min="0"
//                         />
//                       </div>
//                       <div className={styles.inputGroup}>
//                         <label className={styles.label}>Size</label>
//                         <Input
//                           name="size"
//                           placeholder="Size"
//                           onChange={(e) => handleVariantChange(index, e)}
//                           required
//                         />
//                       </div>
//                     </div>

//                     {/* Image Upload (Middle Section - Full Width) */}
//                     <div className={styles.imageSection}>
//                       <div className={styles.imageHeader}>
//                         <h3 className={styles.sectionTitle}>Product Image Upload</h3>
//                       </div>
//                       <label className={styles.imageUpload}>
//                         <div className={styles.dragDrop}>
//                           <FiUpload className={styles.uploadIcon} />
//                           <p className={styles.uploadText}>Drag and Drop Your Image Here.</p>
//                           <span className={styles.orText}>or</span>
//                           <span className={styles.browseButton}>Browse Image</span>
//                         </div>
//                         <Input
//                           type="file"
//                           multiple
//                           onChange={(e) => handleImageChange(index, e)}
//                           className={styles.fileInput}
//                           accept="image/*"
//                         />
//                       </label>
//                     </div>

//                     {/* Image After Uploaded (Bottom Section - Full Width) */}
//                     <div className={styles.imageAfterUpload}>
//                       <div className={styles.imageHeader}>
//                         <h3 className={styles.sectionTitle}>Image After Uploaded</h3>
//                       </div>
//                       {variant.images.length > 0 ? (
//                         <div className={styles.imagePreview}>
//                           {variant.images.map((image, i) => (
//                             <img
//                               key={i}
//                               src={URL.createObjectURL(image)}
//                               alt={`Preview ${i}`}
//                               className={styles.imageThumbnail}
//                             />
//                           ))}
//                         </div>
//                       ) : (
//                         <p className={styles.noImages}>No images uploaded yet.</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}

//               <div className={styles.addVariantBtn}>
//                 <Button type="button" onClick={addVariant}>
//                   <span className={styles.buttonContent}>
//                     <FaPlus />
//                     Add Variant
//                   </span>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;
