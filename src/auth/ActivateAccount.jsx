import React, { useEffect, useState } from "react";
import { Container, Button, Card } from "react-bootstrap";
// import jwt from 'jsonwebtoken';
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";


function ActivateAccount() {
  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const nav=useNavigate();
  useEffect(() => {
    const url = window.location.pathname;
    const token = url.replace("/auth/activate/", "");
    // let {name}=jwt.decode(token);
    let { name } = jwt_decode(token);
    console.log(name);
    if (token) {
      setToken(token);
      setName(name);
    }
  });
  const handleActivateAccount = (e) => {
    e.preventDefault();
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/user/activate-account`,
      data: { token },
    })
      .then((response) => {
        console.log("ACCOUNT ACTIVATION", response);
        toast.success(response.data.message);
        setTimeout(() => {
          nav("/login");
        }, 1500);
      })
      .catch((error) => {
        console.log("ACCOUNT ACTIVATION ERROR", error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <Container className="container mt-5">
      <Card className="p-4 card-container">
        <Card.Body>
          <Card.Title className="mb-4 text-center card-title">
            Activate Account
          </Card.Title>
          <p className="text-center">
            Hurray! {name.charAt(0).toUpperCase() + name.slice(1).split(" ")[0]}
            , Ready to activate your account?
          </p>
          <div className="text-center">
            <Button variant="primary" onClick={handleActivateAccount}>
              Activate
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ActivateAccount;
