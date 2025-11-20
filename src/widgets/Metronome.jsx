import { useState, useRef, useEffect } from 'react'
import '../styles/Metronome.css'
import soundfile from '../audio/metronome.mp3'

let metronomeSound = new Audio(soundfile);

export default function Metronome() {
    const [bpm, setBpm] = useState(100);
    const [isPlaying, setIsPlaying] = useState(false);
    const intervalRef = useRef(null);

    let bpmToMs = 60000 / bpm;

    useEffect(() => {
        if (isPlaying) {
            console.log('playing sound...')
            intervalRef.current = setInterval(() => {
                metronomeSound.currentTime = 0;
                metronomeSound.play();
            }, bpmToMs);
        } else {
            console.log('stopping sound...');
        }
        return () => clearInterval(intervalRef.current);
    }, [isPlaying, bpm]);

    function handleOnSliderChange(e) {
        // e.stopPropagation();
        setBpm(parseInt(e.target.value));
    }

    function handleIsPlayingButton(e) {
        setIsPlaying(!isPlaying);
    }

    return (
        <div>
            <div className='info'>
                <h3>{bpm} bpm</h3>
                <button className='play-button' onMouseDown={e =>
                    e.stopPropagation()
                } onClick={e => handleIsPlayingButton(e)}>{isPlaying === true ? '\u23F8' : '\u23F5'}</button>
            </div>
            <div className='slider-container' onMouseDown={e => e.stopPropagation()}>
                <button className='minus-button' onClick={e => {
                    if (bpm > 40) {
                        setBpm(bpm - 1);
                    }
                }}>-</button>
                <input type='range' min='40' max='220' value={bpm} className='slider' onChange={e => handleOnSliderChange(e)}></input>
                <button className='plus-button' onClick={e => {
                    if (bpm < 220) {
                        setBpm(bpm + 1);
                    }
                }}>＋</button>
            </div>
        </div>
    );
}