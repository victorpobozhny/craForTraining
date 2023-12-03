import {Input} from "./Input";
import {Button} from "./Button";
import {useEffect, useState} from "react";
import {Tasks} from "./Tasks";

export type StateType = {
    userId: number
    id: number
    title: string
    completed: boolean
}

type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [state, setState] = useState<StateType[]>([])
    const [title, setTitle] = useState('')
    useEffect(() => {
        console.log('fetching')
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => setState(json))
    }, [])

    const addItem = () => {
        setState([{id: state.length + 1, userId: state.length + 1, title: title, completed: false}, ...state])
        setTitle('')
    }

    const deleteItem = (ID: number) => {
        setState(state.filter(el => el.id !== ID))
    }

    const updateItem = (ID: number, isDone: boolean) => {
        setState(state.map(el => el.id == ID ? {...el, completed: isDone} : el))
    }

    const [filter, setFilter] = useState<FilterType>('all')
    const setAllFilter = () => {
        setFilter('all')
    }
    const setActiveFilter = () => {
        setFilter('active')
    }
    const setCompletedFilter = () => {
        setFilter('completed')
    }

    let filteredList = filter == 'active'?
        state.filter(el=>!el.completed) :
        filter == 'completed'?
            state.filter(el=>el.completed) :
            state


    return (
        <div>
            <Button name={'All'} onClick={setAllFilter}/>
            <Button name={'Active'} onClick={setActiveFilter}/>
            <Button name={'Completed'} onClick={setCompletedFilter}/>
            <div>
                <Input title={title} setTitle={setTitle}/>
                <Button name={'Add Item'} onClick={addItem}/>
            </div>
            <Tasks state={filteredList} onClick={deleteItem} update={updateItem} />
        </div>
    )
}


export default App;
