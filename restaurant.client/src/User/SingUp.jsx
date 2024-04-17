import React from "react";
import { Row, Image } from "react-bootstrap";

import "./SignUp.css";
import { signUp } from "../ApiCall";
import CustomerInfoForm from "../UIElements/CustomerInfoForm";
import { useAuth } from "./AuthContext";

const SingUp = () => {
  const { login } = useAuth();
  const isCart = false;
  const handleCreateUser = async (values) => {
    try {
      const model = {
        firstName: values.name,
        lastName: values.surname,
        address: values.address,
        phoneNumber: values.phone,
        email: values.email,
        password: values.password,
      };
      const response = await signUp(model);
      if (response.status === 200) {
        console.log("sign up success");
        login(values.email);
      }
    } catch (error) {
      console.error("Sign up failed" + error);
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
      <CustomerInfoForm handleFormSubmit={handleCreateUser} isCart={isCart} />
    </>
  );
};

export default SingUp;
