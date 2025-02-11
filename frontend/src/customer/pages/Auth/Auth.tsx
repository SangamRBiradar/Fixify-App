import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import { Alert, Button, Snackbar } from '@mui/material';
import SignupForm from './SignupForm';
import { useAppSelector } from '../../../state/Store';

const Auth = () => {
    const [isLoginPage, setIsLoginPage] = useState(true);// State to toggle between login and signup form

    const handleCloseSnackbar = () => setSnackbarOpen(false)
    // const { auth } = useAppSelector(store => store)
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    // useEffect(() => {

    //     if (auth.otpSent || auth.error) {
    //         setSnackbarOpen(true);
    //         console.log("store ", auth.error)
    //     }

    // }, [auth.otpSent,auth.error])

    return (
        <div className='flex justify-center h-[90vh] items-center'>
            <div className='max-w-md h-[85vh] rounded-md border shadow-lg '>
                <img className='w-full rounded-t-md' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIi3xyv7ZQT0gUpYsya2tidZ1iQXL7SJg-6w&s" alt="" />
                <div className='mt-8 px-10'>
                    {isLoginPage ? <LoginForm /> : <SignupForm />}

                    <div className='flex items-center gap-1 justify-center mt-5'>
                        <p>{isLoginPage && "Don't"} have Account ?</p>
                        <Button onClick={() => setIsLoginPage(!isLoginPage)} size='small'>{isLoginPage ? "create account" : "login"}</Button>
                    </div>
                </div>
</div>

            {/* </div>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={snackbarOpen} autoHideDuration={6000}
                onClose={handleCloseSnackbar}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={auth.error?"error":"success"}
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    {auth.error?auth.error : " otp sent to your email!"}
                </Alert>
            </Snackbar> */}
        </div>
    )
}

export default Auth