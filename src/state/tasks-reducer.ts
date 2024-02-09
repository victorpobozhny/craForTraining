import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";
import {tasksAPI, TaskStatuses, TaskType, UpdateTaskModelType} from "../api/tasks-api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type SetTasksActionType = ReturnType<typeof setTasksAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>


type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType


const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    const {type, payload} = action
    switch (type) {
        case "SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        case "SET-TODOLISTS":
            let newState = {...state}
            action.payload.todolists.forEach(tl => newState[tl.id] = [])
            return newState


        case "REMOVE-TASK": {
            const {taskID, todolistID} = payload
            return {...state, [todolistID]: state[todolistID].filter(el => el.id != taskID)}
        }

        case "ADD-TASK": {
            return {
                ...state, [action.payload.todolistId]: [...state[action.payload.todolistId], action.payload.task]
            }
        }
        case "UPDATE_TASK": {
            return {...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(el => el.id === action.payload.task.id ? {
                    ...el,
                    status: action.payload.task.status,
                    title: action.payload.task.title
                } : el)
            }
        }

        case "ADD-TODOLIST": {
            return {...state, [action.payload.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            const {id} = payload
            const newState = {...state}
            delete newState[id]
            return newState
        }
        default:
            return state
    }
}

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return {
        type: "SET-TASKS",
        payload: {
            tasks,
            todolistId
        }
    } as const
}
export const updateTaskAC = (todolistId: string, task: TaskType) => {
    return {
        type: 'UPDATE_TASK',
        payload: {
            todolistId, task
        }
    } as const
}
export const removeTaskAC = (taskID: string, todolistID: string) => {
    return {type: 'REMOVE-TASK', payload: {taskID, todolistID}} as const
}
export const addTaskAC = (todolistId: string, task: TaskType) => {
    return {type: 'ADD-TASK', payload: {task, todolistId}} as const
}

export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.getTasks(todolistId)
            .then(res => dispatch(setTasksAC(todolistId, res.data.items)))
    }
}
export const createTaskTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.createTask(todolistId, title)
            .then(res => dispatch(addTaskAC(todolistId, res.data.data.item)))
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => dispatch(removeTaskAC(taskId, todolistId)))
    }
}
export const updateTaskTC = (todolistId: string, taskId: string, status: TaskStatuses, title: string) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(ts => ts.id === taskId)
        if (task) {
            const model: UpdateTaskModelType = {
                title,
                status,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate,
                description: task.description
            }
            tasksAPI.updateTask(todolistId, taskId, model)
                .then(res => dispatch(updateTaskAC(todolistId, res.data.data.item)))
        }
    }
}





