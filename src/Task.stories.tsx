import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import React, {ChangeEvent, useState} from "react";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {Task} from "./Task";
import {EditableSpan} from "./EditableSpan";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Task> = {
    title: 'Example/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes
    argTypes: {
        removeTask: {
            description: "Item should be removed",
            action: 'clicked "remove" button'
        },
        changeTaskTitle: {
            description: "Item's title should be changed",
            action: 'Item\'s title has been changed'
        },
        changeTaskStatus: {
            description: "Item's status should be changed",
            action: 'Item\'s status has been changed'
        }
    },
    args: {
        todolistId: 'todolistId_2355232',
        task: {id: '1', isDone: false, title: 'Task Example 1'}
    }
};

export default meta;
type Story = StoryObj<typeof Task>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Example_1: Story = {};
export const Example_2: Story = {
    args: {
        task: {id: '2', isDone: true, title: 'Task Example 2'}
    }
};
const LiveTask = () => {
const [task, setTask] = useState({id: '1', isDone: false, title: 'Live Task Example'})
    const removeTaskHandler = action('Task should remove')

    const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTask({...task, isDone: !task.isDone})
    }
    const onTitleChangeHandler = (newValue: string) => {
        setTask({...task, title: newValue})
    }


    return (
        <div key={task.id} className={task.isDone ? "is-done" : ""}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeTaskStatusHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={removeTaskHandler}>
                <Delete/>
            </IconButton>
        </div>
    );
}
export const LiveExample: Story = {
    render: () => <LiveTask/>
}

