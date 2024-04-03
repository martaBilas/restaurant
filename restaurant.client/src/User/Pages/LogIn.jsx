import React from "react";
import { Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";
import { Formik } from "formik";
import validationSchema from "../../UIElements/validationSchema";

const LogIn = () => {
  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={(values) => {
        handleOrderSubmit(values);
      }}
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row className="pt-3">
            <Col>
              <FloatingLabel label="email">
                <Form.Control
                  type="text"
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
              <FloatingLabel label="password">
                <Form.Control
                  type="text"
                  className="custom-input"
                  placeholder="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </FloatingLabel>
            </Col>
          </Row>
          <Row className=" mt-5 pt-2">
            <Col className="d-flex justify-content-center">
              <Button type="submit" className="signUp-btn" size="md">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default LogIn;
