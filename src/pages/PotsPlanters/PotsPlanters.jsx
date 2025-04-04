import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Card from "../../components/Card/Card";
import styles from "./PotsPlanters.module.css";
import config from "../../config/apiconfig";
import Accordion from "../../components/Accordion/Accordion";
import Pagination from "../../components/Pagination/Pagination";
import banner2 from "../../assets/images/banner/banner2.jpg";

const PotsPlanters = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;
  const { category } = useParams();
  const [pots, setPots] = useState([]); // Renamed for clarity
  const navigate = useNavigate();
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;

  // Fetch Pot Products
  useEffect(() => {
    async function fetchPots() {
      try {
        // Conditionally set headers based on token availability
        const headers = token
          ? {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            }
          : { "Content-Type": "application/json" };

        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
          headers,
        });
        console.log("API Response:", response.data);
        setPots(response.data);
      } catch (error) {
        console.error("Error fetching plants:", error);
        // Optionally, you can handle error if needed
        setPots([]);
      }
    }
    fetchPots();
  }, [token]);


  // Filter products based on selected category
  const filteredPots = category
    ? pots.filter(
        (pot) => pot.category.toLowerCase() === category.toLowerCase()
      )
    : pots;

  // Pagination logic for variants
  const allVariants = filteredPots.flatMap((pot) => pot.variants || []);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentVariants = allVariants.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Pagination controls
  const totalPages = Math.ceil(allVariants.length / productsPerPage);
  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  // function handlePassId(id) {
  //   // alert(id); // Uncomment for debugging
  //   navigate(`product/${id}`);
  // }

  return (
    <>
      <div className={styles.potsBanner}>
        <img className={styles.potsBannerImg} src={banner2} alt="Pots Banner" />
      </div>

      {/* Breadcrumb Navigation  */}
      <div className={styles.breadcrumb}>
        <a href="/">Home</a> / <span>Pots & Planters</span>
      </div>

      <h1 className={styles.heading}>
        {category ? category.replace("-", " ") : "Pots & Planters"}
      </h1>

      {/* Product Grid */}
      <div className={styles.potsGrid}>
        {currentVariants.length > 0 ? (
          currentVariants.map((variant, index) => {
            const parentPlant = pots  .find((p) =>
              p.variants.some((v) => v.id === variant.id)
            );
            return (
              <Card
                key={variant.id || index}
                id={parentPlant?.id} // Pass parent product ID
                title={parentPlant?.name || "Unnamed Plant"}
                category={parentPlant?.category}
                image={
                  variant.imageUrls?.[0] || "https://via.placeholder.com/150"
                }
                price={variant.price || "N/A"}
                discount={variant.discountedPrice || null} // If your Card supports it
              />
            );
          })
        ) : (
          <p className={styles.noProducts}>
            No products found for this category.
          </p>
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


