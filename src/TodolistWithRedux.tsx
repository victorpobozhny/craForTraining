import React, {ChangeEvent, memo, useCallback} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button, Checkbox} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {TasksStateType} from "./AppWithRedux";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./state/todolists-reducer";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    filter: FilterValuesType
}

export const TodolistWithRedux = memo((props: PropsType)=> {
    console.log('todolist')
    const tasks = useSelector<AppRootStateType, TasksStateType>(store => store.tasks)
    const dispatch = useDispatch()


    //Tasks
    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(props.id, title))
    }, [dispatch])

    function removeTask(id: string, todolistId: string) {
        dispatch(removeTaskAC(todolistId, id))
    }

    function changeTaskStatus(taskId: string, newIsDoneValue: boolean, todolistId: string) {
        dispatch(changeTaskStatusAC(todolistId, taskId, newIsDoneValue))
    }

    function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
        dispatch(changeTaskTitleAC(todolistId, taskId, newValue))
    }

    //Todolists

    function removeTodolist() {
        dispatch(RemoveTodolistAC(props.id))
    }

    function changeTodolistTitle(title: string) {
        dispatch(ChangeTodolistTitleAC(props.id, title))
    }

    function changeFilter(filter: FilterValuesType, todolistID: string) {
        dispatch(ChangeTodolistFilterAC(todolistID, filter))
    }

    let allTodolistTasks = tasks[props.id];
    let tasksForTodolist = allTodolistTasks;

    if (props.filter === "active") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
    }
    if (props.filter === "completed") {
        tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
    }


    const onAllClickHandler = () => changeFilter("all", props.id);
    const onActiveClickHandler = () => changeFilter("active", props.id);
    const onCompletedClickHandler = () => changeFilter("completed", props.id);

    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasksForTodolist.map(t => {


                    const onClickHandler = () => removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const onTitleChangeHandler = (newValue: string) => {
                        changeTaskTitle(t.id, newValue, props.id);
                    }


                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <Checkbox
                            checked={t.isDone}
                            color="primary"
                            onChange={onChangeHandler}
                        />

                        <EditableSpan value={t.title} onChange={onTitleChangeHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete/>
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'inherit'}
            >All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})


