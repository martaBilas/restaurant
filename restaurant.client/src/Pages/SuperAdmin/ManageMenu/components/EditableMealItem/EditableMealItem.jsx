import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Card, Row, Col } from 'react-bootstrap';
import DeleteConfirmationPopup from '../../../../../components/DeleteConfirmationPopup/DeleteConfirmationPopup';
import MealDetailsPopup from '../MealDetailsPopup/MealDetailsPopup';

const EditableMealItem = (props) => {

    const navigate=useNavigate()

    const [isDeletePopupVisible, setDeletePopupVisibility] = useState(false);
    const togglePopup = () => {
        setDeletePopupVisibility(!isDeletePopupVisible);
    };

    const [isDetailsPopupVisible, setDetailsPopupVisibility] = useState(false);
    const toggleDetailsPopup = () => {
        setDetailsPopupVisibility(!isDetailsPopupVisible);
    };

    const handleDelete = async () => {
        try {
            await props.onDeleteMeal(props.id);
            togglePopup();
        } catch (error) {
            console.error("Error deleting meal:", error);
        }
    };

    const handleEdit = () => {
        navigate(`/meal/${props.id}`); 
      };
  
    return (
        <React.Fragment>
            <Card className="menuItem_card p-4">
                <Card.Img className="menuItem_img" src={props.imageUrl} />
                <Card.Title className="menuItem_name pt-3">
                    {props.name}
                </Card.Title>
                <Row className="m-0 d-flex justify-content-center align-items-center">
                    <Col md="3" xs="3" className="d-flex justify-content-center align-items-center p-0 ">
                        <button
                            className="fs-4 transparent_button"
                            onClick={toggleDetailsPopup}
                        >
                            <i className="fas fa-eye" style={{color: "#74C0FC"}}></i>
                        </button>
                    </Col>
                    <Col md="3" xs="3" className="d-flex justify-content-center align-items-center p-0">
                        <button
                            className="fs-4 transparent_button"
                            onClick={handleEdit}
                        >
                            <i className="fas fa-pencil-alt" style={{ color: '#8fe869' }}></i>
                        </button>
                    </Col>
                    <Col md="3" xs="3" className="d-flex justify-content-center align-items-center p-0">
                        <button
                            className="fs-4 transparent_button"
                            onClick={togglePopup}
                        >
                            <i className="fas fa-trash-alt" style={{ color: '#bb1616' }}></i>
                        </button>
                    </Col>
                </Row>
            </Card>

            <DeleteConfirmationPopup
                togglePopup={togglePopup}
                isVisible={isDeletePopupVisible}
                onConfirm={handleDelete} 
            />

            <MealDetailsPopup
                name={props.name}
                imageUrl={props.imageUrl}
                description={props.description}
                price={props.price}
                weight={props.weight}
                togglePopup={toggleDetailsPopup}
                isVisible={isDetailsPopupVisible}
            />
        </React.Fragment>
    );
}

export default EditableMealItem;
