import axios from "axios";

// Action Types
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const SIGNUP_SUCCESS = "SIGNUP_SUCCESS";
export const SIGNUP_FAILURE = "SIGNUP_FAILURE";

// Login Action
export const loginUser = (credentials) => async (dispatch) => {
	try {
		const response = await axios.post(
			"http://localhost:3000/api/auth/login",
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
			"http://localhost:3000/api/auth/signup",
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
