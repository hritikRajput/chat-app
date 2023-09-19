import { createSlice } from "@reduxjs/toolkit";

export const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chats: [],
    currentChat: {
      chatId: null,
      participants: [],
      messages: [],
    },
  },
  reducers: {
    setChats: (state, action) => {
      state.chats = [...action.payload];
    },
    setCurrentChat: (state, action) => {
      state.currentChat.chatId = action.payload.chatId;
      state.currentChat.participants = action.payload.participants;
      state.currentChat.messages = action.payload.messages;
    },
    addMessageToCurrentChat: (state, action) => {
      state.currentChat.messages.push(action.payload.message);
    },
    addParticipantToCurrentChat: (state, action) => {
      state.currentChat.participants.push(action.payload.participant);
    },
  },
});

// Action creators are generated for each case reducer function
export const { setChats, setCurrentChat, addMessageToCurrentChat } =
  chatSlice.actions;

export default chatSlice.reducer;
