import nodemailer from 'nodemailer'

import { config } from 'dotenv'

config()

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.gmail_username,
        pass: process.env.gmail_pass
    },
    tls: {
        rejectUnauthorized: true,
    }
})