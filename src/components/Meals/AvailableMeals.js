import React, { useEffect, useState } from "react";

import MealItem from './MealItem/MealItem.js';
import Card from "../UI/Card";
import classes from './AvailableMeals.module.css';
 
const AvailableMeals = () => {

  console.log('RUNNING')

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);     //when the component is rendered, we start with a loading data 
  const [httpError, setHttpError] = useState(null);

  useEffect(() => {

    fetchMeals();
    async function fetchMeals() {
      try {
        const response = await fetch('https://new-react-http-bdae2-default-rtdb.firebaseio.com/meals.json');

        if (!response.ok) {
          throw new Error('Something went wronggg!');     //if response.ok is falsy (response is not okay due to some error), error is thrown. The codes after it won't be executed and the thrown error message is caught as error.message in the catch block
        }

        const data =  await response.json();
        const mealItems = [];
        for (const key in data) {
          mealItems.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price
          })
        }
        setIsLoading(false);
        setMeals(mealItems);

      } catch (error) {
        setIsLoading(false);                          //even if there is an error, we're done loading
        setHttpError(error.message);
      }
    };

  }, []);

  if (isLoading) {
    return (
      <section className={classes.loading}>
        <p>Loading...</p>
      </section>
    )
  }

  if (httpError) {
    return (
      <section className={classes.error}>
        <p>{httpError}</p>
      </section>
    )
  }
  
  const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} name={meal.name} description={meal.description} price={meal.price}/>)

  return (
    <section className={classes.meals}>
        <Card>
            <ul>
                {mealsList}
            </ul>
        </Card>
    </section>
  )

};

export default AvailableMeals;