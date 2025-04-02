
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./Category.module.css";
import Button from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";
import { FaEdit, FaTrash } from "react-icons/fa";


const PlantCategory = () => {
  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  console.log("Token being sent:", token);
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [updatedCategoryName, setUpdatedCategoryName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check token and fetch categories
  useEffect(() => {
    if (!token) {
      alert("Session expired. Please log in again.");
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
      alert("Category name cannot be empty.");
      return;
    }

    const formData = { categoryName: updatedCategoryName };
    try {
      const response = await axios.post(`${config.BASE_URL}/api/category`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Category added successfully!");
        setUpdatedCategoryName("");
        getPlantCategories();
      }
    } catch (error) {
      console.error("Error adding category:", error.response || error);
      alert("Failed to add category.");
    }
  };

  // Edit category
  const handleEditCategory = async (id) => {
    if (!updatedCategoryName.trim()) {
      alert("Category name cannot be empty.");
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
        alert("Category updated successfully!");
        setEditingCategoryId(null);
        setUpdatedCategoryName("");
        getPlantCategories();
      }
    } catch (error) {
      console.error("Error updating category:", error.response || error);
      alert("Failed to update category.");
    }
  };

  // Delete category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      const response = await axios.delete(`${config.BASE_URL}/api/deleteCategory/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 204) {
        alert("Category deleted successfully!");
        getPlantCategories();
      }
    } catch (error) {
      console.error("Delete category error:", error.response || error);
      alert(`Failed to delete category: ${error.response?.data?.message || error.message}`);
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
          placeholder="Enter category name"
          className={styles.addInput}
        />
        <Button type="submit" className={styles.addButton}>Add Plant Category</Button>
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
                          onClick={() => handleEditCategory(cat.categoryId || cat.id)}
                          className={styles.saveButton}
                        >
                          Save
                        </Button>
                        <Button
                          onClick={() => {
                            setEditingCategoryId(null);
                            setUpdatedCategoryName("");
                          }}
                          className={styles.cancelButton}
                        >
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          onClick={() => {
                            setEditingCategoryId(cat.categoryId || cat.id);
                            setUpdatedCategoryName(cat.categoryName);
                          }}
                          className={styles.editButton}
                        >
                          <FaEdit />
                        </Button>
                        <Button
                          onClick={() => handleDeleteCategory(cat.categoryId || cat.id)}
                          className={styles.deleteButton}
                        >
                          <FaTrash />
                          {/* <MdDelete/> */}
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
    </div>
  );
};

export default PlantCategory;