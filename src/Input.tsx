import React, {ChangeEvent, useEffect, useState} from 'react';

type InputProps = {
    name: string
    value: number
    changeRange: (name: string, value: number) => void
    error: boolean
}

const Input = (props: InputProps) => {
//значение в каждом инпуте
    const [value, setValue] = useState(props.value)

    //функция из пропсов вызывается при каждом изменении значение
    useEffect(() => {
        props.changeRange(props.name, value)
    }, [value])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(+e.currentTarget.value)
    }
    return (
        <div className={'inputItem'}>
            <div className={'inputName'}>
                {props.name}
            </div>
            <div className={'inputWrapper'}>
                <input className={`input ${props.error? 'error' : ''}`}
                       type={"number"}
                       value={props.value}
                       onChange={onChangeHandler}/>
            </div>
        </div>
    );
};

export default Input;