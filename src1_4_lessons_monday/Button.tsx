import {FilterType} from "./Todolist";

type ButtonPropsType = {
    name: string
    onClickHandler: ()=>void
    disabled?: boolean
    className?: string
}


function Button (props: ButtonPropsType) {

    const onClickHandler = () => {
        props.onClickHandler()
    }


    return (
        <button onClick={onClickHandler} disabled={props.disabled} className={props.className}>{props.name}</button>
    )
}

export default Button;