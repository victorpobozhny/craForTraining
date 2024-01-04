import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
type AddTaskActionType = ReturnType<typeof addTaskAC>
type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
type TasksActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | AddTodolistActionType
    | RemoveTodolistActionType


export const tasksReducer = (state: TasksStateType, action: TasksActionsType): TasksStateType => {
    const {type, payload} = action
    switch (type) {
        case "REMOVE-TASK":
            return {...state, [payload.todolistId]: state[payload.todolistId].filter(el => el.id !== payload.taskId)}
        case "ADD-TASK":
            return {
                ...state,
                [payload.todolistId]: [...state[payload.todolistId], {id: v1(), title: payload.title, isDone: false}]
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(el => el.id == payload.taskId ? {
                    ...el,
                    isDone: payload.isDone
                } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [payload.todolistId]: state[payload.todolistId].map(el => el.id == payload.taskId ? {
                    ...el,
                    title: payload.title
                } : el)
            }
        case "ADD-TODOLIST":
            return {...state, [payload.todolistId]: []}
        case "REMOVE-TODOLIST":
            const newState = {...state}
            delete newState[payload.id]
            return newState
        default:
            throw new Error('Bad Action Type')

    }
}


export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            todolistId, taskId
        }
    } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            todolistId, title
        }
    } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE-TASK-STATUS',
        payload: {
            todolistId, taskId, isDone
        }
    } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return {
        type: 'CHANGE-TASK-TITLE',
        payload: {
            todolistId, taskId, title
        }
    } as const
}