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

// import React from 'react';
// import styles from './Card.module.css';
// // import Button from '../Button/Button';
// import { AiFillStar } from 'react-icons/ai';

// const Card = ({ id, image, title, price, originalPrice, discountedPrice, discount, isTrending }) => {
//   return (
//     <div className={styles.card}>
//       <div className={styles.tagContainer}>
//         {discount && <span className={styles.discountTag}>{discount}% Off</span>}
//         {isTrending && <span className={styles.trendingTag}>Trending</span>}
//       </div>

//       <div className={styles.imageWrapper}>
//         <img src={image} alt={title} className={styles.cardImage} />
//       </div>

//       <div className={styles.cardContent}>
//         <h3 className={styles.cardTitle}>{title}</h3>
//         <div className={styles.priceContainer}>
//           {/* <span className={styles.originalPrice}>₹{originalPrice}</span> */}
//           {/* <span className={styles.discountedPrice}>From ₹{discountedPrice}</span> */}
//           <span className={styles.price}>₹{price}</span>
//         </div>
//         <div className={styles.rating}>
//           <AiFillStar className={styles.starIcon} />
//           <AiFillStar className={styles.starIcon} />
//           <AiFillStar className={styles.starIcon} />
//           <AiFillStar className={styles.starIcon} />
//           <AiFillStar className={styles.starIcon} />
//         </div>
//         {/* <Button className={styles.cardButton}>View Product</Button> */}

//         {/* Button to View Product */}
//       <Link to={`/product/${id}`} className={styles.viewButton}>
//         View Product
//       </Link>
//       </div>
//     </div>
//   );
// };

// export default Card;

// import React from "react";
// import { Link } from "react-router-dom"; // ✅ Import Link
// import styles from "./Card.module.css";
// import { AiFillStar } from "react-icons/ai";
// import Button from "../Button/Button";

// const Card = ({
//   onClick,
//   id,
//   image,
//   title,
//   price,
//   discount,
//   isTrending,
// }) => {
//   if (!id) {
//     console.error("Error: Missing product ID in Card component");
//     return null; // Prevent rendering if ID is missing
//   }

//   return (
//     <>
//       <Link to={`/product/${id}`} className={styles.viewButton}>
//         <div className={styles.card} onClick={onClick}>
//           <div className={styles.tagContainer}>
//             {discount && (
//               <span className={styles.discountTag}>{discount}% Off</span>
//             )}
//             {isTrending && <span className={styles.trendingTag}>Trending</span>}
//           </div>

//           <div className={styles.imageWrapper}>
//             <img
//               src={image || "https://via.placeholder.com/150"}
//               alt={title}
//               className={styles.cardImage}
//             />
//           </div>

//           <div className={styles.cardContent}>
//             <h3 className={styles.cardTitle}>{title || "No Title"}</h3>
//             <div className={styles.priceContainer}>
//               <span className={styles.price}>
//                 ₹{price !== undefined ? price : "N/A"}
//               </span>
//             </div>
//             <div className={styles.rating}>
//               {[...Array(5)].map((_, i) => (
//                 <AiFillStar key={i} className={styles.starIcon} />
//               ))}
//             </div>

//             {/* Button to View Product */}
//             <Button>
//               {/* <Link to={`/product/${id}`} className={styles.viewButton}> */}
//               View Product
//               {/* </Link> */}
//             </Button>
//           </div>
//         </div>
//       </Link>
//     </>
//   );
// };

// export default Card;


import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.css";
import { AiFillStar } from "react-icons/ai";
import Button from "../Button/Button";

const Card = ({ id, image, title, price, discount, isTrending, onClick }) => {
  // if (!id) {
  //   console.error("Error: Missing product ID in Card component", { image, title, price, discount });
  //   return null; // Prevent rendering if ID is missing
  // }

  return (
    <div className={styles.card} onClick={onClick}>
      <div className={styles.tagContainer}>
        {discount && (
          <span className={styles.discountTag}>
            {Math.round(((price - discount) / price) * 100)}% Off
          </span>
        )}
        {isTrending && <span className={styles.trendingTag}>Trending</span>}
      </div>

      <div className={styles.imageWrapper}>
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={title}
          className={styles.cardImage}
        />
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title || "No Title"}</h3>
        <div className={styles.priceContainer}>
          <span className={styles.price}>
            ₹{discount !== undefined ? discount : price || "N/A"}
          </span>
          {discount && <span className={styles.originalPrice}>₹{price}</span>}
        </div>
        <div className={styles.rating}>
          {[...Array(5)].map((_, i) => (
            <AiFillStar key={i} className={styles.starIcon} />
          ))}
        </div>
        {/* <Link to={`/single_product/${id}`}>

      
          <Button>View Product</Button>
        </Link> */}

        <Link to={`/product/${id}`}>

      
          <Button>View Product</Button>
        </Link>
      </div>
    </div>
  );
};

export default Card;