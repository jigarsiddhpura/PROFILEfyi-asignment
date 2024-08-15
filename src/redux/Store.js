// store.js
import { configureStore } from "@reduxjs/toolkit";
import {CartSlice} from "./Slices/CartSlice" // Import the reducer function, not the slice object

export const store = configureStore({
    reducer: {
        cart: CartSlice.reducer, // Pass the reducer function
    },
});
