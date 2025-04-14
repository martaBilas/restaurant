import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { Button } from "devextreme-react";
import { TextBox } from "devextreme-react";
import { SelectBox } from "devextreme-react";
import { NumberBox } from "devextreme-react";
import { RequiredRule } from "devextreme-react/validator";
import { NumericRule } from "devextreme-react/validator";
import { RangeRule } from "devextreme-react/validator";
import CustomStore from "devextreme/data/custom_store";
import { Row, Col } from "react-bootstrap";
import { ValidationGroup } from "devextreme-react";
import Validator from "devextreme-react/validator";
import {LoadIndicator} from "devextreme-react";

import PhotoUploader from "../../../components/PhotoUploader/PhotoUploader";

import { getMealById } from "../../../services/MenuService";
import { fetchCategories } from "../../../services/MenuService";
import { getCategoryById } from "../../../services/MenuService";
import { addMealToMenu } from "../../../services/MenuService";
import { updateMeal } from "../../../services/MenuService";

import "./MealWizard.scss";

const MealWizard = () => {

  let { id } = useParams();
  const validationGroupRef = useRef(null);
  const navigate = useNavigate(); 
  
  const [loading, setLoading] = useState(false);

  const [mealData, setMealData] = useState({
    name: "",
    description: "",
    price: null,
    weight: null,
    categoryId: null,
    imageUrl: null
  });

  const categoryDataSource = new CustomStore({
    load: async () => {
      const response = await fetchCategories();
      return response;
    },
    byKey: async (key) => {
      const response = await getCategoryById(key);
      return response;
    }
  });

  useEffect(() => {
    if (id) {
      getMealById(id).then((meal) => {
        setMealData((prev) => ({
          ...prev, 
          ...meal   
        }));
      });
    }
  }, [id]);
  

  const handleNameChange = (e) => {
    setMealData((prevMealData) => ({
      ...prevMealData,
      name: e.value,  
    }));
  };
  
  const handleDescriptionChange = (e) => {
    setMealData((prevMealData) => ({
      ...prevMealData,
      description: e.value,  
    }));
  };
  
  const handleWeightChange = (e) => {
    setMealData((prevMealData) => ({
      ...prevMealData,
      weight: e.value,  
    }));
  };
  
  
  const handlePriceChange = (e) => {
    setMealData((prevMealData) => ({
      ...prevMealData,
      price: e.value,  
    }));
  };
  
  const handleCategoryChange = (e) => {
    setMealData((prevMealData) => ({
      ...prevMealData,
      categoryId: e.value,  
    }));
  };

  const handleFileUpload = (file) => {
    setMealData((prevMealData) => ({
      ...prevMealData,
      image: file,  
    }));
  };

  const handleFormSubmit = () => {
    const validationResult = validationGroupRef.current?.instance.validate();

    if (!validationResult.isValid) {
      return;
    }

    setLoading(true); 

    const submitAction = id ? updateMeal(mealData) : addMealToMenu(mealData);

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
          {id ? "Update Meal" : "Create Meal"}
        </h2>
        <Row>
          <Col md="7">
            <ValidationGroup ref={validationGroupRef}>
              <Row className="mb-3">
                <Col md={4} className="d-flex align-items-center">
                  <label className="fw-bold meal-wizard-label fs-6">
                    Name:
                  </label>
                </Col>
                <Col md={8}>
                  <TextBox
                    placeholder="Enter name of meal"
                    value={mealData.name}
                    onValueChanged={handleNameChange}
                  >
                    <Validator>
                      <RequiredRule message="Name is required" />
                    </Validator>
                  </TextBox>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4} className="d-flex align-items-center">
                  <label className="fw-bold meal-wizard-label fs-6">
                  Description:
                  </label>
                </Col>
                <Col md={8}>
                  <TextBox
                    placeholder="Enter deacription of meal"
                    value={mealData.description}
                    onValueChanged={ handleDescriptionChange}
                  >
                    <Validator>
                      <RequiredRule message="Description is required" />
                    </Validator>
                  </TextBox>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4} className="d-flex align-items-center">
                  <label className="fw-bold meal-wizard-label fs-6">
                    Weight (g):
                  </label>
                </Col>
                <Col md={8}>
                  <NumberBox
                    placeholder="Enter weight"
                    value={mealData.weight}
                    onValueChanged={handleWeightChange}
                  >
                    <Validator>
                      <RequiredRule message="Weight is required" />
                      <NumericRule message="Weight must be a number" />
                      <RangeRule
                        min={1}
                        message="Weight must be greater than 0"
                      />
                    </Validator>
                  </NumberBox>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4} className="d-flex align-items-center">
                  <label className="fw-bold meal-wizard-label fs-6">
                    Price:
                  </label>
                </Col>
                <Col md={8}>
                  <NumberBox
                    placeholder="Enter price"
                    value={mealData.price}
                    onValueChanged={ handlePriceChange}
                  >
                    <Validator>
                      <RequiredRule message="Price is required" />
                      <NumericRule message="Price must be a number" />
                      <RangeRule
                        min={1}
                        message="Price must be greater than 0"
                      />
                    </Validator>
                  </NumberBox>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={4} className="d-flex align-items-center">
                  <label className="fw-bold meal-wizard-label fs-6">
                    Category:
                  </label>
                </Col>
                <Col md={8}>
                  <SelectBox
                    dataSource={categoryDataSource}
                    displayExpr="name"
                    valueExpr="id"
                    value={mealData.categoryId}
                    onValueChanged={handleCategoryChange}
                  >
                    <Validator>
                      <RequiredRule message="Category is required" />
                    </Validator>
                  </SelectBox>
                </Col>
              </Row>
            </ValidationGroup>
          </Col>

          <Col md="5">
            <Row className="mb-3">
              <Col md={4} className="d-flex align-items-center"></Col>
              <Col md={8} className="d-flex align-items-center">
                <PhotoUploader
                  onFileUpload={handleFileUpload}
                  imageSource={mealData.imageUrl}
                />
              </Col>
            </Row>
          </Col>
        </Row>

        <div className="d-flex justify-content-center mt-3">
          <Button
            text={id ? "Update Meal" : "Create Meal"}
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

export default MealWizard;
