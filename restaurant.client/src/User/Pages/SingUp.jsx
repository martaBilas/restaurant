import React from "react";
import { Row, Col, Button, Form, FloatingLabel, Image } from "react-bootstrap";
import { Formik } from "formik";

import "./SignUp.css";
import CustomerInfoForm from "../../UIElements/CustomerInfoForm";

const SingUp = () => {
  const isCart = false;
  return (
    <>
      <Row className="d-flex justify-content-center pt-1">
        <Image
          src="src\assets\img\login.png"
          alt="img"
          fluid
          className="authDraw-img"
        />
      </Row>
      <CustomerInfoForm isCart={isCart} />
    </>
  );
};

export default SingUp;
