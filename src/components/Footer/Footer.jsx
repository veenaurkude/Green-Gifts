import React from "react";
import styles from "./Footer.module.css";
import {
  FaSquareFacebook,
  FaSquareInstagram,
  FaLinkedin,
  FaSquareXTwitter,
  FaSquareYoutube,
} from "react-icons/fa6";

import { AiOutlineArrowRight } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topSection}>
        <div className={styles.cities}>
          <a href="#">Mumbai</a>
          <a href="#">Pune</a>
          <a href="#">Delhi</a>
          <a href="#">Bangalore</a>
          <a href="#">Hyderabad</a>
          <a href="#">Chennai</a>
          <a href="#">Kolkata</a>
        </div>
      </div>

      <div className={styles.mainSection}>
        <div className={styles.column}>
          <h4>ABOUT US</h4>
          <ul>
            <li>Our Story</li>
            <li>Careers</li>
            <li>Contact Us</li>
            <li>Locate Stores</li>
            <li>Own Grown</li>
            <li>Garden Services & Maintenance</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>CUSTOMER CARE</h4>
          <ul>
            {/* <li>Take The Plant Quiz</li> */}
            <li>Track Order</li>
            <li>Shipping Policy</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>FAQs</li>
            <li>Terms of Service</li>
            <li>Refund policy</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>OFFERS & REWARDS</h4>
          <ul>
            <li>Plant Parent Rewards Club</li>
            <li>Green Gifts Coupons</li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>GET IN TOUCH</h4>
          <ul>
            <li>
              WhatsApp us at: <a href="tel:+91-9129912991">+91-9129912991</a>
            </li>
            <li>
              Call: <a href="tel:+91-9129912991">+91-9129912991</a>
            </li>
            <li>
              Email:{" "}
              <a href="mailto:support@greengifts.com">support@greengifts.com</a>
            </li>
          </ul>
        </div>

        <div className={styles.column}>
          <h4>SIGN UP FOR OUR NEWSLETTER</h4>
          <div className={styles.newsletter}>
            <input type="email" placeholder="Enter email address" />
            <button>
              <AiOutlineArrowRight />
            </button>
          </div>
          {/* <h4>Green Gifts</h4> */}
          <p>
            For plant care tips, our featured plant of the week, exclusive
            offers and discounts
          </p>

          <h4>FOLLOW US</h4>
          <div className={styles.socialIcons}>
            <a href="">
              <FaSquareFacebook />
            </a>
            <a href="">
              <FaSquareInstagram />
            </a>
            <a href="">
              <FaLinkedin />
            </a>
            <a href="">
              <FaSquareXTwitter />
            </a>
            <a href="">
              <FaSquareYoutube />
            </a>
          </div>

          <div className={styles.appButtons}>
            {/* <img src="google-play.png" alt="Google Play" />
            <img src="app-store.png" alt="App Store" /> */}
          </div>
        </div>
      </div>

      <div className={styles.bottomSection}>
        <p>
          © 2025,&nbsp;
          <a href="/">Green Gifts.</a>&nbsp; All rights reserved.
        </p>
        <div className={styles.paymentIcons}>
          {/* <img src="visa.png" alt="Visa" />
          <img src="mastercard.png" alt="MasterCard" />
          <img src="amex.png" alt="Amex" />
          <img src="gpay.png" alt="Google Pay" />
          <img src="shop.png" alt="Shop" />
          <img src="paypal.png" alt="Paypal" /> */}
        </div>
      </div>

      {/* <div className={styles.whatsappIcon}>
        <FaWhatsapp />
      </div> */}
    </footer>
  );
};

export default Footer;
