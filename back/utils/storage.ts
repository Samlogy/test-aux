import multer from 'multer'
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now()
        const fileExtension = path.extname(file.originalname)
        const fileName = `${timestamp}${fileExtension}`
        cb(null, fileName)
    },
})

export default storage
// (req: Request, file: Express.Multer.File, cb)
