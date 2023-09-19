import axios from "axios";
const BASE_URL = "http://localhost:8000/";
const sendMessage = async (message, token) => {
  try {
    const { data } = await axios.post(`${BASE_URL}api/message`, message, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error("Error in sending message", err);
    return err;
  }
};
const getAllMessages = async (chatId, token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}api/message/${chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error("Error in getting messages", err);
    return err;
  }
};

export { sendMessage, getAllMessages };
