import { createSlice } from "@reduxjs/toolkit"; 

export const CartSlice= createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        add: (state,action) => {
            state.push(action.payload);
        },
        remove: (state,action) => {
            return state.filter((item)=>(item.id !== action.payload));
        },
        //action.payload is basically input action is your obj containing payload
    },
});

export const {add,remove} = CartSlice.actions;
export default CartSlice.reducer;
