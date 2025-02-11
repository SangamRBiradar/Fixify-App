import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import BecomeVendorStep1 from "./BecomeVendorStep1";
import BecomeVendorStep3 from "./BecomeVendorStep3";
import BecomeVendorStep2 from "./BecomeVendorStep2";
import BecomeVendorStep4 from "./BecomeVendorStep4";
import { useFormik } from "formik";

const steps = [
    "Tax Details & Mobile",
    "Shop Address",
    "Bank Details",
    "Vendor Details",
];

const VendorAccountForm = () => {
    const [activeStep, setActiveStep] = useState(0);

    const handleStep = (value: number) => {
        (activeStep < steps.length - 1 || (activeStep > 0 && value == -1)) && setActiveStep
            (activeStep + value);

        activeStep == steps.length - 1 && handleCreateAccount();
    };

    const handleCreateAccount = () => {
        console.log("create accoujnt")
    }

    const formik = useFormik({
        initialValues: {
            mobile: "",
            otp: "",
            gstin: "",
            ShopAddress: {
                name: "",
                mobile: "",
                pincode: "",
                address: "",
                locality: "",
                city: "",
                state: "",
            },
            bankDetails: {
                accountNumber: "",
                ifscCode: "",
                accountHolderName: "",
            },
            VendorName: "",
            email: "",
            businessDetails: {
                shopName: "",
                shopEmail: "",
                shopMobile: "",
                logo: "",
                banner: "",
                shopAddress: ""
            },
            password: ""
        },
        // validationSchema: FormSchema,
        onSubmit: (values) => {
            console.log(values, "formik submitted");
            console.log("active step ", activeStep);
            //   dispatch(createSeller(formik.values))
        },
    });

    return (
        <div>
            {/* Stepper Component */}
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Step Navigation Buttons */}
            <div className="mt-5">
                <div>
                    {activeStep === 0 ? (
                        <BecomeVendorStep1
                            formik={formik}
                        // handleOtpChange={handleOtpChange}
                        />
                    ) : activeStep === 1 ? (
                        <BecomeVendorStep2 formik={formik} />
                    ) : activeStep === 2 ? (
                        <BecomeVendorStep3 formik={formik} />
                    ) : (
                        <BecomeVendorStep4 formik={formik} />
                    )}
                </div>
                <div className="space-y-3 flex items-center justify-between">
                    <Button 
                        onClick={() => handleStep(-1)}
                        variant="contained"
                        disabled={activeStep === 0}
                    >
                        Back
                    </Button>

                    <Button onClick={() => handleStep(1)} variant="contained">
                        {activeStep === steps.length - 1 ? "Create Account" : "Continue"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default VendorAccountForm
