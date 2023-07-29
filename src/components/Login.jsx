import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import './login.css';


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText]=useState("Log In");
  const nav = useNavigate();
  const [isLoggedin, setIsLoggedin] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setButtonText("Please Wait! Logging In ...");
    try {
      axios
        .request({
          method: "POST",
          url: `${process.env.REACT_APP_API}/user/login`,
          data: { email, password },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res.data);
          // console.log('res.cookies=> ', res.cookies);
          setButtonText("Submitted");
          toast.success(res.data.message);
          setIsLoggedin(true);
          nav("/dashboard");
        });
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error(error.response?.data?.error || "An error occurred.");
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
        <input type="submit" value={`${buttonText}`} />
        </div>
        <div className="form-group login-signup-link">
          Don't have an account? <a href="/signup">Sign Up</a>
        </div>
      </form>
      </div>
    </div>
  );
}

export default Login;
