import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

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
          <button className={styles.facebookBtn}>Facebook</button>
          <button className={styles.googleBtn}>Google</button>
        </div>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.inputField}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className={styles.inputField}
          />

          <a href="/forgot-password" className={styles.forgotPassword}>Forgot your password?</a>
          <button type="submit" className={styles.signInBtn}>SIGN IN</button>
        </form>

        <a href="/" className={styles.returnToStore}>Return to Store</a>
      </div>
    </div>
  );
};

export default Login;
