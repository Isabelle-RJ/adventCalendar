import { WiStars } from "react-icons/wi";
import { HiMenu } from "react-icons/hi";
export default function Header() {
    return (
        <nav className="bg-primary-x-dark">
            <div className="flex flex-wrap items-center justify-between p-2 me-8 ms-8">
                <a href="#"
                   className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./src/assets/logo-oseznoel.svg"
                         className="logo-osez-noel"
                         alt="Logo de Osez Noël"
                    />
                </a>
                <button data-collapse-toggle="navbar-default"
                        type="button"
                        className="btn-burger inline-flex items-center p-2 justify-center md:hidden hover:bg-primary-dark"
                        aria-controls="navbar-default"
                        aria-expanded="false">
                    <span className="sr-only">Open main menu</span>
                    <HiMenu className="icon-burger"/>
                </button>
                <div className="hidden w-full md:block md:w-auto"
                     id="navbar-default">
                    <ul className="flex flex-col p-4 md:p-0 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0">
                        <li>
                            <a href="#"
                               className="li-nav-header hover:text-secondary-ivory"
                               aria-current="page"><WiStars className="icon-stars"/>Calendriers</a>
                        </li>
                        <li>
                            <a href="#"
                               className="li-nav-header hover:text-secondary-ivory"><WiStars className="icon-stars"/>Nous contacter</a>
                        </li>
                        <li>
                            <a href="#"
                               className="li-nav-header hover:text-secondary-ivory"><WiStars className="icon-stars" />Connexion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

    )
}