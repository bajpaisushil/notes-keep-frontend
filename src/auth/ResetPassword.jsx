import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router-dom";


function ResetPassword() {
  const [name, setName] = useState("");
  const [token, setToken]=useState("");
  const [newPassword, setNewPassword]=useState("");
  const [buttonText, setButtonText] = useState("Reset Password");
  const nav=useNavigate();

  useEffect(() => {
    const url = window.location.pathname;
    const token = url.replace("/auth/password/reset/", "");
    console.log(token);
    let { name } = jwt_decode(token);
    console.log(name);
    if (token) {
      setToken(token);
      setName(name);
    }
  }, []);

  const clickSubmit = (e) => {
    e.preventDefault();
    if (newPassword.length < 5) {
      alert("Password should have at least 5 characters");
      return;
    }
    setButtonText("Please wait, It may take longer ...");
    axios({
      method: "PUT",
      url: `${process.env.REACT_APP_API}/user/reset-password`,
      data: { newPassword, resetPasswordLink: token },
    })
      .then((response) => {
        console.log("Reset Password Success=> ", response);
        toast.success(response.data.message);
        setButtonText("Done");
        setTimeout(() => {
          nav("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log("Reset Password Error=> ", error);
        toast.error(error.response.data.error);
        setButtonText("Reset Password");
      });
  };

  return (
    <div className="login-page">
      <h1 className="login-heading">Hi {name}! Type your new password</h1>
      <div className="login-container">
        <h2 className="login-title">Reset Password</h2>
        <form className="login-form" onSubmit={clickSubmit}>
          <div className="form-group">
            <label htmlFor="password">New Password:</label>
            <input
              type="password"
              id="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              placeholder="Enter new Password"
            />
          </div>
          <div className="form-group">
            <input type="submit" value={`${buttonText}`} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
