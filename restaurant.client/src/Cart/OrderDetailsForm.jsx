import React from "react";
import { Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import { placeOrder } from "../ApiCall";

import validationSchema from "../UIElements/validationSchema";
import CustomerInfoForm from "../UIElements/CustomerInfoForm";

const OrderDetailsForm = (props) => {
  const navigation = useNavigate();
  const handleLogInClick = () => {
    // Navigate to the login page
    navigation('/login');
  };

  const handleOrderSubmit = async (values) => {
    try {
      const model = {
        name: values.name,
        surname: values.surname,
        address: values.address,
        phone: values.phone,
        email: values.email,
        paymentType: values.paymentType,
        additionalInfo: values.additionInfo,
      };
      const response = await placeOrder(model);
      if (response.status === 200) {
        props.handleNextButtonClick();
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  const isCart = true;
  return (
    <>
      <p className="fs-4 pt-0">Confirm order:</p>
      <div>
        <span className="mr-2">Maybe you already have an account? </span>
        <Link to="/login" className="d-inline fs-8 p-0" onClick={handleLogInClick}>
          (log in)
        </Link>
      </div>
      <CustomerInfoForm handleFormSubmit={handleOrderSubmit} isCart={isCart} />
    </>
  );
};

export default OrderDetailsForm;
