import { forwardRef, useImperativeHandle, useRef, useState, useContext } from "react"

import { CartContext } from "../store/cart-context"

import Cart from "./Cart"
import Form from "./Form"

import { postOrders } from "../http"
import { isLongerEnough, isEmail } from '../util'
import Submit from "./Submit";

const Modal = forwardRef(function Modal({}, ref) {
    const { total, handleFinishOrder, customer, handleAddCustomer, orders } = useContext(CartContext)
    const [ component, setComponent ] = useState("Cart")
    const dialog = useRef()

    const [ formInfos, setFormInfos ] = useState({
        "name": "",
        "email": "",
        "street": "",
        "postal-code": "",
        "city": ""
    })

    const isValid = {
        "name": isLongerEnough(formInfos.name, 2),
        "email": isLongerEnough(formInfos.email, 3) && isEmail(formInfos.email),
        "street": isLongerEnough(formInfos.street, 3),
        "postal-code": isLongerEnough(formInfos['postal-code'], 3),
        "city": isLongerEnough(formInfos.city, 2)
    }

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal()
            }
        }
    })

    function handleInputChange(property, value) {
        setFormInfos(prevFormInfos => {
            const updatedFormInfos = {...prevFormInfos}
            return {
                ...updatedFormInfos,
                [property]: value
            }
        })
    }

    function handleCloseModal() {
        dialog.current.close()
        setComponent("Cart")
    }

    function handleChangeComponent() {
        if(+total === 0) {
            return
        }

        for (const key in isValid) {
            if (!isValid[key] && component === "Form") {
                return
            }
        }

        setComponent(prevValue => {
            if (prevValue === "Cart") {
                return "Form"
            } else if (prevValue === "Form") {
                return "Submit"
            }
        })
    }

    function handleSumbitCart() {
        handleAddCustomer(formInfos)
        postOrders({ order: {
            items: orders, customer: formInfos
        } })
        handleCloseModal()
        handleFinishOrder()
    }

    const buttonText = component === "Cart" ? "Go to Checkout" : component === "Form" ? "Submit Order" : "Okay"

    return (
        <dialog className="modal" ref={dialog}>
            {component === "Cart" ? 
                <Cart /> :
                component === "Form" ? 
                <Form formInfos={formInfos} handleInputChange={handleInputChange} /> :
                <Submit />
            }
            <div className="modal-actions">
                {component !== "Submit" && <button className="text-button" onClick={handleCloseModal}>Close</button>}
                <button 
                    className="button"
                    onClick={component === "Cart" || component === "Form" ? handleChangeComponent : handleSumbitCart}
                    type={component === "Form" ? "submit" : "button"}
                >
                    {buttonText}
                </button>
            </div>
        </dialog>
    )
})

export default Modal