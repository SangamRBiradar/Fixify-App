import { Box, Button, Modal } from '@mui/material'
import React from 'react'
import AddressCard from './AddressCard'
import AddIcon from '@mui/icons-material/Add';
import AddressForm from './AddressForm';
import PricingCard from '../Cart/PricingCard';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 450,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Checkout = () => {

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [paymentGateway,setPaymentGateway]=React.useState("RAZORPAY");

    const handlePaymentChange=(event:any)=>{setPaymentGateway(event.target.value)}

    return (
        <div className='pt-10 px-5 sm:px-10 md:px-44 lg:px-60 min-h-screen '>
            <div className='space-y-5 lg:space-y-0 lg:grid grid-cols-3 lg:gap-9 '>

                <div className="col-span-2 space-y-5">

                    <div className='flex justify-between items-center'>
                        <span className='font-semibold'>Select Address</span>
                        <Button onClick={handleOpen} variant='outlined'>
                        Add New Address
                        </Button>

                    </div>

                    <div className='text-xs font-medium space-y-5'>
                        <p>Saved Addreses</p>
                        <div className='space-y-3'>

                            {/* {user.user?.addresses?.map((item, index) => <AddressCard
                                key={item.id}
                                item={item}
                                selectedValue={value} value={index}
                                handleChange={handleChange} />)} */}

                            {[1,1,1].map((item) => <AddressCard/>)}

                        </div>
                        <div className='py-4 px-5 rounded-md border'>

                        <Button onClick={handleOpen} startIcon={<AddIcon />}>Add New Address</Button>

                    </div>
                    </div>

                </div>
                <div>
                <div className="border rounded-md">
                        <p className="text-primary text-center font-bold">Total</p>
                        <PricingCard/>
                        <div className="p-5">
                            <Button
                                // onClick={() => navigate("/checkout/address")}
                                sx={{ py: "11px" }}
                                variant="contained"
                                fullWidth
                            >
                                PAY NOW
                            </Button>
                        </div>
                    </div>
                </div>

            </div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <AddressForm paymentGateway={paymentGateway}   />
                    
                </Box>
            </Modal>

        </div>
    )
}

export default Checkout