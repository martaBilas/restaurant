import React, { useState, useEffect } from "react";
import { Offcanvas } from "react-bootstrap";

import "./AuthDraw.css";
import SingUp from "../User/Pages/SingUp";
import LogIn from "../User/Pages/LogIn";
import UserAccount from "../User/Pages/UserAccount";
import { useAuth } from "../User/Pages/AuthContext";

const AuthDraw = (props) => {
  const [currentComponent, setCurrentComponent] = useState(1);
  const { isAuthenticated } = useAuth();

  const setCurrentComponentHandler = (componentNumber) => {
    setCurrentComponent(componentNumber);
  };

  useEffect(() => {
    if (isAuthenticated) {
      setCurrentComponent(2);
    }
  }, [isAuthenticated]);

  const renderTitle = () => {
    switch (currentComponent) {
      case 0:
        return (
          <div>
            <h2 className="authDraw-title">Sign up</h2>
            <p>Register to track all your orders and information!</p>
          </div>
        );
      case 1:
        return <h2 className="authDraw-title">Log In</h2>;
      case 2:
        return <h2>My account</h2>;
      default:
        return null;
    }
  };

  const renderComponent = () => {
    switch (currentComponent) {
      case 0:
        return <SingUp />;
      case 1:
        return <LogIn />;
      case 2:
        return <UserAccount />;
      default:
        return null;
    }
  };

  const renderRef = () => {
    switch (currentComponent) {
      case 0:
        return (
          <div>
            <span className="mr-2">Maybe you already have an account? </span>
            <a
              className="d-inline fs-8 p-0"
              onClick={() => setCurrentComponentHandler(1)}
            >
              (log in)
            </a>
          </div>
        );
      case 1:
        return (
          <div>
            <span className="mr-2">Do not have an account? </span>
            <a
              className="d-inline fs-8 p-0"
              onClick={() => setCurrentComponentHandler(0)}
            >
              (sign up)
            </a>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Offcanvas
      show={props.showAuth}
      onHide={props.closeAuthHandler}
      className="custom-offcanvas d-flex flex-column justify-content-between"
      backdropClassName="custom-offcanvas-backdrop"
      placement="end"
    >
      <Offcanvas.Title className="pt-3 ps-3">{renderTitle()}</Offcanvas.Title>
      <Offcanvas.Body>
        {renderRef()}
        {renderComponent()}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AuthDraw;
