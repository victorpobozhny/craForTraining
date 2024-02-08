import axios from 'axios'

const instance = axios.create({baseURL: 'https://social-network.samuraijs.com/api/1.1/', withCredentials: true})

export const todolistAPI = {
    getTodos() {
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodos(payload: { title: string }) {
        return instance.post<ResponseType<{item: ItemType}>>('todo-lists', {title: payload.title})
    },
    deleteTodos(payload: { todolistId: string }) {
        return instance.delete<ResponseType>(`todo-lists/${payload.todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(
            `todo-lists/${todolistId}`,
            {title: title}
        )
    },
}

export type TodolistType = {
    id: string
    title: string
    addedDate: Date
    order: number
}
type ItemType = {
    "id": string
    "title": string
    "addedDate": Date
    "order": number

}

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: D
}