
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../../config/apiconfig";
import Card from "../../../components/Card/Card";
import Accordion from "../../../components/Accordion/Accordion";
import styles from "../Plants.module.css";

const HangingPlants = () => {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function fetchPlants() {
      try {
        const response = await axios.get(`${config.BASE_URL}/products`);
        console.log("API Response:", response.data.products); // Debugging log
        if (Array.isArray(response.data.products)) {
          setPlants(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    }
    fetchPlants();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div className={styles.banner}>
        <img
          src="https://www.ugaoo.com/cdn/shop/collections/Indoor-Plants-Category-Banner_1.png?v=1740940453&width=2000" // Update with the actual image path
          alt="Plants Banner"
          className={styles.bannerImage}
        />
        <div className={styles.bannerText}>
          <h2>
            Get 10% off <span>with SAVE10</span>
          </h2>
          <p>on orders above ₹1499/-</p>
        </div>
      </div>

      {/* Breadcrumb Navigation (Optional) */}
      <div className={styles.breadcrumb}>
        <a href="/">Home</a> / <a href="/plants">Plants</a> / <span>Indoor Plants</span>
      </div>

      {/* Page Heading & Description */}
      <div className={styles.plantsContainer}>
        <h1 className={styles.heading}>Indoor Plants</h1>
        <p className={styles.description}>
          Plants make for the best house companions, suitable for all your moods
          and every aesthetic. <span className={styles.brandName}>Ugaoo</span>,
          an online website for decorative plants, offers a wide variety of
          plants so that you can buy plants online from the comfort of your
          home!
        </p>

        {/* Product Grid */}
        <div className={styles.plantsGrid}>
          {plants.map((plant, index) => (
            <Card
              key={index}
              image={plant.image}
              title={plant.title}
              price={plant.price}
            />
          ))}
        </div>
      </div>

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

export default HangingPlants;
