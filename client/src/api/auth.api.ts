import {
  axiosGetRequest,
  axiosPatchRequest,
  axiosPostRequest,
  axiosPutRequest,
} from "@/config/axios";
import {
  BACKEND_BASE_URL,
  CHANGE_PASSWORD_API,
  COMPLETE_REGISTER_API,
  FORGET_PASSWORD_API,
  LOGIN_API,
  LOGOUT_API,
  REFRESH_TOKEN_API,
  REGISTER_API,
  RESEND_OTP_API,
  RESET_PASSWORD_API,
  VERIFY_OTP_API,
} from "@/constants/API";
import { IResponse } from "@/types/responseType";
import { successPopup } from "@/utils/popup";
import axios from "axios";

export const getRefreshApi = async () => {
  const res: IResponse = await axios.get(
    `${BACKEND_BASE_URL}/api${REFRESH_TOKEN_API}`,
    { withCredentials: true }
  );
  return res;
};

export const forgetPassword = async (email: string) => {
  const res = await axiosPostRequest(FORGET_PASSWORD_API, {
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
  const res = await axiosPostRequest(LOGIN_API, { email, password });
  if (!res) return;
  successPopup(res.message || "Login successful");
  return res.data;
};

export const registerApi = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await axiosPostRequest(REGISTER_API, {
    username,
    email,
    password,
  });
  if (!res) return;
  successPopup(res.data || "OTP sent");
  return res;
};

export const resetPasswordApi = async (email: string, password: string) => {
  const res = await axiosPostRequest(RESET_PASSWORD_API, {
    password: password,
    email,
  });
  if (!res) return;
  successPopup(res.message || "Password is changed");
  return res;
};

export const verifyOTPApi = async (email: string, OTP: string) => {
  const res = await axiosPatchRequest(
    `${VERIFY_OTP_API}?email=${email}&OTP=${OTP}`
  );
  if (!res) return;
  successPopup(res.message || "OTP verified");
  return res;
};

export const completeRegisterApi = async (email: string) => {
  const res = await axiosPostRequest(COMPLETE_REGISTER_API, { email });
  if (!res) return;
  successPopup(res.message || "User registered");
  return res;
};

export const changePassword = async (
  oldPassword: string,
  newPassword: string
) => {
  const res = await axiosPatchRequest(CHANGE_PASSWORD_API, {
    oldPassword: oldPassword,
    newPassword: newPassword,
  });
  if (!res) return;
  successPopup(res.message || "Password is changed");
  return res;
};

export const logoutApi = async () => {
  const res = await axiosGetRequest(LOGOUT_API);
  if (!res) return;
  successPopup(res.message || "User logged out");
  return res;
};

export const resendOTPApi = async (email: string) => {
  const res = await axiosPutRequest(RESEND_OTP_API, { email });
  if (!res) return;
  successPopup(res.message || "OTP sent to your email");
  return res;
};
