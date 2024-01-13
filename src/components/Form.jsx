import { useContext, useState } from "react"
import { CartContext } from "../store/cart-context"

import Input from "./Input"

export default function Form({ formInfos, handleInputChange }) {
    const { total } = useContext(CartContext)

    return(
        <div>
            <h2>Checkout</h2>
            <p>Total Amount: ${total}</p>
            
            <form>
                <Input 
                    label={"Full Name"} 
                    type={"text"}
                    onInputChange={handleInputChange}
                    value={formInfos.name}
                    name="name"
                />
                <Input 
                    label={"E-mail Address"} 
                    type={"email"}
                    onInputChange={handleInputChange}
                    value={formInfos.email}
                    name="email"
                />
                <Input 
                    label={"Street"} 
                    type={"text"}
                    onInputChange={handleInputChange}
                    value={formInfos.street}
                    name="street"
                />
                <div className="control-row">
                    <Input 
                        label={"Postal Code"} 
                        type={"text"}
                        onInputChange={handleInputChange}
                        value={formInfos['postal-code']}
                        name="postal-code"
                    />
                    <Input 
                        label={"City"} 
                        type={"text"}
                        onInputChange={handleInputChange}
                        value={formInfos.city}
                        name="city"
                    />
                </div>
            </form>
        </div>
    )
}