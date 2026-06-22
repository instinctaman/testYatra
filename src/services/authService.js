import axios from "axios";

const API = "http://localhost:8000";

export const sendOTP = (phone) => {
  return axios.post(`${API}/otp/send`, {
    phone,
  });
};

export const verifyOTP = (phone, otp) => {
  return axios.post(`${API}/otp/verify`, {
    phone,
    otp,
  });
};