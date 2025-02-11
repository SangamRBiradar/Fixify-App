import { Radio } from '@mui/material'
import React from 'react'

const AddressCard = () => {
    const handleChange = (event:any)=>{
        console.log(event.target.checked)
    }

  return (
    <div className='p-5 border rounded-md flex '>
            <div>
                <Radio
                    checked={true}
                    onChange={handleChange}
                    value=""
                    name="radio-buttons"
                    inputProps={{ 'aria-label': 'B' }}
                />
            </div>

            <div className='space-y-3 pt-3'>
                <h1>Prathamesh</h1>
                <p className='w-[320px]'>
                    Krushani Hostel,
                    ShindeVasti,
                    Akurdi,
                    MAharashtra - 411044</p>
                <p><strong>Mobile : </strong> 9046386572</p>
            </div>
        </div>
  )
}

export default AddressCard