import axios from "axios";
const BASE_URL = "http://localhost:8000/";

const accessChat = async (userId, token) => {
  try {
    const { data } = await axios.post(`${BASE_URL}api/chat`, userId, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error("Error in accessing chats", err);
    return err;
  }
};

const fetchChats = async (token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}api/chat`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error("Error in fetching chats", err);
    return err;
  }
};
const createGroup = async ({ name, users }, token) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}api/chat/group`,
      { name, users },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.error("Error in creating group", err);
    return err;
  }
};

const renameGroup = async (chatId, chatName, token) => {
  const requestData = {
    chatId,
    chatName,
  };
  try {
    const { data } = await axios.put(
      `${BASE_URL}api/chat/group/rename`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return data;
  } catch (err) {
    console.error("Error in renaming group", err);
    return err;
  }
};

export { accessChat, fetchChats, createGroup, renameGroup };
