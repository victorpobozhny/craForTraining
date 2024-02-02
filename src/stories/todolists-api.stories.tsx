import React, {useState} from 'react'
import {todolistAPI, TodolistType} from "../todolist-api";

export default {
    title: 'API'
}
export const GetTodolists = () => {
    const [state, setState] = useState<TodolistType[] | null>(null)
    const onClickHandler = () => {
        todolistAPI.getTodolists()
            .then(res => setState(res.data))
    }

    return (
        <div>
            <button onClick={onClickHandler}>Get Todolists</button>
            <div>
                <div>Number of Todolists: {state == null ? 0 : state.length}</div>
                <br/>
                {state == null
                    ? 'Click the button to get Todolists'
                    : state.map(el => {
                        return (
                            <div>
                                <div>todolistId: {el.id}</div>
                                <div>title: {el.title}</div>
                                <div>addedDate: {el.addedDate.toString()}</div>
                                <div>order: {el.order}</div>
                                <br/>
                            </div>)
                    })}
            </div>
        </div>)
}

export const CreateTodolists = () => {
    const [state, setState] = useState<TodolistType | null>(null)
    const [title, setTitle] = useState('')
    const onClickHandler = () => {
        const payload = {
            title: title
        }
        todolistAPI.createTodolist(payload)
            .then(res => setState(res.data.data.item))
            .catch(err => console.log(err))
        setTitle('')
    }

    return (
        <div>
            <input type={"text"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Create Todolist</button>
            <div>
                {state == null
                    ? <div>Click the button to create Todolist<br/></div>
                    : <div>
                        <div>todolistId: {state.id}</div>
                        <div>title: {state.title}</div>
                        <div>addedDate: {state.addedDate.toString()}</div>
                        <div>order: {state.order}</div>
                        <br/>
                    </div>
                }
            </div>
        </div>)
}

export const DeleteTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [error, setError] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const onClickHandler = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
            .catch(err => setError(err))
        setTodolistId('')
    }

    return (
        <div>
            <input type={"text"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            <button onClick={onClickHandler}>Delete Todolist</button>
            <div>
                {state == null
                    ? <div>Click the button to delete Todolist<br/></div>
                    : <div>
                        {error == null
                            ? "it's ok"
                            : error
                        }
                    </div>
                }
            </div>
        </div>)
}

export const UpdateTodolists = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState('')
    const [todolistId, setTodolistId] = useState('')
    const onClickHandler = () => {
        const payload = {
            title: title
        }
        todolistAPI.updateTodolist(todolistId, payload)
            .then(res => setState(res))
            .catch(err => console.log(err))
        setTitle('')
    }

    return (
        <div>
            <div>
                <span>TodolistId</span>
                <input type={"text"} value={todolistId} onChange={(e) => setTodolistId(e.currentTarget.value)}/>
            </div>
            <div>
                <span>New Title For Todolist</span>
                <input type={"text"} value={title} onChange={(e) => setTitle(e.currentTarget.value)}/>
                <button onClick={onClickHandler}>Create Todolist</button>
            </div>
            <div>{JSON.stringify(state)}</div>

        </div>)
}
