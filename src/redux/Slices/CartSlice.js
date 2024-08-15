import { createSlice } from "@reduxjs/toolkit"; 

export const CartSlice= createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        add: (state,action) => {
            const existingItem = state.find(item => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({...action.payload, quantity:1});
            }
        },
        remove: (state,action) => {
            return state.filter((item)=>(item.id !== action.payload));
        },
        updateQuantity: (state, action) => {
            const {id, quantity} = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = Math.max(1, quantity); // Ensure quantity is atleast 1
            }
        }
        //action.payload = input action obj containing payload
    },
});

export const {add,remove,updateQuantity} = CartSlice.actions;
export default CartSlice.reducer;
