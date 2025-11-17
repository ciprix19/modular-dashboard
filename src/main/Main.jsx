import { useState, useEffect, useRef, use } from 'react'
import Calculator from '../widgets/Calculator';
import Clock from '../widgets/Clock';
import Counter from '../widgets/Counter';

let widgetMap = {
    Calculator: Calculator,
    Clock: Clock,
    Counter: Counter
};

let onScreenWidgetId = 0;

export default function Main() {
    const [renderWidgets, setRenderWidgets] = useState([]);

    useEffect(() => {
        console.log(renderWidgets);
    });

    function handleDblClickSelection(widgetName) {
        const WidgetComponent = widgetMap[widgetName];
        setRenderWidgets([
            ...renderWidgets,
            { id: onScreenWidgetId++, component: WidgetComponent }
        ]);
    }

    function handleDeleteCard(widgetId) {
        setRenderWidgets(renderWidgets.filter((w) => w.id !== widgetId));
    }

    return (
        <main>
            <div className='two-column-layout'>
                <div className='teal-bg widget-list'>
                    <ul>
                       {Object.keys(widgetMap).map(name => (
                        <li key={name} onDoubleClick={() => handleDblClickSelection(name)}>
                            <h2>{name}</h2>
                        </li>
                       ))}
                    </ul>
                </div>
                <div className="teal-bg dashboard-panel">
                    <ul className='widgets-list'>
                        {renderWidgets.map(w => {
                            const W = w.component;
                            return (
                                <li key={w.id} className='card'>
                                    <button className='delete-card' onClick={() => handleDeleteCard(w.id)}>X</button>
                                    <W />
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </main>
    );
}