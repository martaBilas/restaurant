import { React, useReducer } from "react";

const initialState = { meals: [], total: 0 };

export const orderReducer = (state, action) => {
  switch (action.type) {
    case "add": {
      const existingMealIndex = state.meals.findIndex(
        (meal) => meal.id === action.meal.id
      );
      if (existingMealIndex >= 0) 
      {
        const newMeals = [...state.meals];
        newMeals[existingMealIndex].quantity += action.meal.quantity;
        const newTotal = newMeals.reduce(
          (total, meal) => total + meal.price * meal.quantity,0
        );
        return { meals: newMeals, total: newTotal };
      } 
      else 
      {
        const newMeals = [...state.meals, action.meal];
        const newTotal = newMeals.reduce(
          (total, meal) => total + meal.price * meal.quantity,0
        );
        const newOrder ={ meals: newMeals, total: newTotal }
        console.log("i am from reducer"+newOrder)
        return newOrder;
      }
    }
    case "changeAmount": {
    }
    case "delete": {
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
