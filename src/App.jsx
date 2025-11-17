import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Footer from './footer/Footer'
import Header from './header/Header'
import Main from './main/Main'

function App() {
    const [count, setCount] = useState(0)

    return (
        <div className='wrapper'>
            <Header />
            <Main />
            <Footer />
        </div>
    )
}

export default App
