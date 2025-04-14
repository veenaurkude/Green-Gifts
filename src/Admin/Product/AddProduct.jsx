import { useEffect, useState } from "react";
import axios from "axios";
import { Input, Textarea } from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import config from "../../config/apiconfig";
import styles from "./AddProduct.module.css";
import { FiUpload } from "react-icons/fi";
import { FaPlus } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const AddProduct = () => {
  const tokenData = JSON.parse(
    localStorage.getItem("ecommerce_login")
  )?.jwtToken;
  const { productId } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!productId;

  const initialProductState = {
    name: "",
    description: "",
    category: "",
    pickupLocation: "",
    variants: [{ color: "", price: "", qty: "", size: "", images: [] }],
  };

  const [product, setProduct] = useState(initialProductState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode && tokenData) {
      const fetchProduct = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `${config.BASE_URL}/api/AllProduct`,
            {
              headers: {
                Authorization: `Bearer ${tokenData}`,
                "Content-Type": "application/json",
              },
            }
          );

          const productToEdit = response.data.find(
            (p) => p.id === Number(productId)
          );
          if (productToEdit) {
            setProduct({
              name: productToEdit.name,
              description: productToEdit.description || "",
              category: productToEdit.category,
              pickupLocation: productToEdit.pickupLocation || "",
              variants: productToEdit.variants.map((variant) => ({
                color: variant.color,
                price: variant.price,
                qty: variant.qty,
                size: variant.size,
                images: [],
              })),
            });
          }
        } catch (error) {
          toast.error("Failed to load product data");
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    }
  }, [isEditMode, productId, tokenData]);

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
      variants: prevProduct.variants.filter(
        (_, index) => index !== indexToRemove
      ),
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
        }
      });
    });

    try {
      let response;
      if (isEditMode) {
        response = await axios.put(
          `${config.BASE_URL}/api/updateProduct/${productId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        response = await axios.post(
          `${config.BASE_URL}/api/addProduct`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${tokenData}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }

      toast.success(
        isEditMode
          ? "Product updated successfully!"
          : "Product added successfully!",
        { position: "top-right", autoClose: 3000 }
      );

      if (isEditMode) {
        navigate("/admin/product-list");
      } else {
        setProduct(initialProductState);
      }
    } catch (error) {
      toast.error(
        `Failed to ${isEditMode ? "update" : "add"} product: ${
          error.response?.data?.message || "Unknown error"
        }`,
        { position: "top-right", autoClose: 3000 }
      );
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.headContainer}>
        <h2>{isEditMode ? "Update Product" : "Add a New Product"}</h2>

        <Button type="submit">
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
                <Input
                  name="category"
                  onChange={handleChange}
                  value={product.category}
                  placeholder="Category"
                  required
                />
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

            {/* <Button type="submit">
              {isEditMode ? "Update Product" : "Add Product"}
            </Button> */}
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.section}>
              <h3 className={styles.sectionTitle}>Variants</h3>

              {product.variants.map((variant, index) => (
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

                    <div className={styles.imageSection}></div>
                    <div className={styles.imageHeader}>
                      <h3 className={styles.sectionTitle}>
                        Product Image Upload
                      </h3>
                    </div>
                    <label className={styles.imageUpload}>
                      <div className={styles.dragDrop}>
                        <FiUpload className={styles.uploadIcon} />
                        <p className={styles.uploadText}>
                          Drag and Drop Your Image Here.
                        </p>
                        <span className={styles.orText}>or</span>
                        <span className={styles.browseButton}>
                          Browse Image
                        </span>
                      </div>
                      <Input
                        type="file"
                        multiple
                        onChange={(e) => handleImageChange(index, e)}
                        className={styles.fileInput}
                        accept="image/*"
                      />
                    </label>

                    <div className={styles.imageAfterUpload}>
                      <div className={styles.imageHeader}>
                        <h3 className={styles.sectionTitle}>
                          Image After Uploaded
                        </h3>
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
                        <p className={styles.noImages}>
                          No images uploaded yet.
                        </p>
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
