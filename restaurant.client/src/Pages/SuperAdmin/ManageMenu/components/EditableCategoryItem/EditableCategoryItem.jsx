import React, {useState} from 'react';
import { Col } from 'react-bootstrap';
import DeleteConfirmationPopup from '../../../../../components/DeleteConfirmationPopup/DeleteConfirmationPopup';
import { useNavigate } from 'react-router';
import './EditableCategoryItem.scss'

const EditableCategoryItem = ({ id, name, imageUrl, onClick, onDeleteCategory }) => {
  const [isDeletePopupVisible, setDeletePopupVisibility] = useState(false);

  const navigate=useNavigate();

  const togglePopup = () => {
      setDeletePopupVisibility(!isDeletePopupVisible);
  };

  const handleEdit = () => {
    navigate(`/category/${id}`); 
  };

  const handleDelete = async () => {
    try {
        onDeleteCategory(id);
        togglePopup();
    } catch (error) {
        console.error("Error deleting meal:", error);
    }
};

  return (
    <React.Fragment>
      <Col lg="9" md="10" sm="6" xs="11" key={id}>
        <div className="category_item d-flex align-items-center justify-content-between  p-2">
          <div className="d-flex align-items-center gap-2" onClick={() => onClick(id)} style={{ cursor: "pointer" }}>
            <div className="category_img">
              <img className="img-fluid" src={imageUrl} alt={name} />
            </div>
            <span className="mb-0 fs-6">{name}</span>
          </div>
          <div className="d-flex gap-2">
            <i className="fas fa-trash-alt fs-5" style={{ color: '#bb1616' }}  onClick={togglePopup}></i>
            <i className="fas fa-pencil-alt fs-5" style={{ color: '#8fe869' }} onClick={handleEdit}></i>
          </div>
        </div>
      </Col>
      <DeleteConfirmationPopup
        onConfirm={handleDelete}
        togglePopup={togglePopup}
        isVisible={isDeletePopupVisible}
      />
    </React.Fragment>
  );
};

export default EditableCategoryItem;