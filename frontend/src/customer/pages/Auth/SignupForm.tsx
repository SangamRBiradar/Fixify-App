import { Button, CircularProgress, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import OTPInput from '../../components/OtpField/OtpInput';
import { useFormik } from 'formik';
import { useAppDispatch, useAppSelector } from '../../../state/Store';
import { useNavigate } from 'react-router-dom';
import { sendLoginSignupOtp, signup } from '../../../state/AuthSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignupForm = () => {
    const navigate = useNavigate();
    const [otp, setOtp] = useState('');
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [timer, setTimer] = useState(30);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const dispatch = useAppDispatch();
    const { auth } = useAppSelector(store => store);

    const formik = useFormik({
        initialValues: {
            email: '',
            otp: '',
            name: '',
            mobile: ''
        },
        onSubmit: async (values) => {
            const result = await dispatch(signup({ 
                fullName: values.name, 
                email: values.email, 
                mobile: values.mobile, 
                otp, 
                navigate 
            }));

            if (signup.fulfilled.match(result)) {
                toast.success('Signup Successful! Redirecting...', { autoClose: 2000 });
                setTimeout(() => { navigate('/'); window.location.reload(); }, 2000);
            } else {
                toast.error('Signup Failed! Please try again.');
            }
        }
    });

    const handleOtpChange = (otp:any) => {
        setOtp(otp);
    };

    const handleResendOTP = () => {
        dispatch(sendLoginSignupOtp({ email: formik.values.email }));
        toast.info('OTP Resent! Check your email.');
        setTimer(30);
        setIsTimerActive(true);
    };

    const handleSentOtp = () => {
        setIsOtpSent(true);
        handleResendOTP();
    };

    useEffect(() => {
        let interval:any;
        if (isTimerActive) {
            interval = setInterval(() => {
                setTimer(prev => {
                    if (prev === 1) {
                        clearInterval(interval);
                        setIsTimerActive(false);
                        return 30;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => interval && clearInterval(interval);
    }, [isTimerActive]);

    return (
        <div>
            <ToastContainer />
            <h1 className='text-center font-bold text-xl text-primary-color pb-5'>Signup</h1>
            <form className='space-y-5' onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth
                    name='email'
                    label='Enter Your Email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email ? formik.errors.email : ''}
                />

                {auth.otpSent && (
                    <div className='space-y-2'>
                        <p className='font-medium text-sm'>* Enter OTP sent to your email</p>
                        <OTPInput length={6} onChange={handleOtpChange} error={false} />
                        <p className='text-xs space-x-2'>
                            {isTimerActive ? (
                                <span>Resend OTP in {timer} seconds</span>
                            ) : (
                                <span
                                    onClick={handleResendOTP}
                                    className='text-teal-600 cursor-pointer hover:text-teal-800 font-semibold'
                                >
                                    Resend OTP
                                </span>
                            )}
                        </p>
                    </div>
                )}

                {auth.otpSent && (
                    <>
                        <TextField
                            fullWidth
                            name='name'
                            label='Enter Your Name'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name ? formik.errors.name : ''}
                        />

                        <TextField
                            fullWidth
                            name='mobile'
                            label='Enter Your Mobile'
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile ? formik.errors.mobile : ''}
                        />
                    </>
                )}

                {auth.otpSent ? (
                    <Button type='submit' disabled={auth.loading} fullWidth variant='contained' sx={{ py: '11px' }}>
                        {auth.loading ? <CircularProgress size='small' sx={{ width: '27px', height: '27px' }} /> : 'Signup'}
                    </Button>
                ) : (
                    <Button
                        fullWidth
                        variant='contained'
                        onClick={handleSentOtp}
                        disabled={auth.loading}
                        sx={{ py: '11px' }}
                    >
                        {auth.loading ? <CircularProgress size='small' sx={{ width: '27px', height: '27px' }} /> : 'Send OTP'}
                    </Button>
                )}
            </form>
        </div>
    );
};

export default SignupForm;
