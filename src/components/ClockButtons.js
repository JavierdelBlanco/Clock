import React,{useState,useEffect} from 'react';
import '../styles/ClockButtons.css';

const ClockButtons = ({mode,alarmActive,alarmRinging,hours,minutes,seconds,handleModoIzquierdo,handleModoDerecho,setHours,setMinutes,setSeconds,setAlarmActive,setAlarmRinging}) => {

    const [startStopwatch,setStartStopwatch] = useState (false);
    const [intervalStopwatch,setIntervalStopwatch] = useState(0);

    const [startTimer,setStartTimer] = useState (false);
    const [intervalTimer,setIntervalTimer] = useState(0);


    const addHour = () => {
        if(mode !== 3 || !alarmActive){
            setHours((h) => h < 23 ? h + 1 : 0 );
        }
        return 0
    }

    const subtrackHour = () => {
        if(mode !== 3 || !alarmActive){
            setHours((h) => h > 0 ? h - 1 : 0 );          
        }
        return 59;
    }

    const addMinute = () => {
        if(mode !== 3 || !alarmActive){
            setMinutes((m) => m < 59 ? m + 1 : addHour());   
        }
        return  0
    }

    const subtrackMinute = () => {
        if(mode !== 3 || !alarmActive){
            setMinutes((m) => m > 0 ? m - 1 : subtrackHour());   
        }
        return 59;
    }    

    const addSecond = () => {
        if(mode !== 3 || !alarmActive){
            setSeconds((s) => s < 59 ? s + 1 : addMinute());  
        }
    }
    
    const subtrackSecond = () => {
        if(mode !== 3 || !alarmActive){
            setSeconds((s) => s > 0 ? s - 1 : subtrackMinute()); 
        }
    }
    
    useEffect(() => {

        const tiktakS = () => {
            const intS = setInterval( () => {
                addSecond();
            }, 1000);
            setIntervalStopwatch(intS);
            
        }


        if(startStopwatch){
            tiktakS()
        }

    },[startStopwatch])

    useEffect(() => {

        const tiktakT = () => {
            const intT = setInterval( () => {
                subtrackSecond();
            }, 1000);
            setIntervalTimer(intT);
            
        }

        if(startTimer){
            tiktakT()
        }

    },[startTimer])
         
    const interval = [intervalStopwatch,intervalTimer]
    const setStart = [setStartStopwatch,setStartTimer]

    
    const start = () => {
        return mode === 0 ? null : (mode === 3 ? setAlarmActive(true) : setStart[mode-1](true));
        
    }
    
    const stop = () => {
        
        const startMode = () => {
            setStart[mode-1](false);
            clearInterval(interval[mode-1]);
        } 
        
        return mode === 0 ? null : (mode === 3 ? setAlarmActive(false) : startMode());
    }

    const restart = () => {
        const restartMode = () => {
            setSeconds(0);
            setMinutes(0);
            setHours(0);
            mode === 3 ? setAlarmActive(false) : setStart[mode-1](false);
        }
        return mode === 0 ? null : restartMode() 
        
    }

    useEffect(() => {
        if(hours === 0 && minutes === 0 && seconds === 0 && mode !== 3){
            clearInterval(interval[mode-1]);
            setStart[mode-1](false);
        }
    },[seconds])

    return (
        <div className='botones'>
             <div className='button-line'>
                <button className='change-button' onClick={handleModoIzquierdo}>⇤</button>
                <button className='change-button' onClick={handleModoDerecho}>⇥</button>
            </div>
            <div className='button-line'>
                <div className='counter'>
                    <button className='add-subtract' onClick={() => hours < 23 ? addHour() : 23}>+</button>
                    <button className='add-subtract' onClick={() => hours > 0 ? subtrackHour() : 0}>-</button> 
                </div>
                <div className='counter'>
                    <button className='add-subtract' onClick={() => minutes < 59 ? addMinute() : 59}>+</button>
                    <button className='add-subtract' onClick={() => minutes > 0 ? subtrackMinute() : 0}>-</button> 
                </div>
                <div className='counter'>
                    <button className='add-subtract' onClick={() => seconds < 59 ? addSecond() : 59}>+</button>
                    <button className='add-subtract' onClick={() => seconds > 0  ? subtrackSecond() : 0}>-</button> 
                </div>
            </div>
            <div className='button-line'>
                <button className='normal-button' onClick={alarmRinging ? null : start}>Start</button>
                <button className='normal-button' onClick={stop}>Stop</button>
                <button className='normal-button' onClick={alarmRinging ? null : restart}>Restart</button>
            </div>
        </div>
    )

}

export default ClockButtons