import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";

import UserLineIcon from "remixicon-react/UserLineIcon";
import ShoppingCartLineIcon from "remixicon-react/ShoppingCartLineIcon";
import "./HeaderNavLinks.css";
import Cart from "../Pages/Cart";

const HeaderNavLinks = () => {
  const [showCart, setShowCart] = useState(false);
  const openCartHandler = () => {
    setShowCart(true);
  };
  const closeCartHandler = () => {
    setShowCart(false);
  };

  return (
    <React.Fragment>
      {showCart &&
      <Cart
        openCartHandler={openCartHandler}
        closeCartHandler={closeCartHandler}
        showCart={showCart}
      />}
      <ul>
        <li>
          <NavLink to="/">Menu</NavLink>
        </li>
        <li>
          <NavLink to="/contactInfo">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/deliveryInfo">Delivery</NavLink>
        </li>
        <li>
          <NavLink to="/signIn">
            <UserLineIcon />
          </NavLink>
        </li>
        <li>
          <Link onClick={openCartHandler}>
            <ShoppingCartLineIcon />
          </Link>
        </li>
      </ul>
    </React.Fragment>
  );
};

export default HeaderNavLinks;
