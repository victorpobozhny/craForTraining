import React, {useEffect, useMemo, useState} from 'react';
import './App.css';
import Counter from "./Counter";
import Settings from "./Settings";

function App() {
    console.log('rendering')

    const [startValue, setStartValue] = useState(0)
    const [maxValue, setMaxValue] = useState(5)

    // один раз вызыввем useEffect и присваиваем максимальные и минимальные значения взяв их из localstorage если есть
    useEffect(() => {
        let startValueAsString = localStorage.getItem('startValue')
        if (startValueAsString) {
            let newValue = JSON.parse(startValueAsString)
            setStartValue(newValue)
            resetState()
        }
        let MaxValueAsString = localStorage.getItem('maxValue')
        if (MaxValueAsString) {
            let newValue = JSON.parse(MaxValueAsString)
            setMaxValue(newValue)
        }
    }, [])


    //для экрана отображающего текущее значение счетчика
    const [count, setCount] = useState<number>(startValue)
    //для ошибки по всем вводам
    const [commonError, setCommonError] = useState(false)
    //режим настройки нашего счетчика. изначально отключен. когда включается, то на экране надпись и раздизэйбл кнопки set
    const [settingMode, setSettingMode] = useState(true)


    const checkForError = (min: number, max: number) => {
        if(min>=max || min<0 ){
            setCommonError(true)
        } else {
            setCommonError(false)
        }
    }

    //функция изменения наших вводимых значений без добавления в localstorage
    const changeRange = (name: string, value: number) => {
        if (name == 'max value') {
            checkForError(startValue ,value)
            setMaxValue(value)
        } else {
            checkForError(value, maxValue)
            setStartValue(value)
        }

        setSettingMode(true)
    }
    //функция установки наших значений в localstorage, также выключает режим настройки и сбрасывает счетчик на нновое мин значение
    const setRange = () => {
        if(!commonError) {
            localStorage.setItem('maxValue', JSON.stringify(maxValue))
            localStorage.setItem('startValue', JSON.stringify(startValue))
            setSettingMode(false)
            resetState()
        }

    }
    //клик который увеличивает число на экране
    const increaseClick = () => {
        if (count < maxValue) {
            setCount(count + 1)
        }
    }


    //сброс значчения на экране
    const resetState = () => {
        setCount(startValue)
    }

    return (
        <div className="App">
            <Settings
                startValue={startValue}
                maxValue={maxValue}
                setRange={setRange}
                changeRange={changeRange}
                error={commonError}
                settingMode={settingMode}
            />


            <Counter
                count={count}
                maxValue={maxValue}
                resetState={resetState}
                increaseClick={increaseClick}
                startValue={startValue}
                settingMode={settingMode}
                error={commonError}
            />
        </div>
    );
}

export default App;