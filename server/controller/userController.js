import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import { transporter } from "../config/nodemailConfig.js"

const generateOtp = ()=>{
    return Math.floor(Math.random() * 900000).toString()
}

let storedOtp = ''


export const authChecking = (req, res)=>{
    if(req.session.userId){
        res.status(200).json({authenticated: true, user: req.session.username})
    }else{
        res.status(200).json({authenticated: false})
    }
}

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


export const loginHandle = (req, res)=>{
    const {email, password} = req.body

    User.findOne({email})
        .then((user)=>{
            if(!user){
                return res.status(403).json({error: "invalid email"})
            }
            bcrypt.compare(password, user.password)
                .then((isMatch)=>{
                    if(!isMatch){
                        return res.status(403).json({error: "invalid password"})
                    }
                    req.session.userId = user._id
                    req.session.username = user.name
                    res.status(200).json({message: "Login successful"})
                    console.log(req.session.username)
                })
                .catch((err)=>{
                    res.status(500).json({error: "Internal server error"})
                })
        })
        .catch((err)=>{
            res.status(500).json({error: "Invalid email provide"})
        })
}
