import React from "react";

type PropsType = {
    tasks: TaskType[]
    children: React.ReactNode
}

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export const SuperTodolist: React.FC<PropsType> = ({tasks, children}) => {

    const arr = tasks.map(el=> {
        return (
            <li key={el.id}>
                <input type={'checkbox'} checked={el.isDone}/>
                <span>
                    {el.id}
                </span>
                <span>
                    {el.title}
                </span>
            </li>
        )
    })

    return (
        <div>
            <ul>
                {arr}
            </ul>
            {children}
            <hr/>
        </div>
    )
}