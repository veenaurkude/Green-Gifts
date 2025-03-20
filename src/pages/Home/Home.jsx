import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import useNavigate
import config from "../../config/apiconfig";
import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
import { FaBox, FaSyncAlt, FaSeedling } from "react-icons/fa";
import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import Testimonials from "../../components/Testimonials/Testimonials";

const Home = () => {
  // const navigate = useNavigate(); // Hook for navigation
  const [plant, setPlant] = useState([]);

  // Carousel Images
  const images = [
    "https://www.ugaoo.com/cdn/shop/files/Women_s-Day-Banners_Desktop_b458c2ba-5a9e-47ad-a786-fb4c2db25350.jpg?v=1740553669&width=2000",
    "https://www.ugaoo.com/cdn/shop/files/plantcare-banner_a37f8e27-0c3f-495d-b459-1fb83b5920a5.png?v=1739963487&width=2000",
    "https://www.ugaoo.com/cdn/shop/collections/Indoor-Plants-Category-Banner_1.png?v=1739958875&width=2000",
  ];

  // Get Products

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`);
        console.log("API Response:", response.data); // ✅ Check what data is fetched
        console.log(response.data.id)
        if (Array.isArray(response.data)) {
          setPlant(response.data);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    }
    getAllProducts();
  }, []);

  // Display only the first 4 products
  const displayedProducts = plant.slice(0, 4);

  // Gifting Section Data
  const gifts = [
    {
      id: 1,
      image: "https://natalielinda.com/wp-content/uploads/2019/06/pothos.jpg",
      title: "Bestsellers",
    },
    {
      id: 2,
      image: "https://ww1.prweb.com/prfiles/2014/09/11/12164346/24848.jpg",
      title: "Plants",
    },
    {
      id: 3,
      image:
        "https://bloomscape.com/wp-content/uploads/2019/04/bloomscape_product-monstera-slate.jpg",
      title: "Pots",
    },
    {
      id: 4,
      image: "https://ww1.prweb.com/prfiles/2014/09/11/12164346/24848.jpg",
      title: "Ceramic Pots",
    },
  ];

  //

  const categories = [
    {
      id: 1,
      title: "Plants",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1674703862-.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
      link: "/plants", // Route for Plants
    },
    {
      id: 2,
      title: "Seeds",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1674703862-.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
      link: "/seeds", // Route for Seeds
    },
    {
      id: 3,
      title: "Pots & Planters",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1674703862-.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
      link: "/pots-planters", // Route for Pots & Planters
    },
    {
      id: 4,
      title: "Plant Care",
      image:
        "https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1674703862-.jpg?crop=1xw:1.00xh;center,top&resize=980:*",
      link: "/plant-care", // Route for Plant Care
    },
  ];

  // const handleRedirect = (link) => {
  //   navigate(link);
  // };

  return (
    <>
    <section className={styles.homeContainer}>
      {/* Carousel */}
      <div className={styles.carouselWrapper}>
        <Carousel images={images} />
      </div>

      {/* Products Features Section */}
      <div className={styles.productFeatures}>
        {/* <h2>Explore Our Collections</h2> */}
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
      </div>

      {/* Our Best Picks */}
      <section className={styles.bestPicksContainer}>
        <h2 className={styles.bestPicksTitle}>Our Best Picks</h2>
        <div className={styles.bestPicksGrid}>
          {categories.map((category) => (
            <Link
              to={category.link}
              key={category.id}
              className={styles.bestPickCard}
            >
              <img
                src={category.image}
                alt={category.title}
                className={styles.bestPickImage}
              />
              <div className={styles.bestPickTitle}>{category.title}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Product Grid */}
      <div className={styles.bestSellers}>
        <h2>Our Best Sellers</h2>
        {/* <div className={styles.productGrid}>
    {displayedProducts.map((product) => (
      <Card
        key={product.id} // ✅ Correct key usage
        id={`product-${product.id}`} // ✅ Unique ID for better performance
        image={product.imgUrls?.[0] || "default.jpg"} // ✅ Correct image path
        title={product.name || "No Title"} // ✅ Corrected title
        discount={product.discountedPrice || "N/A"} // ✅ Corrected discount
        price={product.price || "N/A"} // ✅ Corrected price
      />
    ))}
  </div> */}

        <div className={styles.productGrid}>
          {displayedProducts.map((plant) =>
            plant.variants.map((variant) => (
              <Card
                key={variant.id} // ✅ Correct key usage
                id={`variant-${variant.id}`} // Unique ID
                image={variant.imageUrls?.[0] || "default.jpg"} // ✅ Corrected image path
                title={plant.name || "No Title"} // ✅ Corrected title
                discount={variant.discountedPrice || "N/A"} // ✅ Corrected discount
                price={variant.price || "N/A"} // ✅ Corrected price
              />
            ))
          )}
        </div>

        {/* View All Button */}
        <div className={styles.viewAllContainer}>
          <Link className={styles.viewAllButton} to="/plants">
            View All
          </Link>
        </div>
      </div>

      {/* <Button>View</Button> */}

      {/* WhyGreenGifts section */}
      <div className={styles.whySection}>
        <h2 className={styles.heading}>Why Green Gifts?</h2>
        <div className={styles.features}>
          <div className={styles.feature}>
            <FaBox className={styles.icon} />
            <p>Secure and Recyclable Packaging</p>
          </div>
          <div className={styles.feature}>
            <FaSyncAlt className={styles.icon} />
            <p>Free Replacements if Damaged</p>
          </div>
          <div className={styles.feature}>
            <FaSeedling className={styles.icon} />
            <p>Self-Watering Pots with Every Plant</p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <Testimonials />

      {/* About Green Gifts */}
      <div className={styles.about}>
        <h4>About Green Gifts</h4>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          exercitationem hic, iusto at, veniam et rem minus, iste doloremque
          dignissimos repellendus? Recusandae at odio amet? Odit unde quas
          maxime quae! Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Nisi, perferendis vero, veritatis magni eum quas eligendi odio officia
          neque nulla tempore corrupti quis, accusamus exercitationem esse
          itaque cupiditate quaerat in.
        </p>
      </div>
    </section>
    </>
  );
};

export default Home;
