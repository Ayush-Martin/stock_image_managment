import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

interface IUser {
  username: string;
  email: string;
  accessToken: string;
  id: string;
}

const initialState: IUser = {
  username: "",
  email: "",
  accessToken: "",
  id: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const { username, email, id }: IUser = jwtDecode(action.payload);

      state.username = username;
      state.email = email;
      state.id = id;
      state.accessToken = action.payload;
    },
    logout: (state) => {
      state.username = "";
      state.email = "";
      state.id = "";
      state.accessToken = "";
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
  },
});

export const { login, logout, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
