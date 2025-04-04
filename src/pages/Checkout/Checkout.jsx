import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/apiconfig";
import axios from "axios";
import { Input } from "../../components/Input/Input";
import styles from "./Checkout.module.css"; // Import the CSS module

const Checkout = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login"));
  const token = tokenData?.jwtToken;

  const navigate = useNavigate();

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
    if (!tokenData?.jwtToken) {
      toast.error("Please log in to proceed to checkout.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    }
  }, [navigate]);


  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phoneNumber: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.BASE_URL}/cart/add-shipping`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("API Response:", response.data);

      if (response.status === 200) {
        alert("Shipping address added successfully!");
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.checkoutContainer}>
      <form onSubmit={handleSubmit} className={styles.checkoutForm}>
        <Input
          type="text"
          name="fullName"
          placeholder="Full Name"
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <Input
          type="text"
          name="street"
          placeholder="Street"
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <Input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <Input
          type="text"
          name="state"
          placeholder="State"
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <Input
          type="text"
          name="zipCode"
          placeholder="Zip Code"
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <Input
          type="text"
          name="phoneNumber"
          placeholder="Phone Number"
          onChange={handleChange}
          required
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitButton}>
          Save and Continue
        </button>
      </form>
    </div>
  );
};

export default Checkout;
