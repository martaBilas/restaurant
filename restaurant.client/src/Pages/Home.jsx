import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";

import Catalogue from "../components/Catalog/Catalogue";
import Menu from "../components/Menu/Menu";

const Home = () => {
  const [selectedCatalogueItem, setSelectedCatalogueItem] = useState(1);
  const [meals, setMeals] = useState([]);

  return (
    <Container>
      <Row className="py-4">
        <Col md="12">
          <img src="src\assets\img\pic.jpeg" alt="img" className="img-fluid" />
        </Col>
      </Row>
      <Row>
        <h3>Our Menu</h3>
        <Catalogue
          setSelectedCatalogueItem={setSelectedCatalogueItem}
          setMeals={setMeals}
        />
      </Row>
        <Menu meals={meals} />
    </Container>
  );
};

export default Home;
