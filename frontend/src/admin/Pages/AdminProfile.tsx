import React from 'react'
import ProfileFieldCard from "../../Components/ProfileFieldCard"
import { Divider } from '@mui/material'
import { useAppSelector } from '../../state/Store';


const AdminProfile = () => {

  const {auth} = useAppSelector(store=>store);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]  ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Profile Details
          </h1>
          
        </div>
        <div className="space-y-5">
          {/* <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
          /> */}
          <div>
            <ProfileFieldCard keys={"Name"} value={auth.user?.fullName} />
                                                
            <Divider />
            <ProfileFieldCard keys={"Email"} value={auth.user?.email} />
                                               
            <Divider />
            <ProfileFieldCard keys={"Mobile"} value={auth.user?.mobile} />
                                               
          </div>
        </div>
      </div>
    
    </div>
  )
}

export default AdminProfile