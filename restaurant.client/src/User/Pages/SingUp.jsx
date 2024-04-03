import React from "react";
import { Row, Col, Button, Form, FloatingLabel, Image } from "react-bootstrap";
import { Formik } from "formik";

import "./SignUp.css";
import CustomerInfoForm from "../../UIElements/CustomerInfoForm";

const SingUp = () => {
  const isCart=false
  return (
   <CustomerInfoForm isCart={isCart}/>
  );
};

export default SingUp;
