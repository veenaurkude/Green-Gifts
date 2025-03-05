// import styles from "./HoverCard.module.css";

// const HoverCard = ({ imageSrc, title, description, buttonText }) => {
//   return (
//     <div className={styles.card}>
//       <img src={imageSrc} alt={title} />
//       <div className={styles.overlay}>
//         <h3>{title}</h3>
//         <p>{description}</p>
//         <button>{buttonText}</button>
//       </div>
//     </div>
//   );
// };

// export default HoverCard;


import styles from "./HoverCard.module.css";
import { useNavigate } from "react-router-dom"; // ✅ For navigation
import Button from "../Button/Button";

const HoverCard = ({ imageSrc, title, description, buttonText, blogUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(blogUrl); // ✅ Navigate to the blog page
  };

  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <img src={imageSrc} alt={title} />
        
        <div className={styles.overlay}>
          <div className={styles.buttonContainer}>
            <p>{description}</p>
            <Button className={styles.btn} onClick={handleClick} label={buttonText}></Button>
          </div>
        </div>
      </div>
      <div className={styles.title}>{title}</div>
    </div>
  );
};

export default HoverCard;
