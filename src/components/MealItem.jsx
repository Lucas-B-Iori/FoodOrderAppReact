import { useContext } from "react"
import { CartContext } from "../store/cart-context"

export default function MealItem({ image, name, description, price, id }) {
    const { handleOrderMeal } = useContext(CartContext)
    
    return (
        <div className="meal-item">
            <article>
                <img src={`http://localhost:3000/${image}`} alt={name} />
                <div>
                    <h3>{name}</h3>
                    <p className="meal-item-price">${price}</p>
                    <p className="meal-item-description">{description}</p>
                </div>
                <div className="meal-item-actions">
                    <button 
                        onClick={() => handleOrderMeal(name, price, id)} 
                        className="button"
                    >
                        Add to Cart
                    </button>
                </div>
            </article>
        </div>
    )
}