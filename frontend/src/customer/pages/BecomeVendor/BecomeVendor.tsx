import React from 'react'
import { Alert, Button, Snackbar, Step, StepLabel, Stepper } from "@mui/material";
import { useEffect, useState } from "react";
import VendorLoginForm from "./VendorLoginForm"
import VendorAccountForm from "./VendorAccountForm"


const BecomeVendor = () => {

    const [isLogin, setIsLogin] = useState(false);

    const handleShowPage = () => {
        setIsLogin(!isLogin);
    }
    return (
        <div className="grid md:gap-10 grid-cols-3 min-h-screen ">
            <section className="lg:col-span-1 md:col-span-2 col-span-3  p-10 shadow-lg rounded-b-md">

                {!isLogin ? <VendorAccountForm /> : <VendorLoginForm />}

                <div className='mt-10 space-y-2'>
                    <h1 className='text-center text-sm font-medium'>have account ? </h1>
                    <Button onClick={handleShowPage} fullWidth sx={{ py: "11px" }} variant='outlined'>{isLogin ? "Register" : "Login"}</Button>
                </div>


            </section>


            <section>
                <section className=" hidden md:col-span-1 md:flex  lg:col-span-2  justify-center items-center">
                    <div className="lg:w-[70%] px-5 space-y-10">
                        <div className="borderr rounded-md space-y-2 font-bold text-center">
                            <p className=" text-2xl">Join the Marketplace Revolution</p>
                            <p className="text-lg text-blue-500"> Boost Your Sales Today</p>
                        </div>

                        <img className="" src={"https://zosh-bazzar.vercel.app/seller.jpg"} alt="" />
                                    {/*image is in jfif format change later */}
                    </div>
                </section>
            </section>

        </div>
    );
};

export default BecomeVendor
