import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import config from "../../config/apiconfig";
import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
import { FaBox, FaSyncAlt, FaSeedling } from "react-icons/fa";
import styles from "./Home.module.css";
import Button from "../../components/Button/Button";
import Testimonials from "../../components/Testimonials/Testimonials";
import HomeBanner from "../../components/HomeBanner/HomeBanner";

const Home = () => {

  // ✅ Improved Token Handling
  const rawTokenData = localStorage.getItem("ecommerce_login");
  let tokenData;
  try {
    tokenData = rawTokenData && rawTokenData !== "undefined"
      ? JSON.parse(rawTokenData)
      : null;
  } catch (error) {
    console.error("Invalid token data in localStorage:", rawTokenData);
    tokenData = null;
  }
  
  const token = tokenData?.jwtToken || ""; // Ensure token is always defined
  console.log("Token:", token); // Debugging to confirm the token


  // const navigate = useNavigate(); // Hook for navigation
  const [plant, setPlant] = useState([]);
  const [banners, setBanners] = useState([]);
  const navigate = useNavigate();

  


    // Fetch Banners
  useEffect(() => {
    async function getAllBanners() {
      try {
        const response = await axios.get(`${config.BASE_URL}/api/allBanner`, {
          headers: {
            Authorization: `Bearer ${tokenData}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Banners API Response:", response.data); // Log the response for debugging
        if (Array.isArray(response.data) && response.data.length > 0) {
          // Adjust this mapping based on the actual API response structure
          const bannerUrls = response.data
            .map((banner) => {
              // Check if the banner object has a URL field; adjust the field name if necessary
              if (!banner.url) {
                console.warn("Banner missing URL:", banner);
                return null; // Skip banners without a URL
              }
              return banner.url;
            })
            .filter(Boolean); // Remove null values

          if (bannerUrls.length > 0) {
            setBanners(bannerUrls);
          } else {
            console.warn("No valid banner URLs found.");
            setBanners([]); // Set to empty array if no valid URLs
          }
        } else {
          console.warn("No banners found.");
          setBanners([]); // Set to empty array if no banners
        }
      } catch (error) {
        console.error(
          "Error fetching banners:",
          error.response?.data || error.message
        );
        setBanners([]); // Set to empty array on error
      }
    }
    getAllBanners();
  }, [tokenData]);


  // Get Products

  useEffect(() => {
    async function getAllProducts() {
      try {
        const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
        const token = tokenData?.jwtToken;
        console.log(token);
  
        const response = await axios.get(`${config.BASE_URL}/api/AllProduct`, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
  
        console.log("API Response:", response.data);
  
        if (Array.isArray(response.data)) {
          const formattedData = response.data.map(product => ({
            ...product,
            variants: product.variants || []
          }));
  
          setPlant(formattedData); // Ensures proper data structure
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
        setPlant([]);
      }
    }
    getAllProducts();
  }, []);

  const handlePassId = (id) => {
    if (!id) {
      console.error("Invalid variant ID:", id); // Debugging log
      return;
    }
    navigate(`/product/${id}`);
  };
  
  

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
        <div>
          <HomeBanner/>
        </div>

        {/* Carousel */}
        <div className={styles.carouselWrapper}>
          {banners.length > 0 ? (
            <Carousel images={banners} />
          ) : (
            <div className={styles.noBanners}>
              <p>No banners available at the moment.</p>
            </div>
          )}
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
    plant.variants.map((variant, index) => {
      const parentPlant = displayedProducts.find((p) =>
        p.variants.some((v) => v.id === variant.id)
      );
      return (
        <Card
          key={variant.id || index}
          onClick={() => handlePassId(variant.id)} // Ensure this sends correct ID
          title={parentPlant?.name || "Unnamed Plant"}
          image={variant.imageUrls?.[0] || "default.jpg"}
          price={variant.price || "N/A"}
          discount={variant.discountedPrice || "N/A"}
        />
      );
    })
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
            maxime quae! Lorem ipsum dolor, sit amet consectetur adipisicing
            elit. Nisi, perferendis vero, veritatis magni eum quas eligendi odio
            officia neque nulla tempore corrupti quis, accusamus exercitationem
            esse itaque cupiditate quaerat in.
          </p>
        </div>
      </section>
    </>
  );
};

export default Home;

// ------------------------------------------------------
