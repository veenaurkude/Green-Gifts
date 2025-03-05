import React from "react";
import styles from "./Blog.module.css";
import HoverCard from "../../components/HoverCard/HoverCard";

const Blog = () => {
  return (
    <>
      {/* Breadcrumb Navigation (Optional) */}
      <div className={styles.breadcrumb}>
        <a href="/">Home</a> / <span>Blog</span>
      </div>

      {/* Blogs */}
      <div className={styles.plantsContainer}>
        <h1 className={styles.heading}>
          Explore our Blogs for Simpler, Happier, and Greener Home Gardening
        </h1>

        {/* Product Grid */}
        <div className={styles.blogGrid}>
        <HoverCard
        imageSrc="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg"
        title="Gardening Basics"
        description="Dive in and find everything you need to know about the basics of gardening & plant care and create the perfect home garden of your dreams!"
        buttonText="Read More"
        blogUrl="/blog1"
      />
      <HoverCard
        imageSrc="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg"
        title="Garden Maintenance"
        description="Dive in and find everything you need to know about the basics of gardening & plant care and create the perfect home garden of your dreams!"
        buttonText="Discover"
        blogUrl="/blog2"
      />
      <HoverCard
        imageSrc="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg"
        title="Kitchen Gardening"
        description="Dive in and find everything you need to know about the basics of gardening & plant care and create the perfect home garden of your dreams!"
        buttonText="Start Now"
        blogUrl="/blog3"
      />
      <HoverCard
        imageSrc="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg"
        title="Garden Maintenance"
        description="Dive in and find everything you need to know about the basics of gardening & plant care and create the perfect home garden of your dreams!"
        buttonText="Discover"
        blogUrl="/blog2"
      />
      <HoverCard
        imageSrc="https://watchandlearn.scholastic.com/content/dam/classroom-magazines/watchandlearn/videos/animals-and-plants/plants/what-are-plants-/What-Are-Plants.jpg"
        title="Garden Maintenance"
        description="Dive in and find everything you need to know about the basics of gardening & plant care and create the perfect home garden of your dreams!"
        buttonText="Discover"
        blogUrl="/blog2"
      />
        </div>
      </div>
    </>
  );
};

export default Blog;
