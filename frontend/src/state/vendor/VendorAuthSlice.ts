import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const vendorLogin = createAsyncThunk<any,any>(
    "/vendors/login",
    async (loginRequest, { rejectWithValue }) => {
        try {
            const response = await api.post("/vendors/login", loginRequest);
            console.log("login otp", response.data);
            const jwt = response.data.jwt;
            localStorage.setItem("jwt", jwt);
            return response.data;
        } catch (error: any) {
            console.log("error", error);
        }
    }
);