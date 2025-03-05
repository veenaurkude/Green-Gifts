
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import Card from "../../components/Card/Card";
// import styles from "./Plants.module.css"; 
// import Accordion from "../../components/Accordion/Accordion";

// const Plants = () => {
//   const [plants, setPlants] = useState([]);

//   useEffect(() => {
//     async function fetchPlants() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/products`);
//         console.log("API Response:", response.data.products); // Debugging log
//         if (Array.isArray(response.data.products)) {
//           setPlants(response.data.products);
//         }
//       } catch (error) {
//         console.error("Error fetching plants:", error);
//       }
//     }
//     fetchPlants();
//   }, []);

//   return (
//     <>
//       {/* Banner Section */}
//       <div className={styles.banner}>
//         <img
//           src="https://www.ugaoo.com/cdn/shop/collections/Indoor-Plants-Category-Banner_1.png?v=1740940453&width=2000" // Update with the actual image path
//           alt="Plants Banner"
//           className={styles.bannerImage}
//         />
//         <div className={styles.bannerText}>
//           <h2>
//             Get 10% off <span>with SAVE10</span>
//           </h2>
//           <p>on orders above ₹1499/-</p>
//         </div>
//       </div>

//       {/* Breadcrumb Navigation (Optional) */}
//       <div className={styles.breadcrumb}>
//         <a href="/">Home</a> / <span>Plants</span>
//       </div>

//       {/* Page Heading & Description */}
//       <div className={styles.plantsContainer}>
//         <h1 className={styles.heading}>Plants</h1>
//         <p className={styles.description}>
//           Plants make for the best house companions, suitable for all your moods
//           and every aesthetic. <span className={styles.brandName}>Ugaoo</span>,
//           an online website for decorative plants, offers a wide variety of
//           plants so that you can buy plants online from the comfort of your
//           home!
//         </p>

//         {/* Product Grid */}
//         <div className={styles.plantsGrid}>
//           {plants.map((plant, index) => (
//             <Card
//               key={index}
//               image={plant.image}
//               title={plant.title}
//               price={plant.price}
//             />
//           ))}
//         </div>
//       </div>

//       {/* Accordion */}
//       <div className={styles.accordion_container}>
//         <h2 className={styles.title}>FAQ's</h2>
//         <div className={styles.accordion}>
//           <Accordion
//             title="🌿 What are the best indoor plants?"
//             content="Some of the best indoor plants are Snake Plant, Pothos, Peace Lily, and ZZ Plant."
//           />
//           <Accordion
//             title="☀️ How much sunlight do plants need?"
//             content="Most plants need at least 4-6 hours of indirect sunlight. Some plants, like succulents, need direct sunlight."
//           />
//           <Accordion
//             title="💧 How often should I water my plants?"
//             content="It depends on the plant type! Most indoor plants need watering once a week, while succulents need less."
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Plants;

// ===============================

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import Card from "../../components/Card/Card";
// import styles from "./Plants.module.css"; 
// import Accordion from "../../components/Accordion/Accordion";

// const Plants = () => {
//   const { category } = useParams();  // Get category from URL
//   const [plants, setPlants] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchPlants() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/products`);
//         console.log("API Response:", response.data.products); 

//         if (Array.isArray(response.data.products)) {
//           setPlants(response.data.products);
//           console.log(response.data.products);
//         }
//       } catch (error) {
//         console.error("Error fetching plants:", error);
//       }
//     }
//     fetchPlants();
//   }, []);

//   // Filter plants based on category
//   const filteredPlants = category
//     ? plants.filter((plant) => plant.category.toLowerCase() === category.toLowerCase())
//     : plants;

//   return (
//     <>
//       {/* Banner Section */}
//       <div className={styles.banner}>
//         <img
//           src="https://www.ugaoo.com/cdn/shop/collections/Indoor-Plants-Category-Banner_1.png?v=1740940453&width=2000"
//           alt="Plants Banner"
//           className={styles.bannerImage}
//         />
//         <div className={styles.bannerText}>
//           <h2>Get 10% off <span>with SAVE10</span></h2>
//           <p>on orders above ₹1499/-</p>
//         </div>
//       </div>

//       {/* Breadcrumb */}
//       <div className={styles.breadcrumb}>
//         <a href="/">Home</a> / <span>{category ? category.replace("-", " ") : "Plants"}</span>
//       </div>

//       {/* Dropdown for Categories */}
//       <div className={styles.dropdown}>
//         <select onChange={(e) => navigate(`/plants/${e.target.value}`)} value={category || ""}>
//           <option value="">All Plants</option>
//           <option value="indoor">Indoor Plants</option>
//           <option value="flowering">Flowering Plants</option>
//           <option value="hanging">Hanging Plants</option>
//         </select>
//       </div>

//       {/* Page Heading & Description */}
//       <div className={styles.plantsContainer}>
//         <h1 className={styles.heading}>{category ? category.replace("-", " ") : "All Plants"}</h1>
//         <p className={styles.description}>
//           Discover a variety of plants at <span className={styles.brandName}>Ugaoo</span>. 
//           Find the perfect plant for your home, office, or garden!
//         </p>

//         {/* Filtered Product Grid */}
//         <div className={styles.plantsGrid}>
//           {filteredPlants.length > 0 ? (
//             filteredPlants.map((plant, index) => (
//               <Card key={index} image={plant.image} title={plant.title} price={plant.price} />
//             ))
//           ) : (
//             <p>No plants found for this category.</p>
//           )}
//         </div>
//       </div>

//       {/* Accordion */}
//       <div className={styles.accordion_container}>
//         <h2 className={styles.title}>FAQ's</h2>
//         <div className={styles.accordion}>
//           <Accordion title="🌿 What are the best indoor plants?" content="Snake Plant, Pothos, Peace Lily, and ZZ Plant." />
//           <Accordion title="☀️ How much sunlight do plants need?" content="Most plants need at least 4-6 hours of indirect sunlight." />
//           <Accordion title="💧 How often should I water my plants?" content="Most indoor plants need watering once a week." />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Plants;



// // ================

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import Card from "../../components/Card/Card"; 
// import styles from "./Plants.module.css";
// import config from "../../config/apiconfig"; 
// import Accordion from "../../components/Accordion/Accordion";

// const Plants = () => {
//   const { category } = useParams();  // Get category from URL
//   const [plants, setPlants] = useState([]); // Default empty array
//   const navigate = useNavigate();

//   useEffect(() => {
//     async function fetchPlants() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/products`);
//         console.log("API Response:", response.data); // Debugging log
  
//         // Check if response has data and is an array before setting state
//         if (response.data && Array.isArray(response.data.products)) {
//           setPlants(response.data.products);
//         } else {
//           setPlants([]); // Fallback to empty array
//         }
//       } catch (error) {
//         console.error("Error fetching plants:", error);
//         setPlants([]); // Set empty array on error
//       }
//     }
//     fetchPlants();
//   }, []);

//   // Filter products based on selected category
//   const filteredPlants = category
//     ? plants.filter((plant) => plant.category.toLowerCase() === category.toLowerCase())
//     : plants;

//   return (
//     <>
//       {/* Page Title */}
//       <div>Banner</div>
//       <h1 className={styles.heading}>{category ? category.replace("-", " ") : "Plants"}</h1>

//       {/* Dropdown for Categories */}
//       <div className={styles.dropdown}>
//         <select onChange={(e) => navigate(`/plants/${e.target.value}`)} value={category || ""}>
//           <option value="">Plants</option>
//           <option value="audio">Audio</option>
//           <option value="gaming">Gaming</option>
//           <option value="mobile">Mobile</option>
//           <option value="tv">TV</option>
//         </select>
//       </div>

//       {/* Product Grid */}
//       <div className={styles.plantsGrid}>
//         {filteredPlants.length > 0 ? (
//           filteredPlants.map((plant, index) => (
//             // <Card key={index} image={plant.image} title={plant.title} price={plant.price} />
//             <Card
//               key={index}
//               image={plant.image || "default.jpg"} // Ensure an image exists
//               title={plant.title || "No Title"}
//               discount={plant.discount}
//               price={plant.price || "N/A"}
//             />
//           ))
//         ) : (
//           <p>No products found for this category.</p>
//         )}
//       </div>

//        {/* Accordion */}
//        <div className={styles.accordion_container}>
//          <h2 className={styles.title}>FAQ's</h2>
//          <div className={styles.accordion}>
//           {/* <Accordion /> */}
//            <Accordion
//             title="🌿 What are the best indoor plants?"
//             content="Some of the best indoor plants are Snake Plant, Pothos, Peace Lily, and ZZ Plant."
//           />
//           <Accordion
//             title="☀️ How much sunlight do plants need?"
//             content="Most plants need at least 4-6 hours of indirect sunlight. Some plants, like succulents, need direct sunlight."
//           />
//           <Accordion
//             title="💧 How often should I water my plants?"
//             content="It depends on the plant type! Most indoor plants need watering once a week, while succulents need less."
//           />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Plants;


// ===========


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card"; 
import styles from "./Plants.module.css";
import config from "../../config/apiconfig"; 
import Accordion from "../../components/Accordion/Accordion";
import Pagination from "../../components/Pagination/Pagination";

const Plants = () => {
  const { category } = useParams();
  const [plants, setPlants] = useState([]);
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Show 8 products per page

  useEffect(() => {
    async function fetchPlants() {
      try {
        const response = await axios.get(`${config.BASE_URL}/products`);
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data.products)) {
          setPlants(response.data.products);
        } else {
          setPlants([]);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPlants([]);
      }
    }
    fetchPlants();
  }, []);

  // Filter products based on selected category
  const filteredPlants = category
    ? plants.filter((plant) => plant.category.toLowerCase() === category.toLowerCase())
    : plants;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredPlants.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination controls
  const totalPages = Math.ceil(filteredPlants.length / productsPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div>Banner</div>
      <h1 className={styles.heading}>{category ? category.replace("-", " ") : "Plants"}</h1>

      {/* Dropdown for Categories */}
      <div className={styles.dropdown}>
        <select onChange={(e) => navigate(`/plants/${e.target.value}`)} value={category || ""}>
          <option value="">Plants</option>
          <option value="audio">Audio</option>
          <option value="gaming">Gaming</option>
          <option value="mobile">Mobile</option>
          <option value="tv">TV</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className={styles.plantsGrid}>
        {currentProducts.length > 0 ? (
          currentProducts.map((plant, index) => (
            <Card
              key={index}
              image={plant.image || "default.jpg"}
              title={plant.title || "No Title"}
              discount={plant.discount}
              price={plant.price || "N/A"}
            />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onNext={handleNext} onPrev={handlePrev} />
        // <Pagination/>
      )}

      {/* Accordion */}
      <div className={styles.accordion_container}>
        <h2 className={styles.title}>FAQ's</h2>
        <div className={styles.accordion}>
          <Accordion title="🌿 What are the best indoor plants?" content="Some of the best indoor plants are Snake Plant, Pothos, Peace Lily, and ZZ Plant." />
          <Accordion title="☀️ How much sunlight do plants need?" content="Most plants need at least 4-6 hours of indirect sunlight. Some plants, like succulents, need direct sunlight." />
          <Accordion title="💧 How often should I water my plants?" content="It depends on the plant type! Most indoor plants need watering once a week, while succulents need less." />
        </div>
      </div>
    </>
  );
};

export default Plants;
