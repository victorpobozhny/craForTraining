import React, {ChangeEvent, memo} from 'react';
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../../components/editableSpan/EditableSpan";
import IconButton from "@mui/material/IconButton/IconButton";
import {Delete} from "@mui/icons-material";
import {TaskStatuses} from "../../../../api/todolist-api";
import {TaskDomainType} from "../../tasks-reducer";


type TaskPropsType = {
    task: TaskDomainType
    todolistId: string
    removeTask: (taskId: string, todolistId: string) => void
    updateTask: (todolistId: string, task: TaskDomainType) => void
}

export const Task = memo((props: TaskPropsType) => {
    console.log('task')
    const disabled = props.task.entityStatus==='loading'

    const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => {
        //--------------------проверить на корректность отправляемого значения----------------------------------
        let newIsDoneValue = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New;
        props.updateTask(props.todolistId, {...props.task, status: newIsDoneValue});
    }
    const changeTaskTitle = (title: string) => {
        props.updateTask(props.todolistId, {...props.task, title: title})
    }
    const removeTask = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    return (
        <div className={props.task.status == TaskStatuses.Completed ? "is-done" : ""}>

            <Checkbox
                color={"primary"}
                checked={props.task.status == TaskStatuses.Completed}
                onChange={changeTaskStatus}
                disabled={disabled}
            />
            <EditableSpan value={props.task.title} onChange={changeTaskTitle} disabled={disabled}/>
            <IconButton onClick={removeTask} disabled={disabled}>
                <Delete/>
            </IconButton>
        </div>
    );
})

