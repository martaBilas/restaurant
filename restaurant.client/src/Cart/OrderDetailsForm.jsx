import React from "react";
import { Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";
import { Formik } from "formik";
import { placeOrder } from "../ApiCall";

import validationSchema from "../UIElements/validationSchema";

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

  return (
    <>
      <p className="fs-4 pt-0">Confirm order:</p>
      <div>
        <span className="mr-2">Maybe you already have an account? </span>
        <a className="d-inline fs-8 p-0" href="#">
          (log in)
        </a>
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={{
          name: "",
          surname: "",
          address: "",
          phone: "",
          email: "",
          paymentType: "",
          additionInfo: "",
        }}
        onSubmit={(values) => {
          handleOrderSubmit(values);
        }}
      >
        {({ handleSubmit, handleChange, values, touched, errors }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row className="pt-3">
              <Col>
                <FloatingLabel controlId="floatingName" label="name">
                  <Form.Control
                    type="text"
                    className="custom-input"
                    placeholder="name"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                  />
                </FloatingLabel>
                <Form.Control.Feedback type="invalid">
                  {errors.name}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <FloatingLabel controlId="floatingSurname" label="surname">
                  <Form.Control
                    className="custom-input"
                    type="text"
                    placeholder="surname"
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                    isInvalid={!!errors.surname}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.surname}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="pt-2">
              <Col>
                <FloatingLabel label="address">
                  <Form.Control
                    type="text"
                    className="custom-input"
                    placeholder="address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.address}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <FloatingLabel label="phone">
                  <Form.Control
                    type="text"
                    className="custom-input"
                    placeholder="phone"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    isInvalid={!!errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.phone}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
            </Row>
            <Row className="pt-2 align-items-end">
              <Col>
                <FloatingLabel label="email">
                  <Form.Control
                    type="email"
                    className="custom-input"
                    placeholder="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </FloatingLabel>
              </Col>
              <Col>
                <Form.Select
                  aria-label="Default select example"
                  placeholder="payment type"
                  className="custom-input"
                  name="paymentType"
                  value={values.paymentType}
                  onChange={handleChange}
                  isInvalid={!!errors.paymentType}
                >
                  <option>payment type</option>
                  <option value="1">cash</option>
                  <option value="2">credit card</option>
                </Form.Select>
                <Form.Control.Feedback type="paymentType">
                  {errors.email}
                </Form.Control.Feedback>
              </Col>
            </Row>
            <Row className="pt-4">
              <Col>
                <Form.Label className="fs-6 ps-1">
                  Here you can add some comments to your order if you like to:
                </Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Comment to your order"
                  name="additionInfo"
                  value={values.additionInfo}
                  onChange={handleChange}
                  rows={5}
                />
              </Col>
            </Row>
            <Row className=" mt-5 pt-5">
              <Col className="d-flex justify-content-end">
                <Button type="submit" className="cartNext-but" size="md">
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default OrderDetailsForm;
