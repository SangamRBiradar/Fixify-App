import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";
import { Service } from "../../types/ServiceType";

export const fetchVendorServices = createAsyncThunk<Service[], any>(
    "/vendorService/fetchVendorServices",
    async (jwt: string, { rejectWithValue }) => {
        try {
            const response = await api.get("/vendors/services", {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                }
            });
            console.log("services fetched", response.data);
            return response.data;
            //this data stored in store local state and can be accessed by useSelector
        } catch (error: any) {
            console.log("error", error);
        }
    }
);

export const createService = createAsyncThunk<Service, { request: any, jwt: string | null }>(
    "/vendorService/createService",
    async (args, { rejectWithValue }) => {
        const { request, jwt } = args;
        console.log("request", request);
        console.log("jwt", jwt);
        try {
            const response = await api.post("/vendors/services",request, {
                
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
                
            });
            console.log("service added", response.data);
            return response.data;
            //this data stored in store local state and can be accessed by useSelector
        } catch (error: any) {
            console.log("error", error);
        }
    }

);

interface VendorServiceState {
    services: Service[];
    loading: boolean;
    error: string | null | undefined;
}

const initialState: VendorServiceState = {
    services: [],
    loading: false,
    error: null,
}

const VendorServiceSlice = createSlice ({
    name: "vendorService",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchVendorServices.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchVendorServices.fulfilled, (state, action) => {
            state.loading = false;
            state.services = action.payload;
        });
        builder.addCase(fetchVendorServices.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });


        // for create
        builder.addCase(createService.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createService.fulfilled, (state, action) => {
            state.loading = false;
            state.services.push(action.payload);
        });
        builder.addCase(createService.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        });
    }
})


export default VendorServiceSlice.reducer;

