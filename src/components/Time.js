import React, {useState,useEffect} from 'react';
import '../styles/Time.css';

const Time = ({alarmActive})=> {

    const [time,setTime] = useState (new Date().toLocaleTimeString());

    useEffect(() => {
       setInterval(() => setTime(new Date().toLocaleTimeString()),1000)
    },[time]); 

    return <div className={alarmActive ? 'alarmActive' : 'time'}>{time}</div>

}

export default Time;