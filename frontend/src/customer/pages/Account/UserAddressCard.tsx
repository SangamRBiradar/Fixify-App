import React from 'react'

const UserAddressCard = () => {
  
  return (
    <div className='p-5 border rounded-md flex '>


      <div className='space-y-3'>
        <h1 className='font-semibold'>{/*item.name*/}Prathamesh</h1>
        <p className='w-[320px]'>
          {/* {item.address},
            {item.locality},
            {item.city},
            {item.state} - {item.pinCode} */}
          Krushnai Hostel, Akurdi,
          Pune, Maharashtra  - 411005
        </p>
        <p><strong>Mobile : </strong> {/*item.mobile*/}9856437634</p>
      </div>
    </div>
  )
}

export default UserAddressCard