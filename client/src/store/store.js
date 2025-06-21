import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./slices/authSlice"
import searchReducer from "./slices/searchSlice"
import adminSlice from "./slices/adminSlice"


const store = configureStore({
    reducer: { auth: authReducer, search: searchReducer, admin: adminSlice }
})

export default store;