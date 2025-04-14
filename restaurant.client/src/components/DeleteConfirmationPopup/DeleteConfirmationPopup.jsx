import React from 'react'
import { Popup } from 'devextreme-react';
import { Row, Col } from 'react-bootstrap';

export default function DeleteConfirmationPopup({ onConfirm, togglePopup, isVisible }) {

    return (
        <Popup
            visible={isVisible}
            onHiding={togglePopup}
            dragEnabled={false}
            hideOnOutsideClick={true}
            position="center"
            title="DELETE"
            width={400}
            height={185}
        >
            <div className="d-flex flex-column h-100">
                <Row className="px-4 fs-6">
                    Are you sure you want to delete this item?
                </Row>
                <Row className="pt-2 mx-0 px-0 fixed-button-row">
                    <Col className="d-flex justify-content-between">
                        <button type="button" className="btn btn-danger o-responsive-btn mt-3 mr-4" onClick={onConfirm}>
                            Delete
                        </button>
                        <button type="button" className="btn btn-secondary o-responsive-btn mt-3" onClick={togglePopup}>
                            Cancel
                        </button>
                    </Col>
                </Row>
            </div>
        </Popup>
    );
}