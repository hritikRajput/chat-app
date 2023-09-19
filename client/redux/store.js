import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice";
import chatReducer from "./slices/chatSlice/chatSlice";

//create an empty redux store
export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
