import { createContext, useState, useReducer } from "react"

export const CartContext = createContext({
    customer: {},
    items: [],
    total: 0,
    handleOrderMeal: () => {},
    handleDecreaseQuantity: () => {},
    handleIncreaseQuantity: () => {},
    handleAddCustomer: () => {},
    handleFinishOrder: () => {}
})

function cartReducer(state, action) {
    if(action.type === "ORDER_MEAL") {
        const { name, price, id } = action.payload
        const updatedOrders = [...state.items]
        const index = updatedOrders.findIndex(el => el.id === id)
        if(index === -1) {
          return {
            ...state,
            items: [...updatedOrders, {
                id,
                name,
                price,
                amount: 1
              }]
          }  
        }
        const updatedOrder = {...updatedOrders[index]}
        updatedOrder.amount += 1
        updatedOrders[index] = updatedOrder
        return {
            ...state,
            items: updatedOrders
        }
    }

    if(action.type === "UPDATE_QUANTITY") {
        const { id, amount } = action.payload
        const updatedOrders = [...state.items]
        const index = updatedOrders.findIndex(el => el.id === id)
        const updatedOrderItem = {...updatedOrders[index]}
        updatedOrderItem.amount += amount
        if(updatedOrderItem.amount < 1) {
            updatedOrders.splice(index, 1)
            return {
                ...state,
                items: updatedOrders
            }
        }
        updatedOrders[index] = updatedOrderItem
        return {
            ...state,
            items: updatedOrders
        }

    }

    if(action.type === "ADD_CUSTOMER") {
        return {
            ...state,
            customer: action.payload
        }

    }

    if(action.type === "FINISH_ORDER") {
        return {
            items: [],
            customer: {}
        }
    }

    return state
}

export default function CartContextProvider({ children }) {
    const [ cartState, cartDispatch ] = useReducer(cartReducer, {
        items: [],
        customer: {}
    })

    function handleOrderMeal(name, price, id) {
        cartDispatch({
            type: "ORDER_MEAL",
            payload: {
                name,
                price,
                id
            }
        })
    }

    function handleDecreaseQuantity(id) {
        cartDispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                id,
                amount: -1
            }
        })
    }

    function handleIncreaseQuantity(id) {
        cartDispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                id,
                amount: 1
            }
        })
    }

    function handleAddCustomer(customer) {
        cartDispatch({
            type: "ADD_CUSTOMER",
            payload: customer
        })
    }

    function handleFinishOrder() {
        cartDispatch({
            type: "FINISH_ORDER",
        })
    }

    let total = cartState.items.reduce((pv, order) => {
        return (order.amount * order.price) + pv
    }, 0)

    const ctxValue = {
        customer: cartState.customer,
        orders: cartState.items,
        total: total.toFixed(2),
        handleOrderMeal,
        handleDecreaseQuantity,
        handleIncreaseQuantity,
        handleAddCustomer,
        handleFinishOrder
    }

    return (
        <CartContext.Provider value={ctxValue}>
            {children}
        </CartContext.Provider>
    )
}