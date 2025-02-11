import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
import { UpdateDetailsFormProps } from "./ShopDetailsForm";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { updateVendor } from "../../../Redux Toolkit/Vendor/VendorSlice";

const PersonalDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
    // const { Vendors } = useAppSelector(store => store)
    // const dispatch=useAppDispatch();

    const formik = useFormik({
        initialValues: {
            VendorName: '',
            email: '',
            mobile: '',
        },
        validationSchema: Yup.object({
            VendorName: Yup.string().required("Vendor Name is required"),
            email: Yup.string().email("Invalid email address").required("Email is required"),
            mobile: Yup.string().required("Mobile number is required"),
        }),
        onSubmit: (values) => {
            
            console.log("data ----- ",values);
            //dispatch(updateVendor(values))
            onClose()
        },
    });

    // useEffect(() => {

    //     if (Vendors.profile) {
    //         formik.setValues({
    //             VendorName: Vendors.profile?.VendorName,
    //             email: Vendors.profile?.email,
    //             mobile: Vendors.profile?.mobile,

    //         })
    //     }

    // }, [Vendors.profile])

    return (
        <>
            <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
                Personal Details
            </h1>
            <form className="space-y-5" onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    id="VendorName"
                    name="VendorName"
                    label="Vendor Name"
                    value={formik.values.VendorName}
                    onChange={formik.handleChange}
                    error={formik.touched.VendorName && Boolean(formik.errors.VendorName)}
                    helperText={formik.touched.VendorName && formik.errors.VendorName}
                />
                <TextField
                    fullWidth
                    id="email"
                    name="email"
                    label="Vendor Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    id="mobile"
                    name="mobile"
                    label="Vendor Mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                    helperText={formik.touched.mobile && formik.errors.mobile}
                />
                <Button sx={{ py: ".9rem" }} color="primary" variant="contained" fullWidth type="submit">
                    Save
                </Button>
            </form>
        </>

    );
};

export default PersonalDetailsForm;
