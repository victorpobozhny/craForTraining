import {ChangeEvent, FC, KeyboardEvent, useState} from "react";
import s from './Todolist.module.css'
import Button from "./Button";

type TodolistPropsType = {
    tasks: Array<TaskType>
    deleteTask: (id: string) => void
    addTask: (title: string) => void
    updateTask: (id: string) => void
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterType = 'all' | 'active' | 'completed'

function Todolist(props: TodolistPropsType) {

    //filter tasks
    const [filter, setFilter] = useState<FilterType>('all')
    const filteredTasks: Array<TaskType> = filter == 'active' ?
        props.tasks.filter(el => !el.isDone) :
        filter == 'completed' ?
            props.tasks.filter(el => el.isDone) : props.tasks

    const tasksArr = []
    tasksArr.push(filteredTasks.map(e => {
        const deleteTask = () => {
            props.deleteTask(e.id)
        }

        const updateTask = () => {
            props.updateTask(e.id)
        }

        return (
            <li>
                <input type={"checkbox"} checked={e.isDone} onChange={updateTask}/>{e.title}
                <Button name={'delete'} onClickHandler={deleteTask}/>
            </li>
        )
    }))
    const allTasksFilter = () => setFilter('all')
    const activeTasksFilter = () => setFilter('active')
    const completedTasksFilter = () => setFilter('completed')

    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    const [error, setError] = useState(false)
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (title.trim()) {
            event.code == 'Enter' && addTask()
            setError(false)
        } else setError(true)

    }

    return (
        <div className={s.todoList}>
            <input value={title} onChange={onChangeHandler} onKeyDown={onKeyDownHandler}/>
            <Button name={'+'} onClickHandler={addTask} disabled={!title.trim()}/>
            {error && <div style={{color: 'red'}}>Type a message please</div>}
            <p className={s.todoListTitle}>What to do:</p>
            <ul>
                {tasksArr}
            </ul>
            <Button name={'All'} onClickHandler={allTasksFilter} className={filter=="all"? 'btn-active' : 'btn'}/>
            <Button name={'Active'} onClickHandler={activeTasksFilter} className={filter=="active"? 'btn-active' : 'btn'}/>
            <Button name={'Completed'} onClickHandler={completedTasksFilter} className={filter=="completed"? 'btn-active' : 'btn'}/>
        </div>
    )
}

export default Todolist;