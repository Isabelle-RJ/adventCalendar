import Dropzone from "../components/Dropzone";

export default function CreateCalendar() {
    return (
        <>
            <div className="w-full mb-4">
                <h2 className="under-title text-secondary-dore text-3xl bg-primary-dark py-4 text-center rounded-md w-full">
                    Créer mon calendrier
                </h2>
            </div>
            <div className="div-grids grid wrap gap-4 sm:grid-cols-1 md:grid-cols-2 justify-center bg-primary-trans-dark w-full p-8 rounded-md">
                <Dropzone />
            </div>
        </>
    )
}