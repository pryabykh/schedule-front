import { FaTwitter } from 'react-icons/fa';
import './Styles.css';

function Header() {
    return (
        <header className='text-center mt-5 mb-5'>
            <h1><FaTwitter />Помощник директора</h1>
            <h2>Войти в личный кабинет</h2>
        </header>
    );
}

export default Header;