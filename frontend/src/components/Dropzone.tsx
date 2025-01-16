import { CgAddR } from 'react-icons/cg'

interface DropzoneProps {
    onFileChange: (file: File) => void
}

export default function Dropzone() {
    return (
        <div className="flex flex-col items-center justify-center h-[10rem] w-[15rem] sm:h-[12rem] sm:w-[18rem] md:h-[15rem] md:w-[20rem] lg:h-[18rem] lg:w-full border-2 border-dashed border-secondary-dore text-secondary-dore min-w-[32rem]">
            <h2>Télécharger votre image</h2>
            <CgAddR className='icon-dropzone color-secondary-dore w-8 h-8' />
        </div>
    )
}