import { useContext } from "react";
import CartItem from "./CartItem";
import { CartContext } from "../store/cart-context";

export default function Cart() {
    const { orders, total } = useContext(CartContext)
    
    return (
        <div className="cart">
            <h2>Your Cart</h2>
            <ul>
                {orders.map(order => (
                    <CartItem key={order.id} {...order} />
                ))}
            </ul>
            <p className="cart-total">{total === 0 ? '' : `$${total}`}</p>
        </div>
    )
}