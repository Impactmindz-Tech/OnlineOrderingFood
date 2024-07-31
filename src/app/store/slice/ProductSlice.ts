import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getFromLocalStorage, setInLocalStorage } from "@/app/utills/LocalStorageUtills";
import CategoryModels from "@/app/modal/CategoryModels";
import { ProductsModels } from "@/app/modal/ProductModels";

type MealType = 'breakfast' | 'lunch' | 'dinner';

interface CartState {
  products: ProductsModels[];
  category: CategoryModels[];
  cart: Record<MealType, ProductsModels[]>; // Updated to use Record<MealType, ProductsModels[]>
}

const initialState: CartState = {
  products: [],
  category: [],
  cart: {
    breakfast: (typeof window !== 'undefined' ? getFromLocalStorage("cartBreakfast") : []) || [],
    lunch: (typeof window !== 'undefined' ? getFromLocalStorage("cartLunch") : []) || [],
    dinner: (typeof window !== 'undefined' ? getFromLocalStorage("cartDinner") : []) || [],
  },
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
      const mealType: MealType = action.payload.meal.toLowerCase() as MealType; // Cast to MealType

      // Remove the product from the cart if it already exists
      state.cart[mealType] = state.cart[mealType].filter((item) => item.id !== action.payload.id);

      // Add the new product to the cart
      state.cart[mealType].push(action.payload);

      // Save cart data to localStorage
      setInLocalStorage('cartBreakfast', state.cart.breakfast);
      setInLocalStorage('cartLunch', state.cart.lunch);
      setInLocalStorage('cartDinner', state.cart.dinner);
    },
    resetCart: (state) => {
      state.cart = {
        breakfast: [],
        lunch: [],
        dinner: []
      };
      localStorage.removeItem('cartBreakfast');
      localStorage.removeItem('cartLunch');
      localStorage.removeItem('cartDinner');
    },
  },
});

export const { addToCart, addCategory, addProduct, resetCart } = ProductSlice.actions;

export default ProductSlice;
