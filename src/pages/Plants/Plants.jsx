import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useNavigate
import axios from "axios";
import Card from "../../components/Card/Card";
import styles from "./Plants.module.css";
import config from "../../config/apiconfig";
import Accordion from "../../components/Accordion/Accordion";
import Pagination from "../../components/Pagination/Pagination";

const Plants = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;
  const { category } = useParams();
  const navigate = useNavigate(); // Add this
  const [plants, setPlants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    async function fetchPlants() {
      try {
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("API Response:", response.data);
        setPlants(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
        if (error.response?.status === 401) {
          localStorage.removeItem("ecommerce_login");
          navigate("/login");
        }
        setPlants([]);
      }
    }
    fetchPlants();
  }, [token, navigate]);

  const filteredPlants = category
    ? plants.filter(
        (plant) => plant.category.toLowerCase() === category.toLowerCase()
      )
    : plants;

  const allVariants = filteredPlants.flatMap((plant) => plant.variants || []);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentVariants = allVariants.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(allVariants.length / productsPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className={styles.banner}>Banner</div>
      <div className={styles.breadcrumb}>
        <a href="/">Home</a> / <span>Plants</span>
      </div>
      <h1 className={styles.heading}>
        {category ? category.replace("-", " ") : "All Plants"}
      </h1>

      <div className={styles.plantsGrid}>
        {currentVariants.length > 0 ? (
          currentVariants.map((variant, index) => {
            const parentPlant = plants.find((p) =>
              p.variants.some((v) => v.id === variant.id)
            );
            console.log("Parent Plant ID:", parentPlant?.id); // Debug parent ID
            console.log("Variant ID:", variant.id); // Debug variant ID
            return (
              <Card
                key={variant.id || index}
                id={parentPlant?.id} // Pass parent product ID
                title={parentPlant?.name || "Unnamed Plant"}
                image={
                  variant.imageUrls?.[0] || "https://via.placeholder.com/150"
                }
                price={variant.price || "N/A"}
                discount={variant.discountedPrice || null}
              />
            );
          })
        ) : (
          <p className={styles.noProducts}>
            No products found for this category.
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      <div className={styles.accordion_container}>
        <h2 className={styles.title}>FAQ's</h2>
        <div className={styles.accordion}>
          <Accordion
            title="🌿 What are the best indoor plants?"
            content="Some of the best indoor plants are Snake Plant, Pothos, Peace Lily, and ZZ Plant."
          />
          <Accordion
            title="☀️ How much sunlight do plants need?"
            content="Most plants need at least 4-6 hours of indirect sunlight. Some plants, like succulents, need direct sunlight."
          />
          <Accordion
            title="💧 How often should I water my plants?"
            content="It depends on the plant type! Most indoor plants need watering once a week, while succulents need less."
          />
        </div>
      </div>
    </>
  );
};

export default Plants;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Card from "../../components/Card/Card";
// import styles from "./Plants.module.css";
// import config from "../../config/apiconfig";
// import Accordion from "../../components/Accordion/Accordion";
// import Pagination from "../../components/Pagination/Pagination";

// const Plants = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;
//   const { category } = useParams();
//   const [plants, setPlants] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   useEffect(() => {
//     async function fetchPlants() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("API Response:", response.data);
//         setPlants(response.data);
//       } catch (error) {
//         console.error("Error fetching plants:", error);
//         setPlants([]);
//       }
//     }
//     fetchPlants();
//   }, [token]);

//   const filteredPlants = category
//     ? plants.filter(
//         (plant) => plant.category.toLowerCase() === category.toLowerCase()
//       )
//     : plants;

//   const allVariants = filteredPlants.flatMap((plant) => plant.variants || []);
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentVariants = allVariants.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   const totalPages = Math.ceil(allVariants.length / productsPerPage);
//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };
//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   return (
//     <>
//       <div className={styles.banner}>Banner</div>
//       <div className={styles.breadcrumb}>
//         <a href="/">Home</a> / <span>Plants</span>
//       </div>
//       <h1 className={styles.heading}>
//         {category ? category.replace("-", " ") : "All Plants"}
//       </h1>

//       <div className={styles.plantsGrid}>
//         {currentVariants.length > 0 ? (
//           currentVariants.map((variant, index) => {
//             const parentPlant = plants.find((p) =>
//               p.variants.some((v) => v.id === variant.id)
//             );
//             console.log("Variant ID:", variant.id); // Debug the ID
//             return (
//               <Card
//                 key={variant.id || index}
//                 id={variant.id} // Ensure this is valid
//                 title={parentPlant?.name || "Unnamed Plant"}
//                 image={
//                   variant.imageUrls?.[0] || "https://via.placeholder.com/150"
//                 }
//                 price={variant.price || "N/A"}
//                 discount={variant.discountedPrice || null}
//               />
//             );
//           })
//         ) : (
//           <p className={styles.noProducts}>
//             No products found for this category.
//           </p>
//         )}
//       </div>

//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onNext={handleNext}
//           onPrev={handlePrev}
//         />
//       )}

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



// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import Card from "../../components/Card/Card";
// import styles from "./Plants.module.css";
// import config from "../../config/apiconfig";
// import Accordion from "../../components/Accordion/Accordion";
// import Pagination from "../../components/Pagination/Pagination";

// const Plants = () => {
//   const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//   const token = tokenData?.jwtToken;
//   console.log(token);
//   const { category } = useParams();
//   const [plants, setPlants] = useState([]); // Renamed for clarity
//   const navigate = useNavigate();

//   // Pagination states
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 8;

//   // Fetch all products
//   useEffect(() => {
//     async function fetchPlants() {
//       try {
//         const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("API Response:", response.data);
//         setPlants(response.data);
//       } catch (error) {
//         console.error("Error fetching plants:", error);
//         setPlants([]);
//       }
//     }
//     fetchPlants();
//   }, []);

//   // Filter products based on selected category
//   const filteredPlants = category
//     ? plants.filter(
//         (plant) => plant.category.toLowerCase() === category.toLowerCase()
//       )
//     : plants;

//   // Pagination logic for variants
//   const allVariants = filteredPlants.flatMap((plant) => plant.variants || []);
//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentVariants = allVariants.slice(
//     indexOfFirstProduct,
//     indexOfLastProduct
//   );

//   // Pagination controls
//   const totalPages = Math.ceil(allVariants.length / productsPerPage);
//   const handleNext = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };
//   const handlePrev = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   function handlePassId(id) {
//     alert(id); // Uncomment for debugging
//     navigate(`/product/${id}`);
//   }

//   return (
//     <>
//       <div className={styles.banner}>Banner</div>

//       {/* Breadcrumb Navigation (Optional) */}
//       <div className={styles.breadcrumb}>
//         <a href="/">Home</a> / <span>Plants</span>
//       </div>

//       <h1 className={styles.heading}>
//         {category ? category.replace("-", " ") : "All Plants"}
//       </h1>

//       {/* Product Grid */}
//       <div className={styles.plantsGrid}>
//         {currentVariants.length > 0 ? (
//           currentVariants.map((variant, index) => {
//             const parentPlant = plants.find((p) =>
//               p.variants.some((v) => v.id === variant.id)
//             );
//             return (
//               <Card
//                 key={variant.id || index}
//                 id={variant.id} // <-- Pass the ID explicitly
//                 onClick={() => handlePassId(variant.id)}
//                 title={parentPlant?.name || "Unnamed Plant"}
//                 image={
//                   variant.imageUrls?.[0] || "https://via.placeholder.com/150"
//                 }
//                 price={variant.price || "N/A"}
//                 discount={variant.discountedPrice || null} // If your Card supports it
//               />
//             );
//           })
//         ) : (
//           <p className={styles.noProducts}>
//             No products found for this category.
//           </p>
//         )}
//       </div>

//       {/* Pagination Component */}
//       {totalPages > 1 && (
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onNext={handleNext}
//           onPrev={handlePrev}
//         />
//       )}

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

// -------------------------

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
