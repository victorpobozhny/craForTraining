import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {AppThunk} from "../../app/store";
import {RequestStatusType, setAppStatus} from "../../app/app-reducer";

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
        default:
            return state
    }
}

// -------------TYPES-------------------------

export type SetTodolistActionType = ReturnType<typeof setTodolistsAC>
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type TodolistsActionsType =
    SetTodolistActionType | RemoveTodolistActionType | AddTodolistActionType
    | ReturnType<typeof changeTodolistTitleAC>
    | ReturnType<typeof changeTodolistFilterAC>
    | ReturnType<typeof changeTodolistEntityStatus>

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

// --------------THUNK CREATORS --------------

export const getTodolistsTC = (): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    todolistAPI.getTodolists()
        .then(res => {
            dispatch(setTodolistsAC(res.data))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(e => console.log(e))
}

export const addTodolistTC = (title: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    todolistAPI.createTodolist(title)
        .then(res => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(e => console.log(e))
}

export const removeTodolistTC = (todolistId: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    dispatch(changeTodolistEntityStatus(todolistId, 'loading'))
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppStatus('succeeded'))
            dispatch(changeTodolistEntityStatus(todolistId, 'idle'))
        })
        .catch(e => console.log(e))
}

export const updateTodolistTC = (todolistId: string, title: string): AppThunk => dispatch => {
    dispatch(setAppStatus('loading'))
    todolistAPI.updateTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistTitleAC(title, todolistId))
            dispatch(setAppStatus('succeeded'))
        })
        .catch(e => console.log(e))
}


