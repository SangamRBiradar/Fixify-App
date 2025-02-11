import React from 'react'
import { Avatar, Box, Grid, IconButton } from '@mui/material'
import Rating from '@mui/material/Rating';
import DeleteIcon from '@mui/icons-material/Delete';
import { red } from "@mui/material/colors";


const ReviewCard = () => {
    return (
        <div className="flex justify-between">
            <Grid container spacing={2} gap={3}>
                <Grid item xs={1}>
                    <Box>
                        <Avatar
                            className="text-white"
                            sx={{ width: 56, height: 56, bgcolor: "#9155FD" }}
                        //   alt={item.user.fullName}
                        //   src=""
                        >
                            {/* {item.user.fullName[0].toUpperCase()} */}
                            P
                        </Avatar>
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <div className="space-y-2">
                        <div className="">
                            <p className="font-semibold text-lg">Prathmesh</p>  
                            {/* {item.user.fullName} */}
                            <p className="opacity-70">2025-01-31 23:18:45</p>  
                            {/* {item.createdAt} */}
                        </div>
                        <div>

                            <Rating
                                readOnly
                                // value={item.rating}
                                value={4}
                                name="half-rating"
                                defaultValue={2.5}
                                precision={0.5}
                            />

                        </div>
                        <p>
                            {/* {item.reviewText} */} nice Service..!!!
                        </p>
                        
                    </div>
                </Grid>
            </Grid>
            <div className="">  
                {/* // item.user.id === user.user?.id && */}
        <IconButton>                                              
            {/* onClick={handleDeleteReview} */}
          <DeleteIcon sx={{ color: red[700] }} />
        </IconButton>
      </div>
        </div>
    );
};

export default ReviewCard