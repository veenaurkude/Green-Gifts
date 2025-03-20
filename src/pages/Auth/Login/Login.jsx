
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import Button from "../../../components/Button/Button";
// import Input from "../../../components/Input/Input";
// import axios from "axios";
// import config from "../../../config/apiconfig";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//       const response = await axios.post(
//         `${config.BASE_URL}/api/auth/login`,
//         formData
//       );

//       console.log(response.data);

//       if (response.status === 200) {
//         localStorage.setItem("ecommerce_login", JSON.stringify(response.data));
//         alert("Login successfully");
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login Error:", error);
//     }
//   }

//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.loginBox}>
//         <h2>Login</h2>
//         <p>
//           Don't have an account yet? <a href="/register">Create account</a>
//         </p>

//         <form onSubmit={handleSubmit}>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//             className={`${styles.inputField}`}
//           />

//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//           />

//           <a href="/forgot-password" className={styles.forgotPassword}>
//             Forgot your password?
//           </a>

//           <Button type="submit" className={styles.signInBtn}>
//             SIGN IN
//           </Button>
//         </form>

//         <a href="/" className={styles.returnToStore}>
//           Return to Store
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Login;


// ==================


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "./Login.module.css";
// import Button from "../../../components/Button/Button";
// import Input from "../../../components/Input/Input";
// import axios from "axios";
// import config from "../../../config/apiconfig";

// const Login = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     email: "",
//     password: ""
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value
//     }));
//   };

//   // async function handleSubmit(e) {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await axios.post(
//   //       `${config.BASE_URL}/api/auth/login`,
//   //       formData
//   //     );

//   //     console.log(response.data);

//   //     if (response.status === 200) {

//   //       const { roleName } = response.data;

//   //       // Save to localStorage
//   //       localStorage.setItem("ecommerce_login", JSON.stringify(response.data));

//   //       // Redirect based on role
//   //       if (roleName === "User") {
//   //         navigate("/");
//   //       } else if (roleName === "Admin") {
//   //         navigate("/admin");
//   //       } else {
//   //         alert("Unknown role. Contact support.");
//   //       }

//   //       alert("Login successfully");
//   //     }
//   //   } catch (error) {
//   //     console.error("Login Error:", error);

//   //     // Handle errors more clearly
//   //     const errorMessage =
//   //       error.response?.data?.message || "Failed to log in. Try again.";
//   //     alert(errorMessage);
//   //   }
//   // }


//   async function handleSubmit(e) {
//     e.preventDefault();

//     try {
//         const response = await axios.post(
//             `${config.BASE_URL}/api/auth/login`,
//             formData
//         );

//         console.log(response.data);

//         if (response.status === 200) {
//             const { admin, user, jwtToken } = response.data;

//             // Save token and user details to localStorage
//             localStorage.setItem("ecommerce_login", JSON.stringify(response.data));

//             // Role check logic
//             if (admin && admin.role?.some((role) => role.roleName === "Admin")) {
//                 navigate("/admin");
//             } else if (user && user.role?.some((role) => role.roleName === "User")) {
//                 navigate("/");
//             } else {
//                 alert("Unknown role. Contact support.");
//             }

//             alert("Login successfully");
//         }
//     } catch (error) {
//         console.error("Login Error:", error);

//         // Handle errors
//         const errorMessage =
//             error.response?.data?.message || "Failed to log in. Try again.";
//         alert(errorMessage);
//     }
// }

//   return (
//     <div className={styles.loginContainer}>
//       <div className={styles.loginBox}>
//         <h2>Login</h2>
//         <p>
//           Don't have an account yet? <a href="/register">Create account</a>
//         </p>

//         <form onSubmit={handleSubmit}>
//           <Input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             placeholder="Email"
//             required
//             className={`${styles.inputField}`}
//           />

//           <Input
//             type="password"
//             name="password"
//             value={formData.password}
//             onChange={handleChange}
//             placeholder="Password"
//             required
//           />

//           <a href="/forgot-password" className={styles.forgotPassword}>
//             Forgot your password?
//           </a>

//           <Button type="submit" className={styles.signInBtn}>
//             SIGN IN
//           </Button>
//         </form>

//         <a href="/" className={styles.returnToStore}>
//           Return to Store
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Login;

// ----------


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import axios from "axios";
import config from "../../../config/apiconfig";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Validation logic
  const validate = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    // Real-time validation
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return; // Stop if validation fails

    try {
      const response = await axios.post(
        `${config.BASE_URL}/api/auth/login`,
        formData
      );

      console.log(response.data);

      if (response.status === 200) {
        const { admin, user, jwtToken } = response.data;
        localStorage.setItem("ecommerce_login", JSON.stringify(response.data));

        if (admin && admin.role?.some((role) => role.roleName === "Admin")) {
          navigate("/admin");
        } else if (user && user.role?.some((role) => role.roleName === "User")) {
          navigate("/");
        } else {
          alert("Unknown role. Contact support.");
        }

        alert("Login successfully");
      }
    } catch (error) {
      console.error("Login Error:", error);
      const errorMessage =
        error.response?.data?.message || "Failed to log in. Try again.";
      alert(errorMessage);
    }
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginBox}>
        <h2>Login</h2>
        <p>
          Don't have an account yet? <a href="/register">Create account</a>
        </p>

        <form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className={`${styles.inputField} ${errors.email ? styles.errorBorder : ""}`}
          />
          {errors.email && <p className={styles.errorText}>{errors.email}</p>}

          <Input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className={`${styles.inputField} ${errors.password ? styles.errorBorder : ""}`}
          />
          {errors.password && <p className={styles.errorText}>{errors.password}</p>}

          <a href="/forgot-password" className={styles.forgotPassword}>
            Forgot your password?
          </a>

          <Button type="submit" className={styles.signInBtn}>
            SIGN IN
          </Button>
        </form>

        <a href="/" className={styles.returnToStore}>
          Return to Store
        </a>
      </div>
    </div>
  );
};

export default Login;
