import React, { useState } from "react";
import styles from "./Testimonials.module.css";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    name: "Rahul Sharma",
    review:
      "The plant was mature, tall as promised with a healthy growth... it was well hydrated and full of nodes. The packaging was great! I'll be happy to buy it again.",
  },
  {
    id: 2,
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    name: "Aishwarya Roy",
    review:
      "I loved the quality of the plant, and the packaging was excellent. Delivered on time and in great condition! Highly recommend.",
  },
  {
    id: 3,
    image: "https://randomuser.me/api/portraits/men/29.jpg",
    name: "Amit Verma",
    review:
      "This was my first time ordering a plant online, and I was amazed by the quality. The leaves were fresh, and the soil was well-packed.",
  },
];

const Testimonials = () => {
  const [index, setIndex] = useState(0);

  const nextTestimonial = () => {
    setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.testimonialContainer}>
      <h2 className={styles.title}>From Happy Plant Parents</h2>

      {/* Profile Images + Arrows */}
      <div className={styles.imageWrapper}>
        <button onClick={prevTestimonial} className={styles.arrow}>
          <FaArrowLeft />
        </button>

        <img
          src={testimonials[index].image}
          alt={testimonials[index].name}
          className={styles.profileImage}
        />

        <button onClick={nextTestimonial} className={styles.arrow}>
          <FaArrowRight />
        </button>
      </div>

      {/* Star Ratings */}
      <div className={styles.stars}>
        {Array(5)
          .fill()
          .map((_, i) => (
            <FaStar key={i} />
          ))}
      </div>

      {/* Review Content */}
      <p className={styles.review}>{testimonials[index].review}</p>
      <p className={styles.name}>— {testimonials[index].name}</p>
    </div>
  );
};

export default Testimonials;
