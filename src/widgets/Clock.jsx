import '../styles/Clock.css'
import { useState, useRef, useEffect } from 'react';

// to do (2 modes) - stopwatch and set timer
export default function Clock() {
    const [selectedOption, setSelectedOption] = useState('stopwatch');
    const [startTime, setStartTime] = useState(null);
    const [now, setNow] = useState(null);
    const intervalRef = useRef(null);
    const [timer, setTimer] = useState({m: 30, s: '00'});

    function handleOption(e) {
        secondsPassed = 0;
        clearInterval(intervalRef.current);
        setSelectedOption(e.target.value);
    }

    function handleTimerChange() {

    }

    function handleStart() {
        if (selectedOption === 'stopwatch') {
            setStartTime(Date.now());
            setNow(Date.now());
            clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                setNow(Date.now());
            }, 10);
        } else if (selectedOption === 'timer') {

        }
    }

    function handleStop() {
        clearInterval(intervalRef.current);
    }

    let secondsPassed = 0;
    if (secondsPassed != null && now != null) {
        secondsPassed = (now - startTime) / 1000;
    }

    return (
        <div>
            <select value={selectedOption} onChange={e => handleOption(e)}>
                <option value="stopwatch">Stopwatch</option>
                <option value="timer">Timer</option>
            </select>
            {selectedOption === 'stopwatch' ?
                (
                    <h2 className='card'>
                        {secondsPassed.toFixed(3)}
                    </h2>
                ) : (
                    <div className='clock-div'>
                        {/* bad i think */}
                        <h2 contentEditable='true' onChange={handleTimerChange}>{timer.m}</h2>
                        <h2>:</h2>
                        <h2 contentEditable='true' onChange={handleTimerChange}>{timer.s}</h2>
                    </div>
                )
            }
            <div className='buttons'>
                <button onClick={handleStart}>Start!</button>
                <button onClick={handleStop}>Stop!</button>
            </div>
        </div>
    );
}