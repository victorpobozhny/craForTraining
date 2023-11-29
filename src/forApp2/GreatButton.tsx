type GreatButtonPropsType = {
    name: string
    onClick: ()=>void
}


export const GreatButton = (props: GreatButtonPropsType) => {
    const onClickHandler = () => {
        props.onClick()
    }

    return (
        <div>
            <button onClick={onClickHandler}>{props.name}</button>
        </div>
    )
}