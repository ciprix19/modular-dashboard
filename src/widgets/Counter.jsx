import '../styles/Counter.css'
import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0);
    const [countValue, setCountValue] = useState(1);

    function handleTyping(value) {
        if (Number(value) == NaN) {
            console.log('da');
        } else {
            setCountValue(Number(value));
        }
    }

    return (
        <div className="three-row-grid">
            <div className='choose-value'>
                <h3>Count by:</h3>
                <input type='number' defaultValue={countValue} onChange={e => handleTyping(e.target.value)}></input>
            </div>
            <label className='result-label'>{count}</label>
            <button onClick={() => {
                setCount(count + countValue);
            }}>Count!</button>
        </div>
    );
}