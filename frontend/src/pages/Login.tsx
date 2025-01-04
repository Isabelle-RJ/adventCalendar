import {IoLockClosed} from "react-icons/io5";
import {AiOutlineUser} from "react-icons/ai";
import React from "react";
import Image from '../assets/background17.png';
import {Link} from "react-router";

const Login: React.FC = () => {
    return (
        <>
            {/* Contenu principal */}
            <main className="div-main-login w-full flex-grow flex flex-col items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: `url(${Image})` }}>
                <h1 className="title-login text-5xl font-semi-bold text-secondary-dore mb-8">Connexion</h1>
                <div className="div-form-login md:w-[40%]">
                    <form className="bg-primary-x-dark p-8 rounded-lg w-full">
                        <label htmlFor="email-address-icon">
                        </label>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 end-2 flex items-center ps-3.5 pointer-events-none">
                                <AiOutlineUser className="w-6 h-6 text-secondary-dore"/>
                            </div>
                            <input
                                type="text"
                                id="email-address-icon"
                                className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore placeholder-secondary-light-dore rounded-lg block w-full ps-2 p-2.5 focus:bg-primary-trans-blue selected:bg-primary-trans-blue focus:outline-none focus:ring-1 focus:ring-secondary-dore focus:border-secondary-dore"
                                placeholder="exemple@email.com"/>
                        </div>
                        <div className="relative mb-4">
                            <div className="absolute inset-y-0 end-2 flex items-center ps-3.5 pointer-events-none">
                                <IoLockClosed className="w-6 h-6 text-secondary-dore"/>
                            </div>
                            <input type="password"
                                   id="email-address-icon"
                                   className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore placeholder-secondary-light-dore text-lg rounded-lg block w-full ps-2 p-2.5 focus:outline-none focus:ring-1 focus:ring-secondary-dore focus:border-secondary-dore"
                                   placeholder="*****"/>
                        </div>
                        <Link
                            to="/password-lost"
                            className="text-form-log text-secondary-dore hover:text-secondary-ivory underline block mb-4">
                            Mot de passe oublié ?
                        </Link>

                        <Link
                            to="/dashbord"
                            type="submit"
                            className="btn-form-submit w-full text-secondary-dore hover:bg-secondary-dore hover:text-primary-x-dark hover:font-bold py-2 rounded font-semi-bold">
                            Se connecter
                        </Link>
                    </form>
                </div>
                <Link
                    to="/register"
                    className="btn-form-log mt-4 bg-secondary-dore font-bold underline hover:bg-primary-x-dark hover:text-secondary-dore text-primary-x-dark py-2 px-4 rounded font-semi-bold shadow-lg"
                >
                    Créer votre compte
                </Link>

            </main>
        </>
    );
};

export default Login;

