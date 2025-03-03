// import React, { useState } from "react";

// const Accordion = ({ title, content }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className="border-b border-gray-300">
//       <button
//         className="w-full flex justify-between items-center p-4 text-lg font-semibold bg-gray-100 hover:bg-gray-200 transition-all"
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {title}
//         <span>{isOpen ? "−" : "+"}</span>
//       </button>
//       {isOpen && (
//         <div className="p-4 bg-white text-gray-700 transition-all">{content}</div>
//       )}
//     </div>
//   );
// };

// export default Accordion;

// import React, { useState } from "react";
// import styles from "./Accordion.module.css";

// const Accordion = ({ title, content }) => {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div className={styles.accordionItem}>
//       <button
//         className={styles.accordionButton}
//         onClick={() => setIsOpen(!isOpen)}
//       >
//         {title}
//         <span className={`${styles.icon} ${isOpen ? styles.open : ""}`}>
//           {isOpen ? " ▲ " : " ▼ "}
//         </span>
//       </button>
//       <div>
//         {isOpen && (
//           <div className={`${styles.accordionContent}`}>{content}</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Accordion;

import React, { useState } from "react";
import styles from "./Accordion.module.css";

import { MdArrowDropDown, MdArrowDropUp } from "react-icons/md";


const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.accordionItem}>
      {/* Accordion Header */}
      <div
        className={styles.accordionHeader}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className={styles.accordionTitle}>{title}</h3>
        {isOpen ? (
          <MdArrowDropUp className={styles.icon} />
        ) : (
          <MdArrowDropDown className={styles.icon} />
        )}
      </div>

      {/* Accordion Content (Visible when open) */}
      {isOpen && <div className={styles.accordionContent}>{content}</div>}
    </div>
  );
};

export default Accordion;
