
// // src/components/Register.jsx
// import React, { useState } from 'react';
// import styles from './CreateAccount.module.css';
// import { useNavigate } from 'react-router-dom';

// const CreateAccount = () => {

//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: ''
//   });

//   const [successMsg, setSuccessMsg] = useState('');

//   const [errors, setErrors] = useState({});

//    // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

  
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Perform form validation or API call here

//     if (validate()) {
//       console.log('Registration Data:', formData);
//     }

//     // Clear input fields
//     setFormData({
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: ''
//     });

//     // Show success message
//     setSuccessMsg('Account created successfully!');
    
//     // Hide success message after 3 seconds
//     setTimeout(() => setSuccessMsg(''), 3000);
//   };

// // Redirect to Login Page after 3 seconds
// setTimeout(() => {
//   setSuccessMsg('');
//   navigate('/login');
// }, 3000);



//   // Form validation
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.firstName) newErrors.firstName = 'First name is required';
//     if (!formData.lastName) newErrors.lastName = 'Last name is required';
//     if (!formData.email) newErrors.email = 'Email is required';
//     if (!formData.password) newErrors.password = 'Password is required';
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

  

//   return (
//     <div className={styles.registerContainer}>
//       <div className={styles.registerBox}>
//         <h2>Create Account</h2>

//         {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
//         <div className={styles.socialButtons}>
//           <button className={styles.facebookBtn}>Facebook</button>
//           <button className={styles.googleBtn}>Google</button>
//         </div>

//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="firstName"
//             value={formData.firstName}
//             onChange={handleChange}
//             className={`${styles.inputField} ${errors.firstName && styles.errorInput}`}
//             placeholder="First name"
            
//           />
//           <input
//             type="text"
//             name="lastName"
//             value={formData.lastName}
//             onChange={handleChange}
//             className={`${styles.inputField} ${errors.lastName && styles.errorInput}`}
//             placeholder="Last name"
            
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`${styles.inputField} ${errors.email && styles.errorInput}`}
//             placeholder="Email"
            
//           />
//           <input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             className={`${styles.inputField} ${errors.password && styles.errorInput}`}
//             placeholder="Password"
            
//           />

//           <button type="submit" className={styles.createBtn}>CREATE</button>
//         </form>

//         <a href="/" className={styles.returnToStore}>Return to Store</a>
//       </div>
//     </div>
//   );
// };

// export default CreateAccount;


// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateAccount.module.css';

const CreateAccount = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [successMsg, setSuccessMsg] = useState('');
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form validation
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validate()) {
      console.log('Registration Data:', formData);

      // Store data in localStorage
      localStorage.setItem('registeredUser', JSON.stringify(formData));

      // Clear input fields
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      });

      // Show success message
      setSuccessMsg('Account created successfully!');

      // Redirect to Login Page after 3 seconds
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/login');
      }, 3000);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <div className={styles.registerBox}>
        <h2>Create Account</h2>

        {successMsg && <p className={styles.successMsg}>{successMsg}</p>}
        
        <div className={styles.socialButtons}>
          <button className={styles.facebookBtn}>Facebook</button>
          <button className={styles.googleBtn}>Google</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`${styles.inputField} ${errors.firstName && styles.errorInput}`}
            placeholder="First name"
          />
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`${styles.inputField} ${errors.lastName && styles.errorInput}`}
            placeholder="Last name"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`${styles.inputField} ${errors.email && styles.errorInput}`}
            placeholder="Email"
          />
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`${styles.inputField} ${errors.password && styles.errorInput}`}
            placeholder="Password"
          />

          <button type="submit" className={styles.createBtn}>CREATE</button>
        </form>

        <a href="/" className={styles.returnToStore}>Return to Store</a>
      </div>
    </div>
  );
};

export default CreateAccount;
