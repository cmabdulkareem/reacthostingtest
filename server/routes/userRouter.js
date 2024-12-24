import express from 'express'
import { authChecking, loginHandle, registerHandler } from "../controller/userController.js";

const router = express.Router()


router.post('/register', registerHandler)
router.post('/login', loginHandle)
router.get('/authchecking', authChecking)


export default router;