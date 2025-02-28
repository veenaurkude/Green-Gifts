

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });

  const navigate = useNavigate();

  // Pre-fill login fields with registered user data
  useEffect(() => {
    const registeredUser = JSON.parse(localStorage.getItem('registeredUser'));
    if (registeredUser) {
      setFormData({
        email: registeredUser.email,
        password: registeredUser.password
      });
      // Clear the stored data after pre-filling
      localStorage.removeItem('registeredUser');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation (Check if fields are not empty)
    if (formData.email && formData.password) {
      console.log('Login Data:', formData);

      // Clear input fields
      setFormData({
        email: '',
        password: ''
      });

      // Redirect to Home page
      navigate('/');  
    } else {
      alert('Please fill in both email and password.');
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <p>Don't have an account yet? <a href="/register">Create account</a></p>

        <div className={styles.socialButtons}>
          <Button className={styles.facebookBtn}>Facebook</Button>
          <Button className={styles.googleBtn}>Google</Button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Using Input Component for Email */}

          
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className={`${styles.inputField} `}
            />

          {/* Using Input Component for Password */}
          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <a href="/forgot-password" className={styles.forgotPassword}>Forgot your password?</a>

          <Button type="submit" className={styles.signInBtn}>SIGN IN</Button>
        </form>

        <a href="/" className={styles.returnToStore}>Return to Store</a>
      </div>
    </div>
  );
};

export default Login;
