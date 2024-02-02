import multer from 'multer'
import path from 'path'

function generateFileName(ext: string): string {
    const currentDate = new Date()
    const timestamp = Date.now()

    // Extract date components
    const year = currentDate.getFullYear()
    const month = String(currentDate.getMonth() + 1)
    const day = String(currentDate.getDate())

    return `${year}-${month}-${day}-${timestamp}${ext}`
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const fileExtension = path.extname(file.originalname)
        const fileName = generateFileName(fileExtension)
        cb(null, fileName)
    },
})

export default storage
