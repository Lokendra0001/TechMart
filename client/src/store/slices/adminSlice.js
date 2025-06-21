import {createSlice} from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name : "admin",
    initialState : {
        admin : null
    },
    reducers : {
        addAdmin : (state, action) => {
            state.admin = action.payload;
        },
        removeAdmin : (state) => {
            state.admin = null
        }
    }
});

export const {addAdmin, removeAdmin} = adminSlice.actions;
export default adminSlice.reducer;