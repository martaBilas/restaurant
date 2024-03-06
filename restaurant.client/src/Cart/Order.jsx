import React from 'react'
import CartItemsList from './CartItemsList'
import { Row,Col, Button } from 'react-bootstrap'

const Order = (props) => {
  return (
    <>
    <p className="fs-4">Your order:</p>
          <CartItemsList />
          <hr />
          <Row className="offset-md-8 row-cols-1">
            <Col>
              <h4>Total: 1278 ₴</h4>
            </Col>
          </Row>
          <Row className=" pt-3">
          <Col className="d-flex justify-content-end">
            <Button className="cartNext-but" size="md" onClick={props.handleNextButtonClick}>
              next
            </Button>
          </Col>
        </Row>
    </>
  )
}

export default Order