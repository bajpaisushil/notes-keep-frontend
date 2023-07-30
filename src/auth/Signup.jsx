import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./login.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttonText, setButtonText] = useState("Sign Up");

  const handleSignup = (e) => {
    e.preventDefault();
    setButtonText("Please Wait! Signing Up ...");
    try {
      axios({
        method: "post",
        url: `${process.env.REACT_APP_API}/user/signup`,
        data: { name, email, password },
      })
        .then((res) => {
          console.log(res.data);
          setButtonText("Submitted");
          toast.success(res.data.message);
        })
        .catch((error) => {
          console.error("Error creating note:", error);
          toast.error(error.response?.data?.error || "An error occurred.");
          setButtonText("Sign Up");
        });
      }
      catch(error){
        console.error("Error creating note:", error);
          toast.error(error.response?.data?.error || "An error occurred.");
      }
    }
      //   setName("");
      //   setEmail("");
      //   setPassword("");

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Signup</h2>
        <form className="login-form" onSubmit={handleSignup}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Enter Name"
            />
          </div>
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
            Already have an account? <a href="/login">Log In</a>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Signup;
