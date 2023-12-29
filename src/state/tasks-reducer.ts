import {TasksStateType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksStateType, action: TasksAction) => {
    switch (action.type) {
        case "ADD-TASK":
            return {
                ...state, [action.payload.todolistID]:
                    [...state[action.payload.todolistID],
                        {id: v1(), title: action.payload.title, isDone: false}]
            }
        case "REMOVE-TASK":
            return {
                ...state, [action.payload.todolistID]: state[action.payload.todolistID].filter(el =>
                    el.id != action.payload.taskID)
            }
        case "CHANGE-TASK-STATUS":
            return {
                ...state,
                [action.payload.todolistID]:
                    state[action.payload.todolistID].map(el => el.id ==
                    action.payload.taskID ? {
                        ...el,
                        isDone: action.payload.isDone
                    } : el)
            }
        case "CHANGE-TASK-TITLE":
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el =>
                    el.id == action.payload.taskID ?
                        {...el, title: action.payload.title}
                        : el
                )
            }
        default:
            throw new Error('Bad Action Creator')
    }

}

type TasksAction = AddTaskAC | RemoveTaskAC | ChangeTaskStatusAC | ChangeTaskTitleAC;
type AddTaskAC = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistID,
            title
        }
    } as const
}
type RemoveTaskAC = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistID: string, taskID: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistID,
            taskID
        }
    } as const
}
type ChangeTaskStatusAC = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistID: string, taskID: string, isDone: boolean) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            todolistID,
            taskID,
            isDone
        }
    } as const
}

type ChangeTaskTitleAC = ReturnType<typeof changeTaskTitleAC>

export const changeTaskTitleAC = (todolistID: string, taskID: string, title: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            todolistID,
            taskID,
            title
        }
    } as const
}


