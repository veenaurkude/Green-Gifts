import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config/apiconfig";
import axios from "axios";
import { Input } from "../../components/Input/Input";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Checkout.module.css"; // Updated CSS module

const Checkout = () => {
  const tokenData = JSON.parse(localStorage.getItem("ecommerce_login") || "{}");
  const token = tokenData?.jwtToken;
  const navigate = useNavigate();

  // Check if user is logged in
  useEffect(() => {
    if (!token) {
      toast.error("Please log in to proceed to checkout.", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    }
  }, [navigate, token]);

  // Form state for shipping details
  const [formData, setFormData] = useState({
    fullName: "",
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "India",
    phoneNumber: "",
  });

  // Payment method state
  const [paymentMethod, setPaymentMethod] = useState("cod"); // Default: Cash on Delivery

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${config.BASE_URL}/cart/add-shipping`,
        { ...formData, paymentMethod },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      if (response.status === 200) {
        toast.success("Shipping address added successfully!", {
          position: "top-right",
          autoClose: 2000,
        });
  
        // Pass order details to OrderConfirmation page
        const orderDetails = { ...formData, paymentMethod };
  
        if (paymentMethod === "cod") {
          navigate("/order-confirm", { state: { orderDetails } });
        } else if (paymentMethod === "online") {
          navigate("/payment-gateway", { state: { orderDetails } });
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!", {
        position: "top-right",
        autoClose: 3000,
      });
      console.error("Error:", error.response?.data || error.message);
    }
  };

  return (
    <div className={styles.checkoutPage}>
      <h1 className={styles.pageTitle}>Checkout</h1>
      <div className={styles.checkoutContainer}>
        {/* Shipping Details Section */}
        <div className={styles.shippingSection}>
          <h2>Shipping Details</h2>
          <form onSubmit={handleSubmit} className={styles.checkoutForm}>
            <Input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
            <Input
              type="text"
              name="street"
              placeholder="Street Address"
              value={formData.street}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
            <div className={styles.cityStateZip}>
              <Input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
              <Input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
              <Input
                type="text"
                name="zipCode"
                placeholder="Zip Code"
                value={formData.zipCode}
                onChange={handleChange}
                required
                className={styles.inputField}
              />
            </div>
            <Input
              type="text"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
              className={styles.inputField}
            />
          </form>
        </div>

        {/* Payment Method Section */}
        <div className={styles.paymentSection}>
          <h2>Payment Method</h2>
          <div className={styles.paymentOptions}>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                value="cod"
                checked={paymentMethod === "cod"}
                onChange={handlePaymentChange}
              />
              <span>Cash on Delivery</span>
            </label>
            <label className={styles.paymentOption}>
              <input
                type="radio"
                value="online"
                checked={paymentMethod === "online"}
                onChange={handlePaymentChange}
              />
              <span>Online Payment</span>
            </label>
          </div>

          {/* Summary Section */}
          <div className={styles.summary}>
            <h3>Order Summary</h3>
            <p>Shipping: {formData.street} {formData.city} {formData.state}</p>
            <p>Phone: {formData.phoneNumber}</p>
            <p>Payment: {paymentMethod === "cod" ? "Cash on Delivery" : "Online"}</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={handleSubmit}
            className={styles.submitButton}
          >
            {paymentMethod === "cod" ? "Place Order" : "Proceed to Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;