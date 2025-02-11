import { Box, Button, Divider } from '@mui/material'
import React, { useEffect } from 'react'
import PaymentsIcon from '@mui/icons-material/Payments';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { fetchOrderById, fetchOrderItemById } from '../../../state/customer/OrderSlice';

const OrderDetails = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const {orderId,orderItemId} = useParams();
    const {order} = useAppSelector(store => store);
    useEffect(() => { 

      dispatch(fetchOrderById({orderId:Number(orderId),jwt:localStorage.getItem("jwt")||""}))

      dispatch(fetchOrderItemById({orderItemId:Number(orderItemId),jwt:localStorage.getItem("jwt")||""}))

    }, [])

  return (
    <Box className='space-y-5 '>

      <section className='flex flex-col gap-5 justify-center items-center'>
        <img className='w-[100px]' src={order.orderItem?.service.images?.[0]} alt="" />
        <div className='text-sm space-y-1 text-center'>
          <h1 className='font-bold'>{order.orderItem?.service.vendor?.shopDetails.shopName} 
          </h1>
          <p> {order.orderItem?.service.title}</p>
          
        </div>
        <div>
          <Button onClick={() => navigate(`/reviews/${5}/create`)}>Write Review</Button>
                                   {/* {orders.orderItem?.product.id} */}
        </div>
      </section>

      <section className='border p-5'>
        {/* <OrderStepper orderStatus={order.currentOrder?.orderStatus} /> */}

      </section>
      <div className='border p-5'>
        <h1 className='font-bold pb-3'> Address for service</h1>
        <div className='text-sm space-y-2'>
          <div className='flex gap-5 font-medium'>
            <p> {order.currentOrder?.shippingAddress.name}</p>
            <Divider flexItem orientation='vertical' />
            <p>{order.currentOrder?.shippingAddress.mobile}</p>
          </div>
          <p> {order.currentOrder?.shippingAddress.address} , 
          {order.currentOrder?.shippingAddress.state} , 
          {order.currentOrder?.shippingAddress.city} , 
          {order.currentOrder?.shippingAddress.pincode}

          </p>
        </div>
      </div>

      <div className='border  space-y-4'>

        <div className='flex justify-between text-sm pt-5 px-5'>
          <div className='space-y-1'>
            <p className='font-bold'>Total Payable Price</p>
            <p>You saved <span className='text-blue-500 font-medium text-xs'>₹
              {(order.orderItem?.mrpPrice ?? 0) - (order.orderItem?.sellingPrice ?? 0)}</span> on this service</p>
          </div>

          <p className='font-medium'>₹ {order.orderItem?.sellingPrice}</p>
        </div>

        <div className='px-5 '>
          <div className='bg-blue-50 px-5 py-2 text-xs font-medium flex items-center gap-3 '>
            <PaymentsIcon />
            <p >Pay Online</p>


          </div>
        </div>


        <Divider />

        <div className='px-5 pb-5'>
          <p className='text-xs'><strong>Service Provider : </strong>{order.orderItem?.service.vendor?.shopDetails.shopName}</p>
                                                      
        </div>

        <div className='p-10'>
          <Button
          disabled={false}
          // orders.currentOrder?.orderStatus==="CANCELLED"
            // onClick={handleCancelOrder}
            color='error' sx={{ py: "0.7rem" }} className='' variant='outlined' fullWidth>
            {false?"order canceled":"Cancel Order"}
{/* orders.currentOrder?.orderStatus==="CANCELLED"  instead of true*/}
          </Button>
        </div>
      </div>
    </Box>
  )
}

export default OrderDetails