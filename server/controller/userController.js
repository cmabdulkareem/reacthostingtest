import User from "../models/userModel.js"
import bcrypt from 'bcryptjs'
import { transporter } from "../config/nodemailConfig.js"
import jwt from 'jsonwebtoken'


let storedOtp = ''
const generateOtp = ()=>{
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
    const { name, email, password } = req.body;

    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(403).json({ error: "Email already exists" });
        }

        // Generate OTP
        const otp = generateOtp();
        storedOtp = otp;

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
                }
                resolve();
            });
        });

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({ name, email, password: hashPassword });

        // Set the session for the new user
        req.session.userId = newUser._id;

        return res.status(200).json({ message: "User registration success" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal server error" });
    }
};





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
