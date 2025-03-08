import React from "react";
import styles from "./Gifting.module.css";
import { CiDeliveryTruck, CiGift, CiLocationOn } from "react-icons/ci";
import Accordion from "../../components/Accordion/Accordion";
import Testimonials from "../../components/Testimonials/Testimonials";
import Button from "../../components/Button/Button";

// Features Section Data
const features = [
  { id: 1, icon: <CiDeliveryTruck />, title: "Quick Delivery" },
  { id: 2, icon: <CiGift />, title: "Customizable" },
  { id: 3, icon: <CiLocationOn />, title: "Pan India" },
];

// Gifting Section Data
const gifts = [
  {
    id: 1,
    image: "https://natalielinda.com/wp-content/uploads/2019/06/pothos.jpg",
    title: "Personalized Gifting",
  },
  {
    id: 2,
    image: "https://ww1.prweb.com/prfiles/2014/09/11/12164346/24848.jpg",
    title: "Gift Card",
  },
  {
    id: 3,
    image:
      "https://bloomscape.com/wp-content/uploads/2019/04/bloomscape_product-monstera-slate.jpg",
    title: "Corporate Gifting",
  },
];

const Gifting = () => {
  return (
    <div className={styles.container}>
      {/* Features Section */}
      <div className={styles.features}>
        {features.map((feature) => (
          <div key={feature.id} className={styles.featureCard}>
            <span className={styles.featureIcon}>{feature.icon}</span>
            <p className={styles.featureTitle}>{feature.title}</p>
          </div>
        ))}
      </div>

      {/* Gifting Section */}
      <div className={styles.giftingContainer}>
        <div className={styles.giftList}>
          {gifts.map((gift) => (
            <div key={gift.id} className={styles.giftCard}>
              <img
                src={gift.image}
                alt={gift.title}
                className={styles.giftImage}
              />
              <p className={styles.giftTitle}>{gift.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Image with Text Section */}

      <div className={styles.sectionContainer}>
      {/* ✅ Image Section */}
      <div className={styles.imgSection}>
        <img 
          src="https://www.ugaoo.com/cdn/shop/files/Personalised_Gifting_2_3ee10d87-7f84-4648-9035-23acac6a05c3.png?v=1738808360&width=1100"
          alt="Personalized Gifting"
        />
      </div>

      {/* ✅ Text Section */}
      <div className={styles.textSection}>
        <h2>Personalised Gifting</h2>
        <p>
          Send some love to your friends & family with our carefully selected 
          Gifting Collection of plants.
        </p>
        <Button className={styles.button}>View Hampers</Button>
        
      </div>
    </div>

      {/* Testimonial Section */}
      <div className={styles.testimonialContainer}>
        <Testimonials />
      </div>

      {/* Accordion */}
      <div className={styles.accordion_container}>
        <h2 className={styles.title}>FAQs</h2>
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

    </div>
  );
};

export default Gifting;
