import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";
import './login.css';


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [buttonText, setButtonText] = useState("Request Password Reset Link");
  const nav=useNavigate();

  const clickSubmit = (e) => {
    e.preventDefault();
    setButtonText("Please wait, It may take longer ...");
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/forgot-password`,
      data: { email },
    })
      .then((response) => {
        console.log("Forgot Password Success=> ", response);
        toast.success(response.data.message);
        setButtonText("Check your email")
        setEmail("");
      })
      .catch((error) => {
        console.log("Forgot Password Error=> ", error.response);
        toast.error(error.response.data.error);
        setEmail("");
        setTimeout(()=>{
          nav("/signup")
        }, 4000);
      });
  };
  const forgotPassword=()=>(
    <div className="login-page">
      <ToastContainer />
      <div className="login-container">
      <h2 className="login-title">Forgot Password</h2>
      <form className="login-form" onSubmit={clickSubmit}>
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
        <input type="submit" value={`${buttonText}`} />
        </div>
      </form>
      </div>
    </div>
  )

  return (
    forgotPassword()
  );
};

export default ForgotPassword;
