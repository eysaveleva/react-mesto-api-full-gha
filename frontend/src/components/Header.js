import headerLogo from '../images/header.svg';
import { Route, Routes, Link } from 'react-router-dom';

export default function Header({ email, onSignOut }) {
  return (
    <header className="header">
      <img className="header__logo" src={headerLogo} alt="логотип" />
      <Routes>
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__link header__link-signin">Регистрация</Link>} />
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__link header__link-signin">Войти</Link>} />
        <Route path="/" element={
          <>
            <div className="header__links">
              <p className="header__email">{ email }</p>
              <div className="header__link header__link-signout" onClick={ onSignOut }>Выйти</div>
            </div>
          </>
        } />
      </Routes>
    </header>
  )
}