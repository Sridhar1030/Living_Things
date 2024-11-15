const initialState = {
	user: null,
	loading: false,
	error: null,
};

const userReducer = (state = initialState, action) => {
	switch (action.type) {
		case "LOGIN_REQUEST":
			return { ...state, loading: true };
		case "LOGIN_SUCCESS":
			return { ...state, loading: false, user: action.payload };
		case "LOGIN_FAILURE":
			return { ...state, loading: false, error: action.payload };
		case "LOGOUT":
			return initialState;
		default:
			return state;
	}
};

export default userReducer;
