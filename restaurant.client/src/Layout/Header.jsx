import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { RiMenuLine } from "@remixicon/react";

import HeaderNavLinks from "./HeaderNavLinks.jsx";
import "./Header.css";

const Header = () => {

  return (
    <React.Fragment>
      <header id="header" class=" d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <button
            className="main-navigation__menu-btn display-mobile"
          >
            <RiMenuLine className="mobile-nav-toggle" />
          </button>
          <Link className="logo me-auto" to="/home">
            Logo
          </Link>
          <nav className="navbar">
            <HeaderNavLinks />
          </nav>
        </div>
      </header>
    </React.Fragment>
  );
};

export default Header;
