import { Link } from 'react-router'
import { useAuth } from '../store/AuthContext.tsx'
import { FaPencilAlt } from 'react-icons/fa'

export default function Profile() {
  const { user } = useAuth()
  return (
    <div className="flex flex-col rounded-lg justify-center items-center bg-primary-trans-dark w-full h-full p-4">
      <form className="flex flex-col w-full">
        <div className="flex flex-col gap-16 w-full lg:flex-row">
          <div className="w-full mb-4">
            <h2 className="mb-2">Information du compte</h2>
            <label className="text-secondary-ivory text-sm">Nom d'utilisateur</label>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 end-2 flex items-center ps-3.5 pointer-events-none">
                <FaPencilAlt className="w-6 h-6 text-secondary-dore" />
              </div>
              <input
                type="text"
                name="username"
                className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore placeholder-secondary-light-dore text-lg rounded-lg block w-full ps-2 p-2.5 focus:outline-none focus:ring-1 focus:ring-secondary-dore focus:border-secondary-dore"
                placeholder="Nom d'utilisateur"
                defaultValue={user?.name}
              />
            </div>
            <label className="text-secondary-ivory text-sm">Email</label>
            <div className="relative mb-4">
              <div className="absolute inset-y-0 end-2 flex items-center ps-3.5 pointer-events-none">
                <FaPencilAlt className="w-6 h-6 text-secondary-dore" />
              </div>
              <input
                type="text"
                name="email"
                className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore placeholder-secondary-light-dore text-lg rounded-lg block w-full ps-2 p-2.5 focus:outline-none focus:ring-1 focus:ring-secondary-dore focus:border-secondary-dore"
                placeholder="Email"
                defaultValue={user?.email}
              />
            </div>
            <p className="text-secondary-ivory text-sm mb-2">Mot de passe</p>
            <Link to={'/change-password'} className="text-secondary-ivory text-sm underline">Changer de mot de
              passe</Link>
          </div>
          <div className="w-full lg:1/2 mb-4">
            <h2 className="mb-2">Statistiques</h2>
            <label className="text-sm text-secondary-ivory">Nombre de calendrier(s) créés: </label>
            <input
              readOnly
              defaultValue={user?.profile_data.nb_calendars}
              className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore text-lg rounded-lg block w-full ps-2 p-2.5 mb-4"
            />
            <label className="text-sm text-secondary-ivory">Nombre de partage(s): </label>
            <input
              readOnly
              defaultValue={user?.profile_data.nb_shared_calendars}
              className="text-form-log bg-primary-trans-blue border border-none text-secondary-dore text-lg rounded-lg block w-full ps-2 p-2.5"
            />
          </div>
        </div>
        <button
          className="bg-secondary-dore w-full lg:w-1/5 text-primary-dark p-2 rounded-md"
        >
          Modifier
        </button>
      </form>
    </div>
  )
}