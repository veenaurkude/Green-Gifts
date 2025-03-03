
import React, { useEffect, useState } from "react";
import axios from "axios";
import config from "../../config/apiconfig";
import Card from "../../components/Card/Card";
import styles from "./PlantCare.module.css"; 
import Accordion from "../../components/Accordion/Accordion";

const PlantCare = () => {
  const [seeds, setSeeds] = useState([]);

  useEffect(() => {
    async function getSeeds() {
      try {
        const response = await axios.get(`${config.BASE_URL}/products`);
        console.log("API Response:", response.data.products); // Debugging log
        if (Array.isArray(response.data.products)) {
          setSeeds(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    }
    getSeeds();
  }, []);

  return (
    <>
      {/* Banner Section */}
      <div className={styles.plantCareBanner}>
        <img
          src="https://www.ugaoo.com/cdn/shop/collections/Indoor-Plants-Category-Banner_1.png?v=1740940453&width=2000" // Update with the actual image path
          alt="Seeds Banner"
          className={styles.plantCareBannerImage}
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
        <a href="/">Home</a> / <span>Plant Care</span>
      </div>

      {/* Page Heading & Description */}
      <div className={styles.plantCareContainer}>
        <h1 className={styles.heading}>Plant Care</h1>
        <p className={styles.description}>
          Plants make for the best house companions, suitable for all your moods
          and every aesthetic. <span className={styles.brandName}>Ugaoo</span>,
          an online website for decorative plants, offers a wide variety of
          plants so that you can buy plants online from the comfort of your
          home!
        </p>

        {/* Product Grid */}
        <div className={styles.plantCareGrid}>
          {seeds.map((seed, index) => (
            <Card
              key={index}
              image={seed.image}
              title={seed.title}
              price={seed.price}
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

export default PlantCare;
