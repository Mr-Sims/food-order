import classes from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';
import { useEffect, useState } from 'react';


const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(undefined);

    useEffect(() => {


        async function fetchData() {
            const response = await fetch('https://fir-react-http-deb7f-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error('Somethin`s messed up boay!')
            }

            const data = await response.json();

            const loadedMeals = [];
            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            };
            setMeals(loadedMeals);
            setIsLoading(false);
        }

        fetchData().catch(err => {
            console.log(err)
            setIsLoading(false);
            setHttpError(err.message);
        });
    }, [])

    console.log(meals);

    if (isLoading) {
        return (
            <section className={classes.MealsLoading}>
                <p>Loading...</p>
            </section>
        )
    }

    if (httpError) {
        return (
            <section className={classes.MealsError}>
                <p>{httpError}</p>
            </section>
        )
    }

    const mealsList = meals.map(x =>
        <MealItem
            id={x.id}
            key={x.id}
            name={x.name}
            description={x.description}
            price={x.price}
        />
    );


    return (
        <section className={classes.meals}>
            <Card>
                <ul>
                    {mealsList}
                </ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;


