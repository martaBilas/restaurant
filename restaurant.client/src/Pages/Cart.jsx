import React, { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Button, ModalBody } from "react-bootstrap";

import "./Cart.css";
import OrderDetailsForm from "../Cart/OrderDetailsForm";
import Order from "../Cart/Order";
import ConfirmedOrder from "../Cart/ConfirmedOrder";

const Cart = (props) => {
  const isMobile = window.innerWidth <= 768;
  const [currentComponent, setCurrentComponent] = useState(1);

  const renderComponent = () => {
    switch (currentComponent) {
      case 1:
        return <Order />;
      case 2:
        return <OrderDetailsForm />;
      case 3:
        return <ConfirmedOrder />;
      default:
        return null;
    }
  };

  const handleNextButtonClick = () => {
    setCurrentComponent(currentComponent + 1);
  };

 const renderHeader = () => {
    switch (currentComponent) {
      case 1:
        return <Offcanvas.Title className="fs-3">Cart</Offcanvas.Title>;
      case 2:
        return (
          <button className="transparent_button fs-5" onClick={handleBackButtonClick}>
            <i class="fa-solid fa-chevron-left"></i> back
          </button>
        );
      default:
        return null;
    }
  };

  const handleBackButtonClick=()=>{
    setCurrentComponent(1)
  }

  return (
    <React.Fragment>
      <Offcanvas
        placement="end"
        show={props.showCart}
        onHide={props.closeCartHandler}
        className="custom-offcanvas d-flex flex-column justify-content-between"
        backdropClassName="custom-offcanvas-backdrop"
      >
        <Offcanvas.Header className="pb-0" closeButton>
          {renderHeader()}
        </Offcanvas.Header>
        <Offcanvas.Body>{renderComponent()}</Offcanvas.Body>
        <Row className="px-4 pb-3">
          <Col className="d-flex justify-content-end">
            {currentComponent !== 3 && (
              <Button
                onClick={handleNextButtonClick}
                className="cartNext-but"
                size="md"
              >
                Next
              </Button>
            )}
          </Col>
        </Row>
      </Offcanvas>

      {/* {isMobile && (
        <Modal show={props.showCart} onHide={props.closeCartHandler}>
          <ModalBody></ModalBody>
        </Modal>
      )} */}
    </React.Fragment>
  );
};

export default Cart;
