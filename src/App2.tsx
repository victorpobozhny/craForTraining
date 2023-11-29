import React, {useState} from 'react';
import './App.css';
import {v1} from "uuid";
import Todolist, {TaskType} from "./Todolist";


function App() {
///BLL
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ])

//Delete task
    function deleteTask(taskId: string) {
        setTasks(tasks.filter(t => t.id !== taskId))
    }
//Add task
    function addTask (title: string) {
        setTasks([{id: v1(), title: title, isDone: false},...tasks])
    }




    return (
        <div>
            <Todolist
                tasks={tasks}
                deleteTask={deleteTask}
                addTask={addTask}
            />
        </div>
    )
}


export default App;