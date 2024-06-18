import '../styles/NavBar.css'
import { NavLink } from 'react-router-dom'


export function NavBar() {

    return (
        <>
            <nav>
                <ul>
                    <NavLink to='/coding' className='nav-link'><li>Coding</li></NavLink>
                    <NavLink to='/cooking' className='nav-link'><li>Cooking</li></NavLink>
                    <NavLink to='/football' className='nav-link'><li>Football</li></NavLink>
                </ul>
            </nav>
        </>
    )
}