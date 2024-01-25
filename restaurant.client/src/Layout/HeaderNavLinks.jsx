import React from "react";
import { NavLink } from "react-router-dom";

import UserLineIcon from "remixicon-react/UserLineIcon";
import ShoppingCartLineIcon from "remixicon-react/ShoppingCartLineIcon";
import "./HeaderNavLinks.css";

const HeaderNavLinks = () => {
  return (
    <ul>
      <li>
        <NavLink to="/menu">
          Menu
        </NavLink>
      </li>
      <li>
        <NavLink to="/contactInfo">
          Contact
        </NavLink>
      </li>
      <li>
        <NavLink to="/deliveryInfo">
          Delivery
        </NavLink>
      </li>
      <li>
        <NavLink to="/cart">
          <ShoppingCartLineIcon />
        </NavLink>
      </li>
      <li>
        <NavLink to="/signIn">
          <UserLineIcon />
        </NavLink>
      </li>
    </ul>
  );
};

export default HeaderNavLinks;
