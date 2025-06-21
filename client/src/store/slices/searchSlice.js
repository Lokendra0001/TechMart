import { createSlice } from "@reduxjs/toolkit"

const searchSlice = createSlice({
    name: "search",
    initialState: {
        val: ""
    },
    reducers: {
        addSearch: (state, action) => {
            state.val = action.payload
        }
    }
})

export const { addSearch } = searchSlice.actions
export default searchSlice.reducer;