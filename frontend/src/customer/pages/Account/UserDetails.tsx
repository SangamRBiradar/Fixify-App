import React from 'react'
import ProfileFieldCard from "../../../Components/ProfileFieldCard"
import { Divider } from '@mui/material'
import { useSelector } from 'react-redux'
import { useAppSelector } from '../../../state/Store'


const UserDetails = () => {

  const {auth} = useAppSelector(store=>store);

  return (
    <div className="flex justify-center py-10">
      <div className="w-full lg:w-[70%]  ">
        <div className="flex items-center pb-3 justify-between">
          <h1 className="text-2xl font-bold text-gray-600 ">
            Profile Details
          </h1>
          {/* <div>
            <Button
              onClick={handleOpen}
              size="small"
              sx={{ borderRadius: "2.9rem" }}
              variant="contained"
              className="w-16 h-16"
            >
              <EditIcon />
            </Button>
          </div> */}
        </div>
        <div className="space-y-5">
          {/* <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src="https://cdn.pixabay.com/photo/2014/11/29/19/33/bald-eagle-550804_640.jpg"
          /> */}
          <div>
            <ProfileFieldCard keys={"Name"} value={auth.user?.fullName} />
                                                {/*user.user?.fullName*/} 
            <Divider />
            <ProfileFieldCard keys={"Email"} value={auth.user?.email} />
                                                {/*user.user?.email*/} 
            <Divider />
            <ProfileFieldCard keys={"Mobile"} value={auth.user?.mobile} />
                                                {/*user.user?.mobile*/}
          </div>
        </div>
      </div>
      {/* <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>Update UserProfile</Box>
      </Modal> */}
    
    </div>
  )
}

export default UserDetails