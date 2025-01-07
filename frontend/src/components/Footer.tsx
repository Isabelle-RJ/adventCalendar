import { Link } from "react-router"

export default function Footer() {
    return (
        <footer className="hidden lg:block bg-primary-x-dark">
            <div className="w-full mx-auto p-4 md:py-4">
                <ul className="sm:flex sm:items-center sm:justify-evenly flex flex-wrap items-center mb-6 text-gray-500 sm:mb-0">
                    <li className="nav-footer mr-2">
                        <Link
                            to="/legale-mentions"
                            className="hover:text-secondary-ivory">Mentions légales</Link>
                    </li>
                    <li className="nav-footer mr-2">
                        <Link
                            to="/cgu"
                            className="hover:text-secondary-ivory">Conditions générales d'utilisation</Link>
                    </li>
                </ul>
                <hr className="my-6 border-primary-dark" />
                <span className="block text-secondary-argent sm:text-center ">
                    © 2024-2025.
                    <Link
                        to="/"
                        className="hover:text-secondary-ivory"
                    >
                        Osez Noël
                    </Link>. Tous droits réservés. Par Isabelle Radermecker
                </span>
            </div>
        </footer>
    )
}
