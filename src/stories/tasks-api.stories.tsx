import {useState} from "react";
import {tasksAPI, TaskType} from "../api/tasks-api";

export default {
    title: 'TasksAPI'
}

export const GetTasks = () => {
    const [todolistId, setTodolistId] = useState<string>('')
    const [state, setState] = useState<TaskType[]>([])
    const onClickHandler = () => {
        tasksAPI.getTasks(todolistId)
            .then(resolve => setState(resolve.data.items))
    }
    return (
        <div>
            <input type={"text"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Get Tasks From Todolist</button>
            {state == null
                ? <div>no results</div>
                : state.map(el => {
                    return <div>
                        <div>title: {el.title}</div>
                        <div>status: {el.status}</div>
                        <div>id: {el.id}</div>
                        <div>todolistId: {el.todoListId}</div>
                        <br/>
                    </div>
                })}
        </div>
    )
}

export const CreateTask = () => {
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskTitle, setTaskTitle] = useState<string>('')
    const [state, setState] = useState<any>(null)
    const payload = {
        title: taskTitle
    }
    const onClickHandler = () => {
        tasksAPI.createTask(todolistId, payload)
            .then(resolve => {
                setState(resolve.data.messages)
                console.log(resolve)
            })
            .catch(err=>console.log(err))
        setTaskTitle('')
    }
    return (
        <div>
            <div>
                <span>type todolistID:</span>
                <input type={"text"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>

            </div>
            <div>
                <span>type Task Title: </span>
                <input type={"text"} value={taskTitle} onChange={(e) => setTaskTitle(e.currentTarget.value)}/>

            </div>
            <div>
                <button onClick={onClickHandler}>Create Task In Todolist</button>
            </div>
            {state == null
                ? <div>no results</div>
                : <div>
                    <span>Task added: {state.title}</span>
                </div>}
        </div>
    )
}

export const DeleteTask = () => {
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [state, setState] = useState<any>(null)
    const onClickHandler = () => {
        tasksAPI.deleteTask(todolistId, taskId)
            .then(resolve => {
                console.log(resolve)
                setState(resolve.data.messages)
            })
            .catch(err => {
                setState(err.message)
            })
        setTaskId('')
    }

    return (
        <div>
            <div>
                <span>TodolistId: </span>
                <input type={'text'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <span>TaskId: </span>
                <input type={'text'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            </div>
            <button onClick={onClickHandler}>DeleteTask</button>
            <div>{state}</div>
        </div>
    )
}

export const UpdateTask = () => {
    const [todolistId, setTodolistId] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>('')
    const onClickHandler = () => {
        const payload = {
            title: title
        }
        tasksAPI.updateTask(todolistId, taskId, payload)
            .then(resolve => {
                console.log(resolve)
                setState(resolve.data.messages)
            })
            .catch(err => {
                setState(err.message)
            })
        setTitle('')
    }

    return (
        <div>
            <div>
                <span>TodolistId: </span>
                <input type={'text'} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <span>TaskId: </span>
                <input type={'text'} value={taskId} onChange={(e) => setTaskId(e.currentTarget.value)}/>
            </div>
            <div>
                <span>Task Title: </span>
                <input type={'text'} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            </div>
            <button onClick={onClickHandler}>Update Task title</button>
            <div>{state}</div>
        </div>
    )
}