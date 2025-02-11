

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api, API_URL } from "../../config/Api";
import { Service } from "../../types/ServiceType";

export const fetchServiceById = createAsyncThunk("services/fetchServiceById",
    async(serviceId:number, { rejectWithValue }) => {
        try {
            const response = await api.get(`/services/${serviceId}`);
            console.log("Service By id : "+response.data);
            return response.data;
        } catch (error:any) {
            console.log("error : "+error);
            return rejectWithValue(error.message);
        }
    }
);

export const searchService = createAsyncThunk("services/searchService",
    async(query, { rejectWithValue }) => {
        try {
            const response = await api.get(`/search`,{
                params:{
                    query:query
                }
            });
            console.log(response.data);
            return response.data;
        } catch (error:any) {
            console.log("error : "+error);
            return rejectWithValue(error.message);
        }
    }
);


export const fetchAllServices = createAsyncThunk(
    "services/fetchAllServices",
    async (categoryId: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`/services`, {
                params: { category: categoryId }
            });
            console.log("Fetched Services:", response.data);
            return response.data;
        } catch (error: any) {
            console.error("Error fetching services:", error);
            return rejectWithValue(error.message);
        }
    }
);

export const fetchHomeServices = createAsyncThunk("services/fetchHomeServices",
    async(_,{ rejectWithValue }) => {
        try {
            const response = await api.get(`/services/all-services`,{
                
            });
            console.log("services data" +response.data);
            return response.data;
        } catch (error:any) {
            console.log("error : "+error);
            return rejectWithValue(error.message);
        }
    }
);

// Fetch Nearby Services by Location
export const fetchNearbyServices = createAsyncThunk(
    "services/fetchNearbyServices",
    async ({ category, latitude, longitude }: { category: string; latitude: number; longitude: number }, { rejectWithValue }) => {
      try {
        const response = await api.get(`/services/nearby`, {
          params: { category, latitude, longitude }
        });
        console.log("Nearby Services:", response.data);
        return response.data;
      } catch (error: any) {
        console.error("Error fetching nearby services:", error);
        return rejectWithValue(error.message);
      }
    }
  );

interface ServiceState {
    service: Service | null;
    services: Service[];
    loading: boolean;
    nearbyServices: Service[],
    error: string | null;
    searchServices: Service[];
}

const initialState: ServiceState = {
    service: null,
    services: [],
    loading: false,
    error: null,
    nearbyServices: [],
    searchServices: []
};

const serviceSlice = createSlice({
    name: "services",
    initialState,
    reducers: {
        clearService: (state) => {
            state.service = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchServiceById.pending, (state) => {
            state.loading = true;
            state.error = null; // ✅ Clear previous errors
        });
        builder.addCase(fetchServiceById.fulfilled, (state, action) => {
            state.loading = false;
            state.service = action.payload;
        });
        builder.addCase(fetchServiceById.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch service";
        });

        builder.addCase(fetchAllServices.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchAllServices.fulfilled, (state, action) => {
            state.loading = false;
            state.services = action.payload ||[];
        });
        builder.addCase(fetchAllServices.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch services";
        });

        builder.addCase(searchService.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(searchService.fulfilled, (state, action) => {
            state.loading = false;
            state.searchServices = action.payload;
        });
        builder.addCase(searchService.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : "Search request failed";
        });

        builder.addCase(fetchHomeServices.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchHomeServices.fulfilled, (state, action) => {
            state.loading = false;
            state.services = action.payload;  // ✅ Now it correctly updates the services
        });
        
        builder.addCase(fetchHomeServices.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : "Search request failed";
        });

        builder.addCase(fetchNearbyServices.pending, (state) => {
            state.loading = true;
            state.error = null;
          });
          builder.addCase(fetchNearbyServices.fulfilled, (state, action) => {
            state.loading = false;
            state.nearbyServices = action.payload || [];
          });
          builder.addCase(fetchNearbyServices.rejected, (state, action) => {
            state.loading = false;
            state.error = typeof action.payload === "string" ? action.payload : "Failed to fetch nearby services";
          });
    }
});

export default serviceSlice.reducer;
