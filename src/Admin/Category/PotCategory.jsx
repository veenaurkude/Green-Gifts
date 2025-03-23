import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./Category.module.css";
import Button from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";

const PotCategory = () => {
  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const [potCategories, setPotCategories] = useState([]);
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
      getPotCategories();
    }
  }, [token, navigate]);

  // Fetch all pot categories
  const getPotCategories = async () => {
    try {
      console.log("Token being sent:", token);
      const response = await axios.get(`${config.BASE_URL}/api/pot-categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Pot Categories Response:", response.data);
      setPotCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching pot categories:", error.response || error);
      if (error.response?.status === 401) {
        alert("Unauthorized access. Please log in again.");
        navigate("/login");
      } else {
        setError("Failed to load pot categories.");
      }
      setLoading(false);
    }
  };

  // Add pot category
  const handleAddCategory = async (e) => {
    e.preventDefault();
    if (!updatedCategoryName.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    const formData = { potCategoryName: updatedCategoryName };
    try {
      const response = await axios.post(`${config.BASE_URL}/api/pot-categories`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 201) {
        alert("Pot category added successfully!");
        setUpdatedCategoryName("");
        getPotCategories();
      }
    } catch (error) {
      console.error("Error adding pot category:", error.response || error);
      alert(`Failed to add pot category: ${error.response?.data?.message || error.message}`);
    }
  };

  // Edit pot category
  const handleEditCategory = async (id) => {
    if (!updatedCategoryName.trim()) {
      alert("Category name cannot be empty.");
      return;
    }

    try {
      console.log("Editing category with ID:", id, "New Name:", updatedCategoryName);
      const response = await axios.put(
        `${config.BASE_URL}/api/pot-categories/${id}`,
        { potCategoryName: updatedCategoryName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        alert("Pot category updated successfully!");
        setEditingCategoryId(null);
        setUpdatedCategoryName("");
        getPotCategories();
      }
    } catch (error) {
      console.error("Error updating pot category:", error.response || error);
      if (error.response?.status === 401) {
        alert("Unauthorized access. Please log in again.");
        navigate("/login");
      } else {
        alert(`Failed to update pot category: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // Delete pot category
  const handleDeleteCategory = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      console.log("Deleting category with ID:", id);
      const response = await axios.delete(`${config.BASE_URL}/api/pot-categories/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 204) {
        alert("Pot category deleted successfully!");
        getPotCategories();
      }
    } catch (error) {
      console.error("Delete pot category error:", error.response || error);
      if (error.response?.status === 401) {
        alert("Unauthorized access. Please log in again.");
        navigate("/login");
      } else {
        alert(`Failed to delete pot category: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  if (!token) return null;
  if (loading) return <p className={styles.loading}>Loading pot categories...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <div className={styles.categoryContainer}>
      {/* Header */}
      <header className={styles.header}>
        <h1 className={styles.title}>Manage Pot Categories</h1>
      </header>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className={styles.addForm}>
        <Input
          type="text"
          value={updatedCategoryName}
          onChange={(e) => setUpdatedCategoryName(e.target.value)}
          placeholder="Enter pot category name"
          className={styles.addInput}
        />
        <Button type="submit" className={styles.addButton}>Add Pot Category</Button>
      </form>

      {/* Category Table */}
      <div className={styles.tableWrapper}>
        {potCategories.length > 0 ? (
          <table className={styles.categoryTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {potCategories.map((cat) => (
                <tr key={cat.potCategoryId}>
                  <td>{cat.potCategoryId}</td>
                  <td>
                    {editingCategoryId === cat.potCategoryId ? (
                      <Input
                        type="text"
                        value={updatedCategoryName}
                        onChange={(e) => setUpdatedCategoryName(e.target.value)}
                        className={styles.editInput}
                      />
                    ) : (
                      cat.potCategoryName || "Unnamed Category"
                    )}
                  </td>
                  <td className={styles.actions}>
                    {editingCategoryId === cat.potCategoryId ? (
                      <>
                        <Button
                          onClick={() => handleEditCategory(cat.potCategoryId)}
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
                            setEditingCategoryId(cat.potCategoryId);
                            setUpdatedCategoryName(cat.potCategoryName);
                          }}
                          className={styles.editButton}
                        >
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteCategory(cat.potCategoryId)}
                          className={styles.deleteButton}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.noCategories}>No pot categories found.</p>
        )}
      </div>
    </div>
  );
};

export default PotCategory;