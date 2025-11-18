import { useContext, useState } from "react";

export default function Header({ theme, setTheme }) {

    function changeTheme() {
        setTheme(theme === 'light' ? 'dark' : 'light');
    }

    return (
        <header className='teal-bg'>
            <nav className='navbar' aria-label='Primary-navigation'>
                <ul className="nav-menu">
                    <li><h1>Modular Dashboard</h1></li>
                    <li><button onClick={changeTheme}>Change theme</button></li>
                </ul>
            </nav>
        </header>
    );
}