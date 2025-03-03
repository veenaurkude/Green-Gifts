import axios from "axios";
import React, { useEffect, useState } from "react";
import config from "../../config/apiconfig";
import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
import styles from "./Home.module.css"; 

const Home = () =>  {
  // Carousel Images
  const images = [
    "https://www.ugaoo.com/cdn/shop/files/Women_s-Day-Banners_Desktop_b458c2ba-5a9e-47ad-a786-fb4c2db25350.jpg?v=1740553669&width=2000",
    "https://www.ugaoo.com/cdn/shop/files/plantcare-banner_a37f8e27-0c3f-495d-b459-1fb83b5920a5.png?v=1739963487&width=2000",
    "https://www.ugaoo.com/cdn/shop/collections/Indoor-Plants-Category-Banner_1.png?v=1739958875&width=2000",
  ];

  const [products, setProducts] = useState([]);
  // useEffect(() => {
  //   async function getAllProducts() {
  //     try {
  //       const response = await axios.get(
  //         `https://fakestoreapi.in/api/products`
  //       );
  //       setProducts(response.data.products);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getAllProducts();
  // }, []);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await axios.get(`${config.BASE_URL}/products`);
        console.log("API Response:", response.data.products); // Debugging log
        if (Array.isArray(response.data.products)) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    }
    getAllProducts();
  }, []);

  return (
    <div className={styles.homeContainer}>
      {/* Carousel */}
      <div className={styles.carouselWrapper}>
        <Carousel images={images} />
      </div>

      {/* Product Grid */}
      <div className={styles.productGrid}>
        {Array.isArray(products) &&
          products.map((product, index) => (
            <Card
              key={index}
              image={product.image}
              title={product.title}
              price={product.price}
            />
          ))}
      </div>
    </div>
  );
}

export default Home;
