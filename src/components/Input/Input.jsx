// import React from 'react';
// import styles from './Input.module.css';

// const Input = ({
//   label,
//   type = 'text',
//   value,
//   onChange,
//   placeholder,
//   className,
//   ...props
// }) => {
//   return (
//     <div className={`${styles.inputContainer} ${className}`}>
//       {label && <label className={styles.inputLabel}>{label}</label>}
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         placeholder={placeholder}
//         className={styles.inputField}
//         {...props}
//       />
//     </div>
//   );
// };

// export default Input;


import React from 'react';
import styles from './Input.module.css';

const Input = ({ type, name, value, onChange, placeholder, required, className }) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${styles.inputField} ${className}`} // Merge custom and default styles
    />
  );
};

export default Input;
