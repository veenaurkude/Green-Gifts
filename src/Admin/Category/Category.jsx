


// import axios from "axios";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Import useNavigate
// import config from "../../config/apiconfig";

// const Category = () => {
//   const navigate = useNavigate(); // Initialize navigate
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   const [categories, setCategories] = useState([]);
//   const [editingCategoryId, setEditingCategoryId] = useState(null);
//   const [updatedCategoryName, setUpdatedCategoryName] = useState("");

//   // Check token on mount and redirect if invalid
//   useEffect(() => {
//     if (!token) {
//       alert("Session expired. Please log in again.");
//       navigate("/login");
//     } else {
//       getAllCategories();
//     }
//   }, [token, navigate]);

//   // Fetch All Categories
//   const getAllCategories = async () => {
//     try {
//       const response = await axios.get(`${config.BASE_URL}/api/Allcategory`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       setCategories(response.data);
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching categories:", error.response || error);
//     }
//   };

//   // Add Category
//   const handleAddCategory = async (e) => {
//     e.preventDefault();
//     const formData = { categoryName: updatedCategoryName };

//     try {
//       const response = await axios.post(`${config.BASE_URL}/api/category`, formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.status === 201) {
//         alert("Category added successfully");
//         setUpdatedCategoryName("");
//         getAllCategories();
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error adding category:", error.response || error);
//       alert("Failed to add category.");
//     }
//   };

//   // Edit Category
//   const handleEditCategory = async (id) => {
//     if (!updatedCategoryName) {
//       alert("Category name cannot be empty.");
//       return;
//     }

//     try {
//       const response = await axios.put(
//         `${config.BASE_URL}/api/updateCategory/${id}`, // Adjust endpoint if needed
//         { categoryName: updatedCategoryName },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (response.status === 200) {
//         alert("Category updated successfully!");
//         setEditingCategoryId(null);
//         setUpdatedCategoryName("");
//         await getAllCategories(); // Wait for the fetch to complete
//         console.log(response.data);
//       }
//     } catch (error) {
//       console.error("Error updating category:", error.response || error);
//       alert("Failed to update category.");
//     }
//   };

//   // Delete Category
//   // Delete Category
//   const handleDeleteCategory = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this category?")) return;

//     try {
//       const response = await axios.delete(
//         `${config.BASE_URL}/api/deleteCategory/${id}`, // Adjust if needed
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       // Handle both 200 OK and 204 No Content as success
//       if (response.status === 200 || response.status === 204) {
//         alert("Category deleted successfully!");
//         await getAllCategories(); // Refetch to ensure sync with backend
//       } else {
//         console.warn("Unexpected status code:", response.status);
//       }
//     } catch (error) {
//       console.error("Delete category error:", {
//         status: error.response?.status,
//         data: error.response?.data,
//         message: error.message,
//       });
//       alert(
//         `Failed to delete category: ${
//           error.response?.data?.message || error.message || "Unknown error"
//         }`
//       );
//     }
//   };

//   // Early return if no token
//   if (!token) return null;

//   return (
//     <>
//       {/* Add Category Form */}
//       <form onSubmit={handleAddCategory} className="mb-4">
//         <input
//           type="text"
//           value={updatedCategoryName}
//           onChange={(e) => setUpdatedCategoryName(e.target.value)}
//           className="p-2 border border-gray-300 rounded-md"
//           placeholder="Enter Category"
//         />
//         <button
//           type="submit"
//           className="ml-2 p-2 bg-green-500 text-white rounded-md"
//         >
//           Add
//         </button>
//       </form>

//       {/* Category List */}
//       <div className="p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
//         <h2 className="text-2xl font-bold text-green-500 mb-4">Category List</h2>
//         <ul className="space-y-2">
//           {categories.length > 0 ? (
//             categories.map((cat) => (
//               <li
//                 key={cat.categoryId || cat.id}
//                 className="flex items-center justify-between p-2 bg-green-100 border border-green-400 rounded-md"
//               >
//                 {editingCategoryId === cat.categoryId ? (
//                   <input
//                     type="text"
//                     value={updatedCategoryName}
//                     onChange={(e) => setUpdatedCategoryName(e.target.value)}
//                     className="p-1 border border-gray-400 rounded-md"
//                   />
//                 ) : (
//                   <span className="text-green-600 font-medium">{cat.categoryName}</span>
//                 )}

//                 <div className="flex gap-2">
//                   {editingCategoryId === cat.categoryId ? (
//                     <>
//                       <button
//                         onClick={() => handleEditCategory(cat.categoryId)}
//                         className="text-green-500 hover:text-green-600"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingCategoryId(null)}
//                         className="text-red-500 hover:text-red-600"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => {
//                           setEditingCategoryId(cat.categoryId);
//                           setUpdatedCategoryName(cat.categoryName);
//                         }}
//                         className="text-blue-500 hover:text-blue-600"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDeleteCategory(cat.categoryId)}
//                         className="text-red-500 hover:text-red-600"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </li>
//             ))
//           ) : (
//             <p className="text-red-500">No categories found.</p>
//           )}
//         </ul>
//       </div>
//     </>
//   );
// };

// export default Category;



import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./Category.module.css";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";

const Category = () => {
  const navigate = useNavigate();
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

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
      getAllCategories();
    }
  }, [token, navigate]);

  // Fetch all categories
  const getAllCategories = async () => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/Allcategory`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
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
        getAllCategories();
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
        getAllCategories();
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
        getAllCategories();
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
        <h1 className={styles.title}>Manage Categories</h1>
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
        <Button type="submit" className={styles.addButton}>Add Category</Button>
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
                          Edit
                        </Button>
                        <Button
                          onClick={() => handleDeleteCategory(cat.categoryId || cat.id)}
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
          <p className={styles.noCategories}>No categories found.</p>
        )}
      </div>
    </div>
  );
};

export default Category;