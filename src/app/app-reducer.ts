export type SetAppErrorActionType = ReturnType<typeof setAppError>;export type SetAppStatusActionType = ReturnType<typeof setAppStatus>;export type SetIsInitializedType = ReturnType<typeof setIsInitialized>;export type ActionsType = SetAppStatusActionType | SetAppErrorActionType | SetIsInitializedType;export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'type ErrorTypes = string | nullconst initialState = {    status: 'idle' as RequestStatusType,    error: null as ErrorTypes,    isInitialized: false}type InitialStateType = typeof initialStateexport const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {    switch (action.type) {        case "APP/SET-STATUS": {            return {...state, status: action.payload.status}        }        case "APP/SET-ERROR": {            return {...state, error: action.payload.error}        }        case "APP/SET-IS-INITIALIZED":            return {...state, isInitialized: action.payload.isInitialized}        default:            return state    }}export const setAppStatus = (status: RequestStatusType) => {    return {        type: 'APP/SET-STATUS',        payload: {            status        }    } as const}export const setAppError = (error: ErrorTypes) => {    return {        type: 'APP/SET-ERROR',        payload: {            error        }    } as const}export const setIsInitialized = (isInitialized: boolean) => ({    type: 'APP/SET-IS-INITIALIZED',    payload: {        isInitialized    }} as const)