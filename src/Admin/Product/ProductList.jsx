import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/apiconfig";
import styles from "./ProductList.module.css";
import axios from "axios";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  // Fetch Products
  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(
        "Error fetching products: " +
          (err.response?.data?.message || err.message)
      );
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setError("Please log in to view products.");
      setLoading(false);
      navigate("/login");
    } else {
      fetchProducts();
    }
  }, [token, navigate]);

  // Update Product
  const handleUpdate = (id) => {
    navigate(`/admin/add-product/${id}`); // Navigate to AddProduct with product ID
  };

  // Open Modal for Delete Confirmation
  const openDeleteModal = (id) => {
    setProductIdToDelete(id);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setProductIdToDelete(null);
  };

  // Delete Product
  const handleDelete = async () => {
    if (!productIdToDelete) return;

    try {
      const response = await axios.delete(
        `${config.BASE_URL}/api/deleteProduct/${productIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Product and its variants deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.id !== productIdToDelete)
        );
      }
    } catch (error) {
      console.error("Delete error:", error.response || error);
      toast.error(
        `Failed to delete product: ${
          error.response?.data?.message || error.message
        }`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      closeModal();
    }
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filtered products based on search term
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <p className={styles.loading}>Loading products...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <>
      <div className={styles.header}>
        <div>
          <Input
            type="text"
            placeholder="Search Product"
            className={styles.searchInput}
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        <div>
          <Button onClick={() => navigate("/admin/add-product")}>
            <span className={styles.buttonContent}>
              <FaPlus className={styles.buttonIcon} />
              Add Product
            </span>
          </Button>
        </div>
      </div>

      <div className={styles.productListContainer}>
        {filteredProducts.length === 0 ? (
          <p>No products available.</p>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.productTable}>
              <thead>
                <tr>
                  <th>PRODUCTS</th>
                  <th>CATEGORY</th>
                  <th>COLOR</th>
                  <th>SIZE</th>
                  <th>PRICE</th>
                  <th>QTY</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product) => {
                  const defaultVariant = product.variants?.[0];

                  if (!defaultVariant) return null; // skip if no variants

                  return (
                    <tr key={product.id}>
                      <td className={styles.productInfo}>
                        <img
                          src={defaultVariant.imageUrls?.[0]}
                          alt={`${product.name} ${defaultVariant.color}`}
                          className={styles.productImage}
                        />
                        <p className={styles.productTitle}>{product.name}</p>
                      </td>
                      <td>
                        <span className={styles.categoryTag}>
                          {product.category}
                        </span>
                      </td>
                      <td>{defaultVariant.color}</td>
                      <td>{defaultVariant.size}</td>
                      <td>₹{defaultVariant.price}</td>
                      <td>{defaultVariant.qty}</td>
                      <td className={styles.actions}>
                        <Button
                          className={styles.actionEdit}
                          onClick={() => handleUpdate(product.id)}
                        >
                          <RiEditLine />
                        </Button>
                        <Button
                          className={styles.actionDel}
                          onClick={() => openDeleteModal(product.id)}
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Modal for Delete Confirmation */}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          onConfirm={handleDelete}
          title="Confirm Deletion"
          message="Are you sure you want to delete this product and its variants? This action cannot be undone."
        />
      </div>
    </>
  );
};

export default ProductList;