import React from 'react'
import { Row } from 'react-bootstrap';
import UserMeal from './UserMeal';

const UserOrder = ({order}) => {
  const { meals } = order; 
    return (
        <Row>
          {meals.map((meal) => (
            <div key={meal.Id}>
              <UserMeal
                id={meal.Id}
                name={meal.Name}
                imageUrl={meal.ImageUrl}
                amount={meal.Amount}
                weight={meal.Weight}
              />
            </div>
          ))}
        </Row>
      );
}

export default UserOrder