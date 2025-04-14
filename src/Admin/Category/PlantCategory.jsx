import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./Category.module.css";
import Button from "../../components/Button/Button";
import { Input } from "../../components/Input/Input";
import { RiEditLine, RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineSaveAlt, MdOutlineCancel } from "react-icons/md";
import { toast } from "react-toastify";
import Modal from "../../components/Modal/Modal";

const PlantCategory = () => {
  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  console.log("Token being sent:", token);
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null); // Track ID to delete
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check token and fetch categories
  useEffect(() => {
    if (!token) {
      toast.error("Session expired. Please log in again.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    } else {
      getPlantCategories();
    }
  }, [token, navigate]);

  // Fetch all categories
  const getPlantCategories = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/Allcategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Plant Categories Response:", response.data);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error.response || error);
      setError("Failed to load categories.");
      setLoading(false);
    }
  };

  // Add category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!updatedCategoryName.trim()) {
      toast.error("Category name cannot be empty.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    const formData = { categoryName: updatedCategoryName };
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/category`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 201) {
        toast.success("Category added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setUpdatedCategoryName("");
        getPlantCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error.response || error);
      toast.error(
        `Failed to add category: ${error.response?.data?.message || error.message}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  // Edit category
  const handleEditCategory = async (id) => {
    if (!updatedCategoryName.trim()) {
      toast.error("Category name cannot be empty.", {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await axios.put(
        `${config.BASE_URL}/api/updateCategory/${id}`,
        { categoryName: updatedCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Category updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        setEditingCategoryId(null);
        setUpdatedCategoryName("");
        getPlantCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error.response || error);
      toast.error(
        `Failed to update category: ${error.response?.data?.message || error.message}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    }
  };

  // Open Modal for Delete Confirmation
  const openDeleteModal = (id) => {
    setCategoryIdToDelete(id);
    setIsModalOpen(true);
  };

  // Close Modal
  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryIdToDelete(null);
  };

  // Handle Delete Confirmation from Modal
  const handleDelete = async () => {
    if (!categoryIdToDelete) return;

    try {
      console.log("Deleting category with ID:", categoryIdToDelete);
      const response = await axios.delete(
        `${config.BASE_URL}/api/deleteCategory/${categoryIdToDelete}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        toast.success("Category deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        getPlantCategories();
      }
    } catch (error) {
      console.error("Delete category error:", error.response || error);
      toast.error(
        `Failed to delete category: ${error.response?.data?.message || error.message}`,
        {
          position: "top-right",
          autoClose: 3000,
        }
      );
    } finally {
      closeModal(); // Close modal after attempt
    }
  };

  if (!token) return null;
  if (loading) return <p className={styles.loading}>Loading categories...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.categoryContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Manage Plant Categories</h1>
      </header>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className={styles.addForm}>
        <Input
          type="text"
          value={updatedCategoryName}
          onChange={(e) => setUpdatedCategoryName(e.target.value)}
          placeholder="Enter Plant Category Name"
          className={styles.addInput}
        />
        <Button type="submit">Add Plant Category</Button>
      </form>

      {/* Category Table */}
      <div className={styles.tableWrapper}>
        {categories.length > 0 ? (
          <table className={styles.categoryTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat.categoryId || cat.id}>
                  <td>{cat.categoryId || cat.id}</td>
                  <td>
                    {editingCategoryId === (cat.categoryId || cat.id) ? (
                      <Input
                        type="text"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                        className={styles.editInput}
                      />
                    ) : (
                      cat.categoryName
                    )}
                  </td>
                  <td className={styles.actions}>
                    {editingCategoryId === (cat.categoryId || cat.id) ? (
                      <>
                        <Button
                          onClick={() =>
                            handleEditCategory(cat.categoryId || cat.id)
                          }
                          className={styles.saveButton}
                        >
                          <MdOutlineSaveAlt />
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingCategoryId(null);
                            setUpdatedCategoryName("");
                          }}
                          className={styles.cancelButton}
                        >
                          <MdOutlineCancel />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          className={styles.actionEdit}
                          onClick={() => {
                            setEditingCategoryId(cat.categoryId || cat.id);
                            setUpdatedCategoryName(cat.categoryName);
                          }}
                        >
                          <RiEditLine />
                        </Button>
                        <Button
                          className={styles.actionDel}
                          onClick={() => openDeleteModal(cat.categoryId || cat.id)} // Trigger modal
                        >
                          <RiDeleteBin6Line />
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noCategories}>No categories found.</p>
        )}
      </div>

      {/* Modal for Delete Confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this plant category? This action cannot be undone."
      />
    </div>
  );
};

export default PlantCategory;