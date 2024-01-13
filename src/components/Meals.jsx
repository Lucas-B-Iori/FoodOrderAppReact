import { useEffect, useState } from "react"
import { getMeals } from "../http"

import MealItem from "./MealItem"

export default function Meals() {
    const [ meals, setMeals ] = useState([])
    
    useEffect(() => {
        async function getFetchMeals() {
            const data = await getMeals()
            setMeals(data)
        }

        getFetchMeals()
    }, [])

    return (
        <section id="meals">
            {meals.map(meal => (
                <MealItem key={meal.id} {...meal}/>
            ))}
        </section>
    )
}