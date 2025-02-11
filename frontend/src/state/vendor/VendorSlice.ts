import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { api, API_URL } from "../../config/Api";
import { report } from "process";
import { loadavg } from "os";
import { error } from "console";
import { red } from "@mui/material/colors";
import { Vendor } from "../../types/VendorTypes";


export const fetchVendorProfile = createAsyncThunk(
  "/vendors/fetchVendorProfile",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/vendors/profile", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        }
      });
      console.log("fetch vendor profile", response.data);
      return response.data;
      //this data stored in store local state and can be accessed by useSelector
    } catch (error: any) {
      console.log("error", error);
    }
  }
);

export const fetchVendors = createAsyncThunk(
  "vendors/fetchVendors",
  async (status: string, { rejectWithValue }) => {
    try {
      const response = await api.get("/vendors", {
        params: {
          status:status,
        },
      });
      console.log("fetch vendors", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Fetch sellers error response data:",
          error.response.data
        );
        console.error(
          "Fetch sellers error response status:",
          error.response.status
        );
        console.error(
          "Fetch sellers error response headers:",
          error.response.headers
        );
        return rejectWithValue(error.message);
      } else {
        console.error("Fetch sellers error message:", error.message);
        return rejectWithValue("Failed to fetch sellers");
      }
    }
  }
);

export const updateVendorAccountStatus = createAsyncThunk<
  Vendor,
  { id: number; status: string }
>(
  "vendors/updateVendorAccountStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await api.patch(`/admin/vendor/${id}/status/${status}`);
      console.log("update vendor status: ", response.data);
      return response.data;
    } catch (error: any) {
      if (axios.isAxiosError(error) && error.response) {
        console.error(
          "Update vendor error response data:",
          error.response.data
        );

        return rejectWithValue(error.message);
      } else {
        console.error("Update seller error message:", error.message);
        return rejectWithValue("Failed to update seller");
      }
    }
  }
);



interface VendorState {
  vendors:any[],
  selectedVendor:any,
  profile:any,
  report:any,
  loading:boolean,
  error:any
}

const initialState:VendorState={
  vendors:[],
  selectedVendor:null,
  profile:null,
  report:null,
  loading:false,
  error:null
}

const vendorSlice = createSlice({ 
  name: "vendors",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVendorProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchVendorProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.profile = action.payload;
    });
    builder.addCase(fetchVendorProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // fetch sellers
    builder.addCase(fetchVendors.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(
      fetchVendors.fulfilled,
      (state, action: PayloadAction<Vendor[]>) => {
        state.vendors = action.payload;
        state.loading = false;
      }
    )
    builder.addCase(fetchVendors.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to fetch sellers";
    });

    builder.addCase(updateVendorAccountStatus.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    builder.addCase(
      updateVendorAccountStatus.fulfilled,
      (state, action: PayloadAction<Vendor>) => {
        const index = state.vendors.findIndex(
          (seller) => seller.id === action.payload.id
        );
        if (index !== -1) {
          state.vendors[index] = action.payload;
        }
        state.loading = false;
      }
    )
    builder.addCase(updateVendorAccountStatus.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || "Failed to update seller";
    })
    
    
  }
})


export default vendorSlice.reducer;

