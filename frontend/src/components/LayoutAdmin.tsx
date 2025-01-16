import { Outlet } from 'react-router-dom'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Image from '../assets/background17.png'
import { NavLink } from 'react-router'
import { PiCalendarDotsThin, PiCalendarPlusThin, PiIdentificationCardThin } from 'react-icons/pi'
import BottomNavigation from './BottomNavigation.tsx'

export default function LayoutAdmin() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="div-main-login w-full flex-grow flex flex-col bg-cover bg-center"
        style={{ backgroundImage: `url(${Image})` }}>
        <div className='w-full p-8 flex flex-col items-center'>
          <div className="div-my-account w-full flex flex-col flex-wrap rounded-md px-4 py-6 m-4 bg-primary-trans-dark">
            <div className="title-dashboard">
              <h1 className="text-xl text-secondary-ivory">Mon tableau de bord</h1>
            </div>
            <div className="links-dashboard flex flex-row p-6">
              <ul className="flex md:flex-row">
                <li>
                  <NavLink
                    to="/create-calendar"
                    className={({ isActive }) => isActive ? 'li-dashboard p-2 m-4 border rounded hover:border-secondary-dore border-secondary-dore hover:text-secondary-argent text-secondary-dore' : 'li-dashboard p-2 m-4 border border-transparent hover:border hover:border-secondary-dore hover:rounded text-secondary-argent hover:text-secondary-argent'}>
                    <PiCalendarPlusThin
                      className="icons-dashboard text-secondary-dore" /> Créer un calendrier
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) => isActive ? 'li-dashboard p-2 m-4 border rounded hover:border-secondary-dore border-secondary-dore hover:text-secondary-argent text-secondary-dore' : 'li-dashboard p-2 m-4 border border-transparent hover:border hover:border-secondary-dore hover:rounded text-secondary-argent hover:text-secondary-argent'}>
                    <PiCalendarDotsThin
                      className="icons-dashboard text-secondary-dore" /> Tous mes calendriers
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profil"
                    className={({ isActive }) => isActive ? 'li-dashboard p-2 m-4 border rounded hover:border-secondary-dore border-secondary-dore hover:text-secondary-argent text-secondary-dore' : 'li-dashboard p-2 m-4 border border-transparent hover:border hover:border-secondary-dore hover:rounded text-secondary-argent hover:text-secondary-argent'}>
                    <PiIdentificationCardThin
                      className="icons-dashboard text-secondary-dore" /> Voir mon profil
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
          <Outlet />
        </div>
        <BottomNavigation />
      </main>
      <Footer />
    </div>
  )
}