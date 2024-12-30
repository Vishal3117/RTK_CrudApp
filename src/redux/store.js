import { configureStore } from "@reduxjs/toolkit";
import userDetailSlice from "./features/userDetailSlice";

export const store = configureStore({
    reducer: {
        user: userDetailSlice
    }
})