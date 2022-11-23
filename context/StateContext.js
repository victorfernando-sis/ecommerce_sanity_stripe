import React, { createContext, useContext, useState, useEffect } from "react"
import { toast } from 'react-hot-toast'

const Context = createContext()

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct;
    let index;

    useEffect(() => {
        calculateTotalPrice()
        countQuantity()
    }, [cartItems])

    function onAdd(product, quantity) {

        const checkProductInCart = cartItems.find(item => item._id === product._id)
        setTotalQuantities(prevQty => prevQty + quantity)

        if (checkProductInCart) {
            setCartItems(prevState => prevState.map(item => {
                return (item._id === product._id) ?
                    { ...item, quantity: item.quantity + quantity } : item
            })
            )
        } else {
            setCartItems([...cartItems, { ...product, quantity }])
        }
        toast.success(`${qty} ${product.name} added to the cart.`)
    }

    const toggleCartItemQuantity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        if (value === 'inc') {
            setCartItems(prevState => prevState.map(item => {
                return (item._id === id) ?
                    { ...item, quantity: item.quantity + 1 } : item
            }))
            setTotalQuantities(prev => prev + 1)
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                setCartItems(prevState => prevState.map(item => {
                    return (item._id === id) ?
                        { ...item, quantity: item.quantity - 1 } : item
                }))
                setTotalQuantities(prev => prev - 1)
            }
        }
    }

    const calculateTotalPrice = () => {
        setTotalPrice(
            cartItems.reduce((acc, pilot) => {
                return acc + pilot.price * pilot.quantity
            }, 0))
    }

    const removeFromCart = (id) => {
        setCartItems(prevState => prevState.filter(item => item._id !== id))
    }

    const countQuantity = () => {
        setTotalQuantities(
            cartItems.reduce((acc, pilot) => {
                return acc + pilot.quantity
            }, 0))
    }

    function incQty() {
        setQty(prev => prev + 1)
    }
    function decQty() {
        setQty(prev => {
            if (prev - 1 < 1) return 1

            return prev - 1
        })
    }
    return (
        <Context.Provider
            value={{
                showCart,
                setCartItems,
                cartItems,
                setTotalPrice,
                totalPrice,
                setTotalQuantities,
                totalQuantities,
                qty,
                setQty,
                incQty,
                decQty,
                onAdd,
                showCart,
                setShowCart,
                toggleCartItemQuantity,
                removeFromCart
            }}>
            {children}
        </Context.Provider>
    )
}
export const useStateContext = () => useContext(Context)