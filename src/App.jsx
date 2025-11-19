import { useState, useContext } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './footer/Footer'
import Header from './header/Header'
import Main from './main/Main'
import { ThemeContext } from './utils/ThemeContext'

function App() {
    const [theme, setTheme] = useState('dark');

    function mouse_down(event) {
        event.preventDefault();
        console.log(event);
    }

    return (
        <div className='wrapper' data-theme={theme} onMouseDown={mouse_down}>
            <Header theme={theme} setTheme={setTheme}></Header>
            <Main />
            <Footer />
        </div>
    )
}

export default App
