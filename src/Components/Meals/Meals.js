import React from "react";
import AvailableMeals from "./AvailableMeals";
import MealsSummary from "./MealsSummary";

const Meals = () => {
  return (
    <div>
      <MealsSummary></MealsSummary>
      <AvailableMeals></AvailableMeals>
    </div>
  );
};

export default Meals;
