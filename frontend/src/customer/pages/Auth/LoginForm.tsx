import { useFormik } from "formik";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../state/Store";
import { vendorLogin } from "../../../state/vendor/VendorAuthSlice";
import { TextField, Button, CircularProgress } from "@mui/material";
import { sendLoginSignupOtp, signin } from "../../../state/AuthSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { auth } = useAppSelector((store) => store);
  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    onSubmit: async (values) => {
      console.log("Form data:", values);
      const result = await dispatch(signin(values));
    
      if (signin.fulfilled.match(result)) {
        toast.success("Login Successful! Redirecting...", { autoClose: 2000 });

        setTimeout(() => {
          if(values.email=="fixify777@gmail.com"){
            navigate("/admin");  window.location.reload();
          }
          else{
            navigate("/");  
          }
          window.location.reload();
        },2000);
          
      } else {
        toast.error("Login Failed! Please try again.");
      }
    }},);
    

  const handleSentOtp = () => {
    console.log("Form data:", formik.values.email);
    dispatch(sendLoginSignupOtp({ email: formik.values.email }));
    // sendLoginSignupOtp();
    // setIsOtpSent(true);
    // handleResendOTP();
  };

  return (
    <div>
      <ToastContainer /> 
      <h1 className="text-center font-bold text-xl text-primary-color pb-8">
        Login
      </h1>
      <div className="space-y-5">
        <TextField
          fullWidth
          name="email"
          label="Enter Your Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={
            formik.touched.email ? (formik.errors.email as string) : undefined
          }
        />

        {auth.otpSent && 
          <div className="space-y-2">
            <p className="font-medium test-sm opacity-60">
              Enter OTP sent to your email
            </p>
            <TextField
              fullWidth
              name="otp"
              label="Otp"
              value={formik.values.otp}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.otp && Boolean(formik.errors.otp)}
              helperText={
                formik.touched.otp ? (formik.errors.otp as string) : undefined
              }
            />
          </div>
        }
        {auth.otpSent ? 
        <Button
        onClick={() => formik.handleSubmit()}
        fullWidth
        variant="contained"
        sx={{ py: "11px" }}
      >
        Login
      </Button>:
          <Button
            onClick={handleSentOtp}
            fullWidth
            variant="contained"
            sx={{ py: "11px" }}
          >
            {auth.loading ? <CircularProgress color="success" /> : "Send OTP"}
          </Button>

         }
        
      </div>
    </div>
  );
};

export default LoginForm;
