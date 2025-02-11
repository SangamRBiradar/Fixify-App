import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../config/Api"; // Ensure API configuration exists

// Define TypeScript interfaces
interface Category {
  id?: number;
  name: string;
  categoryId: string;
}

interface CategoryState {
  categories: Category[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

// Initial state
const initialState: CategoryState = {
  categories: [],
  status: "idle",
  error: null,
};

// ✅ Async Thunk for fetching categories
export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>(
  "categories/fetchCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get<Category[]>("/categories");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Async Thunk for adding a category
export const addCategory = createAsyncThunk<Category, Category, { rejectValue: string }>(
  "categories/addCategory",
  async (category, { rejectWithValue }) => {
    try {
      const response = await api.post<Category>("/categories/add", category);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// ✅ Create Redux Slice
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.status = "succeeded";
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      })
      .addCase(addCategory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addCategory.fulfilled, (state, action: PayloadAction<Category>) => {
        state.status = "succeeded";
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Something went wrong";
      });
  },
});

export default categorySlice.reducer;
