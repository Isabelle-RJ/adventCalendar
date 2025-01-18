import { ChangeEvent, useRef, useState } from 'react'
import { CgAddR } from 'react-icons/cg'
import { useAuth } from '../store/AuthContext'
import FilePreview from './FilePreview'

interface DropzoneProps {
    onFileChange: (file: File) => void
}

export default function Dropzone() {
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const { token } = useAuth()

    const dropzoneRef = useRef<HTMLDivElement>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)

    function clearFiles() {
        setError('')
        setSuccess('')
        setFiles([])
    }

    async function uploadFilesLaravelLocalStorage(file: File) {
        const formData = new FormData()
        formData.append('file', file)

        try {
            setLoading(true)
            const response = await fetch('http://localhost:9001/api/themes/uploads', {
                method: 'POST',
                headers: {
                    contentType: 'multipart/form-data',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`
                },
                credentials: 'include',
                body: formData
            })
            setSuccess('File uploaded successfully')
        } catch (error) {
            setError('Error uploading file')
        } finally {
            setLoading(false)
        }
    }

    async function handleClickUpload() {
        setLoading(true)

        const uploadFilesPromised = files.map(async (file) => (
            await uploadFilesLaravelLocalStorage(file)
        ))

        try {
            await Promise.all(uploadFilesPromised)
            setSuccess('Files uploaded successfully')
        } catch (error) {
            setError('Error uploading files')
        } finally {
            setLoading(false)
        }
    }

    function handleDragover(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        dropzoneRef.current?.classList.remove('border-2')
        dropzoneRef.current?.classList.add('border-4')
    }

    function handleDragleave(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault()
        dropzoneRef.current?.classList.remove('border-4')
        dropzoneRef.current?.classList.add('border-2')
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        setError('')
        setSuccess('')

        e.preventDefault()

        dropzoneRef.current?.classList.remove('border-4')
        dropzoneRef.current?.classList.add('border-2')

        const newFiles = e.dataTransfer.files

        for (let i = 0; i < newFiles.length; i++) {
            const exists = files.find(file => file.name === newFiles[i].name)

            if (exists) {
                setError('Le fichier existe déjà')
                return
            }

            if (newFiles[i].size > 2 * 1024 * 1024) {
                setError('Le fichier dépasse 2MB')
                return
            }

            setFiles(prevFiles => [...prevFiles, newFiles[i]])
        }
    }

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        console.log('toto')
        setError('')
        setSuccess('')

        const newFiles = e.target.files as FileList

        for (let i = 0; i < newFiles.length; i++) {
            const exists = files.find(file => file.name === newFiles[i].name)

            if (exists) {
                setError('Le fichier existe déjà')
                return
            }

            if (newFiles[i].size > 2 * 1024 * 1024) {
                setError('Le fichier dépasse 2MB')
                return
            }

            setFiles(prevFiles => [...prevFiles, newFiles[i]])
        }
    }
    console.log(files)

    function handleSelectFiles() {
        fileInputRef.current?.click()
    }

    function handleRemoveFile(file: File) {
        const newFiles = [...files]
        const fileIndex = newFiles.indexOf(file)
        newFiles.splice(fileIndex, 1)
        setFiles(newFiles)
    }


    return (
        <div className="flex flex-col items-center justify-center h-[10rem] w-[15rem] sm:h-[12rem] sm:w-[18rem] md:h-[15rem] md:w-[20rem] lg:h-[18rem] lg:w-full border-2 border-dashed border-secondary-dore text-secondary-dore min-w-[32rem]"
            onClick={() => { console.log('clicked') }}
            ref={dropzoneRef}
            onDragOver={handleDragover}
            onDragLeave={handleDragleave}
            onDrop={handleDrop}
        >
            {error && <p className="text-red-500">{error}</p>}
            <h2 className="text-[1.5rem] font-semibold text-secondary-ivory">Télécharger votre image</h2>
            <input
                type="file"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
            />
            <CgAddR
                className='icon-dropzone color-secondary-dore w-12 h-12'
                onClick={handleSelectFiles}
            />
            <button
                className="btn-primary-light"
                onClick={handleClickUpload}
            >
                Importer les images
            </button>
            <div className="flex flex-col justify-center items-center justify-center">
                {files.map((file: File) => (
                    <FilePreview
                        key={file.name}
                        file={file}
                        handleRemoveFile={() => handleRemoveFile(file)}
                    />
                ))}
            </div>
        </div >
    )
}