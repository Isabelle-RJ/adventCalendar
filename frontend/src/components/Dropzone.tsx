import { ChangeEvent, useRef, useState } from 'react'
import { CgAddR } from 'react-icons/cg'
import { useAuth } from '../store/AuthContext'
import FilePreview from './FilePreview'
import Modal from './Modal'

interface DropzoneProps {
    isMultiple?: boolean
    withModal?: boolean
    onFetch?: () => void
}

export default function Dropzone({ isMultiple = true, withModal = false, onFetch }: DropzoneProps) {
    const [files, setFiles] = useState<File[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>('')
    const [success, setSuccess] = useState<string>('')
    const { token } = useAuth()
    const [open, setOpen] = useState<boolean>(false)
    const disabled = loading || files.length === 0 || !!error

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
                    Authorization: `Bearer ${token}`,
                },
                credentials: 'include',
                body: formData,
            })

            if (!response.ok) {
                const data = await response.json()

                throw new Error(data.error ?? data.message)
            }
        } catch (error: any) {
            throw new Error(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function uploadToDatabase(themeName: string, image: string) {
        try {
            const response = await fetch('http://localhost:9001/api/themes/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                    'Authorization': `Bearer ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({
                    theme_name: themeName,
                    image: image,
                }),
            })

            if (!response.ok) {
                const data = await response.json()

                throw new Error(data.error ?? data.message)
            }
        } catch (error: any) {
            throw new Error(error.message)
        }
    }

    async function handleClickUpload() {
        setLoading(true)

        const uploadFilesPromised = files.map(async (file) => (
          await uploadFilesLaravelLocalStorage(file)
        ))

        try {
            await Promise.all(uploadFilesPromised)
        } catch (error: Error) {
            setError(error.message)
            return
        }
        try {
            await Promise.all(files.map(async (file) => (
              await uploadToDatabase(file.name, file.name)
            )))
        } catch (error: Error) {
            setError(error.message)
            return
        } finally {
            setSuccess('Images importées avec succès')
            clearFiles()
            if (onFetch) {
                onFetch()
            }
            setLoading(false)
            if (withModal) {
                setOpen(false)
            }
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

    function handleSelectFiles() {
        fileInputRef.current?.click()
    }

    function handleRemoveFile(file: File) {
        const newFiles = [...files]
        const fileIndex = newFiles.indexOf(file)
        newFiles.splice(fileIndex, 1)
        setFiles(newFiles)
    }

    if (withModal) {
        return (
          <>
              <Modal open={open} setOpen={setOpen} backgroudColor="bg-primary-x-dark" height="h-screen md:h-4/5"
                     width="w-screen md:w-4/5">
                  <div
                    className="flex flex-col p-4 items-center justify-center h-full w-full border-2 border-dashed border-secondary-dore text-secondary-dore"
                    ref={dropzoneRef}
                    onDragOver={handleDragover}
                    onDragLeave={handleDragleave}
                    onDrop={handleDrop}
                  >
                      {error && <p className="text-red-500">{error}</p>}
                      {success && <p className="text-green-500">{success}</p>}
                      <h2 className="text-base lg:text-[1.5rem] font-semibold text-secondary-ivory">Télécharger votre image</h2>
                      <input
                        type="file"
                        className="hidden"
                        multiple={isMultiple}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        name="file"
                      />
                      <CgAddR
                        className="icon-dropzone cursor-pointer color-secondary-dore w-12 h-12 my-1"
                        onClick={handleSelectFiles}
                      />
                      <div className={`flex flex-col md:flex-row items-center justify-center mb-2`}>
                          <button
                            className={`btn-primary-light mr-2 border-2 p-1  ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-secondary-dore  hover:bg-secondary-dore hover:text-white'}`}
                            onClick={handleClickUpload}
                            disabled={disabled}
                          >
                              Importer les images
                          </button>
                          <button
                            className="btn-primary-light p-1 hover:text-white"
                            onClick={clearFiles}
                          >
                              Annuler
                          </button>
                      </div>
                      <div className="flex flex-col justify-center items-center justify-center">
                          {files.map((file: File) => (
                            <FilePreview
                              key={file.name}
                              file={file}
                              handleRemoveFile={() => handleRemoveFile(file)}
                            />
                          ))}
                      </div>
                  </div>
              </Modal>
              <div
                className="min-h-[300px] flex justify-center items-center cursor-pointer border-2 border-secondary-dore hover:border-4"
                onClick={() => setOpen(true)}>
                  <p className="btn-primary-light">
                      Ajouter des images
                  </p>
              </div>
          </>
        )
    }

    return (
      <div
        className="flex flex-col p-4 items-center justify-center h-full w-full border-2 border-dashed border-secondary-dore text-secondary-dore"
        onClick={() => { console.log('clicked') }}
        ref={dropzoneRef}
        onDragOver={handleDragover}
        onDragLeave={handleDragleave}
        onDrop={handleDrop}
      >
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <h2 className="text-base lg:text-[1.5rem] font-semibold text-secondary-ivory">Télécharger votre image</h2>
          <input
            type="file"
            className="hidden"
            multiple={isMultiple}
            ref={fileInputRef}
            onChange={handleFileChange}
            name="file"
          />
          <CgAddR
            className="icon-dropzone cursor-pointer color-secondary-dore w-12 h-12 my-1"
            onClick={handleSelectFiles}
          />
          <div className={`flex flex-col md:flex-row items-center justify-center mb-2`}>
              <button
                className={`btn-primary-light mr-2 border-2 p-1  ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : 'border-secondary-dore  hover:bg-secondary-dore hover:text-white'}`}
                onClick={handleClickUpload}
                disabled={disabled}
              >
                  Importer les images
              </button>
              <button
                className="btn-primary-light p-1 hover:text-white"
                onClick={clearFiles}
              >
                  Annuler
              </button>
          </div>
          <div className="flex flex-col justify-center items-center justify-center">
              {files.map((file: File) => (
                <FilePreview
                  key={file.name}
                  file={file}
                  handleRemoveFile={() => handleRemoveFile(file)}
                />
              ))}
          </div>
      </div>
    )
}
