import React from "react";
import { Row, Col, Button, Form, FloatingLabel } from "react-bootstrap";
import { useState } from "react";

const OrderDetailsForm = (props) => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
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
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="pt-3">
          <Col>
            <FloatingLabel controlId="floatingName" label="name">
              <Form.Control
                required
                className="custom-input"
                placeholder="name"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel controlId="floatingSurname" label="surname">
              <Form.Control
                required
                className="custom-input"
                type="text"
                placeholder="surname"
              />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="pt-2">
          <Col>
            <FloatingLabel label="adress">
              <Form.Control
                required
                className="custom-input"
                placeholder="adress"
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel label="phone">
              <Form.Control className="custom-input" placeholder="phone" />
            </FloatingLabel>
          </Col>
        </Row>
        <Row className="pt-2 align-items-end">
          <Col>
            <FloatingLabel label="email">
              <Form.Control className="custom-input" placeholder="email" />
            </FloatingLabel>
          </Col>
          <Col>
            <Form.Select
              aria-label="Default select example"
              placeholder="payment type"
              className="custom-input"
            >
              <option>payment type</option>
              <option value="1">cash</option>
              <option value="2">credit card</option>
            </Form.Select>
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
              rows={5}
            />
          </Col>
        </Row>
        <Row className=" mt-5 pt-5">
          <Col className="d-flex justify-content-end">
            <Button className="cartNext-but" size="md" onClick={props.handleNextButtonClick}>
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default OrderDetailsForm;
