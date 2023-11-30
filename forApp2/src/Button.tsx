type ButtonType = {
    name: string
    onClick: () => void
}


export const Button = (props: ButtonType) => {
    const onClickHandler = () => {
        props.onClick()
    }

    return (
        <div>
            <button onClick={onClickHandler}>{props.name}</button>
        </div>
    )
}