import {RefObject} from "react";

type GreatInputPropsType = {
    title: RefObject<HTMLInputElement>
}
export const GreatInput = (props: GreatInputPropsType) => {


    return (
        <div>
            <input ref={props.title} type="text" />

        </div>
    )
}