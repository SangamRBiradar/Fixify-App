import { Divider } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../state/Store'
import { sumCartItemMrpPrice, sumCartItemSellingPrice } from '../../../Util/sumCartItemMrpPrice';

const PricingCard = () => {
  const {cart} = useAppSelector(store=>store);
  return (
    <div>
      <div className="space-y-3 p-5">
        <div className="flex justify-between items-center">
          <span>Subtotal</span>
          <span>{cart.cart?.totalMrpPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span>Discount</span>
          <span>
            ₹{" "}
            {sumCartItemMrpPrice(cart.cart?.cartItems || []) -
              sumCartItemSellingPrice(cart.cart?.cartItems || [])}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span>Visit Charge</span>
          <span>₹ 80</span>
        </div>
        <div className="flex justify-between items-center">
          <span>plateform fee</span>
          <span className="text-blue-600">Free</span>
        </div>
      </div>
      
      <Divider />

      <div className="font-medium px-5 py-2 flex justify-between items-center">
        <span>Total</span>
        <span>₹{cart.cart?.totalSellingPrice}</span>
      </div>
    </div>
  )
}

export default PricingCard