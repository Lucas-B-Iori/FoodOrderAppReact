import { useContext } from "react"
import { CartContext } from "../store/cart-context"

export default function CartItem({ name, amount, price, id }) {
    const { handleIncreaseQuantity, handleDecreaseQuantity } = useContext(CartContext)

    return (
        <li className="cart-item">
            <p>{name} - {amount} x ${price}</p>
            <div className="cart-item-actions">
                <button onClick={() => handleDecreaseQuantity(id)}>-</button>
                <p>{amount}</p>
                <button onClick={() => handleIncreaseQuantity(id)}>+</button>
            </div>
        </li>
    )
}