import './App.css'
import { Link } from 'react-router'
import { PiFlowerLotusLight } from "react-icons/pi"

function App() {
  return (
    <>
      <div>
        <h1 className="title-home text-white text-center bg-primary-dark p-4">
          Il était une fois... <br />
          ... Noël chez Michel !
        </h1>
      </div>
      <h2 className="text-center text-white text-3xl py-6">
        Bienvenue !
      </h2>
      <div className="div-home flex flex-col items-center text-white text-sm mx-2 my-4 lg:text-3xl lg:mx-[12rem] lg:my-8 lg:px-24 lg:py-6 bg-primary-trans-dark rounded-md">
        <p>Vous souhaitez envoyer un Calendrier de l'Avent personnalisé ?</p>
        <p> C’est gratuit et facile à utiliser ! Suivez ces instructions :</p>
        <ul  className='lg:ms-20'>
          <li className='flex flex-row'> <PiFlowerLotusLight className='me-4' />Créez votre compte ou connectez-vous.</li>
          <li className='flex flex-row'> <PiFlowerLotusLight className='me-4' />Choisissez votre fond.</li>
          <li className='flex flex-row'> <PiFlowerLotusLight className='me-4' />Remplissez les 25 cases avec un message.</li>
          <li className='flex flex-row'> <PiFlowerLotusLight className='me-4' />Et voilà !</li>
        </ul>

        <p> Partagez-le à vos proches et invitez vos amis à faire de même ♥</p>
      </div>
      <div className="div-home-submit text-center my-8 p-2">
        <Link
          to="/selected-theme"
          type="submit"
          className="btn-home-submit lg:text-2xl lg:hover:text-2xl underline text-center hover:text-secondary-dore hover:bg-primary-trans-dark hover:border border border-secondary-dore bg-secondary-dore text-primary-x-dark p-2 rounded font-semi-bold">
          Créer votre calendrier de l'avent
        </Link>
      </div>
    </>
  )
}

export default App
