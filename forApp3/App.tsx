import React, {useState} from 'react';
import './App.css';
import {SuperButton} from "./components/SuperButton";
import {SuperTodolist} from "./components/SuperTodolist";


function App() {
    const onClickHandler = () => {
        console.log('hello')
    }

    const tasks = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]

    return (
        <div>
            <SuperButton onClick={onClickHandler} color={'red'}>Red Button </SuperButton>
            <SuperButton onClick={onClickHandler} color={'secondary'} disabled={true}>Secondary disabled
                Button </SuperButton>
            <SuperButton onClick={onClickHandler} color={'secondary'}>Secondary Button </SuperButton>
            <SuperButton onClick={onClickHandler}>Default Button</SuperButton>
            <SuperTodolist tasks={tasks}>

                <SuperButton onClick={onClickHandler} color={'red'}>Red Button </SuperButton>
                <SuperButton onClick={onClickHandler} color={'secondary'} disabled={true}>Secondary disabled
                    Button </SuperButton>
                <SuperButton onClick={onClickHandler} color={'secondary'}>Secondary Button </SuperButton>
                <SuperButton onClick={onClickHandler}>Default Button</SuperButton>


            </SuperTodolist>


            <SuperTodolist tasks={tasks}>


                <p>asfgdfnhdfbsfrares</p>
                <input type={'text'}/>
            </SuperTodolist>

            <SuperTodolist tasks={tasks}>
                <p>aesrfdgfsfreawdsrfdgtfb</p>
            </SuperTodolist>
        </div>
    );
}


export default App;
