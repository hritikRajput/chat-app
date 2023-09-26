import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice/authSlice";
import chatReducer from "./slices/chatSlice/chatSlice";
import messageReducer from "./slices/messageSlice/messageSlice";
import searchReducer from "./slices/searchSlice/searchSlice";

//create an empty redux store
export default configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    message: messageReducer,
    search: searchReducer,
  },
});
