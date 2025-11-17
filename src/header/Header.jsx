export default function Header() {
    return (
        <header className='teal-bg'>
            <nav className='navbar' aria-label='Primary-navigation'>
                <ul className="nav-menu">
                    <li><h1>Modular Dashboard</h1></li>
                    <li><button>Change theme</button></li>
                </ul>
            </nav>
        </header>
    );
}