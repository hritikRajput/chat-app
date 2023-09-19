import axios from "axios";
const BASE_URL = "http://localhost:8000/";
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

export { fetchChats };
