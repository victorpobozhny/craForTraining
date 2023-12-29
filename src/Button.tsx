import React from "react";

type ButtonType = {
    disabled: boolean
    name: string
    onClick: () => void
}

export const Button: React.FC<ButtonType> = ({disabled, name, onClick}) => {

    const onClickHandler = () => {
        onClick()
    }
    return(
        <button className={'btn'} disabled={disabled} onClick={onClickHandler}>{name}</button>
    )
}