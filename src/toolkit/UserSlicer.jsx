import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
  isPending: false,
  error: "",
  isAuth: false,
};

const UserSlicer = createSlice({
  name: "User",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.data = payload;
      state.isPending = false;
      state.isAuth = true;
      state.error = "";
    },
    setPending(state) {
      state.isPending = true;
    },
    setError(state, { payload }) {
      state.error = payload;
      state.isPending = false;
      state.isAuth = false;
    },
  },
});

export const { setUser, setPending, setError } = UserSlicer.actions;
export default UserSlicer.reducer;
