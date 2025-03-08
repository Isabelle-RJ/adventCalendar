import { Outlet } from 'react-router-dom'
import Header from './Header.tsx'
import Footer from './Footer.tsx'
import Image from '../assets/background17.png'
import BottomNavigation from './BottomNavigation.tsx'

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <main className="div-main-login w-full flex-grow flex flex-col bg-cover bg-center"
            style={{ backgroundImage: `url(${Image})` }}>
        <Outlet/>
      </main>
      <BottomNavigation />
      <Footer/>
    </div>
  )
}