import React from 'react';
import '../styles/Time.css';

const TimeCounter = ({alarmActive,hours,minutes,seconds})=> {
    
    return <div className={alarmActive ? 'alarmActive' : 'time'}>{`${hours >= 10 ? hours : `0${hours}`}:${minutes >= 10 ? minutes : `0${minutes}`}:${seconds >= 10 ? seconds : `0${seconds}`}`}</div>

}

export default TimeCounter;