import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './login.css';
import Cookies from 'js-cookie';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText]=useState("Log In");
  const [btnBool, setBtnBool]=useState(false);
  const nav = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setButtonText("Please Wait! Logging In ...");
    setBtnBool(true);
    try {
      axios({
          method: "POST",
          url: `${process.env.REACT_APP_API}/user/login`,
          data: { email, password },
          withCredentials: true,
        })
        .then((res) => {
          console.log('res login success=> ', res);
          // console.log('res.cookies=> ', res.cookies);
          try {
            Cookies.set('token', res.data.token, {expires: 7});
            // localStorage.setItem('token', res.data.token);
          } catch (error) {
            console.log(error);
          }
          setButtonText("Submitted");
          toast.success(res.data.message);
          setBtnBool(false);
          setIsLoggedin(true);
          nav("/dashboard");
        })
        .catch((err)=>{
          console.log('Error loggin:', err);
          toast.error(err.response?.data?.error || "An error occurred.");
          setButtonText("Login");
        })
    } catch (error) {
      console.error("Error Logging:", error);
      toast.error(error.response?.data?.error || "An error occurred.");
      setButtonText("Login");
      setBtnBool(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
      <h2 className="login-title">Login</h2>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="name">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Enter Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
          />
        </div>
        <div className="form-group">
        <input type="submit" disabled={btnBool} value={`${buttonText}`} />
        </div>
        <div className="form-group login-signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
        <Link to="/auth/password/forgot" className="forgot-password-button">Forgot Password</Link>
      </form>
      </div>
    </div>
  );
}

export default Login;
