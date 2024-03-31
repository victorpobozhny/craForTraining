import { UnknownAction, configureStore } from "@reduxjs/toolkit";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { authReducer } from "../features/Login/authSlice";
import { tasksReducer } from "../features/TodolistsList/tasksSlice";
import { todolistsReducer } from "../features/TodolistsList/todolistsSlice";
import { appReducer } from "./appSlice";

//  const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    todolists: todolistsReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type AppRootStateType = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, UnknownAction>;

// export type AppDispatch = typeof store.dispatch
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, UnknownAction>;
