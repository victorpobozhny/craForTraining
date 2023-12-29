import React, {FC} from 'react';
import {Screen} from "./Screen";
import {Button} from "./Button";

type CounterProps = {
    count: number
    maxValue: number
    startValue: number
    increaseClick: () => void
    resetState: () => void
    settingMode: boolean
    settingModeSetter: () => void
    error: boolean
}

const Counter: FC<CounterProps> = ({
                                       count,
                                       maxValue,
                                       startValue,
                                       increaseClick,
                                       resetState,
                                       settingMode,
                                       settingModeSetter,
                                       error
                                   }) => {
    console.log('counter')
    return (
        <div className={'counter'}>
            <Screen count={count} maxState={maxValue} settingMode={settingMode} error={error}/>
            <div className={'btnWrapper'}>
                <Button name={'inc'} onClick={increaseClick} disabled={count == maxValue || settingMode || error}/>
                <Button name={'reset'} onClick={resetState} disabled={count == startValue || settingMode || error}/>
                <Button name={'set'} onClick={settingModeSetter} disabled={false}/>
            </div>
        </div>
    );
};

export default Counter;