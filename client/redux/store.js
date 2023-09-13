import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice";

//create an empty redux store
export default configureStore({
  reducer: {
    auth: authReducer,
  },
});
