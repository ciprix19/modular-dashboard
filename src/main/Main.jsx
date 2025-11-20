import { useState, useEffect, useRef, use } from 'react'
import { ReactDOM } from 'react-dom'
import Calculator from '../widgets/Calculator';
import Clock from '../widgets/Clock';
import Counter from '../widgets/Counter';
import Notepad from '../widgets/Notepad';
import CatGenerator from '../widgets/CatGenerator';
import TaskList from '../widgets/TaskList';
import Metronome from '../widgets/Metronome';

let widgetMap = {
    Calculator: Calculator,
    Clock: Clock,
    Counter: Counter,
    Notepad: Notepad,
    'Cat generator': CatGenerator,
    TaskList: TaskList,
    Metronome: Metronome
};

let onScreenWidgetId = 0;

export default function Main() {
    const [renderWidgets, setRenderWidgets] = useState([]);
    const [isDragging, setIsDragging] = useState(null);
    const [isSelected, setIsSelected] = useState(null);
    const initialPosition = useRef({ x: 0, y: 0});

    useEffect(() => {
        // console.log(renderWidgets);
    });

    function handleDblClickSelection(widgetName) {
        const WidgetComponent = widgetMap[widgetName];
        setRenderWidgets([
            ...renderWidgets,
            { id: onScreenWidgetId++, component: WidgetComponent, name: widgetName, positionX: 0, positionY: 0 }
        ]);
    }

    function handleDeleteCard(e, widgetId) {
        e.stopPropagation();
        console.log(widgetId + ' deleted');
        setRenderWidgets(renderWidgets.filter((w) => w.id !== widgetId));
    }

    function handleMouseDownDrag(e, widgetId) {
        setIsDragging(widgetId);
        console.log(widgetId);
        const widget = renderWidgets.find(w => w.id === widgetId);
        if (!widget) return;
        initialPosition.current = {
            x: e.clientX - widget.positionX,
            y: e.clientY - widget.positionY
        }
        console.log(widgetId + ' selected with coordinates: ' + initialPosition.current.x + ' ' + initialPosition.current.y);
    }

    function handleMouseMoveDrag(e, widgetId) {
        if (isDragging === widgetId) {
            let valueX = e.clientX - initialPosition.current.x;
            let valueY = e.clientY - initialPosition.current.y;
            console.log(valueX, valueY);
            console.log(isDragging);
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

    function handleMouseUpDrag(e, widgetId) {
        setIsDragging(null);
    }

    function handleWidgetListClick(e, widgetId) {
        setIsSelected(widgetId);
    }

    return (
        <main >
            <div className='two-column-layout'>
                <div className='widget-menu'>
                    <ul>
                        <li><h2>Available widgets:</h2></li>
                       {Object.keys(widgetMap).map(name => (
                        <li key={name} onDoubleClick={() => handleDblClickSelection(name)}>
                            <h2>{name}</h2>
                        </li>
                       ))}
                    </ul>
                </div>
                <div className="dashboard-panel">
                    <div className='dashboard-widgets-list'>
                        <ul>
                            <h2>Displayed items:</h2>
                            {renderWidgets.map(w => {
                                return (
                                    <li key={w.id}><button onClick={e => handleWidgetListClick(e, w.id)}>{w.name}</button></li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className='dashboard-widgets-displayed'>
                        {renderWidgets.map(w => {
                            const W = w.component;
                            return (
                                <div style={{
                                    transform: `translate(${w.positionX}px, ${w.positionY}px)`
                                }} id={w.id} key={w.id} className={isSelected === w.id ? 'card highlight-card' : 'card'} onMouseDown={e => handleMouseDownDrag(e, w.id)}
                                onMouseUp={e => handleMouseUpDrag(e)} onMouseMove={e => handleMouseMoveDrag(e, w.id)}>
                                    <button className='card-delete'
                                    onMouseDown={e => e.stopPropagation()}
                                    onClick={e => handleDeleteCard(e, w.id)}>X</button>
                                    <W />
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </main>
    );
}