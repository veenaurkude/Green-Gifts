import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config/apiconfig";
import styles from "./OfferBanner.module.css";
import Button from "../../components/Button/Button";
import {Input} from "../../components/Input/Input";

// Component to manage offer banners
const OfferBanner = () => {
  const navigate = useNavigate();

  // Get the token from localStorage
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;
  console.log(token);

  // State for managing banners and form inputs
  const [banners, setBanners] = useState([]); // List of banners
  const [newBanner, setNewBanner] = useState({
    name: "",
    category: "",
    discount: "",
    image: null,
  }); // New banner form data
  const [newImagePreview, setNewImagePreview] = useState(null); // Preview for new banner image
  const [editingBannerId, setEditingBannerId] = useState(null); // ID of the banner being edited
  const [updatedBanner, setUpdatedBanner] = useState({
    name: "",
    category: "",
    discount: "",
    image: "",
  }); // Updated banner form data
  const [editImagePreview, setEditImagePreview] = useState(null); // Preview for edited banner image
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Check if token exists and fetch banners on component mount
  useEffect(() => {
    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
    } else {
      getAllBanners();
    }
  }, [token, navigate]);

  // Fetch all banners from the backend
  const getAllBanners = async () => {
    try {
      console.log("Fetching banners with token:", token);
      const response = await axios.get(`${config.BASE_URL}/api/allBanner`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      console.log("Banners fetched successfully:", response.data);
      setBanners(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching banners:", error.response || error);
      if (error.response?.status === 401) {
        alert("Unauthorized access. Please log in again.");
        localStorage.removeItem("ecommerce_login");
        navigate("/login");
      } else {
        setError("Failed to load banners.");
      }
      setLoading(false);
    }
  };

  // Handle image selection for new banner and show preview
  const handleNewImageChange = (e) => {
    const file = e.target.files[0];
    setNewBanner({ ...newBanner, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setNewImagePreview(null);
    }
  };

  // Handle image selection for editing banner and show preview
  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    setUpdatedBanner({ ...updatedBanner, image: file });
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setEditImagePreview(null);
    }
  };

  // Add a new banner
  const handleAddBanner = async (e) => {
    e.preventDefault();
    if (
      !newBanner.name.trim() ||
      !newBanner.category.trim() ||
      !newBanner.discount ||
      !newBanner.image
    ) {
      alert("All fields are required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", newBanner.name);
    formData.append("category", newBanner.category);
    formData.append("discount", newBanner.discount);
    formData.append("image", newBanner.image);

    // Log FormData entries for debugging
    for (let [key, value] of formData.entries()) {
      console.log(`Add Banner FormData - ${key}:`, value);
    }

    try {
      console.log("Adding new banner with token:", token);
      const response = await axios.post(
        `${config.BASE_URL}/api/addBanner`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 201) {
        alert("Banner added successfully!");
        setNewBanner({ name: "", category: "", discount: "", image: null });
        setNewImagePreview(null);
        e.target.reset();
        getAllBanners();
      }
    } catch (error) {
      console.error("Error adding banner:", error.response || error);
      if (error.response?.status === 401) {
        alert("Unauthorized access. Please log in again.");
        localStorage.removeItem("ecommerce_login");
        navigate("/login");
      } else {
        alert(
          `Failed to add banner: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  // Update an existing banner
  const handleUpdateBanner = async (id) => {
    if (
      !updatedBanner.name.trim() ||
      !updatedBanner.category.trim() ||
      !updatedBanner.discount
    ) {
      alert("Name, category, and discount are required.");
      return;
    }

    const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
    const token = tokenData?.jwtToken;

    if (!token) {
      alert("Session expired. Please log in again.");
      navigate("/login");
      return;
    }

    const formData = new FormData();
    formData.append("name", updatedBanner.name);
    formData.append("category", updatedBanner.category);
    formData.append("discount", updatedBanner.discount.toString());

    if (updatedBanner.image) {
      formData.append("image", updatedBanner.image);
    }

    console.log("Updated Banner Data:", updatedBanner);
    console.log("FormData Entries:");
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    console.log(`PUT URL: ${config.BASE_URL}/api/updateBanner/${id}`);
    console.log("JWT Token:", token);

    try {
      const response = await axios.put(
        `${config.BASE_URL}/api/updateBanner/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Banner updated successfully!");
        setEditingBannerId(null);
        setUpdatedBanner({ name: "", category: "", discount: "", image: null });
        setEditImagePreview(null);
        getAllBanners();
      }
    } catch (error) {
      console.error("Error updating banner:", error.response || error);

      if (error.response?.status === 401) {
        alert("Unauthorized access. Please log in again.");
        localStorage.removeItem("ecommerce_login");
        navigate("/login");
      } else {
        alert(
          `Failed to update banner: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  // Delete a banner
  const handleDeleteBanner = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      console.log("Deleting banner with ID:", id);
      console.log("Token being sent for DELETE:", token);
      const response = await axios.delete(
        `${config.BASE_URL}/api/deleteBanner/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200 || response.status === 204) {
        alert("Banner deleted successfully!");
        getAllBanners();
      }
    } catch (error) {
      console.error("Delete banner error:", error.response || error);
      if (error.response?.status === 401) {
        alert("Unauthorized access. Please log in again.");
        localStorage.removeItem("ecommerce_login");
        navigate("/login");
      } else {
        alert(
          `Failed to delete banner: ${
            error.response?.data?.message || error.message
          }`
        );
      }
    }
  };

  // Render loading, error, or no token states
  if (!token) return null;
  if (loading) return <p className={styles.loading}>Loading banners...</p>;
  if (error) return <p className={styles.error}>{error}</p>;

  return (
    <>
      <div className={styles.bannerContainer}>
        {/* Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Manage Offer Banners</h1>
        </header>

        {/* Form to add a new banner */}
        <form onSubmit={handleAddBanner} className={styles.addForm}>
          <div className={styles.formGroup}>
            <Input
              type="text"
              value={newBanner.name}
              onChange={(e) =>
                setNewBanner({ ...newBanner, name: e.target.value })
              }
              placeholder="Banner Name"
              className={styles.addInput}
            />
            <Input
              type="text"
              value={newBanner.category}
              onChange={(e) =>
                setNewBanner({ ...newBanner, category: e.target.value })
              }
              placeholder="Category"
              className={styles.addInput}
            />
            <Input
              type="number"
              value={newBanner.discount}
              onChange={(e) =>
                setNewBanner({ ...newBanner, discount: e.target.value })
              }
              placeholder="Discount (%)"
              className={styles.addInput}
              step="0.1"
              min="0"
            />
            <div className={styles.imageInputWrapper}>
              <Input
                type="file"
                onChange={handleNewImageChange}
                className={styles.addInput}
                accept="image/*"
              />
              {newImagePreview && (
                <img
                  src={newImagePreview}
                  alt="New Banner Preview"
                  className={styles.imagePreview}
                />
              )}
            </div>
            <Button type="submit" className={styles.addButton}>
              Add Banner
            </Button>
          </div>
        </form>

        {/* Table to display banners */}
        <div className={styles.tableWrapper}>
          {banners.length > 0 ? (
            <table className={styles.bannerTable}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Discount (%)</th>
                  <th>Image</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id}>
                    <td>{banner.id}</td>
                    <td>
                      {editingBannerId === banner.id ? (
                        <Input
                          type="text"
                          value={updatedBanner.name}
                          onChange={(e) =>
                            setUpdatedBanner({
                              ...updatedBanner,
                              name: e.target.value,
                            })
                          }
                          className={styles.editInput}
                        />
                      ) : (
                        banner.name
                      )}
                    </td>
                    <td>
                      {editingBannerId === banner.id ? (
                        <Input
                          type="text"
                          value={updatedBanner.category}
                          onChange={(e) =>
                            setUpdatedBanner({
                              ...updatedBanner,
                              category: e.target.value,
                            })
                          }
                          className={styles.editInput}
                        />
                      ) : (
                        banner.category
                      )}
                    </td>
                    <td>
                      {editingBannerId === banner.id ? (
                        <Input
                          type="number"
                          value={updatedBanner.discount}
                          onChange={(e) =>
                            setUpdatedBanner({
                              ...updatedBanner,
                              discount: e.target.value,
                            })
                          }
                          className={styles.editInput}
                          step="0.1"
                          min="0"
                        />
                      ) : (
                        banner.discount
                      )}
                    </td>
                    <td>
                      {editingBannerId === banner.id ? (
                        <div className={styles.imageInputWrapper}>
                          <Input
                            type="file"
                            onChange={handleEditImageChange}
                            className={styles.editInput}
                            accept="image/*"
                          />
                          {editImagePreview ? (
                            <img
                              src={editImagePreview}
                              alt="Edit Banner Preview"
                              className={styles.imagePreview}
                            />
                          ) : (
                            <img
                              src={banner.image}
                              alt={banner.name}
                              className={styles.imagePreview}
                              onError={(e) => (e.target.src = "")}
                            />
                          )}
                        </div>
                      ) : (
                        <img
                          src={banner.image}
                          alt={banner.name}
                          className={styles.imagePreview}
                          onError={(e) =>
                            (e.target.src = "https://via.placeholder.com/50")
                          }
                        />
                      )}
                    </td>
                    <td className={styles.actions}>
                      {editingBannerId === banner.id ? (
                        <>
                          <Button
                            onClick={() => handleUpdateBanner(banner.id)}
                            className={styles.saveButton}
                          >
                            Save
                          </Button>
                          <Button
                            onClick={() => {
                              setEditingBannerId(null);
                              setUpdatedBanner({
                                name: "",
                                category: "",
                                discount: "",
                                image: null,
                              });
                              setEditImagePreview(null);
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
                              setEditingBannerId(banner.id);
                              setUpdatedBanner({
                                name: banner.name,
                                category: banner.category,
                                discount: banner.discount,
                                image: null,
                              });
                              setEditImagePreview(null);
                            }}
                            className={styles.editButton}
                          >
                            Edit
                          </Button>
                          <Button
                            onClick={() => handleDeleteBanner(banner.id)}
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
            <p className={styles.noBanners}>No banners found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OfferBanner;



// =============

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import styles from "./OfferBanner.module.css";
// import Button from "../../components/Button/Button";
// import Input from "../../components/Input/Input";

// // Component to manage offer banners
// const OfferBanner = () => {
//   const navigate = useNavigate();

//   // Get the token from localStorage
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   // State for managing banners and form inputs
//   const [banners, setBanners] = useState([]); // List of banners
//   const [newBanner, setNewBanner] = useState({
//     name: "",
//     category: "",
//     discount: "",
//     image: null,
//   }); // New banner form data
//   const [newImagePreview, setNewImagePreview] = useState(null); // Preview for new banner image
//   const [editingBannerId, setEditingBannerId] = useState(null); // ID of the banner being edited
//   const [updatedBanner, setUpdatedBanner] = useState({
//     name: "",
//     category: "",
//     discount: "",
//     image: "",
//   }); // Updated banner form data
//   const [editImagePreview, setEditImagePreview] = useState(null); // Preview for edited banner image
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(null); // Error state

//   // Check if token exists and fetch banners on component mount
//   useEffect(() => {
//     if (!token) {
//       alert("Session expired. Please log in again.");
//       navigate("/login");
//     } else {
//       getAllBanners();
//     }
//   }, [token, navigate]);

//   // Fetch all banners from the backend
//   const getAllBanners = async () => {
//     try {
//       console.log("Fetching banners with token:", token);
//       const response = await axios.get(`${config.BASE_URL}/api/allBanner`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       console.log("Banners fetched successfully:", response.data);
//       setBanners(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching banners:", error.response || error);
//       if (error.response?.status === 401) {
//         alert("Unauthorized access. Please log in again.");
//         localStorage.removeItem("ecommerce_login");
//         navigate("/login");
//       } else {
//         setError("Failed to load banners.");
//       }
//       setLoading(false);
//     }
//   };

//   // Handle image selection for new banner and show preview
//   const handleNewImageChange = (e) => {
//     const file = e.target.files[0];
//     setNewBanner({ ...newBanner, image: file });
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setNewImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setNewImagePreview(null);
//     }
//   };

//   // Handle image selection for editing banner and show preview
//   const handleEditImageChange = (e) => {
//     const file = e.target.files[0];
//     setUpdatedBanner({ ...updatedBanner, image: file });
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setEditImagePreview(reader.result);
//       };
//       reader.readAsDataURL(file);
//     } else {
//       setEditImagePreview(null);
//     }
//   };

//   // Add a new banner
//   const handleAddBanner = async (e) => {
//     e.preventDefault();
//     if (
//       !newBanner.name.trim() ||
//       !newBanner.category.trim() ||
//       !newBanner.discount ||
//       !newBanner.image
//     ) {
//       alert("All fields are required.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", newBanner.name);
//     formData.append("category", newBanner.category);
//     formData.append("discount", newBanner.discount);
//     formData.append("image", newBanner.image);

//     // Log FormData entries for debugging
//     for (let [key, value] of formData.entries()) {
//       console.log(`Add Banner FormData - ${key}:`, value);
//     }

//     try {
//       console.log("Adding new banner with token:", token);
//       const response = await axios.post(
//         `${config.BASE_URL}/api/addBanner`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
//       if (response.status === 201) {
//         alert("Banner added successfully!");
//         setNewBanner({ name: "", category: "", discount: "", image: null });
//         setNewImagePreview(null);
//         e.target.reset();
//         getAllBanners();
//       }
//     } catch (error) {
//       console.error("Error adding banner:", error.response || error);
//       if (error.response?.status === 401) {
//         alert("Unauthorized access. Please log in again.");
//         localStorage.removeItem("ecommerce_login");
//         navigate("/login");
//       } else {
//         alert(
//           `Failed to add banner: ${
//             error.response?.data?.message || error.message
//           }`
//         );
//       }
//     }
//   };


//   // Update an existing banner

//   const handleUpdateBanner = async (id) => {
//     const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//     const token = tokenData?.jwtToken;
  
//     if (!token) {
//       alert("Session expired. Please log in again.");
//       navigate("/login");
//       return;
//     }
  
//     console.log("Token being sent:", token); // Debugging
  
//     const formData = new FormData();
//     formData.append("name", updatedBanner.name);
//     formData.append("category", updatedBanner.category);
//     formData.append("discount", updatedBanner.discount.toString());
  
//     if (updatedBanner.image) {
//       formData.append("image", updatedBanner.image);
//     }
  
//     try {
//       const response = await axios.put(
//         `${config.BASE_URL}/api/updateBanner/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );
  
//       if (response.status === 200) {
//         alert("Banner updated successfully!");
//         setEditingBannerId(null);
//         setUpdatedBanner({ name: "", category: "", discount: "", image: null });
//         setEditImagePreview(null);
//         getAllBanners();
//       }
//     } catch (error) {
//       console.error("Error updating banner:", error.response || error);
  
//       if (error.response?.status === 401) {
//         alert("Unauthorized access. Please log in again.");
//         localStorage.removeItem("ecommerce_login");
//         navigate("/login");
//       } else {
//         alert(
//           `Failed to update banner: ${
//             error.response?.data?.message || error.message
//           }`
//         );
//       }
//     }
//   };
  

//   // Delete a banner
//   const handleDeleteBanner = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this banner?")) return;

//     try {
//       console.log("Deleting banner with ID:", id);
//       console.log("Token being sent for DELETE:", token);
//       const response = await axios.delete(
//         `${config.BASE_URL}/api/deleteBanner/${id}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );
//       if (response.status === 200 || response.status === 204) {
//         alert("Banner deleted successfully!");
//         getAllBanners();
//       }
//     } catch (error) {
//       console.error("Delete banner error:", error.response || error);
//       if (error.response?.status === 401) {
//         alert("Unauthorized access. Please log in again.");
//         localStorage.removeItem("ecommerce_login");
//         navigate("/login");
//       } else {
//         alert(
//           `Failed to delete banner: ${
//             error.response?.data?.message || error.message
//           }`
//         );
//       }
//     }
//   };

//   // Render loading, error, or no token states
//   if (!token) return null;
//   if (loading) return <p className={styles.loading}>Loading banners...</p>;
//   if (error) return <p className={styles.error}>{error}</p>;

//   return (
//     <>
//       <div className={styles.bannerContainer}>
//         {/* Header */}
//         <header className={styles.header}>
//           <h1 className={styles.title}>Manage Offer Banners</h1>
//         </header>

//         {/* Form to add a new banner */}
//         <form onSubmit={handleAddBanner} className={styles.addForm}>
//           <div className={styles.formGroup}>
//             <Input
//               type="text"
//               value={newBanner.name}
//               onChange={(e) =>
//                 setNewBanner({ ...newBanner, name: e.target.value })
//               }
//               placeholder="Banner Name"
//               className={styles.addInput}
//             />
//             <Input
//               type="text"
//               value={newBanner.category}
//               onChange={(e) =>
//                 setNewBanner({ ...newBanner, category: e.target.value })
//               }
//               placeholder="Category"
//               className={styles.addInput}
//             />
//             <Input
//               type="number"
//               value={newBanner.discount}
//               onChange={(e) =>
//                 setNewBanner({ ...newBanner, discount: e.target.value })
//               }
//               placeholder="Discount (%)"
//               className={styles.addInput}
//               step="0.1"
//               min="0"
//             />
//             <div className={styles.imageInputWrapper}>
//               <Input
//                 type="file"
//                 onChange={handleNewImageChange}
//                 className={styles.addInput}
//                 accept="image/*"
//               />
//               {newImagePreview && (
//                 <img
//                   src={newImagePreview}
//                   alt="New Banner Preview"
//                   className={styles.imagePreview}
//                 />
//               )}
//             </div>
//             <Button type="submit" className={styles.addButton}>
//               Add Banner
//             </Button>
//           </div>
//         </form>

//         {/* Table to display banners */}
//         <div className={styles.tableWrapper}>
//           {banners.length > 0 ? (
//             <table className={styles.bannerTable}>
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Category</th>
//                   <th>Discount (%)</th>
//                   <th>Image</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {banners.map((banner) => (
//                   <tr key={banner.id}>
//                     <td>{banner.id}</td>
//                     <td>
//                       {editingBannerId === banner.id ? (
//                         <Input
//                           type="text"
//                           value={updatedBanner.name}
//                           onChange={(e) =>
//                             setUpdatedBanner({
//                               ...updatedBanner,
//                               name: e.target.value,
//                             })
//                           }
//                           className={styles.editInput}
//                         />
//                       ) : (
//                         banner.name
//                       )}
//                     </td>
//                     <td>
//                       {editingBannerId === banner.id ? (
//                         <Input
//                           type="text"
//                           value={updatedBanner.category}
//                           onChange={(e) =>
//                             setUpdatedBanner({
//                               ...updatedBanner,
//                               category: e.target.value,
//                             })
//                           }
//                           className={styles.editInput}
//                         />
//                       ) : (
//                         banner.category
//                       )}
//                     </td>
//                     <td>
//                       {editingBannerId === banner.id ? (
//                         <Input
//                           type="number"
//                           value={updatedBanner.discount}
//                           onChange={(e) =>
//                             setUpdatedBanner({
//                               ...updatedBanner,
//                               discount: e.target.value,
//                             })
//                           }
//                           className={styles.editInput}
//                           step="0.1"
//                           min="0"
//                         />
//                       ) : (
//                         banner.discount
//                       )}
//                     </td>
//                     <td>
//                       {editingBannerId === banner.id ? (
//                         <div className={styles.imageInputWrapper}>
//                           <Input
//                             type="file"
//                             onChange={handleEditImageChange}
//                             className={styles.editInput}
//                             accept="image/*"
//                           />
//                           {editImagePreview ? (
//                             <img
//                               src={editImagePreview}
//                               alt="Edit Banner Preview"
//                               className={styles.imagePreview}
//                             />
//                           ) : (
//                             <img
//                               src={banner.image}
//                               alt={banner.name}
//                               className={styles.imagePreview}
//                               onError={(e) => (e.target.src = "")}
//                             />
//                           )}
//                         </div>
//                       ) : (
//                         <img
//                           src={banner.image}
//                           alt={banner.name}
//                           className={styles.imagePreview}
//                           onError={(e) =>
//                             (e.target.src = "https://via.placeholder.com/50")
//                           }
//                         />
//                       )}
//                     </td>
//                     <td className={styles.actions}>
//                       {editingBannerId === banner.id ? (
//                         <>
//                           <Button
//                             onClick={() => handleUpdateBanner(banner.id)}
//                             className={styles.saveButton}
//                           >
//                             Save
//                           </Button>
//                           <Button
//                             onClick={() => {
//                               setEditingBannerId(null);
//                               setUpdatedBanner({
//                                 name: "",
//                                 category: "",
//                                 discount: "",
//                                 image: null,
//                               });
//                               setEditImagePreview(null);
//                             }}
//                             className={styles.cancelButton}
//                           >
//                             Cancel
//                           </Button>
//                         </>
//                       ) : (
//                         <>
//                           <Button
//                             onClick={() => {
//                               setEditingBannerId(banner.id);
//                               setUpdatedBanner({
//                                 name: banner.name,
//                                 category: banner.category,
//                                 discount: banner.discount,
//                                 image: null,
//                               });
//                               setEditImagePreview(null);
//                             }}
//                             className={styles.editButton}
//                           >
//                             Edit
//                           </Button>
//                           <Button
//                             onClick={() => handleDeleteBanner(banner.id)}
//                             className={styles.deleteButton}
//                           >
//                             Delete
//                           </Button>
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p className={styles.noBanners}>No banners found.</p>
//           )}
//         </div>
//       </div>

//       {/* {banners.map((bnanner, index) => {
//         return (
//           <>
//             <p> {bnanner.name}</p>
//             <img src={bnanner.image} alt="" />
//           </>
//         );
//       })} */}
//     </>
//   );
// };

// export default OfferBanner;
