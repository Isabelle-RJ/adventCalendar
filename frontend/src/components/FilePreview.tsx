
interface PreviewsProps {
    file: File
    handleRemoveFile: () => void
}

export default function FilePreview({ file, handleRemoveFile }: PreviewsProps) {

    return (
        <div className="flex">

            <p className="mr-4">{file.name}</p>
            <button
                onClick={handleRemoveFile}
            >
                X
            </button>

        </div>
    )
}