import React from 'react'
import CartItemsList from './CartItemsList'
import { Row,Col } from 'react-bootstrap'

const Order = () => {
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
    </>
  )
}

export default Order