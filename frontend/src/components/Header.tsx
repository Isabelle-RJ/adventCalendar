import { WiStars } from 'react-icons/wi'
import { HiMenu } from 'react-icons/hi'
import { NavLink } from 'react-router'
import { useAuth } from '../store/AuthContext'

export default function Header() {
  const { authStatus, logout, user } = useAuth() // destructuration de l'objet useAuth

  return (
    <nav className="bg-primary-x-dark">
      <div className="flex flex-wrap items-center justify-between p-2 me-8 ms-8">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./src/assets/logo-oseznoel.svg"
            className="logo-osez-noel"
            alt="Logo de Osez Noël"
          />
        </NavLink>
        {authStatus === 'authenticated' && user && (
          <div className="pseudo li-nav-header text-secondary-dore">Bonjour {user.name} !</div>
        )}
        <button data-collapse-toggle="navbar-default"
          type="button"
          className="btn-burger inline-flex items-center p-2 justify-center lg:hidden hover:bg-primary-dark"
          aria-controls="navbar-default"
          aria-expanded="false">
          <span className="sr-only">Open main menu</span>
          <HiMenu className="icon-burger" />
        </button>
        <div className="hidden w-full lg:block md:w-auto"
          id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? 'li-nav-header hover:text-secondary-ivory text-primary-blue' : 'li-nav-header hover:text-secondary-ivory'}>
                <WiStars className="icon-stars" />Mes calendriers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'li-nav-header hover:text-secondary-ivory text-primary-blue' : 'li-nav-header hover:text-secondary-ivory'}>
                <WiStars className="icon-stars" />Nous contacter
              </NavLink>
            </li>
            <li>
              {authStatus === 'authenticated'
                ? (
                  <button
                    className='li-nav-header hover:text-secondary-ivory'
                    onClick={logout}>
                    <WiStars className="icon-stars" />Déconnexion
                  </button>
                )
                : (
                  <NavLink
                    to="/login"
                    className={({ isActive }) => isActive ? 'li-nav-header hover:text-secondary-ivory text-primary-blue' : 'li-nav-header hover:text-secondary-ivory'}>
                    <WiStars className="icon-stars" />Connexion
                  </NavLink>
                )}
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}