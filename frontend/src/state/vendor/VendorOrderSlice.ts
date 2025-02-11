// src/redux/slices/sellerOrderSlice.ts

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderStatus } from '../../types/OrderTypes'; 
// import { ApiResponse } from '../../types/authTypes';
import { api } from '../../config/Api';

interface VendorOrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: VendorOrderState = {
  orders: [],
  loading: false,
  error: null,
};

// Thunks for async actions
export const fetchVendorOrders = createAsyncThunk<Order[], string>(
  'vendorOrders/fetchVendorOrders',
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/vendor/orders', {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("fetch vendor orders",response.data)
      return response.data;
    } catch (error: any) {
      console.log("error",error.response)
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateOrderStatus = createAsyncThunk<Order, 
{ jwt: string, 
  orderId: number, 
  orderStatus: OrderStatus 
}>(
  'vendorOrders/updateOrderStatus',
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/api/vendor/orders/${orderId}/status/${orderStatus}`, 
        null, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("order status updated",response.data)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteOrder = createAsyncThunk<any, { jwt: string, orderId: number }>(
  'vendorOrders/deleteOrder',
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`api/vendor/orders/${orderId}/delete`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const vendorOrderSlice = createSlice({
  name: 'vendorOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVendorOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVendorOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchVendorOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
        state.loading = false;
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order.id !== action.meta.arg.orderId);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default vendorOrderSlice.reducer;
