import {ChangeTodoTitleArgs, todolistsAPI, TodolistType} from "api/todolists-api";
import {appActions, RequestStatusType} from "app/app.reducer";
import {handleServerNetworkError} from "utils/error-utils";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";

const initialState: TodolistDomainType[] = [];

const slice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        changeTodolistFilter: (state, action: PayloadAction<{ id: string; filter: FilterValuesType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.filter = action.payload.filter;
            }
        },
        changeTodolistEntityStatus: (state, action: PayloadAction<{ id: string; entityStatus: RequestStatusType }>) => {
            const todo = state.find((todo) => todo.id === action.payload.id);
            if (todo) {
                todo.entityStatus = action.payload.entityStatus;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(clearTasksAndTodolists, () => {
            return [];
        })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                return action.payload.todolists.map((tl) => ({...tl, filter: "all", entityStatus: "idle"}));
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                const index = state.findIndex((todo) => todo.id === action.payload.id);
                if (index !== -1) state.splice(index, 1);
            })
            .addCase(todolistsThunks.changeTodolistTitle.fulfilled, (state, action) => {
                const todo = state.find((todo) => todo.id === action.payload.id);
                if (todo) {
                    todo.title = action.payload.title;
                }
            })
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                const newTodolist: TodolistDomainType = {
                    ...action.payload.todolist,
                    filter: "all",
                    entityStatus: "idle"
                };
                state.unshift(newTodolist);
            });
    },
});
// thunks

const fetchTodolists = createAppAsyncThunk<{
    todolists: TodolistType[]
}>(`${slice.name}/fetchTodolists`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await todolistsAPI.getTodolists()
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {todolists: res.data};
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(appActions.setAppStatus({status: "failed"}));
        return rejectWithValue(null);
    }

})

const removeTodolist = createAppAsyncThunk<{
    id: string
}, string>(`${slice.name}/removeTodolist`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        //изменим статус конкретного тудулиста, чтобы он мог задизеблить что надо
        dispatch(todolistsActions.changeTodolistEntityStatus({id: arg, entityStatus: "loading"}));
        const res = await todolistsAPI.deleteTodolist(arg)
        //скажем глобально приложению, что асинхронная операция завершена
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {id: arg};
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null)
    }
})

const addTodolist = createAppAsyncThunk<{
    todolist: TodolistType
}, string>(`${slice.name}/createTodolist`, async (arg, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await todolistsAPI.createTodolist(arg)
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {todolist: res.data.data.item};
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        return rejectWithValue(null);
    }
})

const changeTodolistTitle = createAppAsyncThunk<ChangeTodoTitleArgs, ChangeTodoTitleArgs>(
    `${slice.name}/changeTodolistTitle`, async (arg, thunkAPI) => {
        const {rejectWithValue, dispatch} = thunkAPI
        try {
            const res = await todolistsAPI.updateTodolist({id: arg.id, title: arg.title})
            return {id: arg.id, title: arg.title}
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }

    })


// types

export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType;
    entityStatus: RequestStatusType;
};

export const todolistsReducer = slice.reducer;
export const todolistsActions = slice.actions;
export const todolistsThunks = {fetchTodolists, removeTodolist, addTodolist, changeTodolistTitle}