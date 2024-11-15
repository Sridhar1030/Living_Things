import axios from "axios";

export const loginUser = (credentials) => async (dispatch) => {
	dispatch({ type: "LOGIN_REQUEST" });

	try {
		const response = await axios.post("/api/login", credentials);
		const { user, accessToken } = response.data;

		// Store tokens in localStorage
		localStorage.setItem("accessToken", accessToken);

		dispatch({ type: "LOGIN_SUCCESS", payload: user });
	} catch (error) {
		dispatch({
			type: "LOGIN_FAILURE",
			payload: error.response?.data?.message || "Login failed",
		});
	}
};

export const logoutUser = () => (dispatch) => {
	// Clear tokens from localStorage
	localStorage.clear();
	dispatch({ type: "LOGOUT" });
};
