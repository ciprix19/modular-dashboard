import { useState } from 'react'

export default function Stopwatch() {
    return (
        <h2 className='card'>
            {secondsPassed.toFixed(3)}
        </h2>
    );
}