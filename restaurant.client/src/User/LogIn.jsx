import { React, useState } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FloatingLabel,
  Image,
  Alert,
} from "react-bootstrap";
import { Formik } from "formik";
import { SignInValidationSchema } from "../UIElements/validationSchema";

import { logIn } from "../ApiCall";
import { useAuth } from "./AuthContext";

const LogIn = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleLogInSubmit = async (values) => {
    try {
      const model = {
        email: values.email,
        password: values.password,
      };
      const response = await logIn(model);
      if (response.status === 200) {
        if (response.data.message) {
          setError(response.data.message);
        } else {
          console.log("sign in success");
          login(response.data);
        }
      }
    } catch (error) {
      console.error("Sign in failed" + error);
    }
  };
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
      <Formik
        validationSchema={SignInValidationSchema}
        initialValues={{
          email: "",
          password: "",
        }}
        onSubmit={(values) => {
          handleLogInSubmit(values);
        }}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
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
                    type="password"
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
            {error && (
              <Row className="pt-3">
                <Col className="text-danger">
                  <i
                    class="fa-solid fa-circle-exclamation fa-sm pe-2"
                    style={{ color: '#dc3545' }}
                  ></i> 
                    {error}
                </Col>
              </Row>
            )}
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
    </>
  );
};

export default LogIn;
