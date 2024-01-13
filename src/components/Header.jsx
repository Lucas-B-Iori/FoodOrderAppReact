import { useRef, useContext } from 'react'
import { CartContext } from '../store/cart-context'

import logo from '../assets/logo.jpg'
import Modal from './Modal'

export default function Header() {
    const { orders, total } = useContext(CartContext)
    const modal = useRef()
    const ordersAmount = orders.length

    function handleOpenModal() {
        if(+total > 0) {
            modal.current.open()
        }
    }

    return (
        <header id="main-header">
            <Modal ref={modal}/>
            <div id="title">
                <img src={logo} alt="Logo" />
                <h1>ReactFood</h1>
            </div>
            <button 
                className='text-button' 
                onClick={handleOpenModal}
            >
                Cart {ordersAmount === 0 ? '' : `(${ordersAmount})`}
            </button>   
        </header>
    )
}