import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import { RiBankCardLine, RiCashLine } from "@remixicon/react";

import "./Info.css";

const Info = () => {
  return (
    <>
      <Row className="text-start ps-4">
        <h3>About Us</h3>
      </Row>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod eum
        cupiditate ut quia earum quasi illo error dolor, numquam iusto, sunt
        fugiat nemo odio. Inventore itaque eaque quisquam harum incidunt!
      </p>
      <Row>
        <h3>Payment</h3>
      </Row>
      <Row className="ps-5">
        <Col className="col-sm-4 mb-3">
          <Card className="h-100 info-card text-center">
            <div className="d-flex justify-content-center align-items-center">
              <RiCashLine size={60} />
            </div>
            <Card.Title className="pt-3">
              Cash payment upon receipt of order
            </Card.Title>
            <Card.Body className="d-flex flex-column">
              <Card.Text>
                Pay with cash for your food delivery! Select the cash option at
                checkout, and have exact change ready upon delivery for a
                hassle-free experience.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="col-sm-4 mb-3">
          <Card className="h-100 info-card text-center">
            <div className="d-flex justify-content-center align-items-center">
              <RiBankCardLine size={60} />
            </div>
            <Card.Title className="pt-3">
              Cashless payment when placing an order
            </Card.Title>
            <Card.Body className="d-flex flex-column">
              <Card.Text>
                When meeting with the courier, the managers of the pick-up
                point, you can simply pay for your order by card and pick up it.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Info;
