import React, { useState, useEffect } from "react";
import styles from "./AddWorkshop.module.css";
import config from "../../../config/apiconfig";
import axios from "axios";
import Button from "../../../components/Button/Button";
import { Input } from "../../../components/Input/Input";
import Modal from "../../../components/Modal/Modal";
import { toast } from "react-toastify";

const AddWorkshop = ({ initialData = null }) => {
  const [formData, setFormData] = useState({
    nameOfWorkShop: "",
    date: "",
    time: "",
    price: "",
  });
  const [workshops, setWorkshops] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  // Fetch all workshops
  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        console.log("Fetching workshops with URL:", `${config.BASE_URL}/api/getAllWorkShop`);
        console.log("Token:", token);
        const response = await axios.get(`${config.BASE_URL}/api/getAllWorkShop`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Workshops response:", response.data);
        // Handle different response structures
        let workshopsArray;
        if (Array.isArray(response.data)) {
          workshopsArray = response.data;
        } else if (response.data.workshops && Array.isArray(response.data.workshops)) {
          workshopsArray = response.data.workshops;
        } else if (response.data.data && Array.isArray(response.data.data)) {
          workshopsArray = response.data.data;
        } else if (
          response.data &&
          typeof response.data === "object" &&
          response.data.id &&
          response.data.nameOfWorkShop
        ) {
          // Fallback: Treat single object as an array with one item
          workshopsArray = [response.data];
        } else {
          throw new Error("Response data is not in a valid format");
        }
        // Validate workshop objects
        const validWorkshops = workshopsArray.filter(
          (ws) => ws.id && ws.nameOfWorkShop && ws.date && ws.time && ws.price
        );
        setWorkshops(validWorkshops);
        if (validWorkshops.length !== workshopsArray.length) {
          console.warn("Some workshop objects were invalid:", workshopsArray);
        }
      } catch (error) {
        console.error("Error fetching workshops:", {
          message: error.message,
          response: error.response
            ? {
                status: error.response.status,
                data: error.response.data,
                headers: error.response.headers,
              }
            : null,
          request: error.request,
          config: error.config,
        });
        alert("❌ Failed to fetch workshops");
        setWorkshops([]);
      }
    };
    if (token) {
      fetchWorkshops();
    } else {
      console.warn("No token found, skipping fetch");
      alert("Please log in to access workshops");
    }
  }, [token]);

  // Set form data for editing
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setIsEditing(true);
    } else {
      setFormData({
        nameOfWorkShop: "",
        date: "",
        time: "",
        price: "",
      });
      setIsEditing(false);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create Workshop API
  const handleCreate = async () => {
    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/createWorkShop`,
        { ...formData, price: String(formData.price) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Workshop created successfully!");
      setWorkshops([...workshops, response.data]);
      setFormData({
        nameOfWorkShop: "",
        date: "",
        time: "",
        price: "",
      });
      console.log("Created workshop:", response.data);
    } catch (error) {
      console.error("Error creating workshop:", error);
      alert("❌ Failed to create workshop");
    }
  };

  // Update Workshop API
  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `${config.BASE_URL}/api/updateWorkShop/${formData.id}`,
        { ...formData, price: String(formData.price) },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("✅ Workshop updated successfully!");
      setWorkshops(
        workshops.map((ws) => (ws.id === formData.id ? response.data : ws))
      );
      setFormData({
        nameOfWorkShop: "",
        date: "",
        time: "",
        price: "",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating workshop:", error);
      alert("❌ Failed to update workshop");
    }
  };

  // Delete Workshop
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workshop?")) {
      try {
        await axios.delete(`${config.BASE_URL}/api/deleteWorkShop/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        alert("✅ Workshop deleted successfully!");
        setWorkshops(workshops.filter((ws) => ws.id !== id));
        if (isEditing && formData.id === id) {
          setFormData({
            nameOfWorkShop: "",
            date: "",
            time: "",
            price: "",
          });
          setIsEditing(false);
        }
      } catch (error) {
        console.error("Error deleting workshop:", error);
        alert("❌ Failed to delete workshop");
      }
    }
  };

  // Edit Workshop
  const handleEdit = async (workshop) => {
    try {
      const response = await axios.get(`${config.BASE_URL}/api/getWorkShop/${workshop.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Workshop fetched for edit:", response.data);
      setFormData(response.data);
      setIsEditing(true);
    } catch (error) {
      console.error("Error fetching workshop for edit:", {
        message: error.message,
        response: error.response
          ? {
              status: error.response.status,
              data: error.response.data,
              headers: error.response.headers,
            }
          : null,
        request: error.request,
        config: error.config,
      });
      alert("❌ Failed to fetch workshop details");
      // Fallback to local data if API call fails
      setFormData(workshop);
      setIsEditing(true);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formSection}>
        <h2>{isEditing ? "Update Workshop" : "Create Workshop"}</h2>
        <div className={styles.form}>
          <label>
            Workshop Name:
            <Input
              type="text"
              name="nameOfWorkShop"
              value={formData.nameOfWorkShop}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Date:
            <Input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Time:
            <Input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Price (₹):
            <Input
              type="number"
              step="0.01"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </label>
          <Button
            type="button"
            className={styles.submitButton}
            onClick={isEditing ? handleUpdate : handleCreate}
          >
            {isEditing ? "Update" : "Create"}
          </Button>
        </div>
      </div>

      <div className={styles.workshopSection}>
        <h2>Workshop List</h2>
        <div className={styles.tableContainer}>
          <table className={styles.workshopTable}>
            <thead>
              <tr>
                <th>Workshop ID</th>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workshops.length > 0 ? (
                workshops.map((workshop) => (
                  <tr key={workshop.id}>
                    <td>{workshop.id}</td>
                    <td>{workshop.nameOfWorkShop}</td>
                    <td>{workshop.date}</td>
                    <td>{workshop.time}</td>
                    <td>₹{Number(workshop.price).toLocaleString()}</td>
                    <td>
                      <button
                        className={styles.editButton}
                        onClick={() => handleEdit(workshop)}
                      >
                        Edit
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={() => handleDelete(workshop.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className={styles.noData}>
                    No workshops available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AddWorkshop;

// import React, { useState, useEffect } from "react";
// import styles from "./AddWorkshop.module.css";
// import config from "../../../config/apiconfig";
// import Button from "../../../components/Button/Button";
// import { Input } from "../../../components/Input/Input";
// import axios from "axios";

// const AddWorkshop = ({ initialData = null }) => {
//   const [formData, setFormData] = useState({
//     nameOfWorkShop: "",
//     date: "",
//     time: "",
//     price: "",
//   });
//   const [workshops, setWorkshops] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);

//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;

//   // Fetch all workshops
//   useEffect(() => {
//     const fetchWorkshops = async () => {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/getAllWorkShop`);
//         setWorkshops(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error("Error fetching workshops:", error);
//         alert("❌ Failed to fetch workshops");
//       }
//     };
//     fetchWorkshops();
//   }, []);

//   // Set form data for editing
//   useEffect(() => {
//     if (initialData) {
//       setFormData(initialData);
//       setIsEditing(true);
//     } else {
//       setFormData({
//         nameOfWorkShop: "",
//         date: "",
//         time: "",
//         price: "",
//       });
//       setIsEditing(false);
//     }
//   }, [initialData]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Create Workshop API
//   const handleCreate = async () => {
//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/createWorkShop`,
//         { ...formData, price: String(formData.price) }, // Ensure price is a string
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("✅ Workshop created successfully!");
//       setWorkshops([...workshops, response.data]);
//       setFormData({
//         nameOfWorkShop: "",
//         date: "",
//         time: "",
//         price: "",
//       });
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error creating workshop:", error);
//       alert("❌ Failed to create workshop");
//     }
//   };

//   // Update Workshop API
//   const handleUpdate = async () => {
//     try {
//       const response = await axios.put(
//         `${config.BASE_URL}/api/updateWorkShop/${formData.id}`,
//         { ...formData, price: String(formData.price) }, // Ensure price is a string
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       alert("✅ Workshop updated successfully!");
//       setWorkshops(
//         workshops.map((ws) => (ws.id === formData.id ? response.data : ws))
//       );
//       setFormData({
//         nameOfWorkShop: "",
//         date: "",
//         time: "",
//         price: "",
//       });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating workshop:", error);
//       alert("❌ Failed to update workshop");
//     }
//   };

//   // Delete Workshop
//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this workshop?")) {
//       try {
//         await axios.delete(`${config.BASE_URL}/api/deleteWorkShop/${id}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         alert("✅ Workshop deleted successfully!");
//         setWorkshops(workshops.filter((ws) => ws.id !== id));
//         if (isEditing && formData.id === id) {
//           setFormData({
//             nameOfWorkShop: "",
//             date: "",
//             time: "",
//             price: "",
//           });
//           setIsEditing(false);
//         }
//       } catch (error) {
//         console.error("Error deleting workshop:", error);
//         alert("❌ Failed to delete workshop");
//       }
//     }
//   };

//   // Edit Workshop 
//   const handleEdit = async (workshop) => {
//     try {
//       const response = await axios.get(`${config.BASE_URL}/api/getWorkShop/${workshop.id}`);
//       setFormData(response.data);
//       setIsEditing(true);
//     } catch (error) {
//       console.error("Error fetching workshop for edit:", error);
//       alert("❌ Failed to fetch workshop details");
//       // Fallback to local data if API call fails
//       setFormData(workshop);
//       setIsEditing(true);
//     }
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.formSection}>
//         <h2>{isEditing ? "Update Workshop" : "Create Workshop"}</h2>
//         <div className={styles.form}>
//           <label>
//             Workshop Name:
//             <Input
//               type="text"
//               name="nameOfWorkShop"
//               value={formData.nameOfWorkShop}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Date:
//             <Input
//               type="date"
//               name="date"
//               value={formData.date}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Time:
//             <Input
//               type="time"
//               name="time"
//               value={formData.time}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <label>
//             Price (₹):
//             <Input
//               type="number"
//               step="0.01"
//               name="price"
//               value={formData.price}
//               onChange={handleChange}
//               required
//             />
//           </label>
//           <Button
//             type="button"
//             className={styles.submitButton}
//             onClick={isEditing ? handleUpdate : handleCreate}
//           >
//             {isEditing ? "Update" : "Create"}
//           </Button>
//         </div>
//       </div>

//       <div className={styles.workshopSection}>
//         <h2>Workshop List</h2>
//         <div className={styles.tableContainer}>
//           <table className={styles.workshopTable}>
//             <thead>
//               <tr>
//                 <th>Workshop ID</th>
//                 <th>Name</th>
//                 <th>Date</th>
//                 <th>Time</th>
//                 <th>Price</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {workshops.length > 0 ? (
//                 workshops.map((workshop) => (
//                   <tr key={workshop.id}>
//                     <td>{workshop.id}</td>
//                     <td>{workshop.nameOfWorkShop}</td>
//                     <td>{workshop.date}</td>
//                     <td>{workshop.time}</td>
//                     <td>₹{Number(workshop.price).toLocaleString()}</td>
//                     <td>
//                       <button
//                         className={styles.editButton}
//                         onClick={() => handleEdit(workshop)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className={styles.deleteButton}
//                         onClick={() => handleDelete(workshop.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="6" className={styles.noData}>
//                     No workshops available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddWorkshop;