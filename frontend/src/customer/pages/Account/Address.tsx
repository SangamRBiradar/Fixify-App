import React from 'react'
import UserAddressCard from './UserAddressCard'
import { useAppSelector } from '../../../state/Store'

const Address = () => {
    // const { user } = useAppSelector(store => store)
    return (
        <>
            <div className='space-y-3 space-x-3'>
                {[1,1,1,1].map((item)=><UserAddressCard/>)}
            </div>
        </>
    )
}

export default Address

