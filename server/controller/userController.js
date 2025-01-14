import User from "../models/userModel.js"
import Product from '../models/productModel.js'
import bcrypt from 'bcryptjs'
import { transporter } from "../config/nodemailConfig.js"
import jwt from 'jsonwebtoken'

import path, {dirname} from 'path'
import { fileURLToPath } from "url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)



let storedOtp = ''

const generateOtp = () => {
    return Math.floor(Math.random() * 900000).toString()
}

const secretKey = 'your_secret_key';

export const authChecking = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Authorization token is required' });
    }

    try {
        const decoded = jwt.verify(token, secretKey);
        res.status(200).json({ authenticated: true });
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};


export const registerHandler = async (req, res) => {
    const { name, email, password, otp } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ error: "Email already exists, please login" });
        } else {
            if (otp != storedOtp) {
                return res.status(403).json({ error: "Invalid otp" });
            } else {
                storedOtp = ''
                const hashPassword = await bcrypt.hash(password, 10);

                // Create new user
                const newUser = await User.create({ name, email, password: hashPassword });

                return res.status(200).json({ message: "User registration success" });
            }

        }

        // Hash the password

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const sendOtpHandler = async (req, res) => {

    const { email } = req.body
    // Generate OTP
    const otp = generateOtp();
    storedOtp = otp;
    
    console.log(storedOtp)

    // Mail options for sending OTP
    const mailOptions = {
        from: 'cmabdulkareem@gmail.com',
        to: email,
        subject: 'Approval request',
        text: `Your OTP code is : ${otp}`,
    };

    // Send OTP email
    await new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error', error);
                reject(new Error("Error sending email"));
                return res.status(500).json({ error: 'internal server error' })
            }
            resolve();
            console.log("otp send")
            res.status(200).json({ message: "OTP Sent" })
        });
    });
}


export const loginHandle = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(403).json({ error: "Invalid email" });
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(403).json({ error: "Invalid password" });
        }

        const payload = {
            id: user._id,
            username: user.name,
            email: user.email,
        };

        const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'None',
            maxAge: 3600000,
        });

        return res.status(200).json({ message: "Login successful" });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};


export const addProductHandler = (req, res)=>{
    const {itemName, itemDesc, itemPrice} = req.body

    Product.create({itemName, itemDesc, itemPrice})
        .then((product)=>{
            const image = req.files.itemImage
            image.mv(path.join(__dirname, '../public/images/product-images', `${product._id}.jpg`))
            res.status(200).json({message: "Product created succesfully"})
        })
        .catch((err)=>{
            res.status(500).json({error: "Product creation failed"})
        })
}

export const viewProductsHandler = (req, res)=>{

    Product.find({})
        .then((products)=>{
            res.status(200).json({message: products})
        })
        .catch((err)=>{
            res.status(500).json({error: "Internal server error"})
        })
}

export const deleteProductHandler = (req, res)=>{
    const id = req.params.id

    Product.findByIdAndDelete(id)
        .then((products)=>{
            res.json({message: products}).status(200)
        })
        .catch((err)=>{
            res.json({error: "error deleting item"}).status(500)
        })
}

export const logoutHandler = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
    });
    return res.status(200).json({ message: "Logout successful" });
};
