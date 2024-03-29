import axios, {AxiosResponse} from 'axios'

const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1/', withCredentials: true})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>, AxiosResponse<ResponseType<{ item: TodolistType }>>, { title: string }>('todo-lists', {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType, AxiosResponse<ResponseType>, { title: string }>(`todo-lists/${todolistId}`, {title: title})
    },



    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType, AxiosResponse<GetTasksResponseType>>(`/todo-lists/${todolistId}/tasks`)
    },
    createTask(todolistId: string, title: string) {
        return instance.post<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, { title: string }>(`/todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<{ item: TaskType }>, AxiosResponse<ResponseType<{ item: TaskType }>>, UpdateTaskModelType>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}



export const authAPI = {
    login(data: LoginParamsType){
        return instance.post<ResponseType<{userId: number}>, AxiosResponse<ResponseType<{userId: number}>>, LoginParamsType>('/auth/login', data )
    },
    me() {
        return instance.get<ResponseType<DataLoginType>, AxiosResponse<ResponseType<DataLoginType>>>('/auth/me')
    },
    logout() {
        return instance.delete('/auth/login')
    }
}

//-----------TYPES------------

export type DataLoginType = {
    id: number
    email: string
    login: string
}
export type LoginParamsType = {
    email: string
    password: string
    rememberMe?: boolean
}

export type TodolistType = {
    id: string
    title: string
    addedDate: Date
    order: number
}
export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}
export type TaskType = {
    description: string
    title: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
    id: string
    todoListId: string
    order: number
    addedDate: Date
}
export type GetTasksResponseType = {
    "items": TaskType[]
    "totalCount": number
    "error": ErrorEvent | null
}

export type UpdateTaskModelType = {
    title: string
    description: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: Date
    deadline: Date
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    High = 2,
    Urgently = 3,
    Later = 4
}