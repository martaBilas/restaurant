import { Row, Col, Form, FloatingLabel } from "react-bootstrap";

export const UserInfoFields = ({ handleChange, values, errors }) => (
  <Row className="pt-2">
    <Col>
      <FloatingLabel label="new password">
        <Form.Control
          type="password"
          className="custom-input"
          placeholder="new password"
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          isInvalid={!!errors.newPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.newPassword}
        </Form.Control.Feedback>
      </FloatingLabel>
    </Col>
    <Col>
      <FloatingLabel label="confirm new password">
        <Form.Control
          type="password"
          className="custom-input"
          placeholder="confirm new password"
          name="repeatNewPassword"
          value={values.repeatNewPassword}
          onChange={handleChange}
          isInvalid={!!errors.repeatNewPassword}
        />
        <Form.Control.Feedback type="invalid">
          {errors.repeatNewPassword}
        </Form.Control.Feedback>
      </FloatingLabel>
    </Col>
  </Row>
);
