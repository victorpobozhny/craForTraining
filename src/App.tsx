import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {Input} from "./Input";
import {Button} from "./Button";
import {v1} from "uuid";

type TodosType = {
    userId: number
    id: number
    title: string
    completed: boolean
}

function App() {

    const [todos, setTodos] = useState<TodosType[]>([])

    useEffect(() => {
        fetchFoo()
    }, []);

    const fetchFoo = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setTodos(json))
    }
    const onClickHandler = () => {
        fetchFoo()
    }

    const onClickHandlerHide = () => {
        setTodos([])
    }

    // const [title, setTitle] = useState('')

    const title = useRef<HTMLInputElement | null>(null);
    const addTask = () => {
        if (title.current) {
            setTodos([{
                userId: todos.length + 1,
                id: todos.length + 1,
                title: title.current?.value,
                completed: false
            }, ...todos])
            title.current!.value = ''
        }


    }
    // const addTask = () => {
    //     setTodos([{userId: todos.length+1, id: todos.length+1, title: title, completed: false}, ...todos])
    //     setTitle('')
    // }
    return (
        <div className="App">
            <div>
                <Button name={'Show'} onClick={onClickHandler}/>
                <Button name={'Hide'} onClick={onClickHandlerHide}/>
                <Input title={title}/>
                {/*<Input title={title} setTitle={setTitle}/>*/}
                <Button name={'Add task'} onClick={addTask}/>
            </div>
            <div>
                <ul>
                    {todos.map((el) => {
                        return (
                            <li>
                                <input type="checkbox" checked={el.completed}/>
                                <span>{el.id} - </span>
                                <span>{el.title}</span>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    );
}

export default App;