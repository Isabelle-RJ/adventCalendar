export default function Contact() {
    return (
        <div className="m-8 flex flex-col items-center text-secondary-dore p-4">
            <h1 className="text-2xl md:text-4xl lg:text-5xl">Nous contacter</h1>
            <div className="container w-[40%] flex justify-center ">
                <form className="m-6 w-full p-4 bg-primary-x-dark rounded-md">
                    <div className="mb-6">
                        <label
                            htmlFor="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore placeholder-secondary-light-dore rounded-lg block w-full ps-2 p-2.5 focus:bg-primary-trans-blue selected:bg-primary-trans-blue focus:outline-none focus:ring-1 focus:ring-secondary-dore focus:border-secondary-dore"
                            placeholder="contact@oseznoel.fr"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="subject"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        </label>
                        <input
                            type="text"
                            id="subject"
                            className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore placeholder-secondary-light-dore rounded-lg block w-full ps-2 p-2.5 focus:bg-primary-trans-blue selected:bg-primary-trans-blue focus:outline-none focus:ring-1 focus:ring-secondary-dore focus:border-secondary-dore"
                            placeholder="Sujet de votre message"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="message"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                        </label>
                        <textarea
                            id="message"
                            className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore placeholder-secondary-light-dore rounded-lg block w-full ps-2 p-2.5 focus:bg-primary-trans-blue selected:bg-primary-trans-blue focus:outline-none focus:ring-1 focus:ring-secondary-dore focus:border-secondary-dore"
                            placeholder="Votre message...">
                        </textarea>
                    </div>
                    <button
                        type="submit"
                        className="btn-form-submit w-full text-secondary-dore hover:bg-secondary-dore hover:text-primary-x-dark hover:font-bold py-2 rounded font-semi-bold">
                        Envoyer
                    </button>
                </form>
            </div>
        </div>
    )
}