export default function Footer() {
    return (


        <footer className="bg-primary-x-dark">
            <div className="w-full mx-auto p-4 md:py-8">
                <ul className="sm:flex sm:items-center sm:justify-evenly flex flex-wrap items-center mb-6 text-gray-500 sm:mb-0">
                    <li className="nav-footer mr-2">
                        <a href="#"
                           className="hover:text-secondary-ivory">Mentions légales</a>
                    </li>
                    <li className="nav-footer mr-2">
                        <a href="#"
                           className="hover:text-secondary-ivory">Conditions d'utilisation</a>
                    </li>
                    <li className="nav-footer mr-2">
                        <a href="#"
                           className="hover:text-secondary-ivory">Contact</a>
                    </li>
                </ul>
                <hr className="my-6 border-primary-dark"/>
                <span className="block text-secondary-argent sm:text-center ">
                    © 2024-2025.
                    <a href="#"
                       className="hover:text-secondary-ivory"> Osez Noël</a>. Tous droits réservés. Par Isabelle Radermecker</span>
            </div>
        </footer>


    )
}