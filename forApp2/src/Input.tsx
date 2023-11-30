import {ChangeEvent, RefObject, useRef} from "react";

// type InputType = {
//     title: string
//     setTitle: (title: string) => void
// }
type InputType = {
    title: RefObject< HTMLInputElement>
}

export const Input = (props: InputType) => {
    // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     props.setTitle(e.currentTarget.value)
    // }

    return (
        <div>
            <input type={'text'} ref={props.title}/>
            {/*<input type={'text'} value={props.title} onChange={onChangeHandler}/>*/}
        </div>
    )
}