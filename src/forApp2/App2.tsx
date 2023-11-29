import {ChangeEvent, useEffect, useRef, useState} from "react";
import {GreatButton} from "./GreatButton";
import {GreatInput} from "./GreatInput";

type TskTp = {
    userId: number
    id: number
    title: string
    completed: boolean
}

export const App2 = () => {
    console.log('app rendering')

    const [state, setState] = useState<TskTp[]>([])
    console.log(state)
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setState(json))
    }, [])
    const fooFunc = () => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setState(json))
    }

    const todoList = state.map(el => {
        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
            el.completed = e.currentTarget.checked
            setState([...state])
        }
        const deleteClick = (id: number) => {
            setState(state.filter(el => el.id !== id))
        }
        return <li key={el.id}>
            <input type={'checkbox'}
                   checked={el.completed}
                   onChange={changeStatus}/>
            {el.id} - {el.title}
            <button onClick={() => deleteClick(el.id)}> delete</button>
        </li>
    })
    const showMeTodolist = () => {
        fooFunc()
    }
    const hideTodolist = () => {
        setState([])
    }

    const title = useRef<HTMLInputElement | null>(null);
    const addTask = () => {
        if (title.current) {
            setState([{
                userId: state.length + 1,
                id: state.length + 1,
                title: title.current?.value,
                completed: false
            }, ...state])
            title.current!.value = ''
        }
    }


    return (
        <div>
            <div>
                <GreatButton name={'Show'} onClick={showMeTodolist}/>
                <GreatButton name={'Hide'} onClick={hideTodolist}/>
                <GreatInput title={title}/>
                <GreatButton name={'Add task'} onClick={addTask}/>
            </div>
            <div>
                <ul>{todoList}</ul>
            </div>
        </div>
    )
}