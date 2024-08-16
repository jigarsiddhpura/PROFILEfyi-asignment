import { createSlice } from "@reduxjs/toolkit"; 

export const CartSlice= createSlice({
    name:"cart",
    initialState:{
        cart:[],
        coupon: null
    },
    reducers:{
        add: (state,action) => {
            const existingItem = state.cart.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({...action.payload, quantity:1});
            }
        },
        remove: (state,action) => {
            state.cart = state.cart.filter((item)=>(item.id !== action.payload));
        },
        updateQuantity: (state, action) => {
            const {id, quantity} = action.payload;
            const item = state.cart.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(1, quantity); // Ensure quantity is atleast 1
            }
        },
        applyCoupon: (state, action) => {
            state.coupon = action.payload;
        },
        removeCoupon: (state) => {
            state.coupon = null;
        }
        //action.payload = input action obj containing payload
    },
});

export const {add,remove,updateQuantity, applyCoupon, removeCoupon } = CartSlice.actions;
export default CartSlice.reducer;
