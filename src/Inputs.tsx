import React from 'react';
import Input from "./Input";

type InputsProps = {
    maxValue: number
    startValue: number
    changeRange: (name: string, value: number)=>void
    error: boolean
}

const Inputs = (props: InputsProps) => {


    return (
        <div className={'inputsWrapper'}>
            <Input name={'max value'} value={props.maxValue} changeRange={props.changeRange} error={props.error}/>
            <Input name={'start value'} value={props.startValue} changeRange={props.changeRange} error={props.error}/>
        </div>
    );
};

export default Inputs;