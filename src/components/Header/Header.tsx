import './Header.style.css'
import Logo from '../../assets/logo.png';

function Header() {
    return ( 
        <>
            <div className="header-container">
                <img src={Logo} alt="Logo" className='Logo' width={"228px"} />
            </div>
        </>
     );
}

export default Header;