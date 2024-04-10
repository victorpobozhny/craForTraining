import axios from "axios";
import {UpdateDomainTaskModelType} from "../features/TodolistsList/tasks.reducer";

const settings = {
    withCredentials: true,
    headers: {
        "API-KEY": "1cdd9f77-c60e-4af5-b194-659e4ebd5d41",
    },
};
const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/",
    ...settings,
});

// api
export const todolistsAPI = {
    getTodolists() {
        return instance.get<TodolistType[]>("todo-lists");
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{ item: TodolistType }>>("todo-lists", {title: title});
    },
    deleteTodolist(id: string) {
        return instance.delete<ResponseType>(`todo-lists/${id}`);
    },
    updateTodolist(args: ChangeTodoTitleArgs) {
        return instance.put<ResponseType>(`todo-lists/${args.id}`, {title: args.title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(payload: RemoveTaskArgs) {
        return instance.delete<ResponseType>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`);
    },
    createTask(payload: CreateTaskArgs) {
        return instance.post<ResponseType<{
            item: TaskType
        }>>(`todo-lists/${payload.todolistId}/tasks`, {title: payload.title});
    },
    updateTask(taskId: string, todolistId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseType<TaskType>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
    },
};


export const ResultCodes = {
    success: 0,
    failed: 1,
    captcha: 10
} as const;

export type ChangeTodoTitleArgs = {
    id: string, title: string
}

export type UpdateTaskArgs = {
    todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType
}

export type RemoveTaskArgs = {
    todolistId: string;
    taskId: string;
}

export type CreateTaskArgs = { todolistId: string, title: string }

export type LoginParamsType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha?: string;
};

export const authAPI = {
    login(data: LoginParamsType) {
        const promise = instance.post<ResponseType<{ userId?: number }>>("auth/login", data);
        return promise;
    },
    logout() {
        const promise = instance.delete<ResponseType<{ userId?: number }>>("auth/login");
        return promise;
    },
    me() {
        const promise = instance.get<ResponseType<{ id: number; email: string; login: string }>>("auth/me");
        return promise;
    },
};

// types
export type TodolistType = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};
export type ResponseType<D = {}> = {
    resultCode: number;
    messages: Array<string>;
    data: D;
};

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4,
}

export type TaskType = {
    description: string;
    title: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};
export type UpdateTaskModelType = {
    title: string;
    description: string;
    status: TaskStatuses;
    priority: TaskPriorities;
    startDate: string;
    deadline: string;
};
type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: TaskType[];
};
