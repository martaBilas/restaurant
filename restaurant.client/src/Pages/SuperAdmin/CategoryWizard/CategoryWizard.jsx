import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "devextreme-react";
import { TextBox } from "devextreme-react";
import { RequiredRule } from "devextreme-react/validator";
import { Row, Col } from "react-bootstrap";
import { ValidationGroup } from "devextreme-react";
import Validator from "devextreme-react/validator";
import {LoadIndicator} from "devextreme-react";

import PhotoUploader from "../../../components/PhotoUploader/PhotoUploader";

import { getCategoryById } from "../../../services/MenuService";
import { addCategoryToMenu } from "../../../services/MenuService";
import { updateCategory } from "../../../services/MenuService";

const CategoryWizard = () => {

  let { id } = useParams();
  const validationGroupRef = useRef(null);
  const navigate = useNavigate(); 
  
  const [loading, setLoading] = useState(false);

  const [categoryData, setCategoryData] = useState({
    name: "",
    imageUrl: null
  });

  useEffect(() => {
    if (id) {
      getCategoryById(id).then((category) => {
        setCategoryData((prev) => ({
          ...prev, 
          ...category   
        }));
      });
    }
  }, [id]);
  

  const handleNameChange = (e) => {
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      name: e.value,  
    }));
  };

  const handleFileUpload = (file) => {
    setCategoryData((prevCategoryData) => ({
      ...prevCategoryData,
      image: file,  
    }));
  };

  const handleFormSubmit = () => {
    const validationResult = validationGroupRef.current?.instance.validate();

    if (!validationResult.isValid) {
      return;
    }

    setLoading(true); 

    const submitAction = id ? updateCategory(categoryData) : addCategoryToMenu(categoryData);

    submitAction
      .then(() => {
        setLoading(false); 
        setTimeout(() => {
          navigate("/"); 
        }, 100); 
      })
      .catch((error) => {
        console.error("Error adding meal:", error);
        setLoading(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center meal-wizard-container pb-2">
      <div style={{ width: "100%" }}>
        <h2 className="text-center mb-4">
          {id ? "Update Category" : "Create Category"}
        </h2>
        <Row>
          <Col md="7">
            <ValidationGroup ref={validationGroupRef}>
              <Row className="mb-3">
                <Col md={4} className="d-flex align-items-center">
                  <label className="fw-bold meal-wizard-label fs-5">
                    Name:
                  </label>
                </Col>
                <Col md={8}>
                  <TextBox
                    placeholder="Enter name of meal"
                    value={categoryData.name}
                    onValueChanged={handleNameChange}
                  >
                    <Validator>
                      <RequiredRule message="Name is required" />
                    </Validator>
                  </TextBox>
                </Col>
              </Row>
            </ValidationGroup>
            <Row className="mb-3">
              <Col md={4} className="d-flex align-items-center">
                <label className="fw-bold meal-wizard-label fs-5">
                    Image:
                </label>
              </Col>
              <Col md={8} className="d-flex align-items-center">
                <PhotoUploader
                  onFileUpload={handleFileUpload}
                  imageSource={categoryData.imageUrl}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-3">
          <Button
            text={id ? "Update Category" : "Create Category"}
            onClick={handleFormSubmit}
            stylingMode="contained"
            className="submit-button"
            disabled={loading}
          />
        </div>

        {loading && (
          <div className="d-flex justify-content-center mt-3">
            <LoadIndicator visible={loading} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryWizard;