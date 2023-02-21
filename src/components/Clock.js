import React, {useState} from 'react';
import Time from './Time'
import ClockButtons from './ClockButtons';
import TimeCounter from './TimeCounter';
import '../styles/Clock.css';
import audio from '../alarm.mp3'

const Clock = ()=> {
    const[mode,setMode] = useState({id:0, name:'Clock'});
    
    const [hoursStopwatch,setHoursStopwatch] = useState (0);
    const [minutesStopwatch,setMinutesStopwatch] = useState (0);
    const [secondsStopwatch,setSecondsStopwatch] = useState (0);

    const [hoursTimer,setHoursTimer] = useState (0);
    const [minutesTimer,setMinutesTimer] = useState (0);
    const [secondsTimer,setSecondsTimer] = useState (0);

    const [hoursAlarm,setHoursAlarm] = useState (0);
    const [minutesAlarm,setMinutesAlarm] = useState (0);
    const [secondsAlarm,setSecondsAlarm] = useState (0);

    const [alarmActive,setAlarmActive]= useState(false);
    const [alarmRinging,setAlarmRinging]= useState(false);

    const modes = [ {id:0, name:'Clock'},{id:1, name:'Stopwatch'},{id:2, name:'Timer'},{id:3, name:'Alarm'}];

    const hours = [hoursStopwatch,hoursTimer,hoursAlarm];
    const minutes = [minutesStopwatch,minutesTimer,minutesAlarm];
    const seconds = [secondsStopwatch,secondsTimer,secondsAlarm];

    const setHours = [setHoursStopwatch,setHoursTimer,setHoursAlarm];
    const setMinutes = [setMinutesStopwatch,setMinutesTimer,setMinutesAlarm];
    const setSeconds = [setSecondsStopwatch,setSecondsTimer,setSecondsAlarm];

    const handleModoDerecho = () => mode.id === modes[modes.length - 1].id ? setMode(modes[0]) : setMode(modes[mode.id + 1]);
    const handleModoIzquierdo = () => mode.id === modes[0].id ? setMode(modes[modes.length - 1]) : setMode(modes[mode.id - 1]);

    setInterval(() => {
        if(alarmActive && (new Date().toLocaleTimeString() === (hoursAlarm >= 10 ? hoursAlarm.toString() : '0' + hoursAlarm.toString())  + ':' + (minutesAlarm >= 10 ? minutesAlarm.toString() : '0' + minutesAlarm.toString()) + ':' + (secondsAlarm >= 10 ? secondsAlarm.toString() : '0' + secondsAlarm.toString()))){
            setAlarmRinging(true);
            setMode({id:3, name:'Alarm'});
            const alarm = new Audio(audio).play();
            alarm.volume = 0.1;
            setTimeout(() => setAlarmActive(false), 23000);      
        }
    },1000)
    
    return (
        <div className="container">
            <div className='marco'>
                <div className='display'>
                {mode.id === modes[0].id ? <Time alarmActive={alarmActive}/> :  <TimeCounter alarmActive={alarmActive} hours={hours[mode.id-1]} minutes={minutes[mode.id-1]} seconds={seconds[mode.id-1]}/>}
                    <div className={ alarmActive ? 'modoAlarmActive' : 'mode'}>- {mode.name} -</div>
                </div>
            </div>
            <ClockButtons 
                mode={mode.id}
                handleModoIzquierdo={handleModoIzquierdo} 
                handleModoDerecho={handleModoDerecho}
                hours={mode === 0 ? null : hours[mode.id-1]} 
                minutes={mode === 0 ? null : minutes[mode.id-1]} 
                seconds={mode === 0 ? null : seconds[mode.id-1]}
                alarmActive={alarmActive}
                alarmRinging={alarmRinging}  
                setHours={mode === 0 ? null : setHours[mode.id-1]}
                setMinutes={mode === 0 ? null : setMinutes[mode.id-1]}
                setSeconds={mode === 0 ? null : setSeconds[mode.id-1]}
                setAlarmActive={setAlarmActive}
                setAlarmRinging={setAlarmRinging}
            />
        </div>
    )
    

}

export default Clock;