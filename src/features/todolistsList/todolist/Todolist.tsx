import React, {memo, useCallback, useEffect, useMemo} from 'react';
import {AddItemForm} from '../../../components/additemForm/AddItemForm';
import {EditableSpan} from '../../../components/editableSpan/EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import {Delete} from "@mui/icons-material";
import {Button} from "@mui/material";
import {FilterValuesType} from "../todolists-reducer";
import {Task} from "./task/Task";
import {useAppDispatch} from "../../../app/store";
import {getTasksTC, TaskDomainType} from "../tasks-reducer";
import {RequestStatusType} from "../../../app/app-reducer";
import {TaskStatuses} from "../../../api/todolist-api";

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskDomainType>
    //task
    removeTask: (taskId: string, todolistId: string) => void
    updateTask: (todolistId: string, task: TaskDomainType) => void
    //todolist
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    entityStatus: RequestStatusType
}

export const Todolist = memo((props: PropsType) => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        //dispatch(getTasksTC(props.id))
    }, [])


    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id);
    }, [props.addTask, props.id])


    const removeTodolist = () => {
        props.removeTodolist(props.id);
    }
    const changeTodolistTitle = useCallback((title: string) => {
        props.changeTodolistTitle(props.id, title);
    }, [props.changeTodolistTitle, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
    const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
    const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

    let tasks = props.tasks;
    useMemo(() => {
        if (props.filter === "active") {
            tasks = tasks.filter(t => {
                return t.status == TaskStatuses.New
            });
        }
        if (props.filter === "completed") {
            tasks = tasks.filter(t => {
                return t.status == TaskStatuses.Completed
            });
        }
        return tasks
    }, [props.filter, props.tasks])


    return <div>
        <h3><EditableSpan value={props.title} onChange={changeTodolistTitle} disabled={props.entityStatus==='loading'}/>
            <IconButton disabled={props.entityStatus === 'loading'} onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} disabled={props.entityStatus === 'loading'}/>
        <div>
            {
                tasks.map(t => {
                    return <Task key={t.id}
                                 task={t}
                                 todolistId={props.id}
                                 updateTask={props.updateTask}
                                 removeTask={props.removeTask}
                    />
                })
            }
        </div>
        <div>
            <MyButton variant={props.filter === 'all' ? 'outlined' : 'text'} onClick={onAllClickHandler}
                      color={'inherit'} name={'All'}/>
            <MyButton variant={props.filter === 'active' ? 'outlined' : 'text'} onClick={onActiveClickHandler}
                      color={'primary'} name={'Active'}/>
            <MyButton variant={props.filter === 'completed' ? 'outlined' : 'text'} onClick={onCompletedClickHandler}
                      color={'secondary'} name={'Completed'}/>
        </div>
    </div>
})
type ButtonColorType = "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning" | undefined
type ButtonVariantType = "text" | "outlined" | "contained" | undefined
type ButtonPropsType = {
    variant: ButtonVariantType
    onClick: () => void
    color: ButtonColorType
    name: string
}

const MyButton = memo((props: ButtonPropsType) => {
    return (
        <Button variant={props.variant}
                onClick={props.onClick}
                color={props.color}>
            {props.name}
        </Button>
    )
})