import React, {useEffect} from 'react'
import './main.scss'


const Timer = () => {

    const [second, setSecond] = React.useState(9);
    const [miliSecond, setmiliSecond] = React.useState(9);
    const [mSecond, setmSecond] = React.useState(9);

    useEffect(() => {
        let timerMiliSecond;
        if (miliSecond > 0) {
            timerMiliSecond = setTimeout(() => setmiliSecond(miliSecond - 1), 10);
        } else if (miliSecond === 0) {
            setmiliSecond(9)
        }
        return () => {
            if (timerMiliSecond) {
                clearTimeout(timerMiliSecond);
            }
        };
    }, [miliSecond]);
    useEffect(() => {
        let timerMSecond;
        if (mSecond > 0) {
            timerMSecond = setTimeout(() => setmSecond(mSecond - 1), 100);
        } else if (mSecond === 0) {
            setmSecond(9)
        }
        return () => {
            if (timerMSecond) {
                clearTimeout(timerMSecond);
            }
        };
    }, [mSecond]);
    useEffect(() => {
        let timerSecond;
        if (second > 0) {
            timerSecond = setTimeout(() => setSecond(second - 1), 1000);
        }
        return () => {
            if (timerSecond) {
                clearTimeout(timerSecond);
            }
        };
    }, [second]);
    return (
        <div className="timer-item">
            <h1 className="gold">{second + ":" + mSecond + "" + miliSecond}</h1>
        </div>
    )
}

export default Timer
