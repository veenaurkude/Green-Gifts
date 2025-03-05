// import React from 'react';
// import styles from './Card.module.css';
// import Button from '../Button/Button';
// import { BiCartAdd } from "react-icons/bi";

// const Card = ({ image, title,discount, price, onAddToCart }) => {
//   return (
//     <div className={styles.card}>
//       <div className={styles.imageWrapper}>
//         <img src={image} alt={title} className={styles.cardImage} />
//       </div>
//       <div className={styles.cardContent}>
//         <h3 className={styles.cardTitle}>{title}</h3>
//         <div className={styles.priceContainer}>

//         <span className={styles.discountedPrice}>{discount}</span>
//         <span className={styles.itemPrice}>₹{price}</span>
//         </div>
//         {/* <p>{category}</p> */}
//         <Button className={styles.cardButton} onClick={onAddToCart}>
//           Add to Cart
//           {/* <BiCartAdd/> */}
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Card;


import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';
import { AiFillStar } from 'react-icons/ai';

const Card = ({ image, title, price, originalPrice, discountedPrice, discount, isTrending }) => {
  return (
    <div className={styles.card}>
      <div className={styles.tagContainer}>
        {discount && <span className={styles.discountTag}>{discount}% Off</span>}
        {isTrending && <span className={styles.trendingTag}>Trending</span>}
      </div>
      
      <div className={styles.imageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
      </div>
      
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <div className={styles.priceContainer}>
          {/* <span className={styles.originalPrice}>₹{originalPrice}</span> */}
          {/* <span className={styles.discountedPrice}>From ₹{discountedPrice}</span> */}
          <span className={styles.price}>₹{price}</span>
        </div>
        <div className={styles.rating}>
          <AiFillStar className={styles.starIcon} />
          <AiFillStar className={styles.starIcon} />
          <AiFillStar className={styles.starIcon} />
          <AiFillStar className={styles.starIcon} />
          <AiFillStar className={styles.starIcon} />
        </div>
        <Button className={styles.cardButton}>View Product</Button>
      </div>
    </div>
  );
};

export default Card;

