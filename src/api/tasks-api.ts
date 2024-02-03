import axios from "axios";

const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1', withCredentials: true})

export const tasksAPI = {
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, payload: { title: string }) {
        return instance.post<ResponseType<{ "item": TaskType }>>(`/todo-lists/${todolistId}/tasks`, {title: payload.title})
    },
    updateTask(todolistId: string, taskId: string, payload: { title: string }) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`, {title: payload.title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    }
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}

type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string
}

type ResponseType<D = {}> = {
    "data": D,
    "messages": [],
    "fieldsErrors": [],
    "resultCode": 0
}