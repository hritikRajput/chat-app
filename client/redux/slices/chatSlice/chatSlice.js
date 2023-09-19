import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    currentChat: null,
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = [...action.payload];
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats, setCurrentChat } = chatSlice.actions;

export default chatSlice.reducer;
