import axios from "axios";
const BASE_URL = "http://localhost:8000/";
const register = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}api/user/register`, formData);
    return data;
  } catch (err) {
    console.error("Error in signing up", err);
    return err;
  }
};
const logIn = async (formData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}api/user/login`, formData);
    console.log(data);
    return data;
  } catch (err) {
    console.error("Error in loging in", err);
    return err;
  }
};

const searchUsers = async (search, token) => {
  try {
    const { data } = await axios.get(`${BASE_URL}api/user?search=${search}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return data;
  } catch (err) {
    console.error("Error in searching in", err);
    return err;
  }
};

export { register, logIn, searchUsers };
