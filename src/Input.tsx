import {ChangeEvent, useState} from "react";
import * as React from "react";
type InputType = {
    title: string
    setTitle: (title: string)=>void
}

export const Input: React.FC <InputType> = ({title, setTitle}) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        <input value={title} onChange={onChangeHandler} type={"text"}/>
    )
}