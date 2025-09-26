import { configureStore } from "@reduxjs/toolkit";
import user from "./features/auth/slice/userSlice";

const store = configureStore({
  reducer: {
    user,
  },
});

export default store;
export type RootReducer = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
