import React, { useState, useEffect } from 'react';
import styles from './Carousel.module.css';

const Carousel = ({ images, autoSlide = true, autoSlideInterval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide logic
  useEffect(() => {
    if (!autoSlide) return;

    const slideInterval = setInterval(() => {
      goToNext();
    }, autoSlideInterval);

    return () => clearInterval(slideInterval); // Cleanup interval on unmount
  }, [currentIndex, autoSlide, autoSlideInterval]);

  // Navigation functions
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={styles.carousel}>
      <div className={styles.imageWrapper}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={styles.carouselImage}
        />
      </div>

      {/* Navigation Buttons */}
      <button onClick={goToPrevious} className={styles.prevButton} aria-label="Previous Slide">
        &#9664;
      </button>
      <button onClick={goToNext} className={styles.nextButton} aria-label="Next Slide">
        &#9654;
      </button>

      {/* Dots for Navigation */}
      <div className={styles.dotsContainer}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${currentIndex === index ? styles.activeDot : ''}`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
