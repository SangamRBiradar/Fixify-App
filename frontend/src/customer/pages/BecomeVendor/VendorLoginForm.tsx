import {
  Alert,
  Button,
  Snackbar,
  TextField,
  CircularProgress,
} from "@mui/material";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../state/Store";
import { sendLoginSignupOtp } from "../../../state/AuthSlice";
import { vendorLogin } from "../../../state/vendor/VendorAuthSlice";
import { AlertColor } from "@mui/material";
const VendorLoginForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [toastOpen, setToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  
  const [toastSeverity, setToastSeverity] = useState<AlertColor>("success");
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      otp: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      otp: Yup.string()
        .matches(/^\d{6}$/, "OTP must be a 6-digit number")
        .required("OTP is required"),
    }),
    onSubmit: (values) => {
      dispatch(vendorLogin(values))
        .then(() => {
          setToastMessage("Login Successful!");
          setToastSeverity("success");
          setToastOpen(true);
          setTimeout(() => {
            navigate("/vendor");
            window.location.reload(); // Force refresh
          }, 2000);
        })
        .catch(() => {
          setToastMessage("Login Failed! Please try again.");
          setToastSeverity("error");
          setToastOpen(true);
        });
    },
  });

  const handleSentOtp = () => {
    if (!formik.values.email || formik.errors.email) {
      setToastMessage("Please enter a valid email to receive OTP.");
      setToastSeverity("warning");
      setToastOpen(true);
      return;
    }
    setLoading(true);
    dispatch(sendLoginSignupOtp({ email: formik.values.email }))
      .then(() => {
        setToastMessage("OTP Sent Successfully!");
        setToastSeverity("info");
        setToastOpen(true);
      })
      .catch(() => {
        setToastMessage("Failed to send OTP. Please try again.");
        setToastSeverity("error");
        setToastOpen(true);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <h1 className="text-center font-bold text-xl text-primary-color pb-5">
        Login As Vendor
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
          helperText={formik.touched.email ? formik.errors.email : ""}
        />
        <div className="space-y-2">
          <p className="font-medium text-sm opacity-60">Enter OTP sent to your email</p>
          <TextField
            fullWidth
            name="otp"
            label="OTP"
            value={formik.values.otp}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.otp && Boolean(formik.errors.otp)}
            helperText={formik.touched.otp ? formik.errors.otp : ""}
          />
        </div>
        <Button onClick={handleSentOtp} fullWidth variant="contained" sx={{ py: "11px" }} disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Send OTP"}
        </Button>
        <Button onClick={() => formik.handleSubmit()} fullWidth variant="contained" sx={{ py: "11px" }}>
          Login
        </Button>
      </div>
      <Snackbar open={toastOpen} autoHideDuration={3000} onClose={() => setToastOpen(false)}>
        <Alert onClose={() => setToastOpen(false)} severity={toastSeverity} sx={{ width: "100%" }}>
          {toastMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default VendorLoginForm;
