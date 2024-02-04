import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import Catalogue from "../Components/Catalogue";

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Premium quality food for your delicious meal</h1>
          <p></p>
        </Col>
        <Col>
        <img src="" alt="img" />
        </Col>
      </Row>
      <Row>
        <h3>Our Menu</h3>
        <Catalogue/>
      </Row>
    </Container>
  );
};

export default Home;
