// src/components/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CreateAccount.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

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
          <Button className={styles.facebookBtn}>Facebook</Button>
          <Button className={styles.googleBtn}>Google</Button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Using Input Component for First Name */}
          <Input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First name"
            className={`${styles.inputField} ${errors.firstName && styles.errorInput}`}
          />
          {errors.firstName && <span className={styles.errorMsg}>{errors.firstName}</span>}

          {/* Using Input Component for Last Name */}
          <Input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            className={`${styles.inputField} ${errors.lastName && styles.errorInput}`}
          />
          {errors.lastName && <span className={styles.errorMsg}>{errors.lastName}</span>}

          {/* Using Input Component for Email */}
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${styles.inputField} ${errors.email && styles.errorInput}`}
          />
          {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}

          {/* Using Input Component for Password */}
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${styles.inputField} ${errors.password && styles.errorInput}`}
          />
          {errors.password && <span className={styles.errorMsg}>{errors.password}</span>}

          <Button type="submit" className={styles.createBtn}>CREATE</Button>
        </form>

        <a href="/" className={styles.returnToStore}>Return to Store</a>
      </div>
    </div>
  );
};

export default CreateAccount;
