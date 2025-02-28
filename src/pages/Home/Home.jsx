import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
// import { BASE_URL } from "../../config/apiconfig";
function Home() {

// Carousel Images
  const images = [
    'https://www.ugaoo.com/cdn/shop/files/Women_s-Day-Banners_Desktop_b458c2ba-5a9e-47ad-a786-fb4c2db25350.jpg?v=1740553669&width=2000',
    'https://www.ugaoo.com/cdn/shop/files/plantcare-banner_a37f8e27-0c3f-495d-b459-1fb83b5920a5.png?v=1739963487&width=2000',
    'https://www.ugaoo.com/cdn/shop/collections/Indoor-Plants-Category-Banner_1.png?v=1739958875&width=2000'
  ]; 


  const [products, setProducts] = useState([]);
  useEffect(() => {
    async function getallproduct() {
      try {
        const response = await axios.get(
          `https://fakestoreapi.in/api/products`
        );
        // console.log(response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.log(error);
      }
    }
    getallproduct();
  }, []);
  return (
    <>
      {/* Home */}
      <Carousel images={images}></Carousel>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
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
      {/* {products.map((product, index) => {
        return (
          <>
            <p>{product.title}</p>
          </>
        );
      })} */}
    </>
  );
}

export default Home;
