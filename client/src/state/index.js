import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	token: null,
	theme: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setLogin: (state, action) => {
			state.user = action.payload.user;
			state.token = action.payload.token;
		},
		setLogout: (state) => {
			state.loggedIn = false;
			state.user = null;
			state.token = null;
		},
		setTheme: (state, action) => {
			state.theme = action.payload;
		},
	},
});

export const { setLogin, setLogout, setTheme } = authSlice.actions;

export default authSlice.reducer;
