import {useState} from "react";
import {tasksAPI} from "../api/tasks-api";

export default {
    title: 'TasksAPI'
}

export const GetTasks = () => {
    const [todolistId, setTodolistId] = useState('')
    const [state, setState] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const onClickHandler = () => {
        tasksAPI.getTasks(todolistId)
            .then(res => setState(res))
            .catch(res => setError(res))
    }

    return (
        <div>
            <div>
                <input type={"text"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
                <button onClick={onClickHandler}>Get Tasks of Todolist</button>
                <div>number of tasks: {state == null ? "we don't know yet" : state.data.items.length}</div>
            </div>
            <div>
                {state == null && error == null
                    ? 'Waiting'
                    //@ts-ignore
                    : state.data.items.map(el => {
                        return (
                            <div>
                                <br/>
                                <div>title: {el.title}</div>
                                <div>id: {el.id}</div>
                                <br/>
                            </div>
                        )
                    })
                }
                <div>{error == null ? '' : error.message}</div>
            </div>
        </div>
    )
}

export const CreateTask = () => {
    const [todolistId, setTodolistId] = useState('')
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const onClickHandler = () => {
        const payload = {
            title: title
        }
        tasksAPI.createTask(todolistId, payload)
            .then(res => setState(res))
            .catch(res => console.log(res))
    }

    return (
        <div>
            <div>
                <span>type TodolistId: </span>
                <input type={"text"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <span>type Task Title: </span>
                <input type={"text"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={onClickHandler}>Add Task for Todolist</button>
            </div>
        </div>
    )
}


export const UpdateTask = () => {
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const onClickHandler = () => {
        const payload = {
            title: title
        }
        tasksAPI.updateTask(todolistId, taskId, payload)
            .then(res => setState(res))
            .catch(res => console.log(res))
    }

    return (
        <div>
            <div>
                <span>type TodolistId: </span>
                <input type={"text"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <span>type TaskId: </span>
                <input type={"text"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            </div>
            <div>
                <span>type Task New Title: </span>
                <input type={"text"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={onClickHandler}>Update Task in Todolist</button>
            </div>
        </div>
    )
}
export const DeleteTask = () => {
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [state, setState] = useState<any>(null)
    const onClickHandler = () => {

        tasksAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res))
            .catch(res => console.log(res))
    }

    return (
        <div>
            <div>
                <span>type TodolistId: </span>
                <input type={"text"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <span>type TaskId: </span>
                <input type={"text"} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            </div>
            <div>
                <button onClick={onClickHandler}>Delete Task from Todolist</button>
            </div>
        </div>
    )
}
