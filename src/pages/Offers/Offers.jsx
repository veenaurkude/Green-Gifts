
import React, { useState, useEffect } from "react";
import config from "../../config/apiconfig";
import axios from "axios";
import Card from "../../components/Card/Card";
import Button from "../../components/Button/Button";

const Offers = () => {
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
    <div>
      <h2>Blog Products</h2>
      <Button>Click Me</Button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {plants.map((plant, index) => (
          <Card key={index} image={plant.image} title={plant.title} price={plant.price} />
        ))}
      </div>
    </div>
  );
};

export default Offers;