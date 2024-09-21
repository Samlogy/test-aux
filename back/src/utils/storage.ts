import multer from 'multer'
import path from 'path'
import { generateFileName } from './fn'

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
