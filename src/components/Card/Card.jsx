import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';

const Card = ({ image, title, price, onAddToCart }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardPrice}>₹{price}</p>
        <Button className={styles.cardButton} onClick={onAddToCart}>Add to Cart</Button>
      </div>
    </div>
  );
};

export default Card;


// import React from 'react';
// import styles from './Card.module.css';
// import Button from '../Button/Button';
// import { AiFillStar } from 'react-icons/ai';

// const Card = ({ image, title, originalPrice, discountedPrice, discount, isTrending }) => {
//   return (
//     <div className={styles.card}>
//       <div className={styles.tagContainer}>
//         {discount && <span className={styles.discountTag}>{discount}%</span>}
//         {isTrending && <span className={styles.trendingTag}>Trending</span>}
//       </div>
      
//       <div className={styles.imageWrapper}>
//         <img src={image} alt={title} className={styles.cardImage} />
//       </div>
      
//       <div className={styles.cardContent}>
//         <h3 className={styles.cardTitle}>{title}</h3>
//         <div className={styles.priceContainer}>
//           <span className={styles.originalPrice}>₹{originalPrice}</span>
//           <span className={styles.discountedPrice}>From ₹{discountedPrice}</span>
//         </div>
//         <div className={styles.rating}>
//           <AiFillStar className={styles.starIcon} />
//           <AiFillStar className={styles.starIcon} />
//           <AiFillStar className={styles.starIcon} />
//           <AiFillStar className={styles.starIcon} />
//           <AiFillStar className={styles.starIcon} />
//         </div>
//         <Button className={styles.cardButton}>View Product</Button>
//       </div>
//     </div>
//   );
// };

// export default Card;


// // src/components/Card/Card.jsx
// import React from 'react';
// import styles from './Card.module.css';

// const Card = ({ image, title, price }) => {
//   return (
//     <div className={styles.card}>
//       <img src={image} alt={title} className={styles.productImage} />
//       <h3 className={styles.productTitle}>{title}</h3>
//       <p className={styles.productPrice}>${price}</p>
//     </div>
//   );
// };

// export default Card;
