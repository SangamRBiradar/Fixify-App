import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { api, API_URL } from "../config/Api";
import { log } from "console";

import { Navigate } from "react-router-dom";
import Auth from "../customer/pages/Auth/Auth";
import reducer from "./vendor/VendorSlice";
import { User } from "../types/UserType";



export const sendLoginSignupOtp = createAsyncThunk(
    "/auth/sendLoginSignupOtp",
    async ({ email }: { email: string }, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/sent/login-signup-otp", { email });
            console.log("login otp", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error);
        }
    }
);


export const signin = createAsyncThunk<any, any>(
    "/auth/signin",
    async (loginRequest, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/signin", loginRequest);
            console.log("login otp", response.data);
            localStorage.setItem("jwt", response.data.jwt);
            return response.data;
        } catch (error: any) {
            console.log("error", error);
        }
    }
);
export const signup = createAsyncThunk<any, any>(
    "/auth/signup",
    async (signupRequest, { rejectWithValue }) => {
        try {
            const response = await api.post("/auth/signup", signupRequest);
            console.log("login otp", response.data);
            localStorage.setItem("jwt", response.data.jwt);
            return response.data;
        } catch (error: any) {
            console.log("error", error);
        }
    }
);

export const fetchUserProfile= createAsyncThunk<any, any>(
    "/api/users/profile",
    async ({jwt}, { rejectWithValue }) => {
        try {
            const response = await api.get("/api/users/profile", {
                
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            });
            console.log("user profile", response.data);
            return response.data;
        } catch (error: any) {
            console.log("error", error);
        }
    }
);

export const logout = createAsyncThunk<any,any>(
    "/auth/logout",   
    async (navigate,{rejectWithValue}) => {
    try {
        localStorage.clear();
        console.log("logout success ");
        navigate("/");
    } catch (error: any) {
        console.log("error", error);
    }
}

// export const signup = createAsyncThunk<>(
//     'auth/signup',
//     async (signupRequest, { rejectWithValue }) => {
//         console.log("signup ", signupRequest)
//         try {
            
//             const response = await api.post<>(`${API_URL}/signup`, signupRequest);
//            signupRequest.navigate("/")
//            localStorage.setItem("jwt",response.data.jwt)
//             return response.data;
//         } catch (error:any) {
//             return rejectWithValue('Signup failed');
//         }
//     }
// );

);

 interface AuthState {
    jwt: string | null;
    otpSent: boolean;
    isLoggedin: boolean;
    user: User | null;
    loading: boolean;


}


const initialState:AuthState = {
    jwt:null,
    otpSent:false,
    isLoggedin: false,
    user:null,
    loading:false
}

const AuthSlice = createSlice({

    name: "auth",
    initialState,
    reducers : {},
    extraReducers: (builder) => {
        builder.addCase(sendLoginSignupOtp.pending, (state, action) => {
            state.loading=true;
            console.log("otp sent", state.otpSent)
        });
        builder.addCase(sendLoginSignupOtp.fulfilled, (state, action) => {
            state.otpSent = true;
            state.loading=false;
            console.log("otp sent", state.otpSent)
        });
        builder.addCase(sendLoginSignupOtp.rejected, (state, action) => {
            // state.otpSent = true;
            state.loading=false;
            console.log("otp sent", state.otpSent)
        });

        builder.addCase(signin.fulfilled, (state, action) => {
            state.isLoggedin = true;
            state.jwt = action.payload;
            console.log("login success", state.isLoggedin)
        });
        builder.addCase(signup.fulfilled, (state, action) => {
            state.isLoggedin = true;
            state.user = action.payload;
            console.log("signup success", state.isLoggedin)
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.jwt = null;
            state.isLoggedin = false;
            state.user = null;
            console.log("logout success", state.isLoggedin)
        });

        builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
            state.user = action.payload;
            state.isLoggedin = true;
            console.log("user profile", state.user)
        });
    }

});

export default AuthSlice.reducer;

