import axios from "axios";

// Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";
const API_URL = import.meta.env.VITE_API_URL;
// Login Action
export const loginUser = (credentials) => async (dispatch) => {
	try {
		const response = await axios.post(
			`${API_URL}/auth/login`,
			credentials
		);
		localStorage.setItem("accessToken", response.data.accessToken);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: LOGIN_FAILURE,
			payload: error.response?.data?.message || "Login failed",
		});
	}
};

// Signup Action
export const signupUser = (formData) => async (dispatch) => {
	try {
		const response = await axios.post(
			`${API_URL}/auth/signup`,
			formData
		);
		localStorage.setItem("accessToken", response.data.accessToken);

		dispatch({
			type: SIGNUP_SUCCESS,
			payload: response.data,
		});
	} catch (error) {
		dispatch({
			type: SIGNUP_FAILURE,
			payload: error.response?.data?.message || "Signup failed",
		});
	}
};
