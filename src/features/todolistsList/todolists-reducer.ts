import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";
import {ErrorType, handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";
import axios, {AxiosError} from "axios";
import {getTasksTC} from "./tasks-reducer";

const initialState: TodolistDomainType[] = []
export type FilterValuesType = "all" | "active" | "completed";
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: TodolistsActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case "SET-TODOLISTS":
            return action.payload.todolists.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case "ADD-TODOLIST":
            return [{...action.payload.todolist, filter: 'all', entityStatus: 'idle'}, ...state]
        case 'REMOVE-TODOLIST':
            return state.filter(el => el.id != action.payload.id);
        case "CHANGE-TODOLIST-TITLE":
            return state.map(el => el.id == action.payload.id ? {...el, title: action.payload.title} : el)
        case "CHANGE-TODOLIST-FILTER":
            return state.map(el => el.id == action.payload.id ? {...el, filter: action.payload.filter} : el)
        case "TODOLIST/CHANGE-ENTITY-STATUS": {
            return state.map(el => el.id == action.payload.todolistId ? {
                ...el,
                entityStatus: action.payload.entityStatus
            } : el)
        }
        case "TODOLISTS/CLEAR-DATA":
            return []
        default:
            return state
    }
}

// -------------TYPES-------------------------

export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ClearTodolistsData =  | ReturnType<typeof clearTodolistsData>
export type TodolistsActionsType =
    SetTodolistActionType | RemoveTodolistActionType | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatus>
|ClearTodolistsData


//---------------ACTION CREATORS-------------

export const setTodolistsAC = (todolists: TodolistType[]) => ({
    type: 'SET-TODOLISTS',
    payload: {
        todolists
    }
} as const)
export const addTodolistAC = (todolist: TodolistType) => ({
    type: 'ADD-TODOLIST',
    payload: {
        todolist
    }
} as const)
export const removeTodolistAC = (id: string) => ({
    type: 'REMOVE-TODOLIST',
    payload: {
        id: id
    }
} as const)
export const changeTodolistTitleAC = (title: string, id: string) => ({
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        title,
        id
    }
} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    payload: {
        id,
        filter
    }
} as const)


export const changeTodolistEntityStatus = (todolistId: string, entityStatus: RequestStatusType) => {
    return {
        type: 'TODOLIST/CHANGE-ENTITY-STATUS',
        payload: {
            entityStatus, todolistId
        }
    } as const
}


export const clearTodolistsData = () => ({
    type: "TODOLISTS/CLEAR-DATA",
    payload: {}
} as const)

// --------------THUNK CREATORS --------------

export const getTodolistsTC = (): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatus('succeeded'))
            return res.data
        }).then(
        todos => todos.forEach(tl => dispatch(getTasksTC(tl.id)))
    )
        .catch((e) => {
            if (axios.isAxiosError(e)) {
                handleServerNetworkError({message: e.response!.data.message}, dispatch)
            }
        })
}

export const addTodolistTC = (title: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTodolistAC(res.data.data.item))
                dispatch(setAppStatus('succeeded'))
            } else {
                handleServerAppError(res.data, dispatch)
            }

        })
        .catch((e: AxiosError<ErrorType>) => {
            handleServerNetworkError(e, dispatch)
        })
}

export const removeTodolistTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodolistAC(todolistId))
                dispatch(setAppStatus('succeeded'))
                dispatch(changeTodolistEntityStatus(todolistId, 'idle'))
            } else {
                handleServerAppError(res.data, dispatch)
                dispatch(changeTodolistEntityStatus(todolistId, 'failed'))
                dispatch(changeTodolistEntityStatus(todolistId, 'failed'))
            }

        })
        .catch((e: AxiosError<ErrorType>) => {
            handleServerNetworkError(e, dispatch)
            dispatch(changeTodolistEntityStatus(todolistId, 'failed'))
        })
}

export const updateTodolistTC =
    (todolistId: string, title: string): AppThunk =>
        async (dispatch) => {
            dispatch(setAppStatus('loading'))
            dispatch(changeTodolistEntityStatus(todolistId, 'loading'))

            try {
                const res = await todolistAPI.updateTodolist(todolistId, title)
                if (res.data.resultCode === 0) {
                    dispatch(changeTodolistTitleAC(title, todolistId))
                    dispatch(setAppStatus('succeeded'))
                    dispatch(changeTodolistEntityStatus(todolistId, 'succeeded'))
                } else {
                    handleServerAppError(res.data, dispatch)
                    dispatch(changeTodolistEntityStatus(todolistId, 'failed'))
                }
            } catch (e) {
                if (axios.isAxiosError<ErrorType>(e)) {
                    handleServerNetworkError(e, dispatch)
                    dispatch(changeTodolistEntityStatus(todolistId, 'failed'))
                } else {
                    handleServerNetworkError(e as Error, dispatch)
                    dispatch(changeTodolistEntityStatus(todolistId, 'failed'))
                }
            }
        }


