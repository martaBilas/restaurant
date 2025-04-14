import React from 'react'
import EditableMealItem from '../EditableMealItem/EditableMealItem';
import { Row } from 'react-bootstrap';

const MealList = ({ meals, onDeleteMeal }) => {

    return (
        <Row>
        {meals.length > 0 ? (
          meals.map((item) => (
            <div key={item.id} className="col-lg-4 col-md-6 col-sm-6 col-6 mb-4">
              <EditableMealItem
                id={item.id}
                name={item.name}
                imageUrl={item.imageUrl}
                price={item.price}
                description={item.description}
                weight={item.weight}
                catalogueId={item.catalogueId}
                onDeleteMeal={onDeleteMeal}
              />
            </div>
          ))
        ) : (
          <div className="col-12 text-center">
            <p>There are no items in this category.</p>
          </div>
        )}
      </Row>      
    );
}

export default MealList