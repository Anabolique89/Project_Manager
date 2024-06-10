import { createSlice } from "@reduxjs/toolkit";
import { user } from "../../assets/data";

const initialState = {
  user: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : user,

  isSidebarOpen: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
      //save user data to localStorage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user = null;
      //remove user data from LocalStorage
      localStorage.removeItem("userInfo");
    },
    setOpenSidebar: (state, action) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

//export the functions
export const { setCredentials, logout, setOpenSidebar } = authSlice.actions;
export default authSlice.reducer;
