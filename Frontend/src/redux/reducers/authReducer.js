import {
	LOGIN_SUCCESS,
	LOGIN_FAILURE,
	SIGNUP_SUCCESS,
	SIGNUP_FAILURE,
} from "../actions/authActions";

const initialState = {
	user: null,
	error: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
		case SIGNUP_SUCCESS:
			return {
				...state,
				user: action.payload,
				error: null,
			};
		case LOGIN_FAILURE:
		case SIGNUP_FAILURE:
			return {
				...state,
				user: null,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default authReducer;
