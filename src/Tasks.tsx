import {StateType} from "./App";
import * as React from "react";
import {ChangeEvent} from "react";

type TasksType = {
    state: StateType[]
    onClick: (id: number) => void
    update: (id: number, isDone: boolean) => void
}


export const Tasks: React.FC<TasksType> = ({state, onClick, update}) => {

    const listItems = state.map(el => {
        const deleteItem = () => {
            onClick(el.id)
        }
        const updateItem = (e: ChangeEvent<HTMLInputElement>) => {
            update(el.id, e.currentTarget.checked)
        }
        return (
            <li key={el.id}>
                {el.id}
                <input type={"checkbox"} checked={el.completed} onChange={updateItem}/>
                {el.title}
                <button onClick={deleteItem}>✖️</button>
            </li>
        )
    })

    return (
        <div>
            <ul>
                {listItems}
            </ul>
        </div>
    )
}