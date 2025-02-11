import { Beenhere } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import { blue } from '@mui/material/colors'
import React from 'react'
import { Order, OrderItem } from '../../../types/OrderTypes'
import { useNavigate } from 'react-router-dom'

const OrderItemCart = ({item,order}:{item:OrderItem,order:Order}) => {

  const navigate = useNavigate();

  return (
    
    <div onClick={()=>navigate(`/account/orders/${order.id}/${item.id}`)} className='text-sm bg-white p-5 space-y-4 border rounded-md cursor-pointer'>
      {/* onClick={() => navigate(`/account/orders/${order.id}/${item.id}`)}  */}
      <div className='flex items-center gap-5'>
        <div>
          <Avatar sizes='small' sx={{ bgcolor: blue[900] }}>
            <Beenhere />
          </Avatar>

        </div>
        <div>
          <h1 className='font-bold text-blue-800 uppercase'>Pending
          </h1>
          <p>Arriving by {order.delieverDate}</p>
          {/* {formatDate(order.deliverDate)} */}
        </div>
      </div>
      <div className='p-5 bg-blue-50 flex gap-3 w-full'>
        <div className=''>
          <img className='w-[70px]'
            src={item.service.images && item.service.images[1]} alt="" />
              
        </div>
        <div className=' flex-1 w-full space-y-2'>
          <h1 className='font-bold'>{item.service.vendor?.shopDetails.shopName}
          </h1>
          <p>
            {item.service.title}
            AC repairs | Washing Machine Maintainaces 
          </p>

        </div>


      </div>
    </div>

  )
}

export default OrderItemCart