import {
    CreateTaskArgs,
    RemoveTaskArgs,
    ResultCodes,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    todolistsAPI,
    UpdateTaskArgs,
    UpdateTaskModelType
} from "api/todolists-api";
import {handleServerAppError, handleServerNetworkError} from "utils/error-utils";
import {appActions} from "app/app.reducer";
import {todolistsThunks} from "features/TodolistsList/todolists.reducer";
import {createSlice} from "@reduxjs/toolkit";
import {clearTasksAndTodolists} from "common/actions/common.actions";
import {createAppAsyncThunk} from "../../utils/create-app-async-thunk";

const initialState: TasksStateType = {};

const slice = createSlice({
    name: "tasks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(todolistsThunks.addTodolist.fulfilled, (state, action) => {
                state[action.payload.todolist.id] = [];
            })
            .addCase(todolistsThunks.removeTodolist.fulfilled, (state, action) => {
                delete state[action.payload.id];
            })
            .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
                action.payload.todolists.forEach((tl) => {
                    state[tl.id] = [];
                });
            })
            .addCase(clearTasksAndTodolists, () => {
                return {};
            })
            .addCase(fetchTasks.fulfilled, (state, action) => {
                state[action.payload.todolistId] = action.payload.tasks;
            })
            .addCase(addTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.task.todoListId];
                tasks.unshift(action.payload.task);
            })
            .addCase(removeTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex((t) => t.id === action.payload.taskId);
                if (index !== -1) tasks.splice(index, 1);
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                const tasks = state[action.payload.todolistId];
                const index = tasks.findIndex((t) => t.id === action.payload.taskId);
                if (index !== -1) {
                    tasks[index] = {...tasks[index], ...action.payload.domainModel};
                }
            });
    },
});
// thunks

const fetchTasks = createAppAsyncThunk<{
    tasks: TaskType[],
    todolistId: string
}, string>(`${slice.name}/fetchTasks`, async (todolistId: string, thunkAPI) => {
    const {dispatch, rejectWithValue} = thunkAPI
    try {
        dispatch(appActions.setAppStatus({status: "loading"}));
        const res = await todolistsAPI.getTasks(todolistId)
        const tasks = res.data.items;
        dispatch(appActions.setAppStatus({status: "succeeded"}));
        return {tasks, todolistId};
    } catch (e) {
        handleServerNetworkError(e, dispatch)
        dispatch(appActions.setAppStatus({status: "failed"}));
        return rejectWithValue(null)
    }
})


const removeTask = createAppAsyncThunk<RemoveTaskArgs, RemoveTaskArgs>(
    `${slice.name}/removeTask`, async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue} = thunkAPI
        try {
            const res = await todolistsAPI.deleteTask({todolistId: arg.todolistId, taskId: arg.taskId})
            return arg;
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })


const addTask = createAppAsyncThunk<{ task: TaskType }, CreateTaskArgs>(
    `${slice.name}/addTask`,
    async (arg, thunkApi) => {
        const {dispatch, rejectWithValue} = thunkApi
        try {
            dispatch(appActions.setAppStatus({status: "loading"}));
            const res = await todolistsAPI.createTask(arg)
            if (res.data.resultCode === ResultCodes.success) {
                const task = res.data.data.item;
                dispatch(appActions.setAppStatus({status: "succeeded"}));
                return {task};
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })


const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
    `${slice.name}/updateTask`, async (arg, thunkAPI) => {
        const {dispatch, rejectWithValue, getState} = thunkAPI
        try {
            const state = getState();
            const task = state.tasks[arg.todolistId].find((t) => t.id === arg.taskId);
            if (!task) {
                //throw new Error("task not found in the state");
                console.warn("task not found in the state");
                return rejectWithValue(null)
            }
            const apiModel: UpdateTaskModelType = {
                deadline: task.deadline,
                description: task.description,
                priority: task.priority,
                startDate: task.startDate,
                title: task.title,
                status: task.status,
                ...arg.domainModel,
            };
            const res = await todolistsAPI.updateTask(arg.taskId, arg.todolistId, apiModel)
            if (res.data.resultCode === ResultCodes.success) {
                return arg;
            } else {
                handleServerAppError(res.data, dispatch);
                return rejectWithValue(null);
            }
        } catch (e) {
            handleServerNetworkError(e, dispatch)
            return rejectWithValue(null)
        }
    })


export type UpdateDomainTaskModelType = {
    title?: string;
    description?: string;
    status?: TaskStatuses;
    priority?: TaskPriorities;
    startDate?: string;
    deadline?: string;
};
export type TasksStateType = {
    [key: string]: Array<TaskType>;
};

export const tasksReducer = slice.reducer;
export const tasksActions = slice.actions;
export const tasksThunks = {fetchTasks, addTask, removeTask, updateTask}
