import axios from "axios";
const BASE_URL = "http://localhost:8000/";
const sendMessage = async (message, token) => {
  try {
    console.log(message);
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

export { sendMessage };
