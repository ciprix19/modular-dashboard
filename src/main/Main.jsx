import { useState, useEffect, useRef, use } from 'react'
import { ReactDOM } from 'react-dom'
import Calculator from '../widgets/Calculator';
import Clock from '../widgets/Clock';
import Counter from '../widgets/Counter';
import Notepad from '../widgets/Notepad';
import CatGenerator from '../widgets/CatGenerator';
import TaskList from '../widgets/TaskList';
import WheaterPanel from '../widgets/WeatherPanel';

let widgetMap = {
    Calculator: Calculator,
    Clock: Clock,
    Counter: Counter,
    Notepad: Notepad,
    'Cat generator': CatGenerator,
    TaskList: TaskList,
    'Wheater Panel': WheaterPanel
};

let onScreenWidgetId = 0;

export default function Main() {
    const [renderWidgets, setRenderWidgets] = useState([]);
    const [isDragging, setIsDragging] = useState(null);
    const [isSelected, setIsSelected] = useState(null);

    useEffect(() => {
        // console.log(renderWidgets);
    });

    function handleDblClickSelection(widgetName) {
        const WidgetComponent = widgetMap[widgetName];
        setRenderWidgets([
            ...renderWidgets,
            { id: onScreenWidgetId++, component: WidgetComponent, positionX: 0, positionY: 0 }
        ]);
    }

    function handleDeleteCard(e, widgetId) {
        e.stopPropagation();
        setRenderWidgets(renderWidgets.filter((w) => w.id !== widgetId));
    }

    function handleClick(e, widgetId) {
        setIsDragging(!isDragging);
        setIsSelected(widgetId);
    }

    function handleMouseMove(e, widgetId) {
        if (isDragging === true && isSelected === widgetId) {
            let el = document.getElementById(widgetId);
            // todo: (el.offsetWidth / 2) is not really correct, should find new formula
            let valueX = e.clientX - el.offsetLeft - (el.offsetWidth / 2);
            let valueY = e.clientY - el.offsetTop - (el.offsetHeight / 2);
            console.log(valueX, valueY);
            setRenderWidgets(renderWidgets.map(w => {
                if (w.id === widgetId) {
                    return {
                        ...w,
                        positionX: valueX,
                        positionY: valueY
                    }
                } else {
                    return w;
                }
            }));
        }
    }

    return (
        <main >
            <div className='two-column-layout'>
                <div className='widget-menu'>
                    <ul>
                       {Object.keys(widgetMap).map(name => (
                        <li key={name} onDoubleClick={() => handleDblClickSelection(name)}>
                            <h2>{name}</h2>
                        </li>
                       ))}
                    </ul>
                </div>
                <div className="dashboard-panel">
                    <ul className='widgets-panel'>
                        {renderWidgets.map(w => {
                            const W = w.component;
                            return (
                                <li style={{
                                    transform: `translate(${w.positionX}px, ${w.positionY}px)`
                                }} id={w.id} key={w.id} className='card'
                                    onClick={e => handleClick(e, w.id)}
                                    onMouseMove={e => handleMouseMove(e, w.id)}
                                    >
                                    <button className='delete-card' onClick={(e) => handleDeleteCard(e, w.id)}>X</button>
                                    <W />
                                </li>
                            );
                        })}
                    </ul>
                    {/* <div className='rectangle' onMouseDown={e => handleRectMouseDown(e), onMouseMove={e => handleRectMouseMove}}>
                    </div> */}
                </div>
            </div>
        </main>
    );
}