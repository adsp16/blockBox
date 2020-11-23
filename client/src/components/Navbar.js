import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import BlockLogo from "../blocks.svg";
import "./Navbar.css";

const Navigation = ({ account }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">
        <img alt="logo" className="navbar-logo" src={BlockLogo} />
        BlockBox
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse className="justify-content-end" id="basic-navbar-nav">
        <Nav.Link disabled>{account.account}</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
