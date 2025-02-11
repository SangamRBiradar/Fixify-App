import { Box, Button, Grid, TextField } from '@mui/material';
import { Formik, useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../state/Store';
import { createOrder } from '../../../state/customer/OrderSlice';

// Validation schema
const AddressFormSchema = Yup.object().shape({
    name: Yup.string().required('Required'),
    mobile: Yup.string()
        .matches(/^[6-9]\d{9}$/, 'Invalid mobile number')
        .required('Required'),
    pinCode: Yup.string()
        .matches(/^\d{6}$/, 'Invalid pincode')
        .required('Required'),
    address: Yup.string().required('Required'),
    locality: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    state: Yup.string().required('Required'),
});

const AddressForm = ({paymentGateway}:any) => {
    const dispatch = useAppDispatch();
    const formik = useFormik({
        initialValues: {
            name: '',
            mobile: '',
            pincode: '',
            address: '',
            locality: '',
            city: '',
            state: '',
        },
        validationSchema: AddressFormSchema,
        onSubmit: (values) => {
            console.log('Form Submitted:', values);
            dispatch(createOrder({ address: values,jwt:localStorage.getItem('jwt') || '' ,paymentGateway:paymentGateway}));
        },
    });

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
            <p className="text-xl font-bold text-center pb-5">Contact Details</p>
            {/* ✅ Add onSubmit handler */}
            <form onSubmit={formik.handleSubmit}>  
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="name"
                            label="Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="mobile"
                            label="Mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="pinCode"
                            label="Pincode"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="address"
                            label="Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            name="locality"
                            label="Locality"
                            value={formik.values.locality}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.locality && Boolean(formik.errors.locality)}
                            helperText={formik.touched.locality && formik.errors.locality}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="city"
                            label="City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city} // ✅ Fixed
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            name="state"
                            label="State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button sx={{ py: '14px' }} type="submit" variant="contained" color="primary" fullWidth>
                            Add Address
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default AddressForm;
