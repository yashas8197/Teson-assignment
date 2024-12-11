import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "./constant";
import axios from "axios";

export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${API_URL}/api/cart`);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.post(`${API_URL}/api/cart`, {
        productId: productId,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const quantityUpdate = createAsyncThunk(
  "cart/quantityUpdate",
  async (updateData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/cart-update`,
        updateData
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  "cart/deleteCartItem",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${API_URL}/api/cart/${productId}`,
        productId
      );

      return response.data;
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(
        error.response?.data || "Something went wrong"
      );
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateCartItem: (state, action) => {
      const { productId, quantity } = action.payload;
      const cartItem = state.cart.find(
        (item) => item.product._id === productId
      );

      if (cartItem) {
        cartItem.quantity = quantity;
      }
    },
    removeCartItem: (state, action) => {
      state.cart = state.cart.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.cart = action.payload;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(addToCart.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(addToCart.fulfilled, (state) => {
      state.status = "fulfilled";
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(quantityUpdate.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(quantityUpdate.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.cart = state.cart.map((item) =>
        item._id === action.payload._id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    });
    builder.addCase(quantityUpdate.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
    builder.addCase(deleteCartItem.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteCartItem.fulfilled, (state, action) => {
      state.status = "fulfilled";
      state.cart = state.cart.filter(
        (item) => item._id !== action.payload.cartItem._id
      );
    });
    builder.addCase(deleteCartItem.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    });
  },
});

export const { updateCartItem, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;
