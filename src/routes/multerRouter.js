import { Router } from "express";
import { insertImg } from "../controllers/multerController.js";
import { uploadDocs, uploadProds, uploadProfs } from "../config/multer.js";
const multerRouter = Router()

multerRouter.post('/profiles', uploadProfs.single('profile'), insertImg)
multerRouter.post('/docs', uploadDocs.single('doc'), insertImg)
multerRouter.post('/products', uploadProds.single('product'), insertImg)

export default multerRouter