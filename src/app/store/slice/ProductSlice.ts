import CategoryModels from "@/app/modal/CategoryModels";
import { ProductsModels } from "@/app/modal/ProductModels";
import { getFromLocalStorage, setInLocalStorage } from "@/app/utills/LocalStorageUtills";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartState {
  products: ProductsModels[];
  category: CategoryModels[];
  cart: ProductsModels[];
}

const initialState: CartState = {
  products: [],
  category: [],
  cart: getFromLocalStorage("cart") || [],
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<ProductsModels[]>) => {
      state.products = action.payload;
    },
    addCategory: (state, action: PayloadAction<CategoryModels[]>) => {
      state.category = action.payload;
    },
    addToCart: (state, action: PayloadAction<ProductsModels>) => {
      const existingProduct = state.cart.find((item) => item.category === action.payload.category);
      if (existingProduct) {
        state.cart = state.cart.filter((item) => item.category !== action.payload.category);
      }
      state.cart.push(action.payload);
      setInLocalStorage('cart', state.cart)
    },
  },
});

export const { addToCart, addCategory, addProduct } = ProductSlice.actions;

export default ProductSlice;
