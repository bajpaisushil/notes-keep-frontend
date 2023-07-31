import React, { useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "./note.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from 'js-cookie';


function Navigation() {
  const cookies = document.cookie;
  const [logoutText, setLogoutText]=useState("Log Out");
  console.log("cookies=> ", cookies);
  const nav=useNavigate();

  function handleLogout() {
    setLogoutText("Logging out ...");
    try {
      axios({
        method: "POST",
        url: `${process.env.REACT_APP_API}/user/logout`,
        withCredentials: true,
      }).then((res) => {
        Cookies.remove('token');
        console.log('logout success=> ',res.data);
        nav("/");
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Navbar.Brand href="/" className="notes-heading">
            Notes Keeping App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {!cookies && (
                <Nav.Link href="/login" className="navbar-login">
                  Login
                </Nav.Link>
              )}
              {cookies && (
                <div className="navbar-dash-logout">
                <Nav.Link href="/dashboard" className="navbar-dashboard">
                  Dashboard
                </Nav.Link>
                <button className="navbar-logout" onClick={handleLogout}>
                  {logoutText}
                </button>
                </div>
              )}
              {/* Add more Nav.Link elements as needed */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default Navigation;
