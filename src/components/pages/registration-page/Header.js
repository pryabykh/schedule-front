import { MAIN_HEADER, REGISTRATION_HEADER } from '../../../const/interface';
import MainIcon from '../../shared/MainIcon/MainIcon';

function Header() {
    return (
        <header className='text-center mt-5 mb-5'>
            <h1><MainIcon />{MAIN_HEADER}</h1>
            <h2>{REGISTRATION_HEADER}</h2>
        </header>
    );
}

export default Header;