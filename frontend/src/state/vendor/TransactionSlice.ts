import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Transaction } from '../../types/TransactionTypes';
import { Order } from '../../types/OrderTypes';
import { api } from '../../config/Api';

interface TransactionState {
  transactions: Transaction[];
  transaction: Transaction | null;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: TransactionState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: null,
};

// Thunks
export const fetchTransactionsByVendor = createAsyncThunk<
  Transaction[],
  string,
  { rejectValue: string }
>('transactions/fetchTransactionsByVendor', async (jwt, { rejectWithValue }) => {
  try {
    const response = await api.get('/api/transactions/vendor', {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    console.log("fetchTransactionsBySeller",response.data)
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Failed to fetch transactions');
  }
});

export const fetchAllTransactions = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>('transactions/fetchAllTransactions', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get<Transaction[]>('/api/transactions');
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue('Failed to fetch all transactions');
  }
});



// Slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsByVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactionsByVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsByVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;
