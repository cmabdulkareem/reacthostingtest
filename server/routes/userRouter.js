import express from 'express'
import { authChecking, loginHandle, registerHandler, sendOtpHandler, addProductHandler, viewProductsHandler, deleteProductHandler, logoutHandler } from "../controller/userController.js";

const router = express.Router()


router.post('/register', registerHandler)
router.post('/login', loginHandle)
router.get('/authchecking', authChecking)
router.post('/sendOtp', sendOtpHandler)
router.post('/addProducts', addProductHandler)
router.get('/products', viewProductsHandler)
router.delete('/delete-product/:id', deleteProductHandler)
router.get('/logoutHandler', logoutHandler)


export default router;