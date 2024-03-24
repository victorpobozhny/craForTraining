import {AppThunk} from "../../app/store";
import {
    AddTodolistActionType,
    ClearTodolistsData,
    RemoveTodolistActionType,
    SetTodolistActionType
} from "./todolists-reducer";
import {RequestStatusType, setAppError, setAppStatus} from "../../app/app-reducer";
import {ErrorType, handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import {TaskType, todolistAPI} from "../../api/todolist-api";
import {AxiosError} from "axios";


//--------------TYPES--------------
export type TasksStateType = {
    [key: string]: Array<TaskDomainType>
}

export type TaskDomainType = TaskType & {
    entityStatus: RequestStatusType
}
export type TasksActionsType =
    ReturnType<typeof createTaskAC>
    | ReturnType<typeof removeTaskAC>
    | ReturnType<typeof setTasksAC>
    | ReturnType<typeof updateTaskAC>
    | ReturnType<typeof changeTaskEntityStatus>
    | SetTodolistActionType | RemoveTodolistActionType | AddTodolistActionType | ClearTodolistsData


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: TasksActionsType): TasksStateType => {
    const {type, payload} = action
    switch (type) {
        case "SET-TASKS":
            return {...state, [payload.todolistId]: payload.tasks.map(el => ({...el, entityStatus: 'idle'}))}
        case "CREATE-TASK":
            return {
                ...state, [payload.todolistId]: [...state[payload.todolistId], {...payload.task, entityStatus: 'idle'}]
            }
        case "REMOVE-TASK":
            const {taskID, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].filter(el => el.id != taskID)}
        case "UPDATE-TASK":
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(el => el.id === action.payload.task.id ? action.payload.task : el)
            }
        case "SET-TODOLISTS":
            const copyState = {...state}
            action.payload.todolists.forEach(tl => copyState[tl.id] = [])
            return copyState
        case "ADD-TODOLIST":
            return {...state, [action.payload.todolist.id]: []}
        case "REMOVE-TODOLIST":
            const newState = {...state}
            delete newState[payload.id]
            return newState
        case "TASKS/CHANGE-ENTITY-STATUS": {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    entityStatus: action.payload.status
                } : el)
            }
        }
        case "TODOLISTS/CLEAR-DATA":
            return {}
        default:
            return state
    }
}

// ---------------ACTION CREATORS-------------------------------------

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
    type: "SET-TASKS",
    payload: {
        tasks,
        todolistId
    }
} as const)
export const createTaskAC = (todolistId: string, task: TaskType) => ({
    type: 'CREATE-TASK',
    payload: {
        task,
        todolistId
    }
} as const)
export const removeTaskAC = (taskID: string, todolistID: string) => ({
    type: 'REMOVE-TASK',
    payload: {taskID, todolistID}
} as const)
export const updateTaskAC = (todolistId: string, task: TaskDomainType) => ({
    type: "UPDATE-TASK",
    payload: {
        todolistId, task
    }
} as const)


export const changeTaskEntityStatus = (todolistId: string, taskId: string, status: RequestStatusType) => {
    return {
        type: 'TASKS/CHANGE-ENTITY-STATUS',
        payload: {
            todolistId, taskId, status
        }
    } as const
}


//----------------THUNK CREATORS---------------------------------------

export const getTasksTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    todolistAPI.getTasks(todolistId)
        .then(res => {
            if (!res.data.error) {
                dispatch(setTasksAC(todolistId, res.data.items))
                dispatch(setAppStatus('succeeded'))
            } else {
                dispatch(setAppError(res.data.error.error))
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error, dispatch)
        })
}

export const createTaskTC = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTask(todolistId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(createTaskAC(todolistId, res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError<{ item: TaskType }>(res.data, dispatch)
            }
        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error, dispatch)
        })


}

export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTaskEntityStatus(todolistId, taskId, 'loading'))
    todolistAPI.deleteTask(todolistId, taskId)
        .then(res => {
            if(res.data.resultCode===0) {
                dispatch(removeTaskAC(taskId, todolistId))
                dispatch(setAppStatus('succeeded'))
                dispatch(changeTaskEntityStatus(todolistId, taskId, 'succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTaskEntityStatus(todolistId, taskId, 'failed'))
            }

        })
        .catch((error: AxiosError<ErrorType>) => {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatus(todolistId, taskId, 'failed'))
        })
}

export const updateTaskTC = (todolistId: string, task: TaskDomainType): AppThunk =>
    dispatch => {
        dispatch(setAppStatus('loading'))
        dispatch(changeTaskEntityStatus(todolistId, task.id, 'loading'))
        todolistAPI.updateTask(todolistId, task.id, task)
            .then(res => {
                if (res.data.resultCode === 0) {
                    dispatch(updateTaskAC(todolistId, {...res.data.data.item, entityStatus: "idle"}))
                    dispatch(setAppStatus('succeeded'))
                    dispatch(changeTaskEntityStatus(todolistId, task.id, 'succeeded'))
                } else {
                    handleServerAppError<{ item: TaskType }>(res.data, dispatch)
                    dispatch(changeTaskEntityStatus(todolistId, task.id, 'failed'))
                }
            })
            .catch(error => {
                handleServerNetworkError(error, dispatch)
                dispatch(changeTaskEntityStatus(todolistId, task.id, 'failed'))
            })
    }




