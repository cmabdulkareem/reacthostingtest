import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import { transporter } from "../config/nodemailConfig.js"
import jwt from 'jsonwebtoken'

const generateOtp = ()=>{
    return Math.floor(Math.random() * 900000).toString()
}

let storedOtp = ''

const secretKey = 'your_secret_key';

export const authChecking = (req, res) => {
    const token = req.cookies.token; // Retrieve the token from cookies

    if (!token) {
        return res.status(200).json({ authenticated: false });
    }

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(200).json({ authenticated: false });
        }

        res.status(200).json({ authenticated: true, user: decoded.username });
    });
};

export const registerHandler = (req, res) => {
    const {name, email, password} = req.body

    User.findOne({email})
        .then((existingUser)=>{
            if(existingUser){
                return res.status(403).json({error: "Email already exists"})
            }

            const otp = generateOtp()
            storedOtp = otp;

            const mailOptions = {
                from: 'cmabdulkareem@gmail.com',
                to: email,
                subject: 'Approval request',
                text: `Your OTP code is : ${otp}`,
            }

            transporter.sendMail(mailOptions, (error, info)=>{
                if(error){
                    console.log('Error', error)
                    return res.status(500).json({error: "Error sending email"})
                }
                res.status(200).json({message: 'OTP send succesfully'})
            })

            bcrypt.hash(password, 10)
                .then((hashPassword)=>{
                    User.create({ name, email, password: hashPassword})
                        .then((newUser)=>{
                            req.session.userId = newUser._id
                            
                            res.status(200).json({message: "User registration success"})
                        })
                        .catch((err)=>{
                            res.status(500).json({error: "Internal server error"})
                        })
                })
                .catch((err)=>{
                    res.status(500).json({error: "Internal server error"})
                })
        })

        .catch((err)=>{
            res.status(500).json({error: "Internal server error"})
        })
}


export const loginHandle = (req, res) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(403).json({ error: "Invalid email" });
            }
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) {
                        return res.status(403).json({ error: "Invalid password" });
                    }

                    const payload = {
                        id: user._id,
                        username: user.name,
                        email: user.email,
                    };

                    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

                    // Set the token in an HTTP-only cookie
                    res.cookie('token', token, {
                        httpOnly: true, // Prevent client-side JavaScript from accessing the cookie
                        secure: true, // Use secure cookies in production
                        sameSite: 'strict', // Protect against CSRF attacks
                        maxAge: 3600000, // Cookie expires in 1 hour
                    });

                    return res.status(200).json({ message: "Login successful" });
                })
                .catch((err) => {
                    res.status(500).json({ error: "Internal server error" });
                });
        })
        .catch((err) => {
            res.status(500).json({ error: "Invalid email provided" });
        });
};
