import React from "react";

type ScreenType = {
    count: number
    maxState: number
    settingMode: boolean
    error: boolean
}

export const Screen: React.FC<ScreenType> = ({count, maxState, settingMode, error}) => {

    //если включен режим настройки, то добавляем его, иначе проверяем ена максимальный счет
    const commonClassName = `screen ${error ? 'redError' : settingMode ? 'setMode' : count == maxState ? 'red' : ''}`

    //то что оттображается на экране
    const screenInfo = error ? 'Incorrect value' : settingMode ? 'Enter values and press "Set"' : count

    return (
        <div className={commonClassName}>
            {screenInfo}
        </div>
    )
}