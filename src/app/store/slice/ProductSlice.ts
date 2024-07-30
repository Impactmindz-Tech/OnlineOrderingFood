import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, setInLocalStorage } from "@/app/utills/LocalStorageUtills";
import CategoryModels from "@/app/modal/CategoryModels";
import { ProductsModels } from "@/app/modal/ProductModels";

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
      setInLocalStorage('cart', state.cart);
    },
    resetCart: (state) => {
      state.cart = [];
      localStorage.clear()
    },
  },
});

export const { addToCart, addCategory, addProduct, resetCart } = ProductSlice.actions;

export default ProductSlice;
