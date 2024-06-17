import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { Link } from 'react-router-dom';
import '../styles/Header.css'

export function Header() {

    return (
        <header>
            <Link to="/" className='header-link'><h1>NCNews</h1></Link>
            <div className="header-icons">
                <Link className='header-link' to="/users"><AccountCircleIcon className="header-icon" style={{fontSize: 40}}></AccountCircleIcon></Link>
                <BookmarkIcon className="header-icon" style={{fontSize: 40}}></BookmarkIcon>
            </div>
        </header>
    )
}