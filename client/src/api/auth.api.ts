import {
  axiosGetRequest,
  axiosPatchRequest,
  axiosPostRequest,
  axiosPutRequest,
} from "@/config/axios";
import { BACKEND_BASE_URL } from "@/constants/API";
import { successPopup } from "@/utils/popup";
import axios from "axios";

export const getRefresh = async () => {
  const res = await axios.get(`${BACKEND_BASE_URL}/api/auth/refresh`, {
    withCredentials: true,
  });

  return res.data.data;
};

export const forgetPassword = async (email: string) => {
  const res = await axiosPostRequest("/auth/forgetPassword", {
    email,
  });
  if (!res) return;
  successPopup(res.message || "OTP sent to your email");
  return res;
};

export const loginWithPassword = async (
  email: string,
  password: string
): Promise<string | undefined> => {
  const res = await axiosPostRequest("/auth/login", { email, password });
  if (!res) return;
  successPopup(res.message || "Login successful");
  return res.data;
};

export const registerApi = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await axiosPostRequest("/auth/register", {
    username,
    email,
    password,
  });
  if (!res) return;
  successPopup(res.data || "OTP sent");
  return res;
};

export const resetPasswordApi = async (email: string, password: string) => {
  const res = await axiosPostRequest("/auth/resetPassword", {
    password: password,
    email,
  });
  if (!res) return;
  successPopup(res.message || "Password is changed");
  return res;
};

export const verifyOTPApi = async (email: string, OTP: string) => {
  const res = await axiosPatchRequest(
    `/auth/OTP/verify?email=${email}&OTP=${OTP}`
  );
  if (!res) return;
  successPopup(res.message || "OTP verified");
  return res;
};

export const completeRegisterApi = async (email: string) => {
  const res = await axiosPostRequest(`/auth/register/complete`, { email });
  if (!res) return;
  successPopup(res.message || "User registered");
  return res;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const res = await axiosPatchRequest("/auth/changePassword", {
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
  if (!res) return;
  successPopup(res.message || "Password is changed");
  return res;
};

export const logoutApi = async () => {
  const res = await axiosGetRequest("/auth/logout");
  if (!res) return;
  successPopup(res.message || "User logged out");
  return res;
};

export const resendOTPApi = async (email: string) => {
  const res = await axiosPutRequest(`/auth/OTP/resend`, { email });
  if (!res) return;
  successPopup(res.message || "OTP sent to your email");
  return res;
};
