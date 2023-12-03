import * as React from "react";

type ButtonType = {
    name: string
    onClick: ()=>void
}


export const Button: React.FC <ButtonType> = ({name, onClick}) => {
    return (
        <button onClick={onClick}>
            {name}
        </button>
    )
}