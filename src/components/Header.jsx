import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import '../styles/Header.css'

export function Header() {

    return (
        <header>
            <h1>NCNews</h1>
            <div className="header-icons">
                <AccountCircleIcon className="header-icon"></AccountCircleIcon>
                <BookmarkIcon className="header-icon"></BookmarkIcon>
            </div>
        </header>
    )
}