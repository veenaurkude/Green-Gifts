
import React, { useState } from 'react';
import styles from './Carousel.module.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  return (
    <div className={styles.carousel}>
      <div className={styles.imageWrapper}>
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className={styles.carouselImage}
        />
      </div>
      <button onClick={goToPrevious} className={styles.prevButton}>
        &#9664;
      </button>
      <button onClick={goToNext} className={styles.nextButton}>
        &#9654;
      </button>
    </div>
  );
};

export default Carousel;
