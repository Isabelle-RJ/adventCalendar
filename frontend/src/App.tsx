import './App.css'
import { Link } from 'react-router'

function App() {
  return (
    <>
      <div>
        <h1 className="title-home text-white text-center bg-primary-dark py-6">
          Il était une fois... <br/>
          ... Noël chez Michel !
        </h1>
      </div>
      <h2 className="text-center text-white text-3xl py-8">
        Bienvenue visiteur !
      </h2>
      <div className="div-home text-white text-xl mx-10 my-8 px-20 py-8 bg-primary-trans-dark rounded-md">
        <p>C’est gratuit et facile à utiliser !</p>
          <ul>
            <li>• Choisissez votre fond</li>
            <li>• Remplissez les case de votre calendrier avec 24 petits cadeaux, et un spécial pour le 25 décembre.
              (Images, gif, ou messages personnalisés)</li>
            <li>• Partagez-le à vos proches</li>
          </ul>
          <p>Invitez vos amis à faire de même ♥ !</p>
      </div>
      <div className="div-home-submit text-center my-8 p-2">
        <Link
          to="/login"
          type="submit"
          className="btn-home-submit text-2xl hover:text-2xl underline text-center hover:text-secondary-dore hover:bg-primary-trans-dark hover:border border border-secondary-dore bg-secondary-dore text-primary-x-dark p-2 rounded font-semi-bold">
          Créer votre calendrier de l'avent
        </Link>
      </div>
    </>
  )
}

export default App
