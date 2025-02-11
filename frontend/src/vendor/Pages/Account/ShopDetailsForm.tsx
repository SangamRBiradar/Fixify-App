import React, { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField, Button } from "@mui/material";
// import { useAppDispatch, useAppSelector } from "../../../Redux Toolkit/Store";
// import { updateSeller } from "../../../Redux Toolkit/Seller/sellerSlice";

export interface UpdateDetailsFormProps {
  onClose: () => void;
}
const ShopDetailsForm = ({ onClose }: UpdateDetailsFormProps) => {
  // const dispatch = useAppDispatch();
  // const { sellers } = useAppSelector((store) => store);
  const formik = useFormik({
    initialValues: {
      ShopName: "",
      gstin: "",
      accountStatus: "",
    },
    validationSchema: Yup.object({
      ShopName: Yup.string().required("Shop Name is required"),
      gstin: Yup.string().required("GSTIN is required"),
      accountStatus: Yup.string().required("Account Status is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      // dispatch(
      //   updateSeller({
      //     ...values,
      //     ShopDetails: { ShopName: values.ShopName },
      //   })
      // )
      // ;
      onClose();
    },
  });

  // useEffect(() => {
  //   if (sellers.profile) {
  //     formik.setValues({
  //       ShopName: sellers.profile?.ShopDetails?.ShopName,
  //       gstin: sellers.profile?.gstin,
  //       accountStatus: sellers.profile?.accountStatus ?? "",
  //     });
  //   }
  // }, [sellers.profile]);

  return (
    <>
      <h1 className="text-xl pb-5 text-center font-bold text-gray-600">
        Shop Details
      </h1>
      <form className="space-y-5" onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="ShopName"
          name="ShopName"
          label="Shop Name"
          value={formik.values.ShopName}
          onChange={formik.handleChange}
          error={
            formik.touched.ShopName && Boolean(formik.errors.ShopName)
          }
          helperText={formik.touched.ShopName && formik.errors.ShopName}
        />
        <TextField
          fullWidth
          id="gstin"
          name="gstin"
          label="GSTIN"
          value={formik.values.gstin}
          onChange={formik.handleChange}
          error={formik.touched.gstin && Boolean(formik.errors.gstin)}
          helperText={formik.touched.gstin && formik.errors.gstin}
        />
        <TextField
          fullWidth
          id="accountStatus"
          name="accountStatus"
          label="Account Status"
          value={formik.values.accountStatus}
          onChange={formik.handleChange}
          error={
            formik.touched.accountStatus && Boolean(formik.errors.accountStatus)
          }
          helperText={
            formik.touched.accountStatus && formik.errors.accountStatus
          }
        />
        <Button
          sx={{ py: ".9rem" }}
          color="primary"
          variant="contained"
          fullWidth
          type="submit"
        >
          Save
        </Button>
      </form>
    </>
  );
};

export default ShopDetailsForm;
