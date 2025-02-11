import React from "react";
import { Grid, TextField } from "@mui/material";

// interface BecomeSellerFormStep2Props {
//   formik: any; // Replace 'any' with the correct type for formik instance
// }

const BecomeVendorStep2 = ({ formik }:any) => {

  return (
    <div>
      <Grid container spacing={3}>
     
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="ShopAddress.name"
            label="Name"
            value={formik.values.ShopAddress.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="ShopAddress.mobile"
            label="Mobile"
            value={formik.values.ShopAddress.mobile}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
            helperText={formik.touched.mobile && formik.errors.mobile}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="ShopAddress.pincode"
            label="Pincode"
            value={formik.values.ShopAddress.pincode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ShopAddress?.pincode && Boolean(formik.errors.ShopAddress?.pincode)}
            helperText={formik.touched.ShopAddress?.pincode && formik.errors.ShopAddress?.pincode}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="ShopAddress.address"
            label="Address (House No, Building, Street)"
            value={formik.values.ShopAddress.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ShopAddress?.address && Boolean(formik.errors.ShopAddress?.address)}
            helperText={formik.touched.ShopAddress?.address && formik.errors.ShopAddress?.address}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="ShopAddress.locality"
            label="Locality/Town"
            value={formik.values.ShopAddress.locality}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ShopAddress?.locality && Boolean(formik.errors.ShopAddress?.locality)}
            helperText={formik.touched.ShopAddress?.locality && formik.errors.ShopAddress?.locality}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="ShopAddress.city"
            label="City"
            value={formik.values.ShopAddress.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ShopAddress?.city && Boolean(formik.errors.ShopAddress?.city)}
            helperText={formik.touched.ShopAddress?.city && formik.errors.ShopAddress?.city}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            name="ShopAddress.state"
            label="State"
            value={formik.values.ShopAddress.state}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.ShopAddress?.state && Boolean(formik.errors.ShopAddress?.state)}
            helperText={formik.touched.ShopAddress?.state && formik.errors.ShopAddress?.state}
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default BecomeVendorStep2;
