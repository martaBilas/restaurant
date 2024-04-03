import React from "react";
import { Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";
import { Formik } from "formik";
import { placeOrder } from "../ApiCall";

import validationSchema from "../UIElements/validationSchema";
import CustomerInfoForm from "../UIElements/CustomerInfoForm";

const OrderDetailsForm = (props) => {
  const handleOrderSubmit = async (values) => {
    event.preventDefault();
    event.stopPropagation();
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
  const isCart=true
  return (
    <>
      <p className="fs-4 pt-0">Confirm order:</p>
      <div>
        <span className="mr-2">Maybe you already have an account? </span>
        <a className="d-inline fs-8 p-0" href="#">
          (log in)
        </a>
      </div>
      <CustomerInfoForm handleFormSubmit={handleOrderSubmit} isCart={isCart}/>
    </>
  );
};

export default OrderDetailsForm;
