import React, { useEffect } from 'react'
import CartIitem from './CartIitem'
import { Button } from '@mui/material'
import PricingCard from './PricingCard'
import { useNavigate } from 'react-router-dom'

import { fetchUserCart } from '../../../state/customer/CartSlice'
import { useAppDispatch, useAppSelector } from '../../../state/Store'
import { CartItem } from '../../../types/CartTypes'

const Cart = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    // const handleChange = (e:any) => {    }

    

    useEffect(() => {   
        console.log("useEffect running...");
        dispatch(fetchUserCart(localStorage.getItem('jwt') || ""))
        
    }, [dispatch]);

    const {cart} = useAppSelector((state) => state);

    return (
        <div className="pt-10 px-5 sm:px-10 md:px-60 lg:px-60 min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
                <div className="lg:col-span-2 space-y-3 ">
                    {/* {cart.cart?.cartItems.map((item: CartItem) => (
                        <CartItemCard key={item.id} item={item} />
                    ))} */}
                    {/* {[1, 1, 1].map((item) => <CartIitem />)} */}
                    {cart.cart?.cartItems.map((item:any)=> <CartIitem item={item} />)}

                </div>
                <div className='col-span-1 text-sm space-y-3'>
                    <div className="border rounded-md">
                        <p className="text-primary text-center font-bold">Total</p>
                        <PricingCard />
                        <div className="p-5">
                            <Button
                                onClick={() => navigate("/checkout")}
                                sx={{ py: "11px" }}
                                variant="contained"
                                fullWidth
                            >
                                BUY NOW
                            </Button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Cart