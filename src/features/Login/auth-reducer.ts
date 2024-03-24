import {Dispatch} from 'redux'import {    SetAppErrorActionType,    setAppStatus,    SetAppStatusActionType, setIsInitialized,} from '../../app/app-reducer'import {authAPI, LoginParamsType} from "../../api/todolist-api";import axios from "axios";import {ErrorType, handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";import {ClearTodolistsData, clearTodolistsData} from "../todolistsList/todolists-reducer";const initialState = {    isLoggedIn: false,}type InitialStateType = typeof initialStateexport const authReducer = (    state: InitialStateType = initialState,    action: ActionsType): InitialStateType => {    switch (action.type) {        case 'login/SET-IS-LOGGED-IN':            return {...state, isLoggedIn: action.value}        default:            return state    }}// actionsexport const setIsLoggedInAC = (value: boolean) =>    ({type: 'login/SET-IS-LOGGED-IN', value}) as const// thunksexport const loginTC = (data: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {    dispatch(setAppStatus('loading'))    try {        const res = await authAPI.login(data)        if (res.data.resultCode === 0) {            dispatch(setIsLoggedInAC(true))            dispatch(setAppStatus('succeeded'))        } else {            handleServerAppError(res.data, dispatch)            dispatch(setAppStatus('failed'))        }    } catch (e) {        if (axios.isAxiosError<ErrorType>(e)) {            handleServerNetworkError(e, dispatch)            dispatch(setAppStatus('failed'))        } else {            handleServerNetworkError(e as Error, dispatch)            dispatch(setAppStatus('failed'))        }    }}export const initializeAppTC = () => (dispatch: Dispatch) => {    authAPI.me().then(res => {        if (res.data.resultCode === 0) {            dispatch(setIsLoggedInAC(true))        } else {            handleServerNetworkError({message: res.data.messages[0]}, dispatch)        }        dispatch(setIsInitialized(true))    })}export const logoutTC = () => (dispatch: Dispatch<ActionsType>) => {    dispatch(setAppStatus('loading'))    authAPI        .logout()        .then(res => {            if (res.data.resultCode === 0) {                dispatch(setIsLoggedInAC(false))                dispatch(setAppStatus('succeeded'))                dispatch(clearTodolistsData())            } else {                handleServerAppError(res.data, dispatch)            }        })        .catch(error => {            handleServerNetworkError(error, dispatch)        })}// typestype ActionsType =    | ReturnType<typeof setIsLoggedInAC>    | SetAppStatusActionType    | SetAppErrorActionType    | ClearTodolistsData