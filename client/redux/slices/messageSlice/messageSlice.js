import { createSlice } from "@reduxjs/toolkit";

export const messageSlice = createSlice({
  name: "message",
  initialState: {
    messageId: null,
    content: "",
    sender: {},
    timestamp: null,
  },
  reducers: {
    sendMessage: (state, action) => {
      state.messageId = action.payload.messageId;
      state.content = action.payload.content;
      state.sender = action.payload.sender;
      state.timestamp = action.payload.timestamp;
    },
  },
});

// Action creators are generated for each case reducer function
export const { sendMessage } = messageSlice.actions;

export default messageSlice.reducer;
