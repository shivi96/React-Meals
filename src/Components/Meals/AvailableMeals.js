import React, { useEffect, useState } from "react";
import Card from "../UI/Card";
import styles from "./AvailablesMeals.module.css";
import MealItem from "./MealItem/MealItem";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Chhole Bhature",
//     description: "Crispy Bhature with Spicy Chhole",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Pav Bhaji",
//     description: "A Spongy Pav with delicious Bhaji",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Idli Sambhar",
//     description: "Tasty Idlis with hot n spicy Sambhar",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Rasgulla",
//     description: "Sweet and Tasty Rasgulla",
//     price: 18.99,
//   },
// ];



const AvailableMeals = () => {
  const[meals,setMeals]=useState([]);
  const[isLoading, setIsLoading]=useState(false);
const [httpError,setHttpError]=useState(null);

useEffect(()=>{
  const fetchMeals=async()=>{
    setIsLoading(true);
    const response=await fetch("https://react-6403c-default-rtdb.firebaseio.com/meals.json");
    if(!response.ok)
    {
      throw new Error("Something went Wrong");
    }
    const responseData=await response.json();

   
    const loadedMeals=[];
    for(const key in responseData)
    {
      loadedMeals.push({
        id:key,
        name:responseData[key].name,
        description:responseData[key].description,
        price:responseData[key].price
      });
    }
    setMeals(loadedMeals);
    setIsLoading(false);
  }
  fetchMeals().catch((error)=>{
    setIsLoading(false);
    setHttpError(error.message);
  });
},[]);

  if(httpError)
  {
    return(
      <Card>
          <p className={styles.load}>{httpError}</p>
        </Card>
    )
  }
  else{
    return (
      <div className={styles.meals}>
        <Card>
          {!isLoading && <>
            <ul>
            {meals.map((meal) => (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            ))}
          </ul>
          </>}
          {isLoading && <p className={styles.load}>...Loading</p>}
        </Card>
      </div>
    );

  }
  
};

export default AvailableMeals;
