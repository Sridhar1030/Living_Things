import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
	reducer: rootReducer,
	devTools: true, // Enable Redux DevTools here
});

export default store;
