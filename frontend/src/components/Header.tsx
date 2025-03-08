import { WiStars } from 'react-icons/wi'
import { NavLink } from 'react-router'
import { useAuth } from '../store/AuthContext'

export default function Header() {
  const { authStatus, logout, user } = useAuth() // destructuration de l'objet useAuth

  return (
    <nav className="bg-primary-x-dark">
      <div className="flex items-center justify-between p-2 me-8 ms-8">
        <NavLink
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/../src/assets/logo-oseznoel.svg"
               className="logo-osez-noel"
               alt="Logo de Osez Noël"
          />
        </NavLink>
        {authStatus === 'authenticated' && user && (
          <div className="text-3xl font-['Mochiy_Pop_One'] text-secondary-dore">Bonjour {user.name} !</div>
        )}
        <div className="hidden w-full lg:block md:w-auto"
             id="navbar-default">
          <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
            <li>
              <NavLink
                to="/dashboard"
                className={({ isActive }) => isActive ? 'li-nav-header hover:text-secondary-ivory text-primary-blue' : 'li-nav-header hover:text-secondary-ivory'}>
                <WiStars className="icon-stars"/>Mes calendriers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) => isActive ? 'li-nav-header hover:text-secondary-ivory text-primary-blue' : 'li-nav-header hover:text-secondary-ivory'}>
                <WiStars className="icon-stars"/>Nous contacter
              </NavLink>
            </li>
            <li>
              {authStatus === 'authenticated'
               ? (
                 <button
                   className="li-nav-header hover:text-secondary-ivory"
                   onClick={logout}>
                   <WiStars className="icon-stars"/>Déconnexion
                 </button>
               )
               : (
                 <NavLink
                   to="/login"
                   className={({ isActive }) => isActive ? 'li-nav-header hover:text-secondary-ivory text-primary-blue' : 'li-nav-header hover:text-secondary-ivory'}>
                   <WiStars className="icon-stars"/>Connexion
                 </NavLink>
               )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}