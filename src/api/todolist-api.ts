import axios from "axios";

const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1', withCredentials: true})

export const todolistAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>('/todo-lists')
    },
    createTodolist(payload: { title: string }) {
        return instance.post<ResponseType<{ item: TodolistType }>>('/todo-lists', {title: payload.title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`/todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, payload: { title: string }) {
        return instance.put<ResponseType>(`/todo-lists/${todolistId}`, {title: payload.title})
    },
}

export type TodolistType = {
    "id": string
    "title": string
    "addedDate": Date
    "order": number
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}