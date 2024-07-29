import { ProductsModels } from "@/app/modal/ProductModels";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  products: ProductsModels[];
  category: ProductsModels[];
  cart: ProductsModels[];
}

const initialState: CartState = {
  products: [],
  category: [],
  cart: [],
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductsModels[]>) => {
      state.products = action.payload;
    },
    addCategory: (state, action: PayloadAction<ProductsModels[]>) => {
      state.category = action.payload;
    },
    addToCart: (state, action: PayloadAction<ProductsModels>) => {
      const existingProduct = state.cart.find((item) => item.category === action.payload.category);
      if (existingProduct) {
        state.cart = state.cart.filter((item) => item.category !== action.payload.category);
      }
      state.cart.push(action.payload);
    },
  },
});

export const { addToCart, addCategory, addProduct } = ProductSlice.actions;

export default ProductSlice;
