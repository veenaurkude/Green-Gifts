
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import config from "../../config/apiconfig";
// import Card from "../../components/Card/Card";
// import styles from "./PotsPlanters.module.css"; 
// import Accordion from "../../components/Accordion/Accordion";
// import { useParams, useNavigate, Link } from "react-router-dom";


// const PotsPlanters = () => {

//   const { category } = useParams();
//   const [pots, setPots] = useState([]);

//    const navigate = useNavigate();

//    useEffect(() => {
//     async function fetchPots() {
//       try {
//         const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
//         const token = tokenData?.jwtToken;

//         const response = await axios.get(`${config.BASE_URL}/api/pot-categories`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         });
//         console.log("API Response:", response.data);
//         setPots(response.data);
//       } catch (error) {
//         console.error("Error fetching pots:", error.response || error);
//         setPots([]);
//       }
//     }
//     fetchPots();
//   }, []); // Added navigate to dependencies


//   // Filter products based on selected category
//   // const filteredPots = category
//   //   ? pots.filter((pot) => plant.category.toLowerCase() === category.toLowerCase())
//   //   : pots;


//   return (
//     <>
//       {/* Banner Section */}
//       <div className={styles.potsBanner}>
//         <img
//           src="https://www.ugaoo.com/cdn/shop/collections/Indoor-Plants-Category-Banner_1.png?v=1740940453&width=2000" // Update with the actual image path
//           alt="Seeds Banner"
//           className={styles.potsBannerImage}
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
//         <a href="/">Home</a> / <span>Pots & Planters</span>
//       </div>

//       {/* Page Heading & Description */}
//       <div className={styles.potsContainer}>
//         <h1 className={styles.heading}>Pots & Planters</h1>
//         <p className={styles.description}>
//           Plants make for the best house companions, suitable for all your moods
//           and every aesthetic. <span className={styles.brandName}>Ugaoo</span>,
//           an online website for decorative plants, offers a wide variety of
//           plants so that you can buy plants online from the comfort of your
//           home!
//         </p>

//         {/* Product Grid */}
//         <div className={styles.potsGrid}>
//           {pots.map((pot, index) => (
//             <Card
//               key={index}
//               // image={pot.image}
//               title={pot.title}
//               price={pot.price}
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

// export default PotsPlanters;
// ============


import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
import styles from "./PotsPlanters.module.css";
import config from "../../config/apiconfig";
import Accordion from "../../components/Accordion/Accordion";
import Pagination from "../../components/Pagination/Pagination";

const PotsPlanters = () => {
  const { category } = useParams();
  const [pots, setPots] = useState([]); // Renamed for clarity
  const navigate = useNavigate();

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  useEffect(() => {
    async function getAllPots() {
      try {
        const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
        const token = tokenData?.jwtToken;
        
        const response = await axios.get(`${config.BASE_URL}/api/pot-categories`,{
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("API Response:", response.data);
        setPots(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPots([]);
      }
    }
    getAllPots();
  }, []);

  // Filter products based on selected category
  const filteredPots = category
    ? pots.filter((pot) => pot.category.toLowerCase() === category.toLowerCase())
    : pots;

  // Pagination logic for variants
  const allVariants = filteredPots.flatMap((pot) => pot.variants || []);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentVariants = allVariants.slice(indexOfFirstProduct, indexOfLastProduct);

  // Pagination controls
  const totalPages = Math.ceil(allVariants.length / productsPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  function handlePassId(id) {
    // alert(id); // Uncomment for debugging
    navigate(`/single_product/${id}`);
  }

  return (
    <>
      <div className={styles.banner}>Banner</div>

      {/* Breadcrumbs */}
      <nav className={styles.breadcrumbs}>
        <Link to="/" className={styles.breadcrumbLink}>Home</Link>
        <span className={styles.breadcrumbSeparator}>›</span>
        <span className={styles.breadcrumbActive}>
          {category ? category.replace("-", " ") : "All Plants"}
        </span>
      </nav>

      {/* Breadcrumb Navigation (Optional) */}
            <div className={styles.breadcrumb}>
              <a href="/">Home</a> / <span>Pots & Planters</span>
            </div>

      <h1 className={styles.heading}>
        {category ? category.replace("-", " ") : "All Plants"}
      </h1>

      {/* Product Grid */}
      <div className={styles.potsGrid}>
        {currentVariants.length > 0 ? (
          currentVariants.map((variant, index) => {
            const parentPlant = plants.find((p) =>
              p.variants.some((v) => v.id === variant.id)
            );
            return (
              <Card
                key={variant.id || index}
                onClick={() => handlePassId(variant.id)}
                title={parentPlant?.name || "Unnamed Plant"}
                image={variant.imageUrls?.[0] || "https://via.placeholder.com/150"}
                price={variant.price || "N/A"}
                discount={variant.discountedPrice || null} // If your Card supports it
              />
            );
          })
        ) : (
          <p className={styles.noProducts}>No products found for this category.</p>
        )}
      </div>

      {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onNext={handleNext}
          onPrev={handlePrev}
        />
      )}

      {/* Accordion */}
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

export default PotsPlanters;

// ===================